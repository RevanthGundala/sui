use std::sync::Arc;

use sui_types::{
    base_types::{ObjectID, ObjectRef, SuiAddress},
    crypto::{get_key_pair, AccountKeyPair},
    effects::TransactionEffects,
    object::{Object, Owner},
    programmable_transaction_builder::ProgrammableTransactionBuilder,
    transaction::{ProgrammableTransaction, TEST_ONLY_GAS_UNIT_FOR_PUBLISH},
};

use crate::{
    authority::{
        // authority_test_utils::{
        //     certify_shared_obj_transaction_no_execution, execute_sequenced_certificate,
        // },
        authority_tests::execute_programmable_transaction,
        move_integration_tests::build_and_publish_test_package,
        test_authority_builder::TestAuthorityBuilder,
        AuthorityState,
    },
    move_call,
};
use move_core_types::ident_str;
use sui_types::transaction::ObjectArg;

pub struct TestRunner {
    pub sender: SuiAddress,
    pub sender_key: AccountKeyPair,
    pub gas_object_ids: Vec<ObjectID>,
    pub authority_state: Arc<AuthorityState>,
    pub package: ObjectRef,
}

impl TestRunner {
    pub async fn new_with_objects(base_package_name: &str, num: usize) -> Self {
        telemetry_subscribers::init_for_testing();
        let (sender, sender_key): (_, AccountKeyPair) = get_key_pair();

        let authority_state = TestAuthorityBuilder::new().build().await;
        let mut gas_object_ids = vec![];
        for _ in 0..num {
            let gas_object_id = ObjectID::random();
            let gas_object = Object::with_id_owner_for_testing(gas_object_id, sender);
            authority_state.insert_genesis_object(gas_object).await;
            gas_object_ids.push(gas_object_id);
        }

        let package = build_and_publish_test_package(
            &authority_state,
            &sender,
            &sender_key,
            &gas_object_ids[0],
            base_package_name,
            /* with_unpublished_deps */ false,
        )
        .await;

        Self {
            sender,
            sender_key,
            gas_object_ids,
            authority_state,
            package,
        }
    }

    pub async fn new(base_package_name: &str) -> Self {
        Self::new_with_objects(base_package_name, 1).await
    }

    pub async fn run(&mut self, pt: ProgrammableTransaction) -> TransactionEffects {
        let effects = execute_programmable_transaction(
            &self.authority_state,
            &self.gas_object_ids[0],
            &self.sender,
            &self.sender_key,
            pt,
            TEST_ONLY_GAS_UNIT_FOR_PUBLISH,
        )
        .await
        .unwrap();

        effects
    }
}

#[tokio::test]
async fn test_delete_shared_object() {
    let mut runner = TestRunner::new("shared_object_deletion").await;
    let TransactionEffects::V1(effects) = runner
        .run({
            let mut builder = ProgrammableTransactionBuilder::new();
            move_call! {
                builder,
                (runner.package.0)::o2::create()
            };
            builder.finish()
        })
        .await;

    assert_eq!(effects.created.len(), 1);

    let shared_obj = effects.created[0].0;
    let initial_shared_version = shared_obj.1;

    let TransactionEffects::V1(effects) = runner
        .run({
            let mut builder = ProgrammableTransactionBuilder::new();
            let arg = builder
                .obj(ObjectArg::SharedObject {
                    id: shared_obj.0,
                    initial_shared_version,
                    mutable: true,
                })
                .unwrap();
            move_call! {
                builder,
                (runner.package.0)::o2::consume_o2(arg)
            };
            builder.finish()
        })
        .await;

    print!("{}", effects);
}

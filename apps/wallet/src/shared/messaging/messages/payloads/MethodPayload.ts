// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from './BasePayload';
import {
	type AccountSourceSerializedUI,
	type AccountSourceType,
} from '_src/background/account-sources/AccountSource';
import { type SerializedUIAccount } from '_src/background/accounts/Account';
import { type UIAccessibleEntityType } from '_src/background/storage-entities-utils';

import type { Payload } from './Payload';

type MethodPayloads = {
	getStoredEntities: { type: UIAccessibleEntityType };
	storedEntitiesResponse: { entities: any; type: UIAccessibleEntityType };
	createAccountSource: {
		type: AccountSourceType;
		params: {
			password: string;
			entropy?: string;
		};
	};
	accountSourceCreationResponse: { accountSource: AccountSourceSerializedUI };
	unlockAccountSource: { id: string; type: AccountSourceType } & { password: string };
	deriveMnemonicAccount: { sourceID: string };
	accountCreatedResponse: { account: SerializedUIAccount };
};

type Methods = keyof MethodPayloads;

export interface MethodPayload<M extends Methods> {
	type: 'method-payload';
	method: M;
	args: MethodPayloads[M];
}

export function isMethodPayload<M extends Methods>(
	payload: Payload,
	method: M,
): payload is MethodPayload<M> {
	return (
		isBasePayload(payload) &&
		payload.type === 'method-payload' &&
		'method' in payload &&
		payload.method === method &&
		'args' in payload
	);
}

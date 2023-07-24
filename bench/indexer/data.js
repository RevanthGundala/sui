window.BENCHMARK_DATA = {
  "lastUpdate": 1690242343970,
  "repoUrl": "https://github.com/MystenLabs/sui",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "adam@mystenlabs.com",
            "name": "Adam Welc",
            "username": "awelc"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "4a9b5cd6415c35f29432362d3a28152737cf5b77",
          "message": "[move-compiler] Suppressed linter warnings in Sui stdlib (#13127)\n\n## Description \r\n\r\nRecently added support for suppressing linter warnings\r\n(https://github.com/MystenLabs/sui/pull/13012) allows us to suppress\r\nlinter warning in Sui stdlib so that developers building Move sources\r\nonly see warnings pertaining to their own code.\r\n\r\nPerhaps some of these suppressions should actually result in the rewrite\r\nof the library but this is beyond the scope of this PR.\r\n\r\n## Test Plan \r\n\r\nN/A\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [x] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes\r\n\r\nDevelopers trying recently introduced linters might have seen linter\r\nwarnings coming from Sui standard library which are from now on going to\r\nbe suppressed",
          "timestamp": "2023-07-24T16:36:49-07:00",
          "tree_id": "bae05ce2dc276374523c02f015a5a367c97edf9b",
          "url": "https://github.com/MystenLabs/sui/commit/4a9b5cd6415c35f29432362d3a28152737cf5b77"
        },
        "date": 1690242303090,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 325131,
            "range": "± 25579",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "eugene@mystenlabs.com",
            "name": "Eugene Boguslavsky",
            "username": "ebmifa"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5a90fb368222596e121bb79568ca506fed526035",
          "message": "Revert \"[Build] Remove unused / broken caching steps from Dockerfiles… (#13128)\n\n## Description\r\nSuiscan reported an issue\r\n```\r\n...After today's devnet redeploy announcement, we can't run it through docker images. Use the 6ef84f45b49a6372eb4118f395298c07e1804755 commit to download the image from docker hub.\r\nmysten/sui-node:6ef84f45b49a6372eb4118f395298c07e1804755\r\n\r\n  Error below:\r\nCreating network \"sui-node_default\" with the default driver\r\nCreating volume \"sui-node_suidb\" with default driver\r\nCreating sui ... error\r\n\r\nERROR: for sui  Cannot start service sui: failed to create shim: OCI runtime create failed: runc create failed: unable to start container process: exec: \"/usr/local/bin/sui-node\": stat /usr/local/bin/sui-node: no such file or directory: unknown\r\n\r\nCan you check it please?\r\n\r\nWe didn't change any configurations, we just updated the image.\r\n```\r\nReverting https://github.com/MystenLabs/sui/pull/13049\r\n\r\n## Test Plan \r\nBuilt the new sui-node docker image and it worked\r\n```\r\neugene@mac-studio ~/code/sui/docker/fullnode (eugene/test_docker_branch) $ docker compose up\r\n[+] Running 6/6\r\n ✔ fullnode 5 layers [⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                    3.7s\r\n   ✔ 9d21b12d5fab Already exists                                                                                                                       0.0s\r\n   ✔ 84ec7d4e1932 Pull complete                                                                                                                        1.6s\r\n   ✔ a9b442dbdc60 Pull complete                                                                                                                        1.6s\r\n   ✔ b81b15d8848e Pull complete                                                                                                                        1.9s\r\n   ✔ c3a23ea77f15 Pull complete                                                                                                                        2.2s\r\n[+] Running 2/1\r\n ✔ Container fullnode-fullnode-1                                                                                                                           Recreated0.1s\r\n ! fullnode The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested 0.0s\r\nAttaching to fullnode-fullnode-1\r\nfullnode-fullnode-1  | 2023-07-24T22:57:55.314277Z  INFO sui_node: Sui Node version: 1.6.0-90ccffc02\r\nfullnode-fullnode-1  | 2023-07-24T22:57:55.316885Z  INFO sui_node: Supported protocol versions: Some(SupportedProtocolVersions { min: ProtocolVersion(1), max: ProtocolVersion(19) })\r\nfullnode-fullnode-1  | 2023-07-24T22:57:55.317822Z  INFO sui_node: Started Prometheus HTTP endpoint at 0.0.0.0:9184\r\nfullnode-fullnode-1  | 2023-07-24T22:57:55.327446Z  INFO sui_node: Initializing sui-node listening on /dns/localhost/tcp/8080/http node=k#8cd06247d4f1c352af64d56d46306fadbb5fdeaaac71418c37a21273d94e98ddcd6a90917d0417b26d26b04f436018ae0c862a39de3ca5c24ed8cfd6cf7823eaef3262f6408ff877ae5f2fef83511f2678185fe7b770ed4ac787d79a0c153d6e\r\nfullnode-fullnode-1  | 2023-07-24T22:58:30.838945Z  INFO sui_core::authority::authority_store: Loading epoch start config from DB\r\nfullnode-fullnode-1  | 2023-07-24T22:58:30.848199Z  INFO sui_core::authority::authority_store: Epoch start config: V2(EpochStartConfigurationV2 { system_state: V1(EpochStartSystemStateV1 { epoch: 0, protocol_version: 9, reference_gas_price: 1000, safe_mode: false, epoch_start_timestamp_ms: 1683583564069, epoch_duration_ms: 86400000, active_validators: [EpochStartValidatorInfoV1 { sui_address: 0x36df428001ba9645a5fe5dff3af5b94b5bbaae636c8398daf7594a1440bb2d4a, protocol_pubkey: hFJdq3FHjT8OLtgDlx922sG7FsSguhrd54JWv/PEngAjLqZ8GIZ/EYoQUINlIPYVCJZuxXxUnTx2m1OqEj/2ta6qnGZOVb3n8zM0/jKMZaHQw8Hg8MJqNPioOpUoQmdZ, narwhal_network_pubkey: rIBotChaIH7alAxQLYccWLW8GEl+0ZPIIlpI0eTGjPc=, narwhal_worker_pubkey: OL1cSky4WyYDRXAgvH+rtY1gsMM9SDd6MwGPca2ABFQ=, s\r\n...\r\n```",
          "timestamp": "2023-07-24T23:34:45Z",
          "tree_id": "536f23ca9147b5f36f4e8fbbdc3d90c74096a8ac",
          "url": "https://github.com/MystenLabs/sui/commit/5a90fb368222596e121bb79568ca506fed526035"
        },
        "date": 1690242340178,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 368189,
            "range": "± 21690",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}
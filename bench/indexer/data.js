window.BENCHMARK_DATA = {
  "lastUpdate": 1690242306263,
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
      }
    ]
  }
}
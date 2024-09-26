## Deploy Order

1. deploy mock tokens
```sh
node scripts/deploy.token.js
```
2. deploy mock reward modules
```sh
node scripts/deploy.rewards.js
```
3. deploy oracle and investment modules
```sh
node scripts/deploy.oracle.invest.js
```
4. deploy all libraries
```sh
node scripts/deploy.lib.js
```
5. deploy factory contract
```sh
node scripts/deploy.factory.js
```
(4. while deploying libraries, you need to update linkReferences right after running each function)
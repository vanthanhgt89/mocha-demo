# Mocha init test 
### sử dụng module 
* B1: config 
```js
const mocha = require('mocha')
const chai = require('chai')
const should = chai.should()
const chaiAsPromise = require('chai-as-promise')
chai.use(chaiAsPromise)
```

* B2: Tính toán thực hiện các tác vụ cần test bằng describe() -> mocha and it() -> chai

```js 
describe('create table todolist', () => {
    it("Load task.sql file to database", () => {
        const queryFile = sql('tasks.sql');
        let result = db.result(queryFile)
            .then(() => {
                return "Create success";
            })
            .catch((error) => {
                console.log(error);
                return "failed";
            });

        return result.should.eventually.equal("Create success");
    });
```

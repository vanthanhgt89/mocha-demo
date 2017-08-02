const { db, config } = require('../pgp')

const pgStructure = require('pg-structure')

// ====== Chai =========
const chai = require('chai')
const should = chai.should()
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

// ========lodash========
const _ = require('lodash')

//======== pg-promise ====
const pgp = require('pg-promise')
const QueryFile = pgp.QueryFile
const path = require('path')

function sql(file) {
    let fullPath = path.join(__dirname, '../migrations', file)
    return new QueryFile(fullPath, { minify: true })
}

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

    it('Check exists table todolist in database', () => {
        const check_exists = pgStructure({
            database: config.database,
            user: config.username,
            password: config.password,
            host: config.host,
            port: config.port
        }, config.schema)
            .then(data => {
                var tables = data.schemas.get(config.schema).tables;
                // const table_names = Array.from(tables.keys());
                // console.log(tables);
                // console.log(table_names);
                return tables.has('todolist');
            })
        return check_exists.should.eventually.equal(true);
    })
    it('insert into 4record in todolist', () => {
        let count = db.any("insert into todolist (title, completed ) values ('Todo 1', 'true'), ('Todo 2', 'true'), ('Todo 3', 'false'), ('Todo 4', 'true') ")
    })
})


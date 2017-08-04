const { db, } = require('./pgp')
const express = require('express')
const app = express()

// ========= body-parse ===========
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// ======== cross domain assest ==========
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// ==== get database =======
app.get('/db/db-todo/all', (req, res) => {
  db.any('select * from todolist')
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      return err
    })
})

// ===== them cong viec + update =======
app.post('/db/db-todo/add', (req, res) => {
  let newJob = req.body
  console.log(newJob);
  db.none("INSERT INTO todolist (title, completed) VALUES (${title}, ${completed})", newJob)
    .then(() => {
      db.any('select * from todolist order by id desc')
        .then(data => {
          res.json(data)
        })
        .catch(err => {
          return err
        })
    })
})

// ======= xoa cong viec ===========
app.post('/db/db-todo/remove', (req, res) => {
  let deleteJob = req.body
  console.log(deleteJob);
  db.none('delete from todolist where title = ${title}', deleteJob)
    .then(() => {
      db.any('select * from todolist  order by id desc')
        .then(data => {
          res.json(data)
        })
        .catch(err => {
          return err
        })
    })
})

// ======= sua cong viec ===========
app.post('/db/db-todo/edit', (req, res) => {
  let edit = req.body
  console.log(edit);
  db.none('UPDATE todolist set title = ${title}, completed = ${completed}', edit)
    .then(() => {
      db.any('select * from todolist  order by id desc')
        .then(data => {
          res.json(data)
        })
        .catch(err => {
          return err
        })
    })
})

// 

const port = 3005
app.listen(port, () => {
  console.log('listen 3005');
})
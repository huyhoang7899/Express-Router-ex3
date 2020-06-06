var express = require('express');
const shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('transaction/index', {
    transactions: db.get('transactions').value()
  });
});

router.get('/create', function(req, res) {
  res.render('transaction/create', {
    users: db.get('users').value(),
    books: db.get('books').value()
  });
})

router.get('/:id/update', function(req, res) {
  var id = req.params.id;
  res.render('transaction/update', {
    transaction: db.get('transactions').find({ id: id }).value()
  });
});

router.get('/:id/delete', function(req, res) {
  var id = req.params.id;
  db.get('transactions').remove({ id: id }).write();
  res.redirect('back');
});

router.post('/create', function(req, res) {
  req.body.id = shortid.generate();
  db.get('transactions').push(req.body).write()
  res.redirect('/transactions');
});

router.post('/update', function(req, res) {
  var id = req.body.id;
  db.get('transactions').find({ id: id }).assign({ userId: req.body.userId }, { bookId: req.body.bookId }).write()
  res.redirect('/transactions');
});

module.exports = router;
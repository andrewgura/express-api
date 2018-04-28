var express = require('express');
var router = express.Router(); // get an instance of the express Router

var ChatLog = require('../models/chat');

router.get('/display', function(req, res) {
  res.render('index', {
    layout: false
  });
});

//if we want to use middleware for each request
// router.use(function(req, res, next) {
//   next(); // make sure we go to the next routes and don't stop here
// });

//Get all messages
router.get('/', function(req, res) {
  ChatLog.find(function(err, chats) {
    if (err)
      res.send(err);
    res.json(chats);
  });
});

//Display one message by id
router.get('/:chat_id', function(req, res) {
  ChatLog.findById(req.params.chat_id, function(err, chats) {
    if (err)
      res.send(err);
    res.json(chats);
  });
})

//create one message
router.post('/', function(req, res) {
  ChatLog.create({
      name: req.body.name,
      message: req.body.message
    },
    function(err, chats) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(chats);
    });
});

//Update specific message
router.put('/:chat_id', function(req, res) {
  ChatLog.findById(req.params.chat_id, function(err, chat) {
    if (err) {
      res.send(err);
    } else {
      chat.name = req.body.name;
      chat.message = req.body.message;
      chat.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Chat updated'
        });
      });
    }
  })
})

//delete specificmessage
router.delete('/:chat_id', function(req, res) {
  ChatLog.remove({
    _id: req.params.chat_id
  }, function(err, chat) {
    if (err)
      res.send(err);

    res.json({
      message: 'Successfully deleted'
    });
  });
})


module.exports = router;

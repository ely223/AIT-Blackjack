var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var List = mongoose.model('List');
var Note = mongoose.model('Note');

/* GET home page. */
router.get('/', function(req, res) {
  if (req.user)
  {
    res.redirect('/users/' + req.user.username);
  }
  else
  {
    res.render('index', { user: req.user });
  }
});


router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req,res,next) {

  passport.authenticate('local', function(err,user) {
    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/users/' + user.username);
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
      console.log("incorrect login");
    }
  })(req, res, next);

});



router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}), 
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send message back to registration...
      res.render('register',{message:'Your username or password is already taken'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      passport.authenticate('local')(req, res, function() {
        res.redirect('/users/' + req.user.username);
      });
    }
  });   
});


router.get('/users/:username', function(req, res) {
  if (req.user){
     var populateQuery = ['lists', 'notes', 'items'];
      User
        .findOne({username: req.params.username})
        .populate(populateQuery)
        .exec(function(err, user) {
          res.render('user', { 
          list: user.lists,
          note: user.notes,
          username: user.username
        });  
      });
  }
  else
  {
    res.redirect('/login');
  }
});


router.get('/users/:username/list/create', function(req, res) {
  if (req.user){
  	res.render('list', { username: req.user.username});
  }
  else
  {
    res.redirect('/login');
  }
});


router.post('/users/list/create', function(req,res){

  if (req.user){
    var newList = new List({
      user: req.user._id,
      name: req.body.name
    });

    newList.save(function(err,myList,count){
      req.user.lists.push(myList._id);
      req.user.save(function(err, savedUser, count){
        res.redirect('/users/' + req.user.username);
      });
    });
  }
  else
  {
    res.redirect('/login');
  }
});
    
router.post('/users/item/create', function(req, res) {
  if (req.user){
    List.findOneAndUpdate({slug: req.body.slug}, 
      {$push: {items: {item_name: req.body.item, checked: false}}}, 
      function(err, name, count) {
        res.redirect('/users/list/' + req.body.slug);
      });
  }
  else
  {
    res.redirect('/login');
  }
});


router.get('/users/list/:slug', function(req, res) {
  if (req.user){
    List.findOne({slug: req.params.slug }, function(err, name, count) {
        res.render('listdisplay', {  Item: name.items, Title: name.name, usaname: req.user.username, slugName: req.params.slug});
    });
  }
  else
  {
    res.redirect('/login');
  }

});


router.post('/item/check', function(req, res) {
  if (req.user){
    List.findOne({slug: req.body.slug}, function(err, list, count) {
     
    
      if (typeof(req.body.checked) === 'string')
      {
        for (var i = 0; i < list.items.length; i++) {
          if (req.body.checked === list.items[i].item_name)
          {
            list.items[i].checked = true;
          }
        }
      }
      else
      {
        for (var i = 0; i < list.items.length; i++) {
          for (var j = 0; j < req.body.checked.length; j++)
          {
            if (req.body.checked[j] == list.items[i].item_name)
            {
              list.items[i].checked = true;
            }
          }
        }
      }

      list.save(function(err, modifiedList, count) {
        res.redirect('/users/list/' + req.body.slug);
      });
    });
  }
  else
  {
    res.redirect('/login');
  }

});



router.get('/users/note/:slug', function(req, res) {
  if (req.user){
    Note.findOne({slug: req.params.slug }, function(err, name, count) {
      res.render('notedisplay', { Content: name.content, Title: name.name, usaname: req.user.username, slugName: req.params.slug});
    });
  }
  else
  {
    res.redirect('/login');
  }

});


router.get('/users/:username/note/create', function(req, res) {
	if (req.user){
    res.render('note');
  }
  else
  {
    res.redirect('/login');
  }

});

router.post('/users/note/create', function(req,res){
  if (req.user){
  	var newNote = new Note({
      user: req.user._id,
      name: req.body.name,
      content: req.body.content
    });

    newNote.save(function(err,myNote,count){
      req.user.notes.push(myNote._id);
      req.user.save(function(err, savedUser, count){
        res.redirect('/users/' + req.user.username);
      });
    });
  }
  else
  {
    res.redirect('/login');
  }

});

router.post('/users/note/update', function(req,res){
  if (req.user){
    Note.findOneAndUpdate({slug: req.body.slug}, 
      {$set: {content: req.body.content}}, 
      function(err, name, count) {
        res.redirect('/users/note/' + req.body.slug);
    });
  }
  else
  {
    res.redirect('/login');
  }

});



module.exports = router;






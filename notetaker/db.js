var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var passportLocalMongoose = require('passport-local-mongoose');

// my schema goes here!
var User = new mongoose.Schema({
	lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
	notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

// to handle salt, password, and username for the user
User.plugin(passportLocalMongoose);

var Item = new mongoose.Schema({
	item_name: String,
	checked: Boolean
});

var List = new mongoose.Schema({
	//user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: String,
	items: [Item]
});

var Note = new mongoose.Schema({
	name: String,
	content: String
});

List.plugin(URLSlugs('User name'));
Note.plugin(URLSlugs('User name'));

mongoose.model('List', List);
mongoose.model('Item', Item);
mongoose.model('Note', Note);
mongoose.model('User', User);

mongoose.connect('mongodb://localhost/notetakerdb');
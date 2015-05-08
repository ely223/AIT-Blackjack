Description
-------------
I want to build a web app that allows the user to do two different things:
	- create to-do lists
	- jot down random/short notes
The user will need to register for an account. Once properly logged into the account, the user will have the option to either view any of the notes and lists they previously created, or to create new ones.

This web app will use MongoDB to store each user's account as well as the notes and lists that were created.

Sample Documents/Schemas
-------------
var User = new mongoose.Schema({
	lists: [List];
	notes: [Note]
});

// to handle salt, password, and username for the user
User.plugin(passportLocalMongoose);

var Item = new mongoose.Schema({
	name: String,
	checked: Boolean
});

var List = new mongoose.Schema({
	name: String,
	items: [Item]
});

var Note = new mongoose.Schema({
	name: String,
	content: String
});

The Item model is an item in the List model. The Note model will just have it's content in one string. The User model will have a username and password (by using the passport module). The User will have List and Note modules.

User Stories
-------------

As a User, I want be able to log in or register for an account so that I can access my notes and lists.

As a User, I want be able to create lists so that I can jot down tasks.

As a User, I want be able to create notes so that I can write down my thoughts that I need to remember.

As a User, I want be able to check off the items in my lists so that I know which tasks I've completed.

As a User, I want be able to update my notes so that I can edit and change things around after my initial submission.

Research
-------------
I have chosen these 3 concepts to research for the following reasons:

Responsive Design: I've always wanted to try to implement a response website. I think this would be a great feature for my web app because nowadays most people find themselves on the go and want to jot something down quickly on their phones.Having a responsive design to fit the screen of a smartphone would be really convenient for the end user.

User Authentication: I will use the methods that we learned in lecture. This is something I'd want to try to integrate in my web app because we didn't get a chance to implement it in any of our homeworks and it's important that each of my users can't access other people's private lists and notes.

Client-Side form validation using Javascript library: I think I will likely use JQuery and its validation plug in. I did a bit of research on this and it seems like it is simple to integrate with javascript. I want to make sure on the client side that the user enters a username of a minimum length and other things like that. 


Wireframes
-------------
![Wireframe1](/documentation/Wireframe1.jpg?raw=true "Wireframe 1")
![Wireframe2](/documentation/Wireframe2.jpg?raw=true "Wireframe 2")

Site Map
-------------

![SiteMap](/documentation/Young,Elodie-SiteMap.png?raw=true "Site Map")
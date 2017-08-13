/**
 * Created by prasadtajane on 8/4/17.
 */


var q = require('q');
var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/healthcare'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds145312.mlab.com:45312/heroku_hk8k7m0j'; // user yours
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

module.exports = db;



var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    email:String,
    title:String,
    gender:String,
    languages:[{
        name:String,
        code:String
    }],
    isAdmin:{type:Boolean, default:false}

}, {
    collection:"user"
});

var websiteSchema = mongoose.Schema({
        _user:String,
        name:String,
        description:String,
        pages:String,
        dateCreated:{type:Date, default:Date.now()}
    },  {
    collection:"website"
    });


var users = [
    {username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "a@b.com", contact: 123,  isAdmin: true},
    {username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",    email: "a@b.com",  contact: 123,
        languages:[{name:"english", code: "en"}]  }
];

var websites = [
    { "name": "Facebook",    "developerId": "456", "description": "Lorem", "visited": "2000" },
    { "name": "Tweeter",     "developerId": "456", "description": "Lorem", "visited": "3000" },
    { "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "visited": "4000" },
    { "name": "Go",          "developerId": "123", "description": "Lorem", "visited": "5000" },
    { "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "visited": "6000" },
    { "name": "Checkers",    "developerId": "123", "description": "Lorem", "visited": "7000" },
    { "name": "Chess",       "developerId": "234", "description": "Lorem", "visited": "7500" }
];


function callback(err, result)   {
    //console.log(err);
    //console.log(result);
}

function createUserCollection(users)  {

    function createUsers(arrayName) {
        var User = mongoose.model("profile", userSchema);

        for (a in arrayName)  {
            User.create(arrayName[a], callback)
        }
        console.log("Users Created!");
    }
    createUsers(users);
}


function createWebsiteCollection(websites) {

    function createWebsite(websites)   {
        var Websites = mongoose.model("website", websiteSchema);

        for (w in websites)  {
            Websites.create({
                    _user:websites[w].developerId,
                    name:websites[w].name,
                    description:websites[w].description,
                    pages:websites[w].pages,
                    dateCreated:websites[w].dateCreated
                },
                callback)
        }
        console.log("Websites Created!");
    }
    createWebsite(websites)
}


/*function findAll() {
    var User = mongoose.model("profile", userSchema);
    User.find(function (err, results) {
        console.log(results);
    });
}*/

createUserCollection(users);
//createWebsiteCollection(websites);
//findAll();
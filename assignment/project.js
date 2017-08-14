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

    practices:[{
        location_slug:String,
        visit_address:{city:String, street:String, street2:String, zip:String, state:String},
        phones:[{number:String,type:String}]
    }],

    educations:[{degree:String, graduation_year:String, school:String}],

    profile:{
        first_name:String,
        last_name:String,
        title:String,
        gender:String,
        image_url:String,
        bio:String,
        languages:[{name:String,code:String}]
    },

    ratings:[{provider:String, provider_url:String, rating:String}],

    specialties:[{name:String, category:String, description:String}],

    licenses:[{number:String, state:String}],

    uid:String,
    npi:String,

    username:String,
    password:String,
    email:String,

    physic:{
      height:String,
      weight:String,
      age:String,
      blood:String,
      birthday:{type:Date, default:Date.now()}
    },

    diseases:String,
    Operations:String,
    isAdmin:{type:Boolean, default:false}

}, {
    collection:"user"
});


var User = mongoose.model("user", userSchema);

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
    {username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "a@b.com", contact: 123,  isAdmin: true
        ,educations:[],ratings:[]},
    {"username": "jannunzi", "password": "jannunzi", "firstName": "Jose",   "lastName": "Annunzi",    "email": "a@b.com","ratings":[]},
    {
        "username": "po",
        "password": "po",
        "firstName": "po",

        /*"practices": [{
            "location_slug": "ca-oakland",
            "within_search_area": true,
            "distance": 11.245006427577161,
            "lat": 37.82312,
            "lon": -122.25835,
            "uid": "e5706cec1b5ed179f5964f09bd494160",
            "name": "The Permanente Medical Group - Oakland Medical Center",
            "website": "https://mydoctor.kaiserpermanente.org/ncal/provider/davidlaw#tab%7C2%7C1%7CProfessional%7C/ncal/provider/davidlaw/about/professional?professional=aboutme.xml&ctab=About+Me&cstab=Professional&to=1&sto=0",
            "accepts_new_patients": true,
            "insurance_uids": ["blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix", "healthnet-healthnetindividualfamilyppohix", "anthem-blueviewvision", "blueshieldofcalifornia-blueshieldcabasicepobronzelevelhix", "cigna-vision", "vsp-vsp", "healthnet-healthnetcommunitycarenetworkhmohix", "medicare-medicare", "medicaid-medicaid", "aetna-aetnamdbronzesilverandgoldhmo", "healthnet-bluegoldhmo", "healthnet-hmoexcelcaresilvernetwork", "healthnet-hmoexcelcaresilvernetworkmedicarecob", "anthembluecrossblueshield-golddirectaccesspluswhsa", "anthembluecrossblueshield-bronzedirectaccessplusgjqa", "healthnet-healthnetcabluegoldhmo", "kaiserpermanente-kaiserpermanente"],
            "visit_address": {
                "city": "Oakland",
                "lat": 37.82312,
                "lon": -122.25835,
                "state": "CA",
                "state_long": "California",
                "street": "3600 Broadway",
                "zip": "94611"
            },
            "office_hours": [],
            "phones": [{"number": "5107525438", "type": "landline"}],
            "languages": [{"name": "English", "code": "en"}]
        }],*/
        "educations": [],
        "profile": {
            "first_name": "Martin",
            "last_name": "Jimenez",
            "slug": "martin-jimenez",
            "title": "MD",
            "image_url": "https://asset1.betterdoctor.com/assets/general_doctor_male.png",
            "gender": "male",
            "languages": [{"name": "English", "code": "en"}],
            "bio": "Dr. Martin Jimenez, MD--specialist in hospitalist and internal medicine--currently treats patients in Oakland, California.\n\nDr. Jimenez is licensed to treat patients in California.\n\nDr. Jimenez has successfully passed a background check including a medical license verification (active) and screening for malpractice history (none found)."
        },
        "ratings": [],
        "insurances": [{
            "insurance_plan": {
                "uid": "blueshieldofcalifornia-blueshieldcabasicppobronzelevelhix",
                "name": "Basic PPO - Bronze level HIX",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "blueshieldofcalifornia", "name": "Blue Shield of California"}
        }, {
            "insurance_plan": {
                "uid": "healthnet-healthnetindividualfamilyppohix",
                "name": "Health Net Individual  Family - PPO  HIX",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "healthnet", "name": "HealthNet"}
        }, {
            "insurance_plan": {"uid": "anthem-blueviewvision", "name": "Blue View Vision", "category": ["vision"]},
            "insurance_provider": {"uid": "anthem", "name": "Anthem Blue Cross"}
        }, {
            "insurance_plan": {
                "uid": "blueshieldofcalifornia-blueshieldcabasicepobronzelevelhix",
                "name": "Basic EPO - Bronze level HIX",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "blueshieldofcalifornia", "name": "Blue Shield of California"}
        }, {
            "insurance_plan": {"uid": "cigna-vision", "name": "Vision", "category": ["vision"]},
            "insurance_provider": {"uid": "cigna", "name": "Cigna"}
        }, {
            "insurance_plan": {"uid": "vsp-vsp", "name": "VSP", "category": ["vision"]},
            "insurance_provider": {"uid": "vsp", "name": "VSP"}
        }, {
            "insurance_plan": {
                "uid": "healthnet-healthnetcommunitycarenetworkhmohix",
                "name": "Health Net CommunityCare Network - HMO  HIX",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "healthnet", "name": "HealthNet"}
        }, {
            "insurance_plan": {"uid": "medicare-medicare", "name": "Medicare", "category": ["medical"]},
            "insurance_provider": {"uid": "medicare", "name": "Medicare"}
        }, {
            "insurance_plan": {"uid": "medicaid-medicaid", "name": "Medicaid", "category": ["medical"]},
            "insurance_provider": {"uid": "medicaid", "name": "Medicaid"}
        }, {
            "insurance_plan": {
                "uid": "aetna-aetnamdbronzesilverandgoldhmo",
                "name": "MD Bronze Silver  Gold - HMO",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "aetna", "name": "Aetna"}
        }, {
            "insurance_plan": {"uid": "healthnet-bluegoldhmo", "name": "Blue  Gold - HMO", "category": ["medical"]},
            "insurance_provider": {"uid": "healthnet", "name": "HealthNet"}
        }, {
            "insurance_plan": {
                "uid": "healthnet-hmoexcelcaresilvernetwork",
                "name": "HMO - ExcelCare  Silver Network",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "healthnet", "name": "HealthNet"}
        }, {
            "insurance_plan": {
                "uid": "healthnet-hmoexcelcaresilvernetworkmedicarecob",
                "name": "HMO - ExcelCare  Silver Network Medicare COB",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "healthnet", "name": "HealthNet"}
        }, {
            "insurance_plan": {
                "uid": "anthembluecrossblueshield-golddirectaccesspluswhsa",
                "name": "Gold DirectAccess Plus with HSA",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "anthem", "name": "Anthem"}
        }, {
            "insurance_plan": {
                "uid": "anthembluecrossblueshield-bronzedirectaccessplusgjqa",
                "name": "Bronze DirectAccess Plus - gjqa",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "anthem", "name": "Anthem"}
        }, {
            "insurance_plan": {
                "uid": "healthnet-healthnetcabluegoldhmo",
                "name": "Health Net CA Blue  Gold HMO",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "healthnet", "name": "Health Net"}
        }, {
            "insurance_plan": {
                "uid": "kaiserpermanente-kaiserpermanente",
                "name": "Kaiser Permanente",
                "category": ["medical"]
            }, "insurance_provider": {"uid": "kaiserpermanente", "name": "Kaiser Permanente"}
        }],
        "specialties": [{
            "uid": "internist",
            "name": "Internal Medicine",
            "description": "Specializes in common illnesses and complex medical problems.",
            "category": "medical",
            "actor": "Internist",
            "actors": "Internists"
        }, {
            "uid": "hospitalist",
            "name": "Hospitalist",
            "description": "Specializes in general medical care of hospitalized patients.",
            "category": "medical",
            "actor": "Hospitalist",
            "actors": "Hospitalists"
        }],
        "licenses": [{"state": "CA"}, {"number": "A78823", "state": "CA"}],
        "uid": "0935b391e6759516a4ab6a8816f7cb65",
        "npi": "1821162132"
    }];



function callback(err, result)   {
    //console.log(err);
    //console.log(result);
}

function createUserCollection(users)  {

    function createUsers(arrayName) {

        for (a in arrayName)  {
            //user.practices=arrayName[a].practices,

            //user.educations=arrayName[a].educations,

            //user.profile=arrayName[a].profile,

            //user.ratings=arrayName[a].ratings,

            //user.specialties=arrayName[a].specialties,

            //user.licenses=arrayName[a].licenses,

            //user.uid=arrayName[a].uid,
            //user.npi=arrayName[a].npi,

            //user.isAdmin=arrayName[a].isAdmin

            User.create(arrayName[a], callback)
        }
        //User.insertMany(arrayName);
        console.log("Users Created!");
    }
    createUsers(users);
}



/*function findAll() {
    var User = mongoose.model("profile", userSchema);
    User.find(function (err, results) {
        console.log(results);
    });
}*/

//
createUserCollection(users);
//createWebsiteCollection(websites);
//findAll();
function findUser() {
    User.find({"username" : "jannunzi"})
        .then(function (result) {
            console.log('Hi');
            var u = result;
            console.log(u);
            //var l = result[0].languages[0].code;
            console.log("hello");
            console.log(l);
    });}

findUser();
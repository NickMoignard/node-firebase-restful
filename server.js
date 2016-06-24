/*
	Structure of Document
		Setup
		Config	
		BASE routes
			middleware
			routes
		API routes
			middleware
			routes
	
	Integrating Firebase into web app
*/

// BASE SETUP ================================================================
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	firebase = require("firebase");

var port = process.env.PORT || 6969; 


// firebase setup
firebase.initializeApp({
	databaseURL: "https://nodeandfirebasetest.firebaseio.com/",
	serviceAccount: "service_account.json"
});
var db = firebase.database();
var usersRef = db.ref("users");


// CONFIGURE APP

// body parser, to grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// configure app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});


// BASE APP ==================================================================
// MIDDLEWARE 
app.use(morgan('dev'));  // log all requests to the console

// BASE ROUTES 
app.get('/', function(req, res) {
	res.send('welcome to the home page!');
});



// API =======================================================================
var apiRouter = express.Router();  // get an express router

// API MIDDLEWARE ============================================================
apiRouter.use(function(req, res, next) {
	console.log("someone just came to the app");
	// this is where we authenticate users
	next();
});

// API Routes =================================================================
apiRouter.get('/', function(req, res) {
	res.json({ message: 'woah check out this json'});
});

apiRouter.route('/users')
	//create a user
	.post(function(req, res) {
		// Firebase
		var user = {};
		user.firstName = req.body.fname;
		user.lastName =req.body.lname;
		user.nickName = req.body.nname;
		usersRef.push({
			first_name: req.body.fname,
			last_name: req.body.lname,
			nick_name: req.body.nname
		}, function(err) {
			if (err) {
				res.send(err)
			} else {
				res.json({ message: "Success: User created."})
			}
		});

	})
	.get(function(req, res) {
		// Firebase get all users
		usersRef.once("value", function(snapshot, prevChildKey) {
			res.json(snapshot.val());
		})
	});

// Single User Routes
apiRouter.route('/users/:uid')

	.get(function(req, res) {
		// Firebase GET user info
		var uid = req.params.uid;
			// in firebase there is no way to access a single object
			// Use startAt(uid) then endAt(uid + a really high point value unicode character)
			// then ensure uid is 20 characters long other wise lots of children will be returned
			if (uid.length != 20) {
				res.json({message: "Error: uid must be 20 characters long."});
			} else {
				usersRef.child(uid).once("value", function(snapshot) {
					if (snapshot.val() == null) {
						res.json({message: "Error: No user found with that uid"});
					} else {
						res.json(snapshot.val());
					}
				});
			}
		})
	.put(function(req, res) {
		// Firebase Update user info


		var uid = req.params.uid,
			user = {};

		// update only parameters sent in request
		if (req.body.fname) user.first_name = req.body.fname;
		if (req.body.lname) user.last_name = req.body.lname;
		if (req.body.nname) user.nick_name = req.body.nname;

		usersRef.child(uid).update(user, function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: "Success: User information correctly updated."})
			}
		});

	})
	.delete(function(req, res) {
		// Firebase DELETE user
		var uid = req.params.uid;

		usersRef.child(uid).remove(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: "Success: User deleted."});
			}
		})
	});

// Register our routes - all routes prefixed with /api
app.use('/api', apiRouter);


//START THE SERVER ===========================================================
app.listen(port);
console.log('port: '+ port);





















Building a RESTful API with Node.js the Express router and firebase

	should handle CRUD requests for an item
	have a standard url
	use proper HTTP verbs
	return JSON data
	log all requests to console with middleware

files:
	users.js, a users schema for use with the database
	server.js, everythings going on in here
	package.json. dependancies, app info etc etc

	firebase stuff:
		service_account.json, google account stuff
		firebase.json, firebase configuration
		database.rules.json, read/write conditions etc etc

API LIVE AT HTTP://www.moignard.xyz:6969/api

use x-www-formurlencoded parameters.

Methods
	'/users':
		.GET: Returns all users
		.POST: Create a user
			parameters:
				fname: string
				lname: string
				nname: string
	'/users/:unique identifier'
		.GET: Return a user
		.PUT: Update a users information
			parameters:
				fname: string
				lname: string
				nname: string
		.DELETE: Delete a user


	


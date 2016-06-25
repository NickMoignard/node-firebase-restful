I wanted to build a RESTful API with Node.js the Express router and firebase so i built the following

it is a simple RESTful api, which stores and returns users names and nick names

files:

	server.js, everythings going on in here

	firebase stuff:
		service_account.json, google account stuff


API LIVE AT http://104.155.196.152:6969/api

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


	


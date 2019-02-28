### Introduction

The backend is a RESTful API that will help the artist to persist data relevant to his work and potencial clients. It includes the use of different technologies to properly handle Authentication, Authorization and Data Management. The frontend can perform all kind of CRUD operations over different resources. The database used for storing this resources is Postgres.SQL, it has different tables related to each others by foreign keys. All responses are sent back in JSON format.

## STACK

Node.js
Express.js
bcryptjs
CORS
dotenv
helmet
jsonwebtoken
knex
sqlite3
postgres
cross-env
jest
supertest

##Endpoints

<code>'/register'</code> -It expects a POST request with the user's personal data. It uses bcryptjs to hash the password before storing it to the db. On successful action, it will return status 201 and generate a JWT and it will send it back to the frontend, also saves the users in the db. Required fields are 'Firstname', 'Lastname','email', 'password', 'username', 'avatar'. This endpoint is protected by a middleware that validates the email fiedl, and the password that needs to be at least 8 characters long, must contain at least 1 lowercase, 1 upercase, 1 number, and 1 special character. If any of the fields is missing it will return status 400 and won't save any data.

<code>'/login'</code> -It expects a POST request with the user's personal data. It uses bcryptjs to hash and compare the password with the one saved in the db. On successful action, it will return a status 200, generate a JWT and send it back to the frontend. Required fields are 'username', 'password', if any of this fields is missing it will return status 400, if any of the field is not correct, it will return status 401.

<code>'/edit:id'</code> -It expects a PUT request with the user's personal data. It will take the id from the params object and check if there is any user matching that id in the db. On successful it will return 1, if there is no user matching that id it will return a status 404. This endpoint is protected by a middleware that validates the email fiedl, and the password that needs to be at least 8 characters long, must contain at least 1 lowercase, 1 upercase, 1 number, and 1 special character.

<code>'/posts'</code> -For this resource the App is using Express Router. It expects a GET and a POST requests. When a GET requests is performed it returns an array with all the posts stored in the db and status 200. If there is no post it'll return status 404. When a post is performed it'll take the post info from the request body and insert it in the db. It will return status 201 and the id of the newly created post. For the POST request this endpoint is protected by a middleware that checks if the user is logged in and other endpoint that checks if the user is admin or not, only admin users will have permissions to modify this data in any way.

<code>'/posts/:id'</code> -This endpoint is expecting GET, PUT, and DELETE HTTP requests. When GET request is performed it will return status 200 and the post with the id specified in the params object, the post object returned will include an array with all comments belonging to that post. When a PUT request is performed it will update the post that matches the id in the params object with the new data provided in the body of the request, it will return status 200 and 1 on successful, if there is no post matching that ID it will return status 404. When a DELETE request is performed it'll find the post matching the id in the params object and will remove it from the db, on sucessful it will return status 201 and 1, if there is no post with the specified id it will return status 404. PUT and DELETE are protected by a middleware that checks if the user is logged in and other that checks if the user is admin or not.

<code>'/comments'</code> -For this resource the App is using Express Router. It expects a GET and a POST requests. When a GET request is performed it will return status 200 and an array with all comments stored in the db, if there is no comment yet it will return status 404. When a POST request is performed it will take the comment's info from the body of the request and insert the new comment into the db. Required fields are 'user_id', 'content', 'post_id', other fields are 'avatar' and 'username'. If any of the required fields are missing it will return status 400. On successful it will return status 201 and the id of the newly inserted comment. The POST endpoint is protected by a middleware that checks if the user is logged in or not.

<code>'/comments/:id'</code> -This endpoint is expecting GET, PUT, and DELETE HTTP requests. When GET request is performed it will return status 200 and the comment with the id specified in the params object, if there is no comment matching the specified id it will return status 404. When a PUT request is performed it will update the comment that matches the id in the params object with the new data provided in the body of the request, it will return status 200 and 1 on successful, if there is no comment matching that ID it will return status 404. When a DELETE request is performed it'll find the comment matching the id in the params object and will remove it from the db, on sucessful it will return status 201 and 1, if there is no comment with the specified id it will return status 404. PUT and DELETE are protected by a middleware that checks if the user is logged in or not.

<code>'/messages'</code> -For this resource the App is using Express Router. It expects a GET and a POST requests. This resource is solely connected to the landing page. When a GET request is performed it returns status 200 and an array with all messages stored in the db, if there is no message yet, it will return status 404. When a POST request is performed it will take the message's info from the body of the request and insert the new message in the db, it will return status 201 and the id of the newly created message.

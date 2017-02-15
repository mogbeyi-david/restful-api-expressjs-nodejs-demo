**Simple Node JS application**

To start the application run

````
npm install
npm start

````

**Description**

This is a simple application.
The application is uses json web token to authenticate users after login.

To test the application download the postman collection import to postman then 
run the application and test

**API Documentation**

Base url : http://localhost:3000
````
Company
--------------------------
GET /company/
Params : size, team
e.g.
http://127.0.0.1:3000/v1/company/?sort_by=team&size=1
--------------------------
POST /company/
Params: name, description, year_founded, contact_name,
contact_email, num_employees
Headers : x-access-token
--------------------------
PUT /company/
Params:
Headers : x-access-token
--------------------------
DELETE /company/
params: company_id
Headers : x-access-token
````

Users

````
Users
-------------------------

GET /users/
Params: size

-------------------------

POST /users/
Params: first_name, last_name, email, password

-------------------------

````
**Test**

To run the tests 
`npm test`
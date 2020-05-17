# Online Learning platform

Swif Learn Assignment

The goal is to create a web app through which a student can login and request for the classes available to him. The same should be accepted by the admin in order for a student to see the class.

Technologies Used :
MERN Stack, Mongoose, Bcrypt, Passport, JWT Tokens, Redux

Flow of Application Creation:

Backend:
I have considered the the classes available for all the users are same,
Created 2 routes, RequestClass, AcceptClass => Which is used to manipulate DB and give the result to end user
As for DB I have used Mongoose.
Used Bcrypt for password hashing.
JWT tokens to authenticate users.
Validations for Login and Registration of Users.

Frontend:
Completely built on react.
Used redux for unidirectional dataflow.
Used Materialize CSS for styling

API Endpoints:

    @route- Register (Post) => User Registration
    @route- Login (Post) => User Login
    @route- RequestClass (Post) => Route where a user can request for a particular class in his list of available classes.
    @route- AcceptClass (Post) => Route where admin accepts users Request.

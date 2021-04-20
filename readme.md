# Material Salon Website

- **Author:** Garrett Dunlap
- **Link to Live Site:** <https://materialtpagd.herokuapp.com/>


## Project Summary

This app is my first run at a Website for a Salon. It allows creation of a User Account in which to make, edit and cancel appointments specific to the user.

This is a basic building block of a site I would like to better for actual future use.

## Technology Used

- Javascript
- HTML
- CSS
- Express
- Mongoose
- [MongoDB](https://www.mongodb.com/)
- [Bulma CSS Framework](https://bulma.io/)
## Models

I used an embedded Appointments Schema inside a Client Authoriztion Schema.

Appointments Schema
- name: String
- date: String
- (Appointment) type: String

Client Schema
- username: String
- password: String
- first: String
- last: String
- color: String
- type: String
- apmts: (Embedded Appointments Schema)


## Route Map

| Method | Endpoint | Resource/View |
|--------|----------|---------------|
|GET| "/appointments" | Lists all created Appointments in Clients embedded schema (views/appointments.ejs) |
|GET| "/appointments/:id | Display single Appointments information (views/show.ejs)|
|GET| "/new | Render form for making a New Appointment (views/new.ejs)|
|POST| "/appointments" | Uses Form Submission to Create new Appointment |
|GET| "/appointments/:id/edit" | Render form to edit Appointments (views/edit.ejs)|
|PUT| "/appointments/:id" | Uses Form Submission to edit Appointment |
|DELETE| "/sample/:id" | Delete a particular Appointment |


## Auth Route Map

| Method | Endpoint | Resource/View |
|--------|----------|---------------|
|GET| "/auth/signup" | Renders Signup form (views/auth/signup.ejs) |
|POST| "/auth/signup" | Uses Form Submission to create new Client in MongoDB and Hash Password (views/auth/signup.ejs)|
|GET| "/auth/login" | Renders Login Form (views/auth/login.ejs)|
|POST| "/auth/login" | Uses Form Submission to Pass Authorized User Session |
|GET| "/auth/logout" | Uses Form Submission to change user session ID to null |


## Challenges

CSS has been more challenging than I expected. It is not currently responsive at all. Probably something I need to breakdown and rework from the beginning but I didn't have the time. Still having trouble working with a framework and my personal CSS at the same time.

## Existing Bugs

No existing bugs that I know of.
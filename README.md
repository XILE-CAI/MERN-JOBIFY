# Jobify

#### Track Your Job Search

Project in Action - [Jobify](https://www.jobify.live/)


#### Run The App Locally

```sh
npm run install-dependencies
```

- rename .env.temp to .env
- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME

```sh
npm start
```

- visit url http://localhost:3000/

#### Setup React APP

- create 'client' folder
- open terminal
- cd client
- npx create-react-app .
- npm start
- set editor/browser side by side
- copy/paste assets

#### Spring Cleaning

- in src remove
- APP.css
- APP.test.js
- logo.svg
- reportWebVitals.js
- setupTes.js
- fix App.js and index.js

#### Title and Favicon

- change title in index.html
- replace favicon.ico in public

#### Normalize.css and Global styles

- npm install normalize.css
- setup before index.css

#### Landing Page
- main html tag
- import logo.svg and main.svg
- import Landing in App.js

#### Styled Components
- npm install styled-components
- import styled 
- prefer to named 'Wrapper'
- in landing page replace main tag
- put all wrappers in /src/assets/wrappers

#### Logo and Images
- unDraw and Figma

#### Logo component
- create components folder
- create Logo.js
- export as default 
- create index.js in components
- import all components in index.js and export
- import needed component from /components/index.js

#### React Router
- npm install history@5 react-router-dom@6
- import {BrowserRouter, Routes, Route, Link} 
- set Link in landing page

#### Setup All Pages
- Error Page
- Register Page
- Dashboard page
- create index.js & import pages & export similar with components
- import pages in App.js
- finish pages setup in App

#### Setup Error page
- Link to home page

#### Setup Register page
- import UseState & UseEffect
- set initialState(name,email,password,isMember)
- Create FormRow Component for input row

#### FormRow component
- create FormRow.js in components
- setup import & export
- setup for name email password
- hint type name value

#### Alert Component
- create Alert.js in components
- alert-danger & alert-success
- eventually setup in global context
- showAlert in initialState(true&false)

#### toggle Member function
- control register & login
- use in register page

#### use Global Context
- in src create context directory
- action.js
- reducer.js setup all functions
- appContext.js setup all states

#### useReducer
- useReducer vs Redux
- reducer.js only one reducer function, state & action (depended on different action return differently)
- set actions.js for using reducer

#### Display Alert
- setup imports(reducer.js & appContext.js)
- remember Clear Alert

#### Setup Server
- npm init -y(create package.json)
- create server.js

#### ES6 VS CommonJS
- ES6: const express from 'express'(recommend)
- CommonJS: const express = require('express')

#### NodeMon and Basic Express Server
- npm install nodemon --save-dev
- "scripts": {"start": "nodemon server"}
- npm install express

#### Not Found Middleware
- in the root create <b>middleware<b> folder
- not-found.js
- setup function
- return 404 with message 'Route does not exist'
- import in server.js
- make sure import .js extension
- place after home route 

#### Error Middleware
- similar with not found middleware

#### ENV Variable
- npm install dotenv
- import dotenv from 'dotenv'
- dotenv.config()
- create .env in root
- create .gitignore in root  /node_modules .env

#### Connect to MongoDB
- npm install mongoose
- create db folder
- create connect.js
- setup connectDB(url)
- in server.js create start() function
- get connection string
- setup as MONGO_URL in .env
- provide credentials and DB name

#### Auth Controller and Route Structure
- create controllers folder
- authController.js
- create functions
- export {register, login, updateUser}
- create routes folder
- authRoutes.js
- setup express router
- export default router
- import authRouter in server.js 

#### Jobs Controller and Route Structure
- similar to authController

#### User Model
- models folder
- User.js
- setup schema
- name, email, password, lastName, location
- all {type:string}
- export default mongoose.model('User', UserSchema)

#### validate email in User model
- npm install validator
- import validator from 'validator'

#### register user

#### Express-Async-Express-Errors Package

#### Http Status Codes
- npm install http-status-codes

#### Hash Password
- npm install bcryptjs

#### JWT 
- npm install jsonwebtoken

#### Concurrently
- front-end and backend(server)
- npm install concurrently --save-dev

#### proxy
#### add user to local storage

#### install morgan

#### UnauthenticatedError

#### Nested Pages in React Router6

#### Dashboard pages

#### Shared Layout

#### Protected Route

#### Navbar , Sidebar

#### Navbar Setup

#### Logout function

#### Small & Big Sidebar

#### NavLinks Component

##### UpdatedUser and All jobs are restricted

#### Add Job page

#### FormRawSelect

#### moment format setup

#### edit and delete job function

#### Mockaroo generate Mock data

##### Populate Databas 

##### Show Stats pages
- aggregation pipeline
- show stats object setup
- Show stats front end setup
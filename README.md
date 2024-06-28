<h1 align="center">Blogging System</h1>

<h4>Description</h4>
<p>This project is a blogging system developed using TypeScript, Express, and Mongoose. It features user authentication, blog creation, and comment posting functionalities.</p>

<h4>Table of Content</h4>
<ol>
  <li>Installation</li>
  <li>Usage</li>
  <li>API Documentation</li>
</ol>

<!-- Installation -->
<h4>Installation</h4>
<h4>Prerequisites</h4>
<ul>
  <li>Node.js</li>
  <li>MongoDB</li>
</ul>

<h4>Steps</h4>
<ol>
  <li>Clone the repository</li>
  <p>git clone https://github.com/Darkeh1807/IBlog.git</p>
  <p>cd IBlog</p>

   <li>Install Dependencies</li>
   <p>npm install</p>
   
   <li>Create a '.env' file in the root directory and add the following</li>
   <p>PORT = PORT NUMBER</p>
   <p>MONGOURL = your_mongodb_connection_string</p>
   <p>JWTSECRET = your_jwt_secret </p>

   <li>Build the project</li>
   <p>npm run build</p>

   <li>Start server </li>
   <p>npm run start </p>
</ol>

<h4>Usage</h4>
<h6>Running in development mode</h6>
<p>npm run dev</p>

<h6>Building the project</h6>
<p>npm run build</p>

<h6>Starting the server</h6>
<p>npm start</p>

<h4>API Documentation</h4>

<!-- User Routes -->
<h6>User Routes</h6>

<h6>Register a User</h6>
<ul>
  <li>URL: '/api/users/register'</li>
  <li>Method: 'POST'</li>
  <li>Request Body</li>
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword",
  "role": "ADMIN"
}<br><br>
<p>NB: If no role is specified, Defaults to 'USER'</p>
</ul>

<h6>Log in a User</h6>
<ul>
  <li>URL: '/api/users/login'</li>
  <li>Method: 'POST'</li>
  <li>Request Body</li>
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}<br>
</ul>

<h6>Blog Routes</h6>
<h6>Create Blog(Admin)</h6>
<ul>
  <li>URL: '/api/users/blog'</li>
  <li>Method: 'POST'</li>
  <li>Request Body</li>
{
  "title": "Example blog title",
  "description": "Example blog content ",
  "createdBy": "admin ID",
}
</ul>





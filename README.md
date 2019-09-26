# Expat Journal - Back End

This repository contains the source code for the Back End API developed for the **Expat Journal** project.

## API DOCUMENTATION

#### Base URL

[https://be-expat-journal.herokuapp.com/](https://be-expat-journal.herokuapp.com/)

### Endpoints

### Auth (implemented):

<details>
<summary>Login</summary>

- POST Request - `/api/auth/login`
  - username & password required for login
  - sends back success message, user object and auth token

Expects a JSON object from client:

```
{
  "username": "super_user123"
  "password": "super_password48"
}
```

Successful login should return:

```
{
  "message": "Login was successful",
  "user": {
    "id": 25
    "fname": "Example",
    "lname": "User",
    "username": "super_user123"
  }
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNSIsInVzZXJuYW1lIjoic3VwZXJfdXNlcjEyMyJ9.l7W76ELVDr0Y0QrU086wrpj8aT0j6XMcA6-uXKX8fBE"
}
```

</details>
<br>
<details>
<summary>Register</summary>

- POST Request - `/api/auth/register`
  - requires `fname`, `lname`, `email`, `username`, `password`
  - sends back sucess message, user object and auth token

Expects a JSON object from client:

```
{
  "fname": "Example",
  "lname": "User",
  "email": "user@example.com",
  "username": "super_user123"
  "password": "super_password48"
}
```

Successful registration should return a JSON object w/ web token:

```
{
  "message": "Registration was successful",
  "user": {
    "id": 25
    "fname": "Example",
    "lname": "User",
    "username": "super_user123"
  }
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNSIsInVzZXJuYW1lIjoic3VwZXJfdXNlcjEyMyJ9.l7W76ELVDr0Y0QrU086wrpj8aT0j6XMcA6-uXKX8fBE"
}
```

</details>

### Users (protected endpoints):

**All user endpoints require a valid token**

Where `/:id` would be a user's id

<details>
<summary>Get List of Users</summary>

- GET Request - `/api/users`
  - requires a valid webtoken

Successful request should return a list of users:

```
[
  {
    "id": 1,
    "fname": "Asa",
    "lname": "Beahan",
    "username": "Gavin.Feil22"
  },
  {
    "id": 2,
    "fname": "Queen",
    "lname": "Hettinger",
    "username": "Dakota42"
  },
  {
    "id": 3,
    "fname": "Rubie",
    "lname": "Schuppe",
    "username": "Deshaun_Corkery"
  }
]
```

</details>
<br>
<details>
<summary>Get User by ID</summary>

- GET Request - `/api/users/:id`
  - requires a valid webtoken

Successful request should return a single user:

```
{
  "id": 2,
  "fname": "Queen",
  "lname": "Hettinger",
  "username": "Dakota42"
}
```

</details>
<br>
<details>
<summary>Get List of User's Posts</summary>

- GET Request - `/api/users/:id/posts`
  - requires a valid webtoken

Successful request should return a list of user's posts:

```
[
  {
    "fname": "Asa",
    "username": "Gavin.Feil22",
    "user_id": 1,
    "title": "facere nobis dicta",
    "city": "West Priscilla",
    "country": "Austria",
    "content": "Nulla deserunt qui et voluptatibus cupiditate omnis velit. Soluta necessitatibus numquam perspiciatis maxime reiciendis molestias atque eius. Est aliquid repudiandae. Laudantium est sit architecto sit laudantium vero impedit sunt. Est qui pariatur illo reiciendis dolorem quam amet est. Facere ad ut qui rerum.",
    "imageURL": "https://picsum.photos/id/1006/300/300",
    "created_at": "2019-09-25T02:45:28.875Z",
    "updated_at": "2019-09-25T02:45:28.875Z"
  },
  {
    "fname": "Asa",
    "username": "Gavin.Feil22",
    "user_id": 1,
    "title": "est voluptas et",
    "city": "Dachmouth",
    "country": "Rwanda",
    "content": "Rerum ut est illo. Qui molestias et magnam sequi. Quisquam dolor modi eum quas a asperiores vel quos.",
    "imageURL": "https://picsum.photos/id/1011/300/300",
    "created_at": "2019-09-25T02:45:28.875Z",
    "updated_at": "2019-09-25T02:45:28.875Z"
  }
]
```

</details>
<br>
<details>
<summary>Update User</summary>

- PUT Request - `/api/users/:id`
  - requires a valid webtoken
  - a specific user can only update their own user info
  - requires a changes object containing the changes you wish to make

Example JSON User Object:

```
{
  "fname": "John",
  "lname": "Doe",
  "email": "jdoe@example.com"
  "username": "johndoe23"
}
```

Example Changes Object:

```
{
  "fname": "Jane",
  "username": "janedoe24"
}
```

Successful Update should return a JSON Object:

```
{
  "message": "User successfully updated",
  "user": {
    "id": 26,
    "fname": "Jane",
    "lname": "Doe",
    "username": "janedoe24"
  }
}
```

</details>
<br>
<details>
<summary>Delete User</summary>

- DELETE Request - `/api/users`
  - requires a valid webtoken
  - a specific user can only delete themselves

Successful Delete should return a JSON Object:

```
{
  "message": "User successfully deleted",
  "deleted": true
}
```

</details>

### Posts:

Where `/:id` would be a post id and `/:user_id` would be a user id

<details>
<summary>Get List of All Posts</summary>

- GET Request - `/api/posts/`

Successful GET request should return a list of all posts

```
[
  {
    "id": 1,
    "date": 1568383863360,
    "user_id": 4,
    "title": "repellat et odit",
    "city": "Hartmannland",
    "country": "Kuwait",
    "content": "Quis maxime ea debitis et adipisci et amet qui. Optio et quas cum. Rem et dolor maiores aut tempora esse rem voluptas.",
    "imageURL": "https://picsum.photos/id/0/300/300",
    "created_at": "2019-09-26 01:05:46",
    "updated_at": "2019-09-26 01:05:46"
  },
  {
    "id": 2,
    "date": 1556530555012,
    "user_id": 6,
    "title": "et voluptas aut",
    "city": "West Muhammad",
    "country": "Saint Martin",
    "content": "Rerum laboriosam voluptatum inventore ut in autem aut. Esse similique voluptatum blanditiis sit nihil excepturi rerum reiciendis. Vel commodi ab unde ratione eligendi deleniti. Est excepturi nihil doloremque in numquam vel ut nulla. Fugit aut repellat.",
    "imageURL": "https://picsum.photos/id/1/300/300",
    "created_at": "2019-09-26 01:05:46",
    "updated_at": "2019-09-26 01:05:46"
  },
  {
    "id": 3,
    "date": 1551697867833,
    "user_id": 18,
    "title": "repellat et non",
    "city": "South Keelyfurt",
    "country": "Lesotho",
    "content": "Unde doloremque impedit voluptatem quisquam dicta. Est quia corrupti delectus quidem magni aspernatur. Nobis deleniti aut voluptatibus non modi nam.",
    "imageURL": "https://picsum.photos/id/10/300/300",
    "created_at": "2019-09-26 01:05:46",
    "updated_at": "2019-09-26 01:05:46"
  }
]
```

</details>
<br>
<details>
<summary>Get a post by id</summary>

- GET Request - `/api/posts/:id`
  - requires a post id passed into the endpoint url

Successful GET request should return a single post

```
// example response from valid GET request to '/api/posts/45'
{
  "id": 45,
  "date": 1550449805777,
  "user_id": 11,
  "title": "illo explicabo voluptatem",
  "city": "New Penelopemouth",
  "country": "Mayotte",
  "content": "Aut omnis asperiores hic quae illum laborum quia dignissimos quaerat. Omnis quia eligendi. Iure porro consequuntur illo omnis at ut illum. Voluptas dolores ut saepe maxime porro atque doloremque. Id velit non error.",
  "imageURL": "https://picsum.photos/id/1040/300/300",
  "created_at": "2019-09-26 01:05:46",
  "updated_at": "2019-09-26 01:05:46"
}
```

</details>
<br>
<details>
<summary>Create a post (protected)</summary>

- PUT Request - `/api/posts/`
  - requires valid web token
  - id stored in token must match the user_id from the sent post object
  - following fields are required: `user_id`, `title`, `content`

Example post object sent to api endpoint

```
{
	"title": "Test Post",
	"date": null,
	"city": "Avon",
	"country": "United States",
	"content": "Test Content",
	"imageURL": "http://picture.com",
	"user_id": 26
}
```

Successful POST request should return a JSON object with a success "message" and "post" that contains the newly created post

```
{
  "message": "Post successfully created",
  "post": {
    "id": 55,
    "date": null,
    "user_id": 26,
    "title": "Test Post",
    "city": "Avon",
    "country": "United States",
    "content": "Test Content",
    "imageURL": "http://picture.com",
    "created_at": "2019-09-26 01:20:50",
    "updated_at": "2019-09-26 01:20:50"
  }
}
```

</details>
<br>
<details>
<summary>Update a user's post (protected)</summary>

- PUT Request - `/api/posts/:id`
  - requires a valid webtoken
  - requires a `user_id` in the changes object for validation purposes
  - id stored in token must match the user_id from the sent post changes object
  - requires a changes object containing the changes you wish to make

Example post object to be changed

```
{
  "id": 55,
  "date": null,
  "user_id": 26,
  "title": "Test Post",
  "city": "Avon",
  "country": "United States",
  "content": "Test Content",
  "imageURL": "http://picture.com",
  "created_at": "2019-09-26 01:20:50",
  "updated_at": "2019-09-26 01:20:50"
}
```

Example Changes Object:

```
{
	"title": "Updated Test Post",
	"date": null,
	"city": "Plainfield",
	"country": "United States",
	"content": "Updated Test Content",
	"user_id": 26
}
```

Successful PUT request should return a JSON object with a success "message" and "post" that contains the newly updated post

```
// example response from valid PUT request to '/api/posts/55'
{
  "message": "Post successfully updated",
  "post": {
    "id": 55,
    "date": null,
    "user_id": 26,
    "title": "Updated Test Post",
    "city": "Plainfield",
    "country": "United States",
    "content": "Updated Test Content",
    "imageURL": "http://picture.com",
    "created_at": "2019-09-26 01:20:50",
    "updated_at": "2019-09-26 01:20:50"
  }
}
```

</details>
<br>
<details>
<summary>Remove a user's post (protected)</summary>

- DELETE Request - `/api/posts/:id/user/:user_id`
  - requires a valid webtoken
  - requires a post `id` and `user_id` in the endpoint url
  - id stored in token must match the user_id from the url parameter

Successful DELETE request should return a JSON object

```
// example response from valid DELETE request to '/api/posts/55/user/26'
{
  "message": "Post was successfully deleted",
  "deleted": true
}
```

</details>

---

**What is Expat Journal?**
**Expat Journal** is a targeted CRUD application that allows **expatriates** a platform from which they can share their adventures around the globe.

[Expat Journal Front End](https://github.com/Build-Week-Expat-Journal-Sept-19/Front-End)
<br />
[Expat Journal Back End](https://github.com/Build-Week-Expat-Journal-Sept-19/Back-End)

## Tech/framework used

<b>Back End Built with</b>

- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [Knex](http://knexjs.org/)
- [SQLite (development db)](https://www.sqlite.org/index.html)
- [PostgreSQL (production & testing db)](https://www.postgresql.org/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [jsonwebtokens](https://github.com/auth0/node-jsonwebtoken#readme)

## Installation

To run the API locally

```
git clone [repo]
cd [repo]
npm install
knex migrate:latest
knex seed:run
npm run server
```

# Testing

To run test suites you will need a local implementation of PostgreSQL on your machine, create a testing database, and connect to it within the testing environment configuration inside of knexfile.js.

```
// follow the instructions above to install the project

// setup testing database
knex migrate:latest --env testing

// run the test suites
npm run test
```

## Credits

### Team

GitHub Organization - [Expat Journal Project](https://github.com/Build-Week-Expat-Journal-Sept-19)

#### Marketing Page Team

- [**Natacha David**](https://github.com/natacha96510) - UI Developer
  - [Natacha's Marketing Repo](https://github.com/Build-Week-Expat-Journal-Sept-19/Marketing-Page-Natacha)
- [**Timothy Grey**](https://github.com/timrcoder) - UI Developer
  - [Tim's Marketing Repo](https://github.com/Build-Week-Expat-Journal-Sept-19/Marketing-Page-Tim)

#### Front End Team

[Front End Repo](https://github.com/Build-Week-Expat-Journal-Sept-19/Front-End)
[Front End Deployment](https://expat-journal-build-week.netlify.com/)

- [**Stephen Tanksley**](https://github.com/StephenTanksley) - Front End Architect
- [**Tim Mitzen**](https://github.com/TimMitzen) - Front End Architect

#### Back End Team

- [**Tyler Turnipseed**](https://github.com/techturnip) - Back End Architect
- [**Sir Williams**](https://github.com/Sir-Williams) - Back End Architect

---

## License

#### [MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2019 Expat Journal Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

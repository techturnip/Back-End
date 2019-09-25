# Expat Journal - Back End

This repository contains the source code for the Back End API developed for the **Expat Journal** project.

## API DOCUMENTATION

#### Base URL

[https://be-expat-journal.herokuapp.com/](https://be-expat-journal.herokuapp.com/)

#### Endpoints

#### Auth (implemented):

**Login:**

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

**Register:**

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

#### Users (protected endpoints):

**All user endpoints require a valid token**

Where `/:id` would be a user's id

**Get List of Users:**

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

**Get User by ID:**

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

**Get List of User's Posts**

- GET Request - `/api/users/:id/post`
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

**Update User:**

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

**Delete User:**

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

**Posts (not implemented yet):**

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
- [PostgreSQL (production db)](https://www.postgresql.org/)
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

## Credits

### Team

Organization - [Expat Journal Project](https://github.com/Build-Week-Expat-Journal-Sept-19)

#### Front End Team

#### Back End Team

- [**Tyler Turnipseed** - Back End Architect](https://github.com/techturnip)
- [**Sir Williams** - Back End Architect](https://github.com/Sir-Williams)

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

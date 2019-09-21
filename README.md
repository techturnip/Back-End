# Expat Journal - Back End

This repository contains the source code for the Back End API developed for the **Expat Journal** project.

## API DOCUMENTATION

#### Base URL

[https://be-expat-journal.herokuapp.com/](https://be-expat-journal.herokuapp.com/)

#### Endpoints

**Auth (implemented):**

- POST Request - `/api/auth/login`
  -- username & password required for login
  -- sends back success message, user object and auth token
- POST Request - `/api/auth/register`
  -- requires username, password, fname, lname, email
  -- sends back sucess message, user object and auth token

**Users (not implemented yet):**

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
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [jsonwebtokens](https://github.com/auth0/node-jsonwebtoken#readme)

## Installation

To run the API locally

```
git clone [repo]
cd [repo]
yarn
yarn server
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

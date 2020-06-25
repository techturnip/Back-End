// IMPORTS/INITIALIZATION =========================|
// ================================================|
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
// bring in routers -------------------------------|
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/user-router.js');
const postsRouter = require('../posts/post-router.js');
// setup for epsagon tracing ----------------------|
// create express server --------------------------|
const server = express();
// ------------------------------------------------|
// GLOBAL MIDDLEWARES =============================|
// ================================================|
server.use(helmet());
server.use(express.json());
server.use(cors());
// ------------------------------------------------|
// SETUP ROUTES ===================================|
// ================================================|
server.use('/api/auth/', authRouter);
server.use('/api/users/', usersRouter);
server.use('/api/posts/', postsRouter);
// ------------------------------------------------|
// ROOT ENDPOINT ==================================|
// ================================================|
server.get('/', (req, res) => {
  res.status(200).json({ api: 'is running' });
});
// ------------------------------------------------|
// EXPORT =========================================|
// ================================================|
module.exports = server;

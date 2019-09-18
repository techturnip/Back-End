// IMPORTS/INITIALIZATION =========================|
// ================================================|
// bring in server --------------------------------|
const server = require('./api/server.js')
// define port ------------------------------------|
const PORT = process.env.PORT || 5000
// call listen method -----------------------------|
server.listen(PORT, () => console.log(`\n** Running on port ${PORT} **\n`))
// ------------------------------------------------|

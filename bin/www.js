const app = require("../app");
const http = require("http");
const db = require("../db/db.js");

const PORT = 3000;
app.set("port", PORT);
app.set('id', 0);

const server = http.createServer(app).listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
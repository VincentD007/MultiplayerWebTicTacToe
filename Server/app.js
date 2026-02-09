const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const port = 8080;


app.get("/", (req, res) => {
    res.send("Hello World");
})


server.listen(port, "0.0.0.0", 511, () => {console.log(`Server Listening On Port ${port} ...`)});
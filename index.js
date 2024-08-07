
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        username: "apnacollege",
        content: "I love coding"
    },
    {
        username: "shrassha",
        content: "Hard work is importance to obtain achievement"
    },
    {
        username: "ragul kumar",
        content: "I got selected in my first internship."
    },

];


app.get("/posts", (req, res) => {
    
    res.render("index.ejs", { posts });

});
app.listen(port, () => {
    console.log("listening to port :8080");

});

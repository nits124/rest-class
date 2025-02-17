
const { log } = require("console"); 
//require("console") imports the console module from Node.js, which provides various methods for logging messages (e.g., console.log(), console.error(), etc.).
// const { log, error, warn } = require("console");
// log("This is a log.");
// error("This is an error.");....Logs error messages to the console 
// warn("This is a warning.");...Logs warning messages to the console.

const express = require("express");
const { redirect } = require("express/lib/response");
//express/lib/response refers to the internal response module of Express that contains all the built-in methods for handling HTTP responses, like send(), json(), status(), redirect(), and many others as res.redirect()
// Normally, you don’t need to directly access the internal files like express/lib/response. Instead, you use the res object passed to route handlers to interact with the response.

const app = express();
const port = 8080;
const path = require("path");//The path module in Node.js provides several methods that allow you to work with file paths in a cross-platform manner, 

// const path = require('path');
// const fullPath = path.join('users', 'john', 'documents', 'file.txt');
// console.log(fullPath); // Outputs: users/john/documents/file.txt (on Unix)

// const path = require('path');
// const dirName = path.dirname('/users/john/documents/file.txt');
// console.log(dirName); // Outputs: /users/john/documents

// const path = require('path');
// const parsedPath = path.parse('/users/john/documents/file.txt');
// console.log(parsedPath);
// Outputs:
// {
//   root: '/',
//   dir: '/users/john/documents',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

//path.join(__dirname, 'public') dynamically constructs the absolute path to the public directory, regardless of where your application is running.

const { v4: uuidv4 } = require("uuid");
//v4 function is being imported from the uuid module.
//UUID stands for Universally Unique Identifier. It is a 128-bit value that can be represented as a 32-character hexadecimal string, 
//uuid module is a popular library in JavaScript (and Node.js) that generates UUIDs.
//supports multiple versions of UUIDs, but v4 is the most commonly used version


const methodOverride = require("method-override");
//method-override is a middleware for Express.js that allows you to override the HTTP request method used by the client. Specifically, it lets you simulate HTTP methods like PUT and DELETE using POST requests, which is useful because many browsers and HTTP clients (like forms) only support GET and POST.
//npm install method-override

app.use(methodOverride('_method'));  // used to set up the method-override middleware in an Express.js application. Specifically, this tells your Express app to override HTTP request methods based on a special query parameter called _method.

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));//is part of an Express.js application setup and is used to configure the views directory for your application. Let me break this down for you:
// app.set("view engine", "ejs"); // Set the view engine to EJS
// app.set("views", "/path/to/views"); // Set the directory where views are located
//The path.join() method is part of the Node.js path module and is used to safely join multiple path segments into a single valid file path.
// __dirname: This is a Node.js variable that holds the absolute path of the directory where the currently executing JavaScript file resides.
// path.join(__dirname, "views"): This safely joins the current directory (__dirname) with the views folder to create an absolute path to the views directory.

app.use(express.static(path.join(__dirname, "public")));
//express.static is a built-in middleware in Express.js used to serve static files such as images, CSS files, JavaScript files, fonts, and other resources that don’t change dynamically.you're telling Express to look for these files in a specific directory and serve them directly to the client when they request them.
// The app.use() method in Express is used to mount middleware at a specific path (or root) in your app. When you pass express.static() into app.use(), you're telling Express to use this middleware to serve static files from the specified directory.
// This tells Express to serve all files in the public folder whenever a client makes a request for those files.
// Serving Static Files: When the user requests a static file like /images/logo.png, Express will automatically serve the logo.png file from the public/images directory without needing to define a route for it.


let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding"
    },
    {
        id: uuidv4(),
        username: "shrassha",
        content: "Hard work is importance to obtain achievement"
    },
    {
        id: uuidv4(),
        username: "ragul kumar",
        content: "I got selected in my first internship."
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id =uuidv4(); 
    posts.push({ id,username, content });
    res.redirect("/posts");
    // res.send("dks");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    //.find() method is used on arrays in JavaScript to search for the first element that meets a given condition.find() stops searching as soon as it finds the first match.

    post.content = newcontent;
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);//.filter() method to return a new array of all elements except the one that matches the given id. If the function returns false, the element is excluded from the new array.
    res.redirect("/posts");
});
app.listen(port, () => {
    console.log("listening to port :8080");
});

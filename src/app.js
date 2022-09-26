const express = require("express");
require("./db/conn");
const User = require("./db/models/usermessage")
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "../public")));
const partialPath = path.join(__dirname, "./templates/partials");
const template_path = path.join(__dirname, "./templates/views");
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(express.urlencoded({extended:false})); // to parse json data now our database have creating collection(folder or table)
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
  });
  app.get("/services", (req, res) => {
    res.render("services");
  });
 
app.post('/contact', async(req, res)=>{
  try {
    // res.send(req.body);
    const userData = new User(req.body); // to send the data in json
    await userData.save(); // to save the data into the database
    res.status(201).render('index'); // 201 code is the data is successfully created
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

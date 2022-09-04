
const express = require("express")
const https = require("https");

const app = express();
// array for holding list items
var items = [];

app.use(express.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
  // code to display the day of the week
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day, newListItem: items});
});

app.post("/", function(req, res){
  // targeting input from list.ejs
  var item = req.body.newItem;
  // adding item to array
  items.push(item);
  // redirect to root
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("server listening on port 3000")
})

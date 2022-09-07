
const express = require("express")
const https = require("https");

const app = express();
// array for holding list items
let items = [];
let workItems = [];

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  // code to display the day of the week
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
// renders the original list for a specific day
  res.render("list", {listTitle: day, newListItem: items});
});
// renders a seperate list at the /work directory
app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItem: workItems});
});
// renders an about page
app.get("/about", function(req,res){
  res.render("about");
});
// root post that allows for redirecting based off of buttons value
app.post("/", function(req, res){
  // targeting input from list.ejs
  let item = req.body.newItem;
  // checks to see which template we are using
  if (req.body.list === "Work List"){
    workItems.push(item)
    // redirect to work
    res.redirect("/work");
  }
  else {
    // adding item to array
    items.push(item);
    // redirect to root
    res.redirect("/");
  }


});

app.listen(3000, function(){
  console.log("server listening on port 3000")
})

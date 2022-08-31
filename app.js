const express = require("express")
const https = require("https");

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day});
});

app.post("/", function(req, res){
  var newTask = req.body.taskInput;
  console.log(newTask);
})
app.listen(3000, function(){
  console.log("server listening on port 3000")
})

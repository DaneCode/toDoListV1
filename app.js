const express = require("express")
const app = express()

app.set("view engine", "ejs");

app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  switch (currentDay) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
     day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
  default:
  console.log("Error: Current day is equal to: " + currentDay)
  };
  res.render("list", {kindOfDay: day});
});

app.listen(3000, function(){
  console.log("server listening on port 3000")
})

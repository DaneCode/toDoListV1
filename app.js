const express = require("express")
const https = require("https");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
// const date = require(__dirname + "/date.js")
const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

// environmental variable
PASSWORD = process.env.PASSWORD
URL = process.env.URL
PORT = process.env.PORT
// connect to Mongo database
mongoose.connect("mongodb+srv://admin-dane:"+PASSWORD+"@"+URL);

// database Schema
const itemsSchema = {
  name: String
};

// Mongoose Model
const Item = mongoose.model("Item", itemsSchema);

// Mongoose Starting Documents
const item1 = new Item({
  name: "Welcome to your todolist!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<-- hit this to delete an item."
});

// add basic documents to list
const defaultItems = [item1, item2, item3];

// Schema for custom lists
const listSchema = {
  name: String,
  items: [itemsSchema]
};

// custom list model
const List = mongoose.model("List", listSchema);

// function for capitalizing first letter in string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved")
        }
        res.redirect("/");
      });
    } else {}
    res.render("list", {
      listTitle: "Today",
      newListItem: foundItems
    });
  });
});
// renders a seperate list directory

app.get("/:customListName", (req, res) => {
  const customListName = capitalizeFirstLetter(req.params.customListName);
  List.findOne({name: customListName}, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        // create new listTitle
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // render existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItem: foundList.items
        });
      }
    }
  });

});

// renders an about page
app.get("/about", (req, res) => {
  res.render("about");
});

// root post that allows for redirecting based off of buttons value
app.post("/", (req, res) => {
  // targeting input from list.ejs
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }

});

// route that deletes list items
app.post("/delete", (req, res) => {
  const deleteItemId = req.body.deleteItem;
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(deleteItemId, (err) => {
      if (!err) {
        console.log("Successfully deleted Checked Item");
      };
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: deleteItemId}}}, (err, foundList) => {
      if (!err)
      res.redirect("/" + listName);
    })
  }

})

// Listening for connection
app.listen(PORT, () => {
  console.log("server listening on port 3000")
})

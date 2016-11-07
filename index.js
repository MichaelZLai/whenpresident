var express       = require("express");
var hbs           = require("express-handlebars");
var mongoose      = require("./db/connection").mongoose;
var Candidate     = mongoose.model("Candidate");
var parser        = require("body-parser")

var app           = express();

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));
app.use("/assets", express.static("public"));
//keeps the key value pairs
app.use(parser.urlencoded({extended:true}))

//Shows the welcome Screen
app.get("/", function(req, res){
  res.render("app-welcome");
});

//Shows all the candidates
app.get("/candidates", function(req, res){
  Candidate.find({}).then(candidates => {
    res.render("candidates-index",{
      candidates: candidates,
      // or
      // candidates
    })
  })

});

//Create new candidate
app.post("/candidates", function(req,res){
  //returns json
  // res.json(req.body)
  Candidate.create(req.body.candidate).then( candidate => {
    res.redirect("/candidates/" + candidate.name)
  })
});

//Shows the Candidate
app.get("/candidates/:name", function(req, res){
  //findOne will find just one, find will return everything with the criteria
  Candidate.findOne({name: req.params.name}).then( candidate => {
    res.render("candidates-show", {
      candidate: candidate,
      // or
      // candidate
    })
  })
});

//Updates the Candidate
app.post("/candidates/:name", function (req, res){
  //findOneAndUpdate requires 3 args: 1)To find 2)Captures the update 3)new: true if you want to return the modified doc than the original
  Candidate.findOneAndUpdate({name: req.params.name}, req.body.candidate, {new: true}).then (candidate => {
    res.redirect("/candidates/" + candidate.name)
  })
})

//Deletes the Candidate --HTML only handles GET and POST, not PUT, PATCH, DELETE
app.post("/candidates/:name/delete", function(req,res){
  Candidate.findOneAndRemove({name: req.params.name}).then( _ => {
    res.redirect("/candidates/")
  })
})

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});

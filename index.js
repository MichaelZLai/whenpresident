var express       = require("express");
var hbs           = require("express-handlebars");
var mongoose      = require("./db/connection").mongoose;
var Candidate     = mongoose.model("Candidate");

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

app.get("/", function(req, res){
  res.render("app-welcome");
});

app.get("/candidates", function(req, res){
  Candidate.find({}).then(candidates => {
    res.render("candidates-index",{
      candidates: candidates,
      // or
      // candidates
    })
  })

});

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

app.listen(app.get("port"), function(){
  console.log("It's aliiive!");
});

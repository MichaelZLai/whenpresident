//connects the variables defined in connection.js
var mongoose = require("./connection.js").mongoose
console.log(mongoose)
//requiring the seed data file
var seedData = require("./seeds.json")

//using this as a getter and copying it to this js file
var Candidate = mongoose.model("Candidate")

//DELETE everything in the DB -- "_" is the same as "()" -- collection is used instead of tables
Candidate.remove({}).then( _ => {
  Candidate.collection.insert(seedData)
  .then( _ => process.exit() )
}).catch( err => console.log(err) )

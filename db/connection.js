var mongoose = require("mongoose")

var CandidateSchema = mongoose.Schema({
  name: String,
  year: Number,
})

//defining our model
mongoose.model("Candidate", CandidateSchema)
//to enable promises in mongoose
mongoose.Promise = global.Promise
//connect to MongoDB in "whenpresident" db
mongoose.connect("mongodb://localhost/whenpresident")

//allows exporting of multiple variables (wrap in {})
module.exports = {
  mongoose: mongoose,
  }

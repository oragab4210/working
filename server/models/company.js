const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  description: String,
});

const Company = mongoose.model("company", CompanySchema);

module.exports = Company;

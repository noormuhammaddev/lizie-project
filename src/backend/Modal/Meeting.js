const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  selectedProperty: String,
  userData:{type: Object}
});

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;

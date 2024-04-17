import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  fullName:String,
  mobileNum:Number,
  emailId:String,
  address:String,
  officeAddress:String,
  birthDate:Date,
  spouseName:String,
  spouseNum:Number,
  spouseBirth:Date,
  anniversaryDate:Date,
  pic:String,
  picId:String,
  couplePic:String,
  couplePicId:String,
});

// const userDetails = mongoose.model('userDetails', userSchema);
const Members = mongoose.models.Members || mongoose.model('Members', memberSchema);

export default Members;

import mongoose from "mongoose";
const [ Schema ] = mongoose;

/** question model */
const questionModel = new Schema({
  question : { type : Array, default: []},
  answers: { type: Array, default: []},
  createdAt : { type: DataTransfer, default: Date.now}
});

export default mongoose.model('quesiton', questionModel);

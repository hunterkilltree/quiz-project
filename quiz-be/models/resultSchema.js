import mongoose from "mongoose";
const { Schema } = mongoose;

/** result model */
const resultModel = new Schema({
  username: { type : String },
  university: { type : String },
  result: { type : Array, default: []},
  attempts: { type : Number, default: 0},
  points: { type: Number, default: 0},
  achieved: { type : String, default: ''},
  time: { type : Number, default: 0},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now},
});

export default mongoose.model('result', resultModel);

import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import { questions, answers } from "../database/data.js";

/** QUESTIONS */
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

export async function insertQuestions(req, res) {
  Questions.insertMany({ questions: questions, answers })
    .then(function () {
      console.log("Successfully saved defult items to DB");
    })
    .catch(function (err) {
      console.log(err);
    });
}

export async function deleteQuestions(req, res) {
  res.json("questions api delete request");
}

/** RESULT */
export async function getResult(req, res) {
  res.json("result api get request");
}

export async function storeResult(req, res) {
  res.json("store api post request");
}

export async function deleteResult(req, res) {
  res.json("result api delete request");
}
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
  try {
    await Questions.insertMany({ questions: questions, answers }).then(function () {
      res.json({ msg: "Questions inserted"});
    })
  } catch (error) {
    res.json({ error });
  }
}

export async function deleteQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions deleted"});
  } catch (error) {
    res.json({ error });
  }
}

/** RESULT */
export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

export async function storeResult(req, res) {
  try {
    const {
      username,
      university,
      result,
      attempts,
      points,
      achieved,
      time,
      createdAt,
      updatedAt
    } = req.body;

    if (!username && !university && !result) throw new Error('Data not valid ...');

    Results.create({
      username,
      university,
      result,
      attempts,
      points,
      achieved,
      time,
      createdAt,
      updatedAt
    }).then(function () {
      res.json({ msg: "Result inserted"});
    })
  } catch (error) {
    res.json({ error });
  }
}

export async function deleteResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Results deleted"});
  } catch (error) {
    res.json({ error });
  }
}
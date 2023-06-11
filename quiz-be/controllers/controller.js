import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import { questions, answers } from "../database/data.js";

/** QUESTIONS */
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    if (q && q.length > 0) {
      const arrayQuestions = q[0]?.questions;
      res.json(arrayQuestions);
    } else {
      res.json("No questions");
    }
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

async function calculatePoint(answers, time) {
  let trueCount = 0;
  const q = await Questions.find();
  const arrayResult= q[0]?.answers;

  Object.keys(answers).forEach((questionId, index) => {
    const userAnswer = parseInt(answers[questionId], 10);
    const correctAnswer = arrayResult[index];

    if (userAnswer === correctAnswer) {
      trueCount++;
    }
  })
  return trueCount * time;
}

async function calculateRank(points, time, username) {
  const userCount = await Results.countDocuments({
    $or: [
      { points: { $gt: points } },
      {
        $and: [
          { points: { $eq: points } },
          {
            $or: [
              { time: { $lt: time } },
              {
                $and: [
                  { time: { $eq: time } },
                  { username: { $lt: username } }
                ]
              }
            ]
          }
        ]
      }
    ]
  });

  return userCount + 1;
}

export async function storeResult(req, res) {
  try {
    if (!req?.body?.username && !req?.body?.university && !req?.body?.answers) throw new Error('Data not valid ...');

    const points = await calculatePoint(req.body.answers, req.body.time);

    const data = {
      username: req?.body?.username,
      university: req?.body?.university,
      result: answers,
      attempts: 1,
      points: points,
      achieved: 'Good',
      time: req?.body?.time,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    Results.create(data).then( async function () {
      const rank = await calculateRank(data.points, data.time, data.username);
      res.json({ data, rank });
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
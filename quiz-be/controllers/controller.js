
/** QUESTIONS */
export async function getQuestions(req, res) {
  res.json("questions api get request");
}

export async function insertQuestions(req, res) {
  res.json("questions api post request");
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
import ContestModel from "../Models/ContestModel.js";

// function to create a contest
export async function createContest(req, res) {
  try {
    const body = req.body;
    const contest = await ContestModel.create(body);
    if (!body) {
      return res.status(400).send({ message: "Contest cannot be created" });
    }
    res.status(200).send({ message: "Contest Created", contest });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// function to get a contest
export async function getContest(req, res) {
  try {
    const { contestId } = req.params;
    const contest = await ContestModel.findById({ contestId });
    if (!contest) {
      return res.status(404).send({ message: "Contest not found" });
    }

    res.status(200).send({ message: "Contest retrieved", contest });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

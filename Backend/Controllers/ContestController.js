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
    const contest = await ContestModel.findById(contestId);
    if (!contest) {
      return res.status(404).send({ message: "Contest not found" });
    }

    res.status(200).send({ message: "Contest retrieved", contest });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// function to get all contests
export async function getContests(req, res) {
  try {
    const contests = await ContestModel.find();
    if (!contests) {
      return res.status(404).send({ message: "No contests found" });
    }

    res.status(200).send({ message: "Contests retrieved", contests });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// function to get all contests of a given sport
export async function getBySport(req, res) {
  try {
    const { sport } = req.params;
    const contests = await ContestModel.find({ contestSport: sport });

    if (!contests) {
      return res.status(404).send({ message: "No contests found" });
    }
    res.status(200).send({ message: "Contests retrieved", contests });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

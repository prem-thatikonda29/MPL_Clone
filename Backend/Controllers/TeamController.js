import TeamModel from "../Models/TeamModel.js";

// Function to create a new team
export async function createTeam(req, res) {
  try {
    const team = await TeamModel.create(req.body);
    if (!team) {
      return res.status(400).send({ message: "Team not created" });
    }
    return res.status(201).send({ message: "Team created", team });
  } catch (error) {
    console.log("Error in createTeam", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Function to get a team
export async function getTeam(req, res) {
  try {
    const { teamId } = req.params;
    const team = await TeamModel.findOne({
      _id: teamId,
    });
    if (!team) {
      return res.status(404).send({ message: "Team not found" });
    }
    return res.status(200).send({ message: "Team found", team });
  } catch (error) {
    console.log("Error in getTeam", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

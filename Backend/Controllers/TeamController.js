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

    // Find the team and populate player details
    const rawTeam = await TeamModel.findById(teamId);
    // console.log("Raw Team Data:", rawTeam);

    const team = await TeamModel.findById(teamId)
      .populate(
        "players.playerId",
        "playerName playerSport playerTeam playerType"
      )
      .lean();

    // console.log("Populated Team Data:", team);

    if (!team) {
      return res.status(404).send({ message: "Team not found" });
    }

    return res.status(200).send({
      message: "Team found",
      team,
    });
  } catch (error) {
    console.error("Error in getTeam", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

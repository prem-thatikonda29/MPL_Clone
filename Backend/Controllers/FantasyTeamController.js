import FantasyTeamModel from "../Models/FantasyTeamModel.js";

// function to create a team
export async function createFantasyTeam(req, res) {
  try {
    const fantasyTeam = await FantasyTeamModel.create(req.body);
    if (!fantasyTeam) {
      return res.status(400).send({ message: "Bad Request" });
    }
    return res.status(201).send({ message: "Team created", fantasyTeam });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

// function to get a team
export async function getFantasyTeam(req, res) {
  try {
    const { teamId } = req.params;
    const fantasyTeam = await FantasyTeamModel.findById(teamId);
    if (!fantasyTeam) {
      return res.status(404).send({ message: "Team not found" });
    }
    return res.status(200).send({ message: "Team found", fantasyTeam });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

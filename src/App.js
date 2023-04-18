import React from "react";
import data from "./data.json";

function App() {
  const [uiState, setUiState] = React.useState("Home");
  const [currentTeam, setCurrentTeam] = React.useState("");
  const [currentRank, setCurrentRank] = React.useState(0);
  const [currentScore, setCurrentScore] = React.useState(0);
  const [sortedTeamScore, setSortedTeamScore] = React.useState({});
  let teamPlayersUI = null;

  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const centerStyle = {
    textAlign: "center",
  };

  React.useEffect(() => {
    const teamScore = Object.keys(data.teams).reduce((acc, team) => {
      const teamTotalScore = data.teams[team].reduce(
        (acc, player) =>
          acc + data.players[player][0] + data.players[player][1] * 20,
        0
      );
      return { ...acc, [team]: teamTotalScore };
    }, {});
    const sortedTeamScore = Object.keys(teamScore)
      .sort((a, b) => teamScore[b] - teamScore[a])
      .reduce((acc, team) => ({ ...acc, [team]: teamScore[team] }), {});
    setSortedTeamScore(sortedTeamScore);
  }, []);

  const teamScoreUI = Object.keys(sortedTeamScore).map((team, index) => {
    return (
      <tr key={team}>
        <td style={centerStyle}>{data.forms[team]}</td>
        <td style={centerStyle}>{index + 1}</td>
        <td>
          <a
            onClick={() => {
              setUiState("Team");
              setCurrentTeam(team);
              setCurrentRank(index + 1);
              setCurrentScore(sortedTeamScore[team]);
            }}
          >
            {team}
          </a>
        </td>
        <td style={centerStyle}>{sortedTeamScore[team]}</td>
      </tr>
    );
  });

  if (currentTeam) {
    teamPlayersUI = data.teams[currentTeam].map((player) => {
      return (
        <tr key={player}>
          <td>{player}</td>
          <td style={centerStyle}>{data.players[player][0]}</td>
          <td style={centerStyle}>{data.players[player][1]}</td>
        </tr>
      );
    });
  }

  return (
    <React.Fragment>
      {uiState === "Home" && (
        <div style={divStyle}>
          <h1 style={centerStyle}>Score Board</h1>
          <table>
            <thead>
              <tr>
                <th>Form No.</th>
                <th>Rank</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{teamScoreUI}</tbody>
          </table>
        </div>
      )}
      {uiState === "Team" && (
        <div style={divStyle}>
          <h1 style={centerStyle}>{currentTeam}</h1>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Runs</th>
                <th>Wickets</th>
              </tr>
            </thead>
            <tbody>{teamPlayersUI}</tbody>
          </table>
          <br />
          <p style={centerStyle}>
            <b>Rank: </b>
            {currentRank}
            <br />
            <b>Score: </b>
            {currentScore}
            <br />
            <b>Form No.: </b> {data.forms[currentTeam]}
          </p>
          <br />
          <a
            style={divStyle}
            onClick={() => {
              setUiState("Home");
              setCurrentTeam("");
            }}
          >
            Go Back
          </a>
        </div>
      )}
    </React.Fragment>
  );
}

export default App;

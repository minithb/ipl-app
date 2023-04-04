import React from "react";
import data from "./data1.json";

function App() {
  const [uiState, setUiState] = React.useState("Home");
  const [currentTeam, setCurrentTeam] = React.useState("");
  const [sortedTeamScore, setSortedTeamScore] = React.useState({});
  let teamPlayersUI = null;

  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const centerStyle = {
    textAlign: "center",
  };

  React.useEffect(() => {
    const teamScore = Object.keys(data.teams).reduce((acc, team) => {
      const teamPlayers = data.teams[team];
      const teamTotalScore = teamPlayers.reduce((acc, player) => {
        console.log(player);
        return acc + data.players[player][0] + data.players[player][1] * 20;
      }, 0);
      return { ...acc, [team]: teamTotalScore };
    }, {});
    const sortedTeamScore = Object.keys(teamScore)
      .sort((a, b) => teamScore[b] - teamScore[a])
      .reduce((acc, team) => {
        return { ...acc, [team]: teamScore[team] };
      }, {});
    setSortedTeamScore(sortedTeamScore);
  }, []);

  const teamScoreUI = Object.keys(sortedTeamScore).map((team) => {
    return (
      <tr key={team}>
        <td>
          <a
            onClick={() => {
              setUiState("Team");
              setCurrentTeam(team);
            }}
          >
            {team}
          </a>
        </td>
        <td style={divStyle}>{sortedTeamScore[team]}</td>
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
    <div style={divStyle}>
      {uiState === "Home" && (
        <div>
          <h1 style={centerStyle}>Score Board</h1>
          <table>
            <thead>
              <tr>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{teamScoreUI}</tbody>
          </table>
        </div>
      )}
      {uiState === "Team" && (
        <div>
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
    </div>
  );
}

export default App;

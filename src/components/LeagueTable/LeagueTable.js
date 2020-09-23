import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./LeagueTable.css";

import Spinner from "../UI/Spinner/Spinner";

const LeagueTable = (props) => {
  const { code } = props.match.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    props.onFetchLeague(code);
  }, [props.onFetchLeague, code]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setData(props.table);
  }, [props.table]);

  let table = <Spinner />;

  if (data) {
    table = data.map((e, i) => (
      <div className="rowTable" key={i}>
        <div className={["cell", "position"].join(" ")}>{e.position}</div>
        <div className={["cell", "nameTeam"].join(" ")}>{e.team.name}</div>
        <div className="cell">{e.playedGames}</div>
        <div className="cell">{e.won}</div>
        <div className="cell">{e.draw}</div>
        <div className="cell">{e.lost}</div>
        <div className="cell">{e.goalsFor}</div>
        <div className="cell">{e.goalsAgainst}</div>
        <div className="cell">{e.goalDifference}</div>
        <div className="cell">{e.points}</div>
      </div>
    ));
  }

  return (
    <div className="containerTable">
      <div>
        <div className="rowTable">
          <div className={["cell", "position"].join(" ")}>Position</div>
          <div className={["cell", "nameTeam"].join(" ")}>Team</div>
          <div className="cell">Games</div>
          <div className="cell">Won</div>
          <div className="cell">Drawn</div>
          <div className="cell">Lost</div>
          <div className="cell">GF</div>
          <div className="cell">GA</div>
          <div className="cell">GD</div>
          <div className="cell">Points</div>
        </div>
        {table}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    table: state.league.total.table,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLeague: (code) => dispatch(actions.fetchLeague(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTable);

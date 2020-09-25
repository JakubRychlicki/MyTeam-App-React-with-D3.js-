import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./BestStrikers.css";

import Spinner from "../UI/Spinner/Spinner";
import GaugeChart from "../Charts/GaugeChart/GaugeChart";

const colors = ["#FF4136", "#0074D9", "#FF851B", "#2ECC40", "#B10DC9"];

const BestStrikers = (props) => {
  const { code } = props.match.params;
  const { scorers, onFetchScorers } = props;

  useEffect(() => {
    const getScorers = () => {
      return onFetchScorers(code);
    };
    getScorers();
  }, [onFetchScorers, code]);

  let bestSrikersContent = <Spinner />;

  if (scorers) {
    let gaugeChart = <GaugeChart data={scorers} colors={colors} />;
    let tableScorers = scorers.map((d, index) => (
      <div key={index}>
        <h3 className="playerBox" style={{ color: colors[index] }}>
          <span className="playerText">{d.player.name} </span>
          <span className="playerGoals">{d.numberOfGoals} goals for</span>
          <span className="playerTeam">{d.team.name} </span>
        </h3>
      </div>
    ));
    bestSrikersContent = (
      <>
        <div className="gaugeChartContainer">{gaugeChart}</div>
        <div className="scorersTableContainer">
          <h2 className="titleStrikers">Best Strikers</h2>
          {tableScorers}
        </div>
      </>
    );
  }

  return <div className="strikersContainer">{bestSrikersContent}</div>;
};

const mapStateToProps = (state) => {
  return {
    scorers: state.league.scorers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchScorers: (code) => dispatch(actions.fetchScorers(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestStrikers);

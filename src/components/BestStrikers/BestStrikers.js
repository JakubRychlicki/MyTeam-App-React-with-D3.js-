import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./BestStrikers.css";

import Spinner from "../UI/Spinner/Spinner";

const BestStrikers = (props) => {
  const { code } = props.match.params;
  const { scorers, onFetchScorers } = props;

  useEffect(() => {
    const getScorers = () => {
      return onFetchScorers(code);
    };
    getScorers();
  }, [onFetchScorers, code]);

  const getUnique = (arr, comp) => {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  };

  const getPlaces = () => {
    const places = [];
    if (scorers) {
      const results = getUnique(scorers, "numberOfGoals");
      const arr = scorers;
      let size = 0;
      let currentPlace = 1;

      for (let place = 0; place < results.length; place++) {
        for (let i = 0; i < arr.length; i++) {
          if (results[place].numberOfGoals === arr[i].numberOfGoals) {
            places.push(currentPlace);
            size += 1;
          } else {
            currentPlace += size;
            place++;
            places.push(currentPlace);
          }
        }
      }
      return places;
    }
  };

  let bestSrikersContent = <Spinner />;

  if (scorers) {
    bestSrikersContent = scorers.map((d, index) => {
      let places = getPlaces();
      return (
        <div className="scorersTableContainer" key={index}>
          <h3 className="playerBox">
            <span>{places[index]}.</span>
            <span className="playerText">
              {d.player.name}
              <span className="playerTeam">({d.team.name})</span>
            </span>
            <span className="playerGoals">{d.numberOfGoals} goals</span>
          </h3>
        </div>
      );
    });
  }

  return (
    <div className="strikersContainer">
      <h3 className="titleStrikers">Best Strikers</h3>
      {bestSrikersContent}
    </div>
  );
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

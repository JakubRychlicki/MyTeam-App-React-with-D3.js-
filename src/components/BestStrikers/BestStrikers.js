import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const BestStrikers = (props) => {
  const { code } = props.match.params;
  const { scorers, onFetchScorers } = props;

  useEffect(() => {
    if (!scorers) {
      const getScorers = () => {
        return onFetchScorers(code);
      };

      getScorers();
    }
  }, [onFetchScorers, code, scorers]);

  return (
    <div>
      <h2>Best Strikers</h2>
      <button onClick={() => console.log(props.scorers)}>siema</button>
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

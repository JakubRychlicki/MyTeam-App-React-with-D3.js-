import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "./Statistics.css";

import Checkboxes from "../UI/Checkboxes/Checkboxes";
import BarChart from "../Charts/BarChart";

const Statistics = (props) => {
  const { match, onFetchLeague, total, home, away } = props;
  const { code } = match.params;

  const [dataChart, setDataChart] = useState(null);
  const [typeMatches, setTypeMatches] = useState("total");

  const changeTypeMatches = (type) => {
    setTypeMatches(type);
  };

  useEffect(() => {
    onFetchLeague(code);
  }, [onFetchLeague, code]);

  useEffect(() => {
    if (typeMatches === "total") {
      setDataChart(total);
    } else if (typeMatches === "home") {
      setDataChart(home);
    } else if (typeMatches === "away") {
      setDataChart(away);
    }
  }, [typeMatches, total, home, away]);

  return (
    <div>
      <h3 className="titleBarChart">Statistics for the current season</h3>
      <Checkboxes
        name="typeMatches"
        type={typeMatches}
        types={[
          { name: "Total", value: "total" },
          { name: "Home", value: "home" },
          { name: "Away", value: "away" },
        ]}
        onChangeType={changeTypeMatches}
      />
      <BarChart data={dataChart} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.league.total.table,
    home: state.league.home.table,
    away: state.league.away.table,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLeague: (code) => dispatch(actions.fetchLeague(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";

const api = "https://api.football-data.org/v2/competitions/BL1/standings";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("https://api.football-data.org/v2/competitions/BL1/standings", {
        headers: {
          "X-Auth-Token": "8b1d3fa8716441268ec2208385fe0c04",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div>
      <Layout>
        <HomePage />
      </Layout>
    </div>
  );
}

export default App;

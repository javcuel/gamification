import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import SpaceBackground from "../../components/SpaceBackground";
import RankingTable from "./components/RankingTable";

const Ranking: React.FC = () => {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <SpaceBackground />
      <div className="row">
        <div className="col-12 grid-element">
          <NavBar />
        </div>
      </div>
      <div className="row">
        <div className="container custom-flex-center">
          <RankingTable />
        </div>
      </div>
    </div>
  );
};

export default Ranking;

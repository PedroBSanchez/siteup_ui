import React from "react";

import "./Home.css";

import UserCard from "../components/UserCard";

const Home = () => {
  console.log(localStorage.getItem("userEmail"));
  console.log(localStorage.getItem("tokenApi"));

  return (
    <div className="container-fluid">
      <div className="row home-background p-3">
        <div className="col-2">
          <UserCard user={localStorage.getItem("userEmail")} />
        </div>
      </div>
    </div>
  );
};

export default Home;

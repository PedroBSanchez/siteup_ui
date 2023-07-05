import React from "react";

const Home = () => {
  console.log(localStorage.getItem("userEmail"));
  console.log(localStorage.getItem("tokenApi"));
  return <p>Ok</p>;
};

export default Home;

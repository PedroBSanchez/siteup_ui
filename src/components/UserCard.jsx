import React from "react";
import { useNavigate } from "react-router-dom";

import { BiSolidUserCircle } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

import "./UserCard.css";

const UserCard = (props) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("tokenApi");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="card p-2">
      <div className="row text-center justify-content-center ">
        <div className="col-2">
          <BiSolidUserCircle size={30} />
        </div>
        <div className="col">
          <p>{props.user}</p>
        </div>
      </div>
      <div className="row text-end justify-content-right">
        <div className="col">
          <MdLogout style={{ cursor: "pointer" }} onClick={logout} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;

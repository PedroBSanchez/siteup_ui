import React, { useEffect, useState } from "react";
import axios from "axios";

import { BsGlobe, BsCheckCircleFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FiRepeat } from "react-icons/fi";

import "./DomainCard.css";

const DomainCard = (props) => {
  const [status, setStatus] = useState(props.status);

  const testDomain = async () => {
    setStatus(3);
    setTimeout(async () => {
      await axios
        .get(props.domain)
        .then(() => {
          setStatus(1);
        })
        .catch(() => {
          setStatus(2);
        });
    }, 1000);
  };

  useEffect(() => {
    testDomain();
  }, []);
  return (
    <div className="domain-card">
      <div className="row p-2 mt-2 text-center ">
        <div className="col-md-1">
          <BsGlobe className="domain-globe" size={20} />
        </div>
        <div className="col-md-1">
          <FaRegTrashAlt
            size={20}
            className="domain-trash"
            onClick={() => props.removeDomain(props.domain)}
          />
        </div>
        <div className="col-md-1">
          <FiRepeat
            size={20}
            onClick={() => testDomain()}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="col-md-7">
          <p>
            <u>{props.domain}</u>
          </p>
        </div>
        <div className="col-md-1">
          {status == 1 && <BsCheckCircleFill size={30} color="green" />}
          {status == 2 && <MdError size={30} color="orange" />}
          {status == 3 && <DomainLoader />}
        </div>
      </div>
    </div>
  );
};

const DomainLoader = () => {
  return (
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DomainCard;

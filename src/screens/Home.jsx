import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillPlusSquareFill } from "react-icons/bs";
import Swal from "sweetalert2";

import "./Home.css";

import UserCard from "../components/UserCard";
import DomainCard from "../components/DomainCard";
import Loading from "../components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const [domains, setDomains] = useState([]);

  const [ssl, setSsl] = useState(1);
  const [newDomain, setNewDomain] = useState("");

  const addDomain = async () => {
    if (!newDomain) {
      return Swal.fire({
        title: "Invalid domain",
        icon: "error",
      });
    }

    const prefix = ssl == 1 ? "https://" : "http://";
    const addDomain = prefix + newDomain;

    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/user/addurl`,
      data: { url: addDomain },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        console.log(response);
        let domainsTemp = domains;
        domainsTemp = [
          ...domainsTemp,
          {
            status: 3,
            domain: addDomain,
            index: domains.length,
          },
        ];
        console.log(domainsTemp);
        setDomains(domainsTemp);
        console.log(domains);

        setNewDomain("");
        document.querySelector("#newDomain").value = "";
        Swal.fire({
          title: "Domain successfully registered",
          icon: "success",
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: error.response.data.error ?? "Error",
          icon: "error",
        });
      });
  };

  const getDomains = async () => {
    const token = localStorage.getItem("tokenApi");

    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/user/listurls`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        let urls = response.data.urls;
        let domainsTemp = [];
        urls.map((url, index) => {
          domainsTemp = [
            ...domainsTemp,
            { status: 3, domain: url, index: index },
          ];
        });
        console.log(domainsTemp);
        setDomains(domainsTemp);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: "Error loading content",
          icon: "error",
        });
      });
  };

  const removeDomain = async (url) => {
    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/user/removeurl`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        url: url,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Domain successfully deleted",
          icon: "success",
        });
        getDomains();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          title: error.response.data.error ?? "Error on remeoving domain",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getDomains();
  }, []);

  return (
    <>
      <Loading loading={loading} />

      <div className="container-fluid home-background-header">
        <div className="row p-3">
          <div className="col-lg-2 col-6">
            <UserCard user={localStorage.getItem("userEmail")} />
          </div>
        </div>
        <div className="row justify-content-center text-center">
          <div
            className="col-8 home-background-content p-2 pt-5"
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              height: "100%",
            }}
          >
            <div className="row text-center justify-content-center align-items-center">
              <div className="col-lg-2 col-md-3 mt-2">
                <select
                  className="form-select"
                  onChange={(e) => setSsl(e.target.value)}
                >
                  <option value={1}>https://</option>
                  <option value={2}>http://</option>
                </select>
              </div>
              <div className="col-md-4 mt-2">
                <input
                  id="newDomain"
                  className="form-control"
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </div>
              <div className="col-1 mt-2">
                <BsFillPlusSquareFill
                  className="add-domain-button "
                  size={33}
                  onClick={addDomain}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center text-center home-background">
          <div className="col-8 home-background-content pt-4">
            <hr />
            {domains.map((domain, index) => {
              return (
                <div className="row justify-content-center" key={index}>
                  <div className="col-8">
                    <DomainCard
                      domain={domain.domain}
                      index={index}
                      status={domain.status}
                      removeDomain={removeDomain}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

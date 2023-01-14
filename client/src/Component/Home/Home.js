import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/appContext";

const Home = () => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  let { searchData, data } = useAppContext();
  // console.log(searchData);

  const deleteItem = (e) => {
    // console.log(e);
    axios
      .delete(`http://localhost:8080/api/v1/users/delete/${e}`)
      .then((res) => {
        setMessage(res.data.message);
        window.location.reload();
      });
  };

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center mt-2">Tutorial point</h2>
        <h3 className="text-center mt-2" style={{ color: "red" }}>
          {message}
        </h3>
        <div className=" text-end">
          <Button
            variant="primary"
            className="col-lg-2"
            onClick={() => navigate("/register")}
          >
            + Add new
          </Button>
        </div>
        <div className="row d-flex justify-content-between align-items-center mt-5">
          {searchData.length > 0 ? (
            searchData.map((data, index) => (
              <Card
                style={{ width: "22rem", height: "18rem" }}
                className="mb-3"
                key={index}
              >
                <Card.Title
                  className="text-center"
                  style={{
                    margin: "2px",
                    color: "#008B8B",
                  }}
                >
                  {data.postTitle}
                </Card.Title>
                <Card.Img
                  className="mt-2"
                  variant="top"
                  src={`http://localhost:8080/public/uploads/${data.image}`}
                  style={{
                    width: "100px",
                    margin: "auto",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                />
                <Card.Body className="text-center">
                  <small style={{ color: "#FFA500" }}>
                    <span style={{ color: "	#D2691E" }}>Category:</span>{" "}
                    {data.category}
                  </small>
                  <Card.Text>{data.date}</Card.Text>
                  <Button
                    variant="secondary"
                    className="col-lg-3 m-2"
                    onClick={() => navigate(`editData/${data._id}`)}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1001/1001371.png"
                      height="20px"
                      width="20px"
                    />
                  </Button>
                  <Button
                    variant="danger"
                    className="col-lg-3 m-2"
                    onClick={() => {
                      const confirm = window.confirm(
                        `Do you want to delete ${data.postTitle} ?`
                      );
                      if (confirm === true) {
                        deleteItem(data._id);
                      }
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2874/2874821.png"
                      height="20px"
                      width="20px"
                    />
                  </Button>

                  <Button
                    variant="success"
                    className="col-lg-3 m-2"
                    onClick={(e) => navigate(`/detail/${data._id}`)}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/722/722358.png"
                      height="20px"
                      width="20px"
                    />
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <h1 className="text-center" style={{ color: "red" }}>
              There is Nothing Plz Add!
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

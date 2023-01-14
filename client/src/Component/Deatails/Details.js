import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CardDetail = () => {
  const [data, setData] = useState({});

  const { _id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users/${_id}`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data, 45);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  return (
    <div className="container align-items-center">
      <div className=" justify-content-between  mt-5">
        <h2 className="text-center">{data.postTitle}</h2>
        <img
          src={`http://localhost:8080/public/uploads/${data.image}`}
          alt="img"
          className="m-4"
        />
      </div>
      <div className="book-description">
        <small>Category : {data.category}</small>
        <h4>Description :</h4>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default CardDetail;

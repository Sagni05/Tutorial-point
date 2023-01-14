import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditData = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { _id } = useParams();
  console.log(_id);
  const navigate = useNavigate();

  const pictureUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const titleChange = (e) => {
    setTitle(([e.target.name] = e.target.value));
  };

  const categoryChange = (e) => {
    setCategory(([e.target.name] = e.target.value));
  };

  const descriptionChange = (e) => {
    setDescription(([e.target.name] = e.target.value));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users/${_id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.data.postTitle);
        setCategory(res.data.data.category);
        setDescription(res.data.data.description);
      })
      .catch((err) => {
        console.log("Somthing went Wrong");
      });
  }, []);

  const editUserData = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("productImage", image);
    formData.append("postTitle", title);
    formData.append("category", category);
    formData.append("description", description);

    const data = axios
      .put(`http://localhost:8080/api/v1/users/edit/${_id}`, formData)
      .then((res) => {
        console.log(res.data);
        alert(res.data.Message);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="container mt-4"
      style={{
        width: "600px",
        border: "5px solid rgba(0, 0, 0, 0.25)",
        padding: "5px",
        backgroundColor: "#E6E6FA",
      }}
    >
      <h2
        className=" text-center mt-5 mb-5"
        style={{
          backgroundColor: "DodgerBlue",
          padding: "5px",
        }}
      >
        Edit Here
      </h2>
      <form onSubmit={(e) => editUserData(e)} encType="multipart/form-data">
        <div className="form-group">
          <label className="text-muted">Photo</label>
          <input type="file" filen="productImage" onChange={pictureUpload} />
        </div>

        <div className="form-group">
          <label className="text-muted">Post Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => titleChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => categoryChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            type="file"
            name="description"
            value={description}
            onChange={(e) => descriptionChange(e)}
          />
        </div>
        <button
          type="submit"
          // onClick={(e) => addUserData(e)}
          className="btn btn-raised btn-success mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditData;

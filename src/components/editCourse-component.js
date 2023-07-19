import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EditCourseComponent = (props) => {
  let { currentUser, setCurrentUser, patchCourseId, setPatchCourseId } = props;
  //  title, description, price
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleTakeToLogin = () => {
    navigate("/MERN-client/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const patchCourse = () => {
    const _id = patchCourseId; // 確保 _id 是正確的值
    let data = { title, description, price };

    const confirmed = window.confirm("Are you sure you want to edit this course?");
    if (confirmed) {
      CourseService.patch(_id, data)
        .then(() => {
          window.alert("The course has been edited.");
          navigate("/MERN-client/course");
        })
        .catch((err) => {
          console.log(err.response);
          setMessage(err.response.data);
        });
    }
  };

  useEffect(() => {
    console.log("Using effect.");
    if (patchCourseId) {
      setTitle(patchCourseId.title);
      setDescription(patchCourseId.description);
      setPrice(patchCourseId.price);
    }
  }, [patchCourseId]);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first before posting a new course.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "instructor" && (
        <div>
          <p>Only instructors can post new courses.</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div className="form-group">
          <label htmlFor="Title">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="Title"
            onChange={handleChangeTitle}
          />
          <br />
          <label htmlFor="Content">Content</label>
          <textarea
            className="form-control"
            id="Content"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDescription}
          />
          <br />
          <label htmlFor="Price">Price</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="Price"
            onChange={handleChangePrice}
          />
          <br />
          <button className="btn btn-primary" onClick={patchCourse}>
            Submit
          </button>
          <br />
          <br />
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditCourseComponent;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from '../services/course.service';

const EnrollComponent = (props) => {
    let { currentUser, setCurrentUser } = props;
    const navigate = useNavigate();
    let [searchInput, setSearchInput] = useState("");
    let [searchResult, setSearchResult] = useState([]);

    const handleTakeToLogin = () => {
        navigate("/MERN-client/login");
    };
    const handleChangeInput = (e) => {
        setSearchInput(e.target.value);
    };
    const handleSearch = () => {
        if (searchInput.trim() !== "") { // 去除字符串開頭和結尾的空白字符後 不為空值
            CourseService.getCourseByName(searchInput.trim())
                .then((data) => {
                    setSearchResult(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const handleEnroll = (e) => {
        // console.log(e.target);
        CourseService.enroll(e.target.id, currentUser.user._id)
            .then(() => {
                window.alert("Done Enrollment");
                navigate("/MERN-client/course");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        console.log("Using effect.");
        if (searchInput.trim() == "") { 
            CourseService.getAll()
                .then((data) => {
                    setSearchResult(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [searchInput.trim() == ""]);

    return (
        <div style={{ padding: "3rem" }}>
            {!currentUser && (
                <div>
                    <p>You must login first before searching for courses.</p>
                    <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
                        Take me to login page.
                    </button>
                </div>
            )}
            {currentUser && currentUser.user.role == "instructor" && (
                <div>
                    <h1>Only students can enroll in courses.</h1>
                </div>
            )}
            {currentUser && currentUser.user.role == "student" && (
                <div className="search input-group mb-3">
                    <input
                        onChange={handleChangeInput}
                        type="text"
                        class="form-control"
                    />
                    <button onClick={handleSearch} className="btn btn-primary">
                        Search
                    </button>
                </div>
            )}
            {currentUser && searchResult && searchResult.length != 0 ? (
                <div>
                    <p>Data we got back from API.</p>
                    {searchResult.map((course) => (
                        <div key={course._id} className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <p>Price: {course.price}</p>
                                <p>Student: {course.students.length}</p>
                                <a
                                    href="#"
                                    onClick={handleEnroll}
                                    className="card-text btn btn-primary"
                                    id={course._id}
                                >
                                    Enroll
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No search results found.</p>
            )}
        </div>
    );
}

export default EnrollComponent;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService from "../services/course.service";

const CourseComponent = (props) => {
    let { currentUser, setCurrentUser, patchCourseId, setPatchCourseId } = props;
    const navigate = useNavigate();
    const handleTakeToLogin = () => {
        navigate("/login");
    };
    let [courseData, setCourseData] = useState(null);

    const handleCourseEdit = (courseId) => {
        // console.log(courseId);
        patchCourseId = courseId;
        setPatchCourseId(courseId);
        if (patchCourseId !== "") { 
            navigate("/editCourse");
        }
    }
    const handleCourseDelete = (courseId) => {
        // console.log(courseId);
        const confirmed = window.confirm("Are you sure you want to delete this course?");
        if (confirmed) {
            CourseService.delete(courseId);
            window.alert("The course has been deleted.");
            window.location.reload();
        }
    }
    useEffect(() => {
        console.log("Using effect.");
        let _id;
        if (currentUser) {
            _id = currentUser.user._id;
        } else {
            _id = "";
        };

        if (currentUser.user.role == "instructor") {
            // console.log("Getting data for instructor.");
            CourseService.get(_id)
                .then((data) => {
                    console.log(data);
                    setCourseData(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (currentUser.user.role == "student") {
            // console.log("Getting data for student.");
            CourseService.getEnrolledCourses(_id)
                .then((data) => {
                    console.log(data);
                    setCourseData(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    return (
        <div style={{ padding: "3rem" }}>
            {!currentUser && (
                <div>
                    <p>You must login before seeing your courses.</p>
                    <button
                        onClick={handleTakeToLogin}
                        className="btn btn-primary btn-lg"
                    >
                        Take me to login page
                    </button>
                </div>
            )}
            {currentUser && currentUser.user.role == "instructor" && (
                <div>
                    <h1>Welcome to instructor's Course page.</h1>
                </div>
            )}
            {currentUser && currentUser.user.role == "student" && (
                <div>
                    <h1>Welcome to student's Course page.</h1>
                </div>
            )}
            {currentUser && courseData && currentUser.user.role == "student" && courseData.length != 0 && (
                <div>
                    <p>Here's the data we got back from server.</p>
                    {courseData.map((course) => (
                        <div key={course._id} className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <p>Student Count: {course.students.length}</p>
                                <button className="btn btn-primary">{course.price}</button>
                                <br />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {currentUser && courseData && courseData.length != 0 && currentUser.user.role == "instructor" && (
                <div>
                    <p>Here's the data we got back from server.</p>
                    {courseData.map((course) => (
                        <div key={course._id} className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <p>Student Count: {course.students.length}</p>
                                <button className="btn btn-secondary" style={{ margin: ".25rem" }}>{course.price}</button>
                                <button onClick={() => handleCourseEdit(course._id)} className="btn btn-primary" style={{ margin: ".25rem" }}>Edit</button>
                                <button onClick={() => handleCourseDelete(course._id)} className="btn btn-primary" style={{ margin: ".25rem" }}>Delete</button>
                                <br />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseComponent;
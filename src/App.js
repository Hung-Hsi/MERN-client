import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavComponent from "./components/nav-component";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EditCourseComponent from "./components/editCourse-component";
import EnrollComponent from "./components/enroll-component";
import AuthService from "./services/auth.service";

function App() {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [patchCourseId, setPatchCourseId] = useState("");

    return (
        <div>
            <NavComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/login" element={
                    <LoginComponent
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                }/>
                <Route path="/profile" element={
                    <ProfileComponent
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                }/>
                <Route path="/course" element={
                    <CourseComponent
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        patchCourseId={patchCourseId}
                        setPatchCourseId={setPatchCourseId}
                    />
                }/>
                <Route path="/postCourse" element={
                    <PostCourseComponent
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                }/>
                <Route path="/editCourse" element={
                    <EditCourseComponent
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        patchCourseId={patchCourseId}
                        setPatchCourseId={setPatchCourseId}
                    />
                }/>
                <Route path="/enroll" element={
                    <EnrollComponent
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                }/>
            </Routes>
        </div>
    )
}
export default App;
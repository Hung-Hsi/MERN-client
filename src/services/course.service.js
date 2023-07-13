import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";

class CourseService {
    post(title, description, price) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.post(
            API_URL,
            { title, description, price },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    // 表較沒效率的方式
    // 較有效率的方式可以重新設計在學生db裡建立課程properties
    getEnrolledCourses(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }

        return axios.get(API_URL + "/student/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    getCourseByName(name) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/findByName/" + name, {
            headers: {
                Authorization: token,
            },
        });
    }

    get(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/instructor/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    getAll() {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL , {
            headers: {
                Authorization: token,
            },
        });
    }

    enroll(_id, user_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(API_URL + "/enroll/" + _id,
            { user_id },
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    patch(_id, data) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.patch(API_URL + "/" + _id,
            data,
            {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                return response.data; 
            })
            .catch((error) => {
                throw error; 
            });
    }

    delete(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.delete(API_URL + "/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }
};

export default new CourseService();
import axios from 'axios'

export const register = newUser => {
    return axios
        .post("users/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(response => {
            console.log("Registered")
        })
}

export const login = user => {
    return axios
        .post("users/login", {
            email: user.email,
            password: user.password
        })
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}
export const addpost = newPost => {

    return axios
        .post("/newpost", {
            post_id: newPost.post_id,
            post_title: newPost.post_title,
            post_full: newPost.post_full,
        })
        .then(response => {
            console.log("post created")
            console.log(response)
            return (response)
        })
}
export const getpost = updatePost => {

    return axios
        .post("/getpost")
        .then(response => {
            console.log("post updated")
            console.log(response)
            return (response)
        })
}
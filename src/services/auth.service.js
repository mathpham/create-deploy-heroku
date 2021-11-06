import axios from "axios";
import baseUrl from "./baseUrl";

const API_URL = baseUrl + "api/auth/";
class AuthService  {
    login(username,password){
        return axios
        .post(API_URL + "signin",{username,password})
        .then(response => {
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout(){
        localStorage.removeItem("user");
    }


    register(username, password, email,displayname,familyid){
        return axios.post(API_URL + "signup",{
            username,
            password,
            email,
            displayname,
            familyid
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }


}

export default new AuthService();
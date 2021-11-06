import axios from "axios";
import authHeader from "./auth-header";
import baseUrl from "./baseUrl";

const API_URL = baseUrl + 'api/user/';
const API_URL2 = baseUrl + 'api/auth/';
class UserService{
    getFamilyMemberList() {
        var user = JSON.parse(localStorage.getItem("user"));
        var accessToken = user.accessToken;
        let config = {
          headers: authHeader()
        }
        return axios.post(API_URL + "member-list", accessToken, config)
      }
    saveFamilyMember(signupRequest) {
        let config = {
          headers: authHeader()
        }
        return axios.post(API_URL2 + "signup", signupRequest, config)
      }
    
}

export default new UserService();
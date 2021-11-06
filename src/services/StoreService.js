import axios from "axios";
import authHeader from "./auth-header";
import baseUrl from "./baseUrl";
const API_URL = baseUrl + "api/store/";
class StoreService {

  getStoreList() {
    var user = JSON.parse(localStorage.getItem("user"));
    var accessToken = user.accessToken;
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "list", accessToken, config)

  }

  saveStore(store) {
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "add", store, config)
  }

  getStoreByid(id){
    let config = {
      headers: authHeader()
    }
    return axios.get(API_URL + "get-store/" + id, config)
  }

  editStore(id,store){
    let config = {
      headers: authHeader()
    }
    return axios.put(API_URL + "edit/"+id,store, config)
  }
}

export default new StoreService();
import axios from "axios";
import authHeader from "./auth-header";
import baseUrl from "./baseUrl";
const API_URL = baseUrl + "api/expensetype/";
class ExpenseTypeService {

  getExpenseTypeList() {
    var user = JSON.parse(localStorage.getItem("user"));
    var accessToken = user.accessToken;
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "list", accessToken, config)

  }

  saveExpenseType(expensetype) {
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "add", expensetype, config)
  }

  getExpenseTypeByid(id){
    let config = {
      headers: authHeader()
    }
    return axios.get(API_URL + "get-expensetype/" + id, config)
  }

  editExpenseType(id,expensetype){
    let config = {
      headers: authHeader()
    }
    return axios.put(API_URL + "edit/"+id,expensetype, config)
  }
}

export default new ExpenseTypeService();
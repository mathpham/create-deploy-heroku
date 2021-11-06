import axios from "axios";
import authHeader from "./auth-header";
import baseUrl from "./baseUrl";
const API_URL =  baseUrl + "api/expenseinfo/";
class ExpenseInfoService {
  getExpenseInfoList(year, month) {
    var user = JSON.parse(localStorage.getItem("user"));
    var accessToken = user.accessToken;
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "list/"+year+"/"+month, accessToken, config)

  }

  getFilerData() {
    var user = JSON.parse(localStorage.getItem("user"));
    var accessToken = user.accessToken;
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "filter-data", accessToken, config)
  }

  saveExpenseInfo(expenseinfo) {
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "add", expenseinfo, config)
  }

  delExpenseInfo(expenseid){
    let config = {
      headers: authHeader()
    }
    return axios.delete(API_URL + "delete/" + expenseid, config)
  }

  getExpenseInfoByid(id){
    let config = {
      headers: authHeader()
    }
    return axios.get(API_URL + "get-expenseinfo/" + id, config)
  }

  editExpenseInfo(id,expenseinfo){
    let config = {
      headers: authHeader()
    }
    return axios.put(API_URL + "edit/"+id,expenseinfo, config)
  }

  getExpenseInfoForFilter(selectData){
    let config = {
      headers: authHeader()
    }
    return axios.post(API_URL + "filter",selectData, config)
  }
}

export default new ExpenseInfoService();
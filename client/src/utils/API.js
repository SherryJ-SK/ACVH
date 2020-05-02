import axios from "axios";
import villagerList from "./villagerList.json";

var eventURL = "https://nookipedia.com/api/today//?api_key=";
var villagerURL = "https://nookipedia.com/api/villager/";
var api_key = "ad6b2fc1-e683-41f2-b346-f150030a3b41";
// var villagerName = "Judy";

const API = {
  vArray: [],
  Promise: new Promise(function (res, rej) {
    setTimeout(res, 100)
  }),
  allVillager: function () {
    for (var i = 0; i < 6; i++) {
      // console.log(villagerName);
      var villagerName = villagerList[i].title;
      // console.log(villagerName);
      this.getVillager(villagerName)
        .then(res => this.vArray.push(res.data))
    }
  },
  getVillager: function (villagerName) {
    return axios.get(villagerURL + villagerName + "/?api_key=" + api_key);
  },
  getPromise: function () {
    console.log("line 26" + JSON.stringify(Promise.all([this.vArray])));
    return Promise.all([this.vArray]);
  },
  getEvent: function () {
    return axios.get(eventURL + api_key);
  },
  getUser: function (email) {
    return axios.get("/api/users/x/" + email);
  },
  updateUser: function (id, data) {
    return axios.put("/api/users/" + id, data);
  },
  getUserId: function (id) {
    return axios.get("/api/users/" + id)
  },
};
console.log(API.getPromise());
console.log(API.allVillager());
console.log(API.vArray);
export default API;
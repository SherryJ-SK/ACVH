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
    var min = 0;
    var max = (villagerList.length - 1);
    var randIndex = Math.floor(Math.random() * (max - min)) + min;
    for (var i = randIndex; i < randIndex + 5; i++) {
      var villagerName = villagerList[i].title;
      this.getVillager(villagerName)
        .then(res => this.vArray.push(res.data))
    }
  },
  getVillager: function (villagerName) {
    return axios.get(villagerURL + villagerName + "/?api_key=" + api_key);
  },
  getPromise: function () {
    return Promise.allSettled([this.vArray]);
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
// console.log(API.getPromise());
console.log(API.allVillager());
// console.log(API.vArray);
export default API;
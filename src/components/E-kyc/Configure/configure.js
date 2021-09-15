var SERVER_ID = "";
var url = window.location.href.split("/");
var pathName = url[2];
// console.log(pathName);
switch (pathName) {
  case "localhost:3000":
    SERVER_ID = "http://localhost:44300";
    // SERVER_ID = "https://api.nuniyo.tech";
    break;
  case "localhost:44300":
    SERVER_ID = "http://localhost:44300";
    break;
  case "localhost:5000":
    SERVER_ID = "http://localhost:44300";
    break;
  default:
    SERVER_ID = "https://api.nuniyo.tech";
}
export default SERVER_ID;

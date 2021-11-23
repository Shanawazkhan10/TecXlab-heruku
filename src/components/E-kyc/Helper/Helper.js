import $ from "jquery";
const ORG_ID = "S001";
function conVal() {
  $("#fieldSelectorNo").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 9) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function OtpVal() {
  $("#fieldOtp").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 5) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function mobileOtp() {
  $("#mobileOtp").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 5) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function IfscValidator() {
  $("#fieldSelectorNo").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 10) {
      return false;
    } else if (
      e.which !== 8 &&
      e.which !== 0 &&
      (e.which < 48 || e.which > 57)
    ) {
      return false;
    } else if (length === 0 && e.which === 48) {
      return false;
    }
  });
}
function namVal() {
  $("#fieldSelectorname").keypress(function (e) {
    var length = $(this).val().length;
    if (length > 25) {
      return false;
    }
  });
}
//geolocation function
function getLocation(callback) {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {
      callback(location);
      // return data;
    },
  });
}
// function successFunction(position) {
//   var lat = position.coords.latitude;
//   var long = position.coords.longitude;
//   console.log("Your latitude is :" + lat + " and longitude is " + long);
// }
// handle success case

export {
  conVal,
  namVal,
  getLocation,
  IfscValidator,
  OtpVal,
  mobileOtp,
  ORG_ID,
};

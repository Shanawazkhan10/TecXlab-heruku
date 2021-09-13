import $ from "jquery";
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
function getLocation() {
  var settings = {
    url: "https://geolocation-db.com/json",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
// handle success case

export { conVal, namVal, getLocation, IfscValidator };

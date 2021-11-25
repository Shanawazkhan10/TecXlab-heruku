// import React, { useState } from "react";
// import useScript from "../../CustomHooks/LoadScript";
import Script from "react-load-script";

function DigiLock() {
  // useScript("https://app.digio.in/sdk/v9/digio.js");
  function abc() {
    var options = {
      environment: "sandbox",
      function(response) {
        if (response.hasOwnProperty("error_code")) {
          return console.log("error occurred in process");
        }

        console.log("Signing completed successfully");
      },
      logo: "https://www.mylogourl.com/image.jpeg",
      redirect_url:
        "https://app.digio.in/#/gateway/login/KID170829163815543Q3LG28D8BCZ2PK/vI3atY/sanket@digio.in?redirect_url=https://my_redirection_url",
      is_iframe: true,
      theme: {
        primaryColor: "white",
        secondaryColor: "black",
      },
    };

    var digio = new window.Digio(options); //options is the digio options constructor object.
    digio.init();
    digio.submit(
      "KID210726181933188DRUZ34XQLJL9O8",
      "dwivedisaransh1992@gmail.com"
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <Script url="https://app.digio.in/sdk/v9/digio.js" />
        <p>SDK INTEGRATION</p>
        <a
          // href="#"
          className="App-link"
          onClick={abc}
          // target="_blank"
          // rel="noopener noreferrer"
        >
          Auth via SDK
        </a>
      </header>
    </div>
  );
}

export default DigiLock;

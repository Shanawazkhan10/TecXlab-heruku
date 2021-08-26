import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
// import './App.css'
import SERVER_ID from "../Configure/configure";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

function Razor() {
  const [name, setName] = useState("Mehul");
  const [apiURL, setApiURL] = useState("/api/Notify/RazorPayIntegrated");
  useEffect(() => {
    console.log(SERVER_ID);
  }, []);
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch(SERVER_ID + apiURL, {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_dojmbldJSpz91g" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount,
      // order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      //   image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        window.location.href = "/PersonalInfo";
      },
      prefill: {
        name,
        email: "saransh@gmail.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>RAZOR PAY EXAMPLE</p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate 500 Rs.
        </a>
      </header>
    </div>
  );
}

export default Razor;

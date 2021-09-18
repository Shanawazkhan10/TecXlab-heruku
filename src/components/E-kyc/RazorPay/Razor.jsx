// import React, { useState, useEffect } from 'react';
// import logo from "./logo.svg";
// import './App.css'
// import SERVER_ID from "../Configure/configure";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
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

const __DEV__ = document.domain === 'localhost';

function Razor() {
  // const [name, setName] = useState("Mehul");
  // const [apiURL, setApiURL] = useState("/api/Notify/RazorPayIntegrated");

  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: __DEV__ ? 'rzp_test_dojmbldJSpz91g' : 'PRODUCTION_KEY',
      currency: 'INR',
      amount: 222,
      // order_id: data.id,
      name: 'Donation',
      description: 'Thank you for nothing. Please give us some money',
      //   image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        // window.location.href = "/PersonalInfo";
      },
      prefill: {
        name: 'shanawaz khan',
        email: 'saransh@gmail.com',
        phone_number: '9899999999',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const handleclick = () => {
    // want to pass after success
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('userToken')}`
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      inr: 2799883,
      currency: 'INR',
      mobile_No: '999999999',
      merchantTransactionId: 'kfhjvnhhjbm',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:44300/api/RazorPay/RazorPayStatus', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>RAZOR PAY EXAMPLE</p>
        <a
          href="as"
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate 500 Rs.
        </a>
        <p>RAZOR PAY EXAMPLE</p>
        <a
          href="asd"
          className="App-link"
          onClick={handleclick}
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

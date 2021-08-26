import React from "react";
// import Header from "../Header/Header";
const DashBoard = () => {
  return (
    <div>
      {/* <Header /> */}
      <img className="img-fluid" src={require("../../../assets/landing.png")} />
      <br />
      <button className="color-gradiant text-white border-0 btn-comman">
        Sign up now
      </button>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {" "}
            <img
              classNameName="img-fluid"
              style={{ width: 500 }}
              src={require("../../../assets/landing.png")}
            />
          </div>
          <div className="col">
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
              placeat ipsam magni, voluptatum quia quam harum odit voluptatibus
              illo quis ipsum fuga animi tempora reprehenderit recusandae
              corporis fugit necessitatibus provident sed magnam adipisci maxime
              possimus sapiente. Atque, error vitae doloribus numquam veritatis,
              tempora minus quod sequi, aliquam ipsam autem magni maiores quia
              nam adipisci? Praesentium distinctio et dolorum fugit quos, vitae
              omnis dolore accusantium nobis.
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="text-purple">The Zerodha Universe</h1>
        <p>
          A whole ecosystem of modern investment apps <br /> tailored to
          specific needs, built from the ground up
        </p>
        <br />
        <img
          className="img-fluid"
          src={require("../../../assets/ecosystem.png")}
        />
      </div>
      <br />
      <br />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="mt-5">
              <h2 className="text-purple"> Unbeatable pricing </h2>
              <br />
              <p>
                {" "}
                We pioneered the concept of discount broking and price
                transparency in India. Flat fees and no hidden charges.
              </p>
            </div>
          </div>
          <div class="col d-flex d-inline-block">
            {" "}
            <div class="card" style={{ width: 280 }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="card-link">
                  Card link
                </a>
                <a href="#" class="card-link">
                  Another link
                </a>
              </div>
            </div>
            <div class="card" style={{ width: 280 }}>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="#" class="card-link">
                  Card link
                </a>
                <a href="#" class="card-link">
                  Another link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h1 className="text-purple"> Open a Zerodha account </h1>
      <p>
        {" "}
        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O
        trades.
      </p>
      <br />
      <button className="color-gradiant text-white border-0 btn-comman">
        Sign up now
      </button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default DashBoard;

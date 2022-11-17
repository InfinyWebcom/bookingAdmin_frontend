import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

export default function Auth(props) {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-10 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            // style={{
            //   backgroundImage:
            //     "url(" + require("assets/img/register_bg_2.png").default + ")",
            // }}
          ></div>
            {props.Register?<Register/>: <Login/>}
        
        </section>
      </main>
    </>
  );
}

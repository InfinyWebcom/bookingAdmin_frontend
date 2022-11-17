import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Appconfig from "constant/config";

// components
// import HeaderStats from "components/Headers/HeaderStats";
import Calender from "components/calender/calender"

export default function Bookings() {

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <Calender/>
        </div>
       
      </div>
    </>
  );
}

import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
// import CardPageVisits from "components/Cards/CardPageVisits.js";
// import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
//import HeaderStats from
// import HeaderStats from "components/Headers/HeaderStats";

export default function Dashboard() {
  return (
    <>
      {/* <div  style={{marginTop:'20px',marginBottom:'20px'}}
      //</> className="relative md:ml-3 bg-blueGray-10"
      >
      <HeaderStats/>
      </div> */}
   
      <div className="flex flex-wrap">
      
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      {/* <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div> */}
    </>
  );
}

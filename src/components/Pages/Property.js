import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Appconfig from "constant/config";
// components

import CardTable from "components/Cards/CardTable.js";
// import Bookings from "components/calender/calender";
// import HeaderStats from "components/Headers/HeaderStats";
export default function Property(props) {
  const [data,setData] = useState([])
  const column =["Sr.No",'PropertyName','City','State','Status','Rent','Category',"Action"]
  const row =['name','city','state','is_available','rent','turf_category']
  const Properties = async () => {
    let token=localStorage.getItem("token")
    let  data  = await axios.get(
      `${Appconfig.baseurl}/organizations/properties`,{headers:{
          'Authorization':'token '+token
        }}
      );
      // console.log("ddaaaddadadattatata",data.data.properties,data.data.properties_image)
      setData(data.data.properties)
    }
   
useEffect(()=>{
  Properties ()
},[])
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable data={data} column={column} title={'property'}row={row} />
          {/* <Bookings/> */}
        </div>
       
      </div>
    </>
  );
}

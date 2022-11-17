import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Appconfig from "constant/config";

import CardTable from "components/Cards/CardTable.js";
export default function Owner(props) {
  const [data,setData] = useState([])

  let token=localStorage.getItem("token")

  const column =["Sr.No",'First Name','Last Name','Email','Contact',"action"]
  const row = ['first_name','last_name','email','contact']
  const Owners = async () => {
    let  data  = await axios.get(
      `${Appconfig.baseurl}/accounts/users?user_role=Owner`,{headers:{
          'Authorization':'Token '+token
        }}
      );
      setData(data.data.users)
      console.log("fjicfcvjfvj",data)
    }

useEffect(()=>{
  Owners()
},[])
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <CardTable data={data} column={column} title='owner' row={row}/>
        </div>
       
      </div>
    </>
  );
}

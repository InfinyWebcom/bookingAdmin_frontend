import React from "react";
import { useState,useEffect} from "react";
import axios from "axios";
import CardTable from "components/Cards/CardTable.js";
import Appconfig from "constant/config";
export default function User(props) {
  const [data,setData] = useState([])
  let token=localStorage.getItem("token")
  const column =["Sr.No",'First Name','Last Name','Email','Contact',"Action"]
  const row = ['first_name','last_name','email','contact']
  const users = async () => {
    let  data  = await axios.get(
        `${Appconfig.baseurl}/accounts/users?user_role=User`,{headers:{
          'Authorization':'Token '+token
        }}
      );
      setData(data.data.users)
      console.log("Users",data)
    }
useEffect(()=>{
  users()
},[])
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <CardTable data={data} column={column} title="user" row={row} />
        </div>
      </div>
    </>
  );
}

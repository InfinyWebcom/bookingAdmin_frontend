// import React from "react";
// import { useState,useEffect } from "react";
// import axios from "axios";


// import CardTable from "components/Cards/CardTable.js";
// // import HeaderStats from "components/Headers/HeaderStats";
// export default function Tables(props) {
//   const [data,setData] = useState([])
//   let token=localStorage.getItem("token")
//     console.log("hjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhhhh",token)
//     // "http://127.0.0.1:8000/organizations/properties",'',{headers:{
//     //   Authorization:'token '+token
//     // }}
//   const Properties = async () => {
//     console.log("comming")
//     let token=localStorage.getItem("token")
//     console.log("hjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhhhh",token)
//     let  {data}  = await axios.get(
//         "http://127.0.0.1:8000/organizations/properties",'',{headers:{
//           Authorization:'token '+token
//         }}
//       );
//       setData(data.Properties)
//       console.log("fjicfcvjfvj",data.Properties)
//     }
// useEffect(()=>{
//   console.log("ddddddddddddddddddddddddddd")
//   Properties ()
// },[])
//   return (
//     <>
//       <div className="flex flex-wrap mt-4">
//       {/* <div  style={{marginTop:'20px',marginBottom:'20px'}}
//       //</> className="relative md:ml-3 bg-blueGray-10"
//       >
//       <HeaderStats/>
//       </div> */}
//         <div className="w-full mb-12 px-4">
//         {/* <HeaderStats/> */}
//           <CardTable data={data} />
//         </div>
//         {/* <div className="w-full mb-12 px-4">
//           <CardTable color="dark" />
//         </div> */}
//       </div>
//     </>
//   );
// }

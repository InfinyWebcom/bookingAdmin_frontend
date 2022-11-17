import React, { useState,useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Appconfig from "constant/config";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";


export default function Edituser(props) {
  const {addToast} = useToasts();
  const history = useHistory();
  const queryString = history.location.search;
  const userID = new URLSearchParams(queryString);
  let userid = userID.get("id");
  const [userdata,setUserData] = useState([]);

  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: userdata.first_name,
      last_name:userdata.last_name,
      username:userdata.username,
      password:userdata.password,
      contact: userdata.contact,
      email: userdata.email,
      role_name: "User"
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please Enter Your Name")
        .trim(),
      last_name: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please Enter Your Name")
        .trim(),
      username: Yup.string()
        .required("Please Enter Your username"), 
      password: Yup.string()
        .required("Please Enter Your password"),
      email: Yup.string()
        .matches(/^[^A-Z]*$/, "Please enter small letters")
        .trim()
        .email("Must be a valid Email")
        .max(255)
        .required("Email is required")
        .trim(),
      contact : Yup.string('contact number must be')
        .matches(/^[0-9 ]*$/, 'Please enter Valid VAT Number')
        .min(10, 'VAT Number Must be of 10 digit')
        .max(10, 'cannot be of more than 10 digit'),
    }),

     onSubmit: (values) => {
      let partial_update = {
        user_id:userdata.id,
        first_name: formik.values.first_name,
        last_name:formik.values.last_name,
        username:formik.values.username,
        contact: formik.values.contact,
        email: formik.values.email
       } 
       let token=localStorage.getItem('token')
       axios.patch(`${Appconfig.baseurl}/accounts/users`,partial_update,{headers:{
        'Authorization':'token '+token
      }}  
      )
       .then(response =>{
        if(response.data.status
          ===
            "Error"){
              addToast(response.data.message,{appearance:'error',autoDismiss:true})
  
          }
         else{
            history.push('/admin/users')
            addToast(response.data.message,{appearance:'success',autoDismiss:true})
          }
       })
       .catch(error => {
               }) 
    }
  });
  const getUser = async() =>{
    let token=localStorage.getItem("token")
    let data=await axios.get(
      `${Appconfig.baseurl}/accounts/users?user_id=${userid}`,{headers:{
        'Authorization':'Token '+token
      }}
    )
    setUserData(data.data.users[0]) 
  }

    useEffect(() => {
      getUser();
    }, []);
  return (
    <>
      <div className="container   mx-auto px-4 h-full overflow-y: auto;">
        <div className="flex content-center items-center justify-center h-full bg-lightBlue-500 py-10">
          <div className="w-full lg:w-9/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 shadow-lg rounded-lg bg-white border-0 mt-10">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3 mt-6">
                  <h6 className="text-lightBlue-500 text-sm font-bold">
                    EDIT USER
                  </h6>
                </div>

                <hr className="mt-10 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form  onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                      return false;
                    }}>
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap">
                      <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          for="first_name"
                        >
                          First
                          Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          placeholder="First Name"
                          className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                            formik.touched.first_name && formik.errors.first_name
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.first_name}
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                          <div
                            style={{ color: "rgb(220 38 38)" }}
                            className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                          >
                            {formik.errors.first_name}
                          </div>
                        )}
                      </div>
                       
                      <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          for="name"
                        >
                          Last
                          Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          placeholder="Last Name"
                          className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                            formik.touched.last_name && formik.errors.last_name
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.last_name}
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                          <div
                            style={{ color: "rgb(220 38 38)" }}
                            className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                          >
                            {formik.errors.last_name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className=" mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Contact 
                        </label>
                        <input
                          type="tel"
                          name="contact"
                          id="contact"
                          placeholder="Contact Number"
                          className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                            formik.touched.contact && formik.errors.contact
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.contact}
                        />
                        {formik.touched.contact && formik.errors.contact && (
                          <div
                            style={{ color: "rgb(220 38 38)" }}
                            className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                          >
                            {formik.errors.contact}
                          </div>
                        )}
                      </div>
                      <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email"
                          className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                            formik.touched.email && formik.errors.email
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div
                            style={{ color: "rgb(220 38 38)" }}
                            className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                          >
                            {formik.errors.email}
                          </div>
                        )} 
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className=" mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          UserName 
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          placeholder="User Name"
                          className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                            formik.touched.username && formik.errors.username
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username && (
                          <div
                            style={{ color: "rgb(220 38 38)" }}
                            className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                          >
                            {formik.errors.username}
                          </div>
                        )}
                      </div>
                      <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none"> 
                      </div>
                    </div>
                  </div>                
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150"
                      type="Submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

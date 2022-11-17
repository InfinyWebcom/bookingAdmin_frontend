import React, { useEffect, useState } from "react";
import axios from "axios";
import Appconfig from "constant/config";
import moment from "moment";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";

export default function Bookings({ color }) {
  const {addToast} = useToasts();
  const [showModal, setShowModal] = React.useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [slotdata, setSlotData] = useState({
    property_id: "",
    slot_id: [],
    payment_mode: "ONLINE",
    user_id: "",
  });

  const [userdata, setUserData] = useState();
  const [pid, setPid] = useState("");
  const [slotid, setSlotId] = useState([]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: "",
    },
    validationSchema: Yup.object({
      user: Yup.string(),
    }),

    onSubmit: (values) => {},
  });

  let history = useHistory();
  const queryString = history.location.search;
  const PropertyID = new URLSearchParams(queryString);
  let propertyid = PropertyID.get("id");
  const [dataa, setData] = useState([]);
  const Properties = async () => {
    let token = localStorage.getItem("token");
    let data = await axios.get(
      `${Appconfig.baseurl}/make-slot/slot?property_id=${propertyid}`,
      {
        headers: {
          Authorization: "token " + token,
        },
      }
    );
    setData(data.data.slot);
  };

  const getusers = async () => {
    let token = localStorage.getItem("token");
    let data = await axios.get(
      `${Appconfig.baseurl}/accounts/users`,
      {
        headers: {
          Authorization: "Token " + token,
        },
      }
    );
    setUserData(data.data.users);
  };

  const handlebook = (e, ind, value) => {
    setPid(value.property);
    setSlotId(value.slot_id);
    e.preventDefault();
    if (!value.booking_id) {
      setShowModal(true);
    } else {
      setCancelModal(true);
      let cdata = {
        property_id: value.property,
        slot_id: [value.slot_id],
        booking_id: value.booking_id,
      };
      setSlotData(cdata);
    }
  };
  const deletslot = () =>{

  }
  const onConfirm = () => {
    let sdata = {
      property_id: pid,
      slot_id: [slotid],
      payment_mode: "ONLINE",
      user_id: Number(formik.values.user),
    };
    let token = localStorage.getItem("token");
    axios
      .post(`${Appconfig.baseurl}/organizations/booking`, sdata, {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then(response =>{
        if(response.data.status
          ===
            "Error"){
              addToast(response.data.message,{appearance:'error',autoDismiss:true})
          }
         else{
            history.push('/admin/properties')
            addToast(response.data.message,{appearance:'success',autoDismiss:true})
          }
       })
       .catch(error => {
               }) 
  };

  const onCancel = () => {
    let token = localStorage.getItem("token");
    console.log("cancellllllllll", slotdata);
    axios
      .post(`${Appconfig.baseurl}/organizations/cancel-booking`, slotdata, {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then(response =>{
        if(response.data.status
          ===
            "Error"){
              addToast(response.data.message,{appearance:'error',autoDismiss:true})
          }
         else{
            history.push('/admin/properties')
            addToast(response.data.message,{appearance:'success',autoDismiss:true})
          }
       })
       .catch(error => {
               });
  };

  useEffect(() => {
    getusers();
    Properties();
  }, []);

  const array = ["02/10/2022", "", "", "", "", "", "", ""];

  return (
    <>
      <div
        className={
          "relative flex md:flex-col-2 min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1"></div>
            <div></div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center mt-5 w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {array.map((val, ind) => {
                  return (
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-200 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                      key={ind}
                    >
                      {val}
                    </th>
                  );
                })}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <div className=" flex items-stretch ">
              {Object.keys(dataa).map((val, i) => (
                <tbody>
                  <tr key={i}>
                    <th className="border-t-0 p-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  text-left flex items-start">
                      <span
                        className={
                          "ml-3 font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {val}
                      </span>
                    </th>
                    {dataa[val].map((value, i) => {
                      return (
                        <td
                          style={{
                            color: "white",
                            border: "1px solid white",
                            backgroundColor: value.is_available
                              ? "green"
                              : "red",
                          }}
                          onClick={(e) => handlebook(e, i, value)}
                          className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
                        >
                          {moment(value.start_time, ["h:mm"]).format("LT")}-
                          {moment(value.end_time, ["h:mm"]).format("LT")}
                          {value.is_available ? (
                            <i
                              style={{ color: "orange", marginLeft: "2px" }}
                              className=" fas fa-circle text-green-900 mr-1"
                            />
                          ) : (
                            <i
                              style={{ color: "yellow", marginLeft: "2px" }}
                              className="fas fa-circle text-green-900 mr-2"
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              ))}
            </div>
          </table>
          {showModal && (
            <div className="modal-backdrop">
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto  inset-0 z-50 outline-none focus:outline-none">
                    <div
                      style={{ width: "600px", height: "400" }}
                      className="relative w-1 my-6 mx-auto max-w-3xl"
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                          <h6 className="text-blue-500 background-transparent font-bold uppercase text-lg outline-none  ">
                            PROPERTY BOOKING
                          </h6>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="flex flex-wrap">
                          <div className="mb-3 mt-2 w-full px-4 flex-6 lg:w-12/12 md:flex-none">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Please Select{" "}
                              <span className="uppercase text-lightBlue-600 text-xs font-bold ">
                                User
                              </span>{" "}
                              For Which You want to book this slot
                            </label>
                            <select
                              type="text"
                              name="user"
                              id="user"
                              className={
                                "w-full mt-3 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150"
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.user}
                            >
                              <option value="">Select User</option>
                              {userdata.map((val) => (
                                <option value={val.id}>
                                  {val.first_name}&nbsp;{val.last_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <p className="my-3 text-blueGray-500 uppercase justify-center text-sm leading-relaxed">
                            Do You Want to Book THIS SLOT ?
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-white-500 background-blue-700 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => setShowModal(false)}
                          >
                            No
                          </button>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={onConfirm}
                          >
                            BOOK
                          </button>
                          <button
                            className="text-white-500 background-blue-700 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={deletslot}
                          >
                            Delete Slot
                          </button>
  
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          )}
          {cancelModal && (
            <div className="modal-backdrop">
              {cancelModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto  inset-0 z-50 outline-none focus:outline-none">
                    <div
                      style={{ width: "600px" }}
                      className="relative w-1 my-6 mx-auto max-w-3xl"
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                          <h6 className="text-blue-500 background-transparent font-bold uppercase text-lg outline-none  ">
                            Cancel Booking
                          </h6>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setCancelModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <p className="my-3 text-blueGray-500 uppercase justify-center text-sm leading-relaxed">
                            Do You Want to Cancel ?
                          </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-white-500 background-blue-700 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={() => setCancelModal(false)}
                          >
                            No
                          </button>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            onClick={onCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

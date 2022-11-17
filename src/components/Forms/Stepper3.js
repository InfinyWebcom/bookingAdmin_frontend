import React, { useEffect, useState } from "react";
import axios from "axios";
import Appconfig from "constant/config";
import * as Yup from "yup";
import { data } from "autoprefixer";
import moment from "moment";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";

export default function Slots(props) {
  const {addToast} = useToasts();
  let history = useHistory();
  const queryString = history.location.search;
  const PropertyID = new URLSearchParams(queryString);
  let propertyid = PropertyID.get("id");
  
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      property_id: propertyid,
      slot: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please Enter Your Name")
        .trim(),
      end_time1: Yup.string().required("Please Enter Your Name"),
  
    }),

    onSubmit: (values) => {
      values = dataOfWeeks;
      let token = localStorage.getItem("token");
      axios
        .post(`${Appconfig.baseurl}/make-slot/slot`, values, {
          headers: {
            Authorization: "token " + token,
          },
        })
        .then((response) => {
          if(response.data.status
            ===
              "Error"){
                addToast(response.data.message,{appearance:'error',autoDismiss:true})
    
            }
           else{
              history.push('/admin/properties/bookings')
              addToast(response.data.message,{appearance:'success',autoDismiss:true})
            }
         })
         .catch(error => {
                 })
    },
  });
  const [showModal, setShowModal] = useState();
  const [index, setIndex] = useState();

  const [dataOfWeeks, setDataOfWeeks] = useState(
    { Sunday: [{ start_time: '', end_time: '', slot_duration: 0,error: false, error1: false}] ,
     Monday: [{ start_time: '', end_time: '', slot_duration: 0,error: false, error1: false }] ,
     Tuesday: [{ start_time: '', end_time: '', slot_duration: 0 ,error: false, error1: false}] ,
     Wednesday: [{ start_time: '', end_time: '', slot_duration: 0,error: false, error1: false }] ,
     Thursday: [{ start_time: '', end_time: '', slot_duration: 0,error: false, error1: false }] ,
     Friday: [{ start_time: '', end_time: '', slot_duration: 0 ,error: false, error1: false}] ,
     Saturday: [{ start_time: '', end_time: '', slot_duration: 0,error: false, error1: false }] }
  )

  // const [dataOfWeeks, setDataOfWeeks] = useState({
  //   Saturday: [
  //     {
  //       start_time: "00:00",
  //       end_time: "13:00",
  //       slot_duration: 120,
  //       error: false,
  //       error1: false,
  //     },
  //     // {"start_time": "15:00", "end_time": "18:00", "slot_duration": 60}
  //   ],
  //   Sunday: [
  //     {
  //       start_time: "9:00",
  //       end_time: "18:00",
  //       slot_duration: 120,
  //       error: false,
  //       error1: false,
  //     },
  //   ],
  //   Monday: [
  //     {
  //       start_time: "9:00",
  //       end_time: "18:00",
  //       slot_duration: 120,
  //       error: false,
  //       error1: false,
  //     },
  //   ],
  //   Friday: [
  //     {
  //       start_time: "9:00",
  //       end_time: "18:00",
  //       slot_duration: 120,
  //       error: false,
  //       error1: false,
  //     },
  //   ],
  //   Wednesday: [
  //     {
  //       start_time: "10:00",
  //       end_time: "13:00",
  //       slot_duration: 120,
  //       error: false,
  //       error1: false,
  //     },
  //     // {"start_time": "15:00", "end_time": "19:00", "slot_duration": 60}
  //   ],
  //   Tuesday: [
  //     { start_time: "10:00", end_time: "13:00", slot_duration: 120 },
  //     // {"start_time": "15:00", "end_time": "19:00", "slot_duration": 60}
  //   ],
  // });
  // let formik={errors:'its Not value',}

  const removeday = (index) => {
    let array1 = {...dataOfWeeks};
    let dy=Object.keys(dataOfWeeks)[index]
    delete array1[dy]
    setShowModal(false);
    setDataOfWeeks(array1);
  };

  const handleBreak = (e, val, day, i) => {
    let array1 = { ...dataOfWeeks };
    e.preventDefault();
    let array = val ? val : [1];
    array.push({
      start_time: "",
      end_time: "",
      slot_duration: 0,
      error: false,
      error1: false,
    });
    array1[day[i]] = [...array];
    setDataOfWeeks(array1);
  };
  const handleChange11 = (x, y, day, i, a) => {
    console.log("111111111111111111111",x.target.value,typeof(x.target.value))
    let array1 = { ...dataOfWeeks };
    if (i > 0 && a == "start_time") {
      // let first_time = moment(array1[y][z][i - 1]['start_time'], 'h:mm')
      let last_time = moment(array1[day[y]][i - 1]["end_time"], "h:mm");
      let time = moment(x.target.value, "h:mm");
      if (last_time.isBefore(time)) {
        array1[day[y]][i][a] = x.target.value;
        array1[day[y]][i]["error"] = false;
        setDataOfWeeks(array1);
      } else {
        array1[day[y]][i]["error"] = true;
      }
    } else if (a == "end_time") {
      let time = moment(x.target.value, "h:mm");
      let first_time = moment(array1[day[y]][i]["start_time"], "h:mm");
      if (first_time.isBefore(time)) {
        array1[day[y]][i][a] = x.target.value;
        array1[day[y]][i]["error1"] = false;
        setDataOfWeeks(array1);
      } else {
        array1[day[y]][i]["error1"] = true;
      }
    }
    else if(a=='slot_duration'){
      let xy=Number( x.target.value)
      array1[day[y]][i][a] =xy;

    }
    array1[day[y]][i][a] =( x.target.value);
    setDataOfWeeks(array1);
  };
  const Properties = async () => {
    let token = localStorage.getItem("token");
    let x = { ...dataOfWeeks };
    x.property_id = propertyid;
    console.log("cccccccccccccccccccccccccccccc", x);
    let data1 = await axios.post(`${Appconfig.baseurl}/make-slot/slot`, x, {
      headers: {
        Authorization: "token " + token,
      },
    });
  };
  
  const handleSubmit = () => {
    Properties();
  };
  return (
    <>
      <div className="container  mx-auto px-4 h-full bg-lightBlue-500 overflow-y: auto;">
        <div className="flex content-center bg-lightBlue-500 items-center justify-center h-full">
          <div className="w-full lg:w-9/12 px-4 border-0 ">
            <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 shadow-3xl rounded-lg bg-white border-0 mt-10">
              <div className="rounded-t mb-0 px-6 py-3 ">
                <div className="text-center mb-3 mt-0 ">
                  <h6 className="text-lightBlue-500 text-lg font-bold uppercase text-underline">
                    Slots
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                    return false;
                  }}
                >
                  {/* <div className="flex flex-wrap mt-4">
                    <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Starting Date
                      </label>
                      <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        placeholder="Name"
                        className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                          formik.touched.start_date && formik.errors.start_date
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}                         
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.start_date}
                      />
                      {/* {console.log('dateeeeeeee',formik.values.start_date)} */}
                      {/* {formik.touched.start_date && formik.errors.start_date && (
                        <div
                          style={{ color: "rgb(220 38 38)" }}
                          className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                        >
                          {formik.errors.start_date}
                        </div>
                      )}
                    </div> */}
                    {/* <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Ending Date
                      </label>
                      <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        placeholder="Name"
                        className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                          formik.touched.end_date && formik.errors.end_date
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.end_date}
                      />
                      {formik.touched.end_date && formik.errors.end_date && (
                        <div
                          style={{ color: "rgb(220 38 38)" }}
                          className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                        >
                          {formik.errors.end_date}
                        </div>
                      )}
                    </div>
                  </div>  */}
                  <hr className="mt-3 mb-3 border-b-2 border-lg border-blueGray-500" />
                  {Object.keys(dataOfWeeks).map((val, i) => {
                    return (
                      <div className="container px-2 mx-auto mb-4">
                        <label
                          className="block uppercase text-blueGray-900 text-sm font-bold mb-4"
                          htmlFor="grid-password"
                        >
                          {val}
                          <button
                            type="button"
                            className="p-1 ml-1 bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => (setShowModal(true), setIndex(i))}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </label>
                        {dataOfWeeks[val].map((values, index) => {
                          console.log("ssssssssssssssssssssssssss", values);
                          return (
                            <div key={index} className="flex flex-wrap w-full">
                              <div className="mb-3 w-full px-2 flex-6 lg:w-3/12 md:flex-none">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="name"
                                >
                                  Starting Time
                                </label>
                                <input
                                  type="time"
                                  name="start_time"
                                  id="start_time"
                                  placeholder="Name"
                                  className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                    formik.touched.start_time &&
                                    formik.errors.start_time
                                      ? "border-red-400"
                                      : "border-gray-300"
                                  }`}
                                  onChange={(e) =>
                                    handleChange11(
                                      e,
                                      i,
                                      Object.keys(dataOfWeeks),
                                      index,
                                      "start_time"
                                    )
                                  }
                                  onBlur={formik.handleBlur}
                                  value={formik.values.start_time}
                                />
                                {values.error && (
                                  <div
                                    style={{ color: "rgb(220 38 38)" }}
                                    className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                  >
                                    {"formik.errors.start_time"}
                                  </div>
                                )}
                              </div>
                              <div className="mb-3 w-full px-2 flex-6 lg:w-3/12 md:flex-none">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="name"
                                >
                                  Ending Time
                                </label>
                                <input
                                  // disabled={values.error}
                                  type="time"
                                  name="end_time"
                                  id="end_time"
                                  className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                    formik.touched.end_time &&
                                    formik.errors.end_time
                                      ? "border-red-400"
                                      : "border-gray-300"
                                  }`}
                                  onChange={(e) =>
                                    handleChange11(
                                      e,
                                      i,
                                      Object.keys(dataOfWeeks),
                                      index,
                                      "end_time"
                                    )
                                  }
                                  onBlur={formik.handleBlur}
                                  value={formik.values.end_time}
                                />
                                {values.error1 && (
                                  <div
                                    style={{ color: "rgb(220 38 38)" }}
                                    className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                  >
                                    {"please select a valid time"}
                                  </div>
                                )}
                              </div>
                              <div className="mb-3 w-full px-2 flex-6 lg:w-3/12 md:flex-none">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Slot Duration
                                </label>

                                <select
                                  type ='time'
                                  name="duration"
                                  id="duration"
                                  className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                    formik.touched.duration &&
                                    formik.errors.duration
                                      ? "border-red-400"
                                      : "border-gray-300"
                                  }`}
                                  onChange={(e) =>
                                    handleChange11(
                                      e,
                                      i,
                                      Object.keys(dataOfWeeks),
                                      index,
                                      "slot_duration"
                                    )
                                  }
                                  onBlur={formik.handleBlur}
                                  value={formik.values.slot_duration}
                                >
                                  <option value={0}>Select Time</option>
                                  <option value={30}>30 Mins</option>
                                  <option value={60}>1 Hour</option>
                                  <option value={120}>2 Hours</option>
                                  <option value={180}>3 Hours</option>
                                </select>
                                {formik.touched.duration &&
                                  formik.errors.duration && (
                                    <div
                                      style={{ color: "rgb(220 38 38)" }}
                                      className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                    >
                                      {formik.errors.duration}
                                    </div>
                                  )}
                              </div>
                              {index < 2 &&
                                dataOfWeeks[val].length - 1 === index && (
                                  <div className="mb-3 w-full px-4 mt-6 flex-6 lg:w-3/12 md:flex-none">
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        handleBreak(
                                          e,
                                          dataOfWeeks[val],
                                          Object.keys(dataOfWeeks),
                                          i
                                        )
                                      }
                                      className="bg-teal-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-4 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1  w-auto ease-linear transition-all duration-150"
                                    >
                                      Break
                                    </button>
                                  </div>
                                )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  <div className="flex justify-center mt-2">
                    <button
                      // type="submit"
                      className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150"
                      onClick={handleSubmit}
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
              {showModal && (
                <div className="modal-backdrop">
                  {showModal ? (
                    <>
                      <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto  inset-0 z-50 outline-none focus:outline-none"
                      >
                        <div
                          style={{ width: "400px" }}
                          className="relative w-1 my-6 mx-auto max-w-3xl"
                        >
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                              <h6 className="text-blue-500 background-transparent font-bold uppercase text-lg outline-none  ">
                                DELETE
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
                            <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                              <p className="my-3 text-blueGray-500 justify-center text-sm leading-relaxed">
                                ARE YOU SURE YOU WANT TO DELETE ?
                              </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => removeday(index)}
                              >
                                DELETE
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
        </div>
      </div>
    </>
  );
}

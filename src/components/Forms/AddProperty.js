import React, { useEffect, useState } from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import MapExample from "components/Maps/MapExample.js";
import ImageUpload from "./Stepper";
import Appconfig from "constant/config";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";

export default function Create(props) {
  const [isState, setisState] = useState(true);
  const [state, setState] = useState("");
  const [States, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState({});
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [amenvalue, setAmenValue] = useState([]);
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [data, setData] = useState({});
  const [amenity, setAmenity] = useState([]);
  const {addToast} = useToasts();
 
  const history = useHistory();
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      rent: "",
      turf_category: "",
      images: "",
      amenities: [],
      start_time: "",
      end_time: "",
      is_available: false,
      slot:[]
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please Enter Your Name")
        .trim(),
      city: Yup.string().required("Please Enter city").trim(),
      state: Yup.string().required("Please Enter state").trim(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      images: step === 2 ? Yup.string().required("Please select an image") : "",
      rent: Yup.string().required("Please Enter rent").trim(),
    }),

    onSubmit: (values) => {
      values.latitude = location.latitude;
      values.longitude = location.longitude;
      values.amenities = amenvalue;

      if (step == 1) {
        setData(values);
        setStep(2);
      } else {
        values.latitude = location.latitude;
        values.longitude = location.longitude;
        values.images = images;
        values.amenities = amenvalue;
        values.start_time = startTime;
        values.end_time = endTime;
        
        let token = localStorage.getItem("token");
        axios
          .post(`${Appconfig.baseurl}/organizations/properties`, values, {
            headers: {
              Authorization: "token " + token,
            },
          })
          .then((response) => {
            formik.resetForm();
            console.log("Property added successfully", response);
           if(response.data.status
           ===
          "Error"){
            addToast(response.data.message,{appearance:'error',autoDismiss:true})
          }
          else{
            history.push("/admin/properties");
            addToast(response.data.message,{appearance:'success',autoDismiss:true})
          }           
          })
          .catch((error) => {
            console.log(error);
            // addToast( error.title,{appearance: 'error',autoDismiss:true})
          });
      }
    },
  });

  const [category, setCategory] = useState([]);
  const turfCategory = async () => {
    let data = await axios.get(
      `${Appconfig.baseurl}/organizations/turf-categories`
    );
    setCategory(data.data.categories);
  };
  const getStates = async () => {
    let data = await axios(`${Appconfig.baseurl}/organizations/state`);
    setStates(data.data.States);
  };
  const getCity = async () => {
    let data = await axios(
      `${Appconfig.baseurl}/organizations/city-by-state?state_name=${state}`
    );
    setCity(data.data.city);
    data.data.city.filter((val) => {
      if (val.id === formik.values.city) {
      }
    });
  };

  useEffect(() => {
    getStates();
  }, []);
  const firstPage = () => {
    setStep((prev) => prev + 1);
  };
  const privious = () => {
    setStep((prev) => prev - 1);
  };
  const SelectState = (values) => {
    setState(values);
    if (values != "") {
      setisState(false);
    } else {
      setisState(true);
    }
  };

  const getSelectedCity = (event) => {
    city.filter((val) => {
      if (val.name == event.target.value) {
        setLocation({ latitude: val.latitude, longitude: val.longitude });
      }
    });
    formik.setFieldValue("city", event.target.value);
  };
   
  const getAmenities = async () => {
    let data = await axios(`${Appconfig.baseurl}/organizations/amenities`);
    setAmenity(data.data.amenity);
  };

  const handleChange = (e) => {
    var amenarr = [...amenvalue];
    if (e.target.checked) {
      amenarr = [...amenvalue, e.target.value];
    } else {
      amenarr.splice(amenvalue.indexOf(e.target.value), 1);
    }
    console.log("evevevevvvevev",amenarr)
    setAmenValue(amenarr);
  };
  useEffect(() => {
    getAmenities();
  }, []);

  return (
    <>
      {
        <div className="container  mx-auto px-4 h-full overflow-y: auto;">
          <div className="flex content-center bg-lightBlue-500 items-center justify-center h-full">
            <div className="w-full lg:w-9/12 px-4 border-0 ">
              <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 shadow-3xl rounded-lg bg-white border-0 mt-10">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-lightBlue-500 text-sm font-bold">
                      ADD PROPERTY
                    </h6>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                      return false;
                    }}
                  >
                    {step === 1 && (
                      <>
                        <div className="container px-4 mx-auto">
                          <div className="flex flex-wrap">
                            <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="name"
                              >
                                Property Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                  formik.touched.name && formik.errors.name
                                    ? "border-red-400"
                                    : "border-gray-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                              />
                              {formik.touched.name && formik.errors.name && (
                                <div
                                  style={{ color: "rgb(220 38 38)" }}
                                  className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                >
                                  {formik.errors.name}
                                </div>
                              )}
                            </div>
                            <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="is_available"
                              >
                                Availability Status
                              </label>
                              <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                                <div className="form-check">
                                  <input
                                    name="is_available"
                                    id="is_available"
                                    type="checkbox"
                                    className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer${
                                      formik.touched.is_available &&
                                      formik.errors.is_available
                                        ? "border-red-400"
                                        : "border-gray-300"
                                    }`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.is_available}
                                  />
                                  {formik.touched.is_available &&
                                    formik.errors.is_available && (
                                      <div
                                        style={{ color: "rgb(220 38 38)" }}
                                        className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                      >
                                        {formik.errors.is_available}
                                      </div>
                                    )}
                                  <label
                                    className="form-check-label inline-block text-gray-800"
                                    for="flexCheckDefault"
                                  >
                                    Is Available
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap">
                            <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Category
                              </label>
                              <select
                                onClick={turfCategory}
                                type="text"
                                name="turf_category"
                                id="turf_category"
                                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                  formik.touched.turf_category &&
                                  formik.errors.turf_category
                                    ? "border-red-400"
                                    : "border-gray-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.turf_category}
                              >
                                <option value={""}> please Select</option>
                                {category.map((val) => {
                                  return (
                                    <option value={val.name}>{val.name}</option>
                                  );
                                })}
                              </select>
                              {formik.touched.turf_category &&
                                formik.errors.turf_category && (
                                  <div
                                    style={{ color: "rgb(220 38 38)" }}
                                    className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                  >
                                    {formik.errors.turf_category}
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Rent
                              </label>
                              <input
                                type="number"
                                name="rent"
                                id="rent"
                                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                  formik.touched.rent && formik.errors.rent
                                    ? "border-red-400"
                                    : "border-gray-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.rent}
                                
                              />
                              {formik.touched.rent && formik.errors.rent && (
                                <div
                                  style={{ color: "rgb(220 38 38)" }}
                                  className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                >
                                  {formik.errors.rent}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap">
                            <div className="relative px-4 w-full mb-3 mt-2">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Amenities
                              </label>
                              <div className="container px-4 mx-auto">
                                <div className="flex flex-wrap">
                                  {amenity.map((val, i) => {
                                    return (
                                      <div
                                        className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none"
                                        key={i}
                                      >
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className={`form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer${
                                              formik.touched.amenity &&
                                              formik.errors.amenity
                                                ? "border-red-400"
                                                : "border-gray-300"
                                            }`}
                                            onChange={handleChange}
                                            value={val.name}
                                            checked={
                                              amenvalue.includes(val.name) &&
                                              true
                                            }
                                          />
                                          {formik.touched.amenity &&
                                            formik.errors.amenity && (
                                              <div
                                                style={{
                                                  color: "rgb(220 38 38)",
                                                }}
                                                className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                              >
                                                {formik.errors.amenity}
                                              </div>
                                            )}
                                          <label
                                            className="form-check-label inline-block text-gray-800"
                                            for="flexCheckDefault"
                                          >
                                            {val.name}
                                          </label>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap">
                            <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                State
                              </label>

                              <select
                                onClick={() => SelectState(formik.values.state)}
                                type="text"
                                name="state"
                                id="state"
                                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                  formik.touched.state && formik.errors.state
                                    ? "border-red-400"
                                    : "border-gray-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.state}
                              >
                                <option value="">Select your state</option>
                                {States.map((val) => (
                                  <option value={val.name}>{val.name}</option>
                                ))}{" "}
                              </select>
                              {formik.touched.state && formik.errors.state && (
                                <div
                                  style={{ color: "rgb(220 38 38)" }}
                                  className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                >
                                  {formik.errors.state}
                                </div>
                              )}
                            </div>
                            <div className=" mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                City
                              </label>

                              <select
                                onClick={getCity}
                                type="text"
                                name="city"
                                id="city"
                                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                  formik.touched.city && formik.errors.city
                                    ? "border-red-400"
                                    : "border-gray-300"
                                }`}
                                onChange={(e) => getSelectedCity(e)}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                                disabled={isState}
                              >
                                <option value="">Choose your city</option>
                                {city.map((val) => {
                                  return (
                                    <option value={val.name}>{val.name}</option>
                                  );
                                })}
                              </select>
                              {formik.touched.city && formik.errors.city && (
                                <div
                                  style={{ color: "rgb(220 38 38)" }}
                                  className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                >
                                  {formik.errors.city}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap">
                            <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Latitude
                              </label>
                              <input
                                type="number"
                                name="latitude"
                                id="latitude"
                                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                  formik.touched.latitude &&
                                  formik.errors.latitude
                                    ? "border-red-400"
                                    : "border-gray-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={location.latitude}
                                disabled
                              />
                              {formik.touched.latitude &&
                                formik.errors.latitude && (
                                  <div
                                    style={{ color: "rgb(220 38 38)" }}
                                    className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                  >
                                    {formik.errors.latitude}
                                  </div>
                                )}
                            </div>
                            <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Longitude
                              </label>
                              <input
                                type="number"
                                name="longitude"
                                id="longitude"
                                className={`w-full border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow-lg focus:outline-none focus:ring ease-linear transition-all duration-150${
                                  formik.touched.longitude &&
                                  formik.errors.longitude
                                    ? "border-red-400"
                                    : "border-gray-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={location.longitude}
                                disabled
                              />
                              {formik.touched.longitude &&
                                formik.errors.longitude && (
                                  <div
                                    style={{ color: "rgb(220 38 38)" }}
                                    className=" color: mt-2 block  text-blueGray-600 text-xs font-bold mb-2 "
                                  >
                                    {formik.errors.longitude}
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="flex flex-wrap">
                            <div className="w-full px-4 mt-4">
                              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                {formik.values.city && (
                                  <MapExample
                                    location={location}
                                    setLocation={setLocation}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right mt-6">
                          <button
                            className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150"
                            // onClick={SaverStep1}
                          >
                            Save & Next
                          </button>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <ImageUpload
                        formik={formik}
                        setImages={setImages}
                        images={images}
                        Count={firstPage}
                        privious={privious}
                        handleSubmit={formik.onSubmit}

                      />
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

// const getProperty = async()=>{
//   let token = localStorage.getItem('token')
//   const data=await axios(`http://127.0.0.1:8000/organizations/properties?property_id=${propertyid}`,{ headers: {
//    'Authorization': "token " + token,
//  },})
//   console.log("ghwfvfrwgvw",data.data.properties[0])
//   setPropertyData(data.data.properties[0])
//   console.log("vvvvvvvvv",propertyData)
// }
// const previousParentArray = [...props.dataOfWeeks]
// const preArray = [...props.dataOfWeeks[i][day]]
// preArray.push({start_time:'',end_time:'',slot_duration:''})
// previousParentArray[i][day]=preArray
// props.setDataOfWeeks(previousParentArray)
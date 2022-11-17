import React, { useEffect, useState } from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import MapExample from "components/Maps/MapExample.js";
import { useHistory } from "react-router";
import Appconfig from "constant/config";

export default function Create(props) {
  const [isState, setisState] = useState(true);
  const [state, setState] = useState("");
  const [States, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [location, setLocation] = useState({});
  const [amenity, setAmenity] = useState([]);
  const [amenvalue, setAmenValue] = useState([]);
  const [isAvailable,setIsAvailable] = useState(false)
  const [img, setImg] = useState([]);

  let history = useHistory();
  const queryString = history.location.search;
  const PropertyID = new URLSearchParams(queryString);
  let propertyid = PropertyID.get("id");
  console.log("iidddddd", propertyid);
  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: propertyData.name,
      city: propertyData.city,
      state: propertyData.state,
      latitude: propertyData.lattitude,
      longitude: propertyData.longitude,
      is_available: propertyData.is_available,
      rent: propertyData.rent,
      images: propertyData.images,
      amenities: propertyData.amenity,

      turf_category:
        propertyData.turf_category && propertyData.turf_category.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        // .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please Enter Your Name")
        .trim(),
      city: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please Enter city")
        .trim(),
      state: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .required("Please Enter state")
        .trim(),
      latitude: Yup.string().trim(),
      longitude: Yup.string().trim(),
      rent: Yup.string().required("Please Enter rent").trim(),

      image: "",
      //  Yup.mixed().required("Please select an image"),

      // vat_number : Yup.string('contact number must be').matches(/^[0-9 ]*$/, 'Please enter Valid VAT Number').min(10, 'VAT Number Must be of 10 digit').max(10, 'cannot be of more than 10 digit'),
    }),

    onSubmit: (values) => {
      console.log("jjjjjjjjjjjj", values);
      let token = localStorage.getItem("token");
      axios
        .post(`${Appconfig.baseurl}/organizations/properties`, values, {
          headers: {
            Authorization: "token " + token,
          },
        })
        .then((response) => {
          // setDisabl(true)
          // setFile('');
          formik.resetForm();
          // response.data.error===true? addToast( response.data.title,{appearance: 'error',autoDismiss:true}) :
          // addToast(response.data.title,{appearance:'success',autoDismiss:true})
          // console.log("Data: ", response.data);
          // history.push('/')
        })
        .catch((error) => {
          console.log(error);
          // addToast( error.title,{appearance: 'error',autoDismiss:true})
        });
    },
  });

  // let mainFormSchema = Yup.object().shape({
  //   name: Yup.string().trim().required(),
  // });
  console.log("amenities", propertyData);
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
  };

  const getProperty = async () => {
    let token = localStorage.getItem("token");
    const data = await axios(
      `${Appconfig.baseurl}/organizations/properties?property_id=${propertyid}`,
      {
        headers: {
          Authorization: "token " + token,
        },
      }
    );
    setLocation({
      latitude: data.data.properties[0].latitude,
      longitude: data.data.properties[0].longitude,
    });
    console.log("ddaaaddadadattatata", data.data.properties_image);
    let imgar = [];
    data.data.properties_image.map((val, i) => {
      imgar.push(val.image);
    });
    setImg(imgar);
    console.log("imihimgimg",img)
    setPropertyData(data.data.properties[0]);

    let am = [];
    data.data.properties[0].amenity.map((val) => {
      am.push(val.name);
    });
    setAmenValue(am);

    let data1 = await axios(
      `${Appconfig.baseurl}/organizations/city-by-state?state_name=${data.data.properties[0].state}`
    );
    setCity(data1.data.city);
  };

  useEffect(() => {
    getProperty();
    getStates();
    turfCategory();
    getCity();
  }, []);


  // console.log("lfdkfkllsfls", location);
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
      formik.setFieldValue("city", event.target.value);
    }); 
  };
  
  const getAmenities = async () => {
    let data = await axios(`${Appconfig.baseurl}/organizations/amenities`);
    setAmenity(data.data.amenity);
  };
 
  const updatedAmen = (e) => {
    var amenarr = [...amenvalue];
    if (e.target.checked) {
      amenarr = [...amenvalue, e.target.value];
    } else {
      amenarr.splice(amenvalue.indexOf(e.target.value), 1);
    }
    
    setAmenValue(amenarr);
  };
  
  const handleAvailable = (e) =>{
    if(propertyData.isAvailable){
      setIsAvailable(true)
    }
    else{
      setIsAvailable(false)
    }
    if(e.target.checked){
      setIsAvailable(false)
    }
    else{
      setIsAvailable(true)
    }
  }

  useEffect(() => {
    getAmenities();
  }, []);
  console.log("jjjjjjjj", propertyData.is_available);
  return (
    <>
      <div className="container  mx-auto px-4 h-full overflow-y: auto;">
        <div className="flex content-center items-center justify-center bg-lightBlue-500 h-full">
          <div className="w-full lg:w-9/12 px-4 ">
            <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 mt-10 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-lightBlue-500 text-sm font-bold">
                    EDIT PROPERTY
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
                  <div className="container px-4 mx-auto ">
                    <div className="flex flex-wrap">
                      <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          for="name"
                        >
                          Property
                          Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                          onChange={(e) => handleAvailable(e)}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          checked={isAvailable}
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
                              checked={propertyData.is_available && true}
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
                      <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Category
                        </label>

                        <select
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
                          {category.map((val) => {
                            return <option value={val.name}>{val.name}</option>;
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
                                      onChange={(e)=>updatedAmen(e)}
                                      value={val.name}
                                      checked={
                                        amenvalue.includes(val.name) && true 
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
                          ))}
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
                          {city.map((val) => (
                            <option value={val.name}>{val.name}</option>
                          ))}
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
                            formik.touched.latitude && formik.errors.latitude
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={location.latitude}
                          disabled
                        />
                        {formik.touched.latitude && formik.errors.latitude && (
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
                            formik.touched.longitude && formik.errors.longitude
                              ? "border-red-400"
                              : "border-gray-300"
                          }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={location.longitude}
                          disabled
                        />
                        {formik.touched.longitude && formik.errors.longitude && (
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
                    <div className="flex flex-wrap mt-5">
                      <div className="mb-0 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          for="name"
                        >
                          Property
                          Images&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                      </div>
                      <div className="mb-3 w-full px-4 flex-6 lg:w-6/12 md:flex-none">
                      </div>
                    </div>
                    <div className="container px-4 mx-auto ">
                      <div className="flex flex-wrap">
                        {img.map((val, i) => {
                          return (
                            <div
                              className="w-full  px-4 flex-6 lg:w-6/12 md:flex-none mb-4"
                              key={i}
                              
                            >
                              <div className="flex items-start justify-between mt-5 border-b border-solid border-blueGray-200 rounded-t">
                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  // onClick={(e) =>removeimg(e,i)}
                                >
                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                  </span>
                                </button>
                              </div>
                              <img
                                alt="gallery"
                                className="block object-cover object-center w-full h-full rounded-lg"
                                src={val}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-16">
                    <button
                      className="bg-lightBlue-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150"
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

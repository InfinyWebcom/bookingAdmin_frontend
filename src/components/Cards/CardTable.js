import React,{useState} from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
// import AddProperty from "components/Forms/AddProperty";

export default function CardTable(props) {
  const [searchtext,setSearchText]=useState('')

  const handlesearch = (e) =>{
    e.preventDefault();
    const text = e.target.value
    setSearchText(text)
  
  }
  
  let color = props.color;
  const history = useHistory();
  const handleAdd = (e) => {
    if (props.title === "owner") {
      history.push("/admin/owner/add");
    } else if (props.title === "user") {
      history.push("/admin/users/add");
    } else {
      history.push(`properties/add`);
    }
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {props.column[1] == "Name"
                  ? "Owner"
                  : props.column[1] == "PropertyName"
                  ? "Property"
                  : "Users"}
                {/* {props.column.map((val)=>{
                if(val[1]=='First Name'){
                  return 'Properties'
                }else{
                  return "Owner"
                }
               })} */}
              </h3>
            </div>
            <div>
              <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
                <div className="relative flex w-full flex-wrap items-stretch">
                  <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-900 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchtext}
                    className="border-0 px-3 py-3 placeholder-blueGray-900 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                    onChange={handlesearch}
                  />
                </div>
              </form>
            </div>
            <div>
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-auto ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => handleAdd(e)}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center mt-5 w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {props.column &&
                  props.column.map((val, ind) => {
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
            {props.data.filter((val) => {
                if (searchtext === undefined) {
                  return val;
                }
                if (
                  val[props.row[0]]
                    .toLowerCase()
                    .includes(searchtext && searchtext.toLowerCase())
                ) {
                  return val;
                }
              }).map((val, i) => (
              <tbody>
                <tr key={i} className="tr">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {i + 1}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {val[props.row[0]]}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {val[props.row[1]]}
                  </td>

                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">{val[props.row[2]]}</span>
                    </div>
                  </td>
                  {val.turf_category ? (
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {val.is_available === true ? (
                        <i className="fas fa-circle text-green-900 mr-2" />
                      ) : (
                        <i className="fas fa-circle text-orange-500 mr-2" />
                      )}
                      {val.is_available ? "Available" : "Not available"}
                    </td>
                  ) : (
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {val[props.row[3]]}
                    </td>
                  )}

                  {val.turf_category && (
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {val[props.row[4]]}
                    </td>
                  )}
                  {val.turf_category ? (
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {val.turf_category && val.turf_category.name}
                    </td>
                  ) : (
                    <div style={{ display: "none" }}></div>
                  )}
                  {/* { props.row[5]? <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {val[props.row[5]&&props.row[5]]}
                </td>:null} */}
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown id={val.id} title={props.title}/>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

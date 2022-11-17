import React from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router";
import axios from "axios";
import Appconfig from "constant/config";
import { useToasts } from "react-toast-notifications";


const NotificationDropdown = (props) => {
  const {addToast} = useToasts();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const [showModal, setShowModal] = React.useState(false);
  let history = useHistory();

  const openDropdownPopover = (props) => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const handleEdit = (e, edit,title) => {
    if (edit&&title==='property') {
      history.push(`properties/edit?id=${props.id}`);
    }
    else if(edit&&title==='owner'){
      history.push(`owners/edit?id=${props.id}`);
    }
    else if(edit&&title==='user'){
      history.push(`users/edit?id=${props.id}`);
    }
  };

  const handleDelete = () => {
    setShowModal(true);
    closeDropdownPopover();
  };
 
  const onConfirm = (e,id,title) => {
   
    if (title==='property') {
      var property_id = [];
    property_id.push(id);
    let token = localStorage.getItem("token");
      axios
      .delete(
        `${Appconfig.baseurl}/organizations/properties?property_id=${id}`,
        {
          headers: {
            Authorization: "token " + token,
          },
          property_id,
        }
      )
      .then((response)=>{
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
          });
    }
    else if(title==='owner'){
      var user_id = [];
      user_id.push(id);
    let token = localStorage.getItem("token");
      axios
      .delete(
        `${Appconfig.baseurl}/accounts/users?user_id=${id}`,
        {
          headers: {
            Authorization: "token " + token,
          },
          user_id,
        }
      )
      .then((response)=>{
        if(response.data.status
        ===
       "Error"){
         addToast(response.data.message,{appearance:'error',autoDismiss:true})
       }
       else{
         history.push("/admin/owner");
         addToast(response.data.message,{appearance:'success',autoDismiss:true})
       }           
       })
       .catch((error) => {
         console.log(error);
       })  
    }
    else if(title==='user'){
      var user_id = [];
      user_id.push(id);
      let token = localStorage.getItem("token");
      axios
      .delete(
        `${Appconfig.baseurl}/accounts/users?user_id=${id}`,
        {
          headers: {
            Authorization: "token " + token,
          },
          user_id,
        }
      )
      .then((response)=>{
        if(response.data.status
        ===
       "Error"){
         addToast(response.data.message,{appearance:'error',autoDismiss:true})
       }
       else{
         history.push("/admin/users");
         addToast(response.data.message,{appearance:'success',autoDismiss:true})
       }           
       })
       .catch((error) => {
         console.log(error);
       })     
    }
    
  };

  const handleSLots = () => {
    history.push(`properties/slots?id=${props.id}`);
  };
  const handleBookings = () => {
    history.push(`properties/bookings?id=${props.id}`);
  };
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          style={{ color: "green" }}
          className={
            "tr text-green-600 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-700"
          }
          onClick={(e) => handleEdit(e, props.id,props.title)}
        >
          EDIT
        </button>
        <button
          style={{ color: "gray" }}
          className={
            " tr flex justify-center text-black active:bg-green-600 text-sm  my-4 py-2  font-normal block w-full whitespace-nowrap bg-transparent text-white-700"
          }
          onClick={handleSLots}
        >
          SLOTS
        </button>
        <button
          style={{ color: "gray" }}
          className={
            " tr flex justify-center text-black active:bg-green-600 text-sm  my-4 py-2  font-normal block w-full whitespace-nowrap bg-transparent text-white-700"
          }
          onClick={handleBookings}
        >
          BOOKINGS
        </button>
        <button
          style={{ color: "red" }}
          className={
            " tr flex justify-center text-black active:bg-red-600 text-sm  my-4 py-2  font-normal block w-full whitespace-nowrap bg-transparent text-white-700"
          }
          onClick={handleDelete}
        >
          DELETE
        </button>
        <button
          style={{ color: "gray" }}
          className={
            " tr flex justify-center text-black active:bg-green-600 text-sm  my-4 py-2  font-normal block w-full whitespace-nowrap bg-transparent text-white-700"
          }
          onClick={closeDropdownPopover}
        >
          CLOSE
        </button>
      </div>
      {showModal && (
        <div className="modal-backdrop">
          {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto  inset-0 z-50 outline-none focus:outline-none"
                // onClick={() => setShowModal(false)}
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
                        PROPERTY DELETE
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
                        onClick={(e)=>onConfirm(e,props.id,props.title)}
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
    </>
  );
};

export default NotificationDropdown;

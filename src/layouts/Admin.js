// import React, { useState,useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// import axios from "axios";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
// import CardProfile from "components/Cards/CardProfile";
import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
// import Settings from "views/admin/Settings.js";
// import Tables from "views/admin/Tables.js";
import AddProperty from "components/Forms/AddProperty";
import AddOwner from "components/Forms/AddOwner";
import AddUser from "components/Forms/AddUser";
import Property from "components/Pages/Property";
import Owner from "components/Pages/Owner";
import User from "components/Pages/User";
import EditProperty from "components/Forms/EditProperty";
import Register from "views/auth/Register.js";
import Slots from "components/Forms/Stepper3";
import Calender from "components/calender/calender"
import Editowner from "components/Forms/Editowner";
import Edituser from "components/Forms/Edituser";

// import  OwnerCreate  from "components/Forms/ownerCreate";

export default function Admin() {

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        {/* <HeaderStats /> */}
        {/* Header */}
        <div 
        //className="px-4 md:px-10 mx-auto w-full -m-24"
        >
          <Switch>
          <Route path="/admin/properties/add" exact component={ AddProperty } />   
          <Route path="/admin/owner/add" exact component={AddOwner}   />
          <Route path="/admin/users/add" exact component={AddUser}   />
          <Route path="/admin/properties/edit" exact component={EditProperty}/>
          <Route path="/admin/owners/edit" exact component={Editowner}/>
          <Route path="/admin/users/edit" exact component={Edituser}/>
          <Route path="/admin/properties/slots" exact component={Slots}/>
          <Route path="/admin/properties/bookings" exact component={Calender}/>

          {/* <Route path="/auth/register" exact component={Register} /> */}

      
        
            <div >  
            <AdminNavbar />

            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full -m-24"> 
            <Route path="/admin/dashboard" exact component={Dashboard}  />
            <Route path="/admin/maps" exact component={Maps} />
              {/*<Route path="/admin/settings" exact component={Settings} /> */}
            <Route path="/admin/owner" exact component={() => <Owner  />} />
            <Route path="/admin/properties" exact  component={() => <Property />}  />
          
            <Route path="/admin/users" exact component={() => <User  />} />
            
            <Route path="/admin/bookings" exact component={() => <Calender  />} />

            {/* <Route path="/admin/bookings" exact component={() => <Tables  />} /> */}
             
            <FooterAdmin />

            </div>
            {/* <FooterAdmin /> */}
            </div>
            {/* <Route path="/admin/tables" exact component={Tables} /> */}

            {/* <Redirect from="/" to="/admin/dashboard" /> */}
          </Switch>
          
        </div>
      </div>
    </>
  );
}

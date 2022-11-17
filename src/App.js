import { useState } from "react";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
export const myContext = React.createContext();

export default function App() {
    const [login,setLogin]=useState(localStorage.getItem('token')?true:false)
    
  return (
    <>
      <myContext.Provider  value={setLogin}>
        <Switch>
          {/* add routes with layouts */}

          <Route path="/login" exact  render={(props) => <Auth Register={false} {...props}/>} />
          <Route path="/register" exact  render={(props) => <Auth Register={true} {...props}/>} />

          {login && (
            <Route path="/" component={Admin} />
          )}
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          {/* <Route path="/amin" exact component={Admin} />  */}
          {/* add redirect for first page */}
          {login ? (
            <Redirect from="/" to="/" />
          ) : (
            <Redirect from="*" to="/login" />
          )}
        </Switch>
      </myContext.Provider>
    </>
  );
}

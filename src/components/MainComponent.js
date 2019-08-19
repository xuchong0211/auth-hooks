import React from "react";
import logo from "../logo.svg";
import { useAuth } from "../auth/user-auth";

function MainComponent() {
  const auth = useAuth();
  console.log("auth..............", auth);
  const { loading, user, signin, signout, signup } = auth;
  const isLoggin = !!user;
  console.log("isLoggin................", isLoggin);
  if (loading) {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    );
  }
  return (
    <div>
      {isLoggin && (
        <div>
          <h3>Hello, {user.email}</h3>
        </div>
      )}
      <div>
        <button
          onClick={() => {
            if (isLoggin) {
              signout();
            } else {
              // signin("hmily02@gmail.com", "45682968pP");
              signin("11200229@qq.com", "123456");
            }
          }}
        >
          {isLoggin ? "Sign out" : "Sign In"}
        </button>
      </div>
      {!isLoggin && (
        <div>
          <button onClick={() => signup()}>{"Sign up"}</button>
        </div>
      )}
    </div>
  );
}

export default MainComponent;

import { useState, useRef, useEffect } from "react";
import className from "classnames/bind";
import style from "./login.module.scss";
import FormGroup from "../../../compoments/FormGroup";
import Validation from "../../../validation/index";
const cx = className.bind(style);
function Login() {
 
  const inputRef = useRef(null);
 
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const rule = inputRef.current;
     
    //
    Validation(rule, {
      onSubmit: function (data) {
        
      },
    });
  }, []);
  return (
    
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h3>Login</h3>
      </div>
      <div className={cx("form-header")}>
        <form
          action=""
          method="POST"
          className={cx("form")}
          ref={inputRef}
          id="login-form"
        >
          <FormGroup
            _type={"email"}
            _name={"email"}
            _id={"email"}
            _placeholder={"emxample@kyanon.digital"}
            _Rules={"require|email"}
          >
            <h4>Email: </h4>
          </FormGroup>
          <FormGroup
            _type={"password"}
            _name={"password"}
            _id={"password"}
            _placeholder={"******"}
            _Rules={"require|min:6"}
          >
            <h4>Password: </h4>
          </FormGroup>
          <div className={cx("form-action")}>
            <input className={cx("checkbox")} type="checkbox"></input>
            <span className={cx("show-password")}> Show Password</span>
            <button className={cx("btn-action")}>Sign in</button>
          </div>
          <div className={cx('message')} style={{
            color:"red",
            textAlign:"center",
            marginTop:"20px"
          }}></div>
        </form>
      </div>
    </div>
   
  );
}

export default Login;

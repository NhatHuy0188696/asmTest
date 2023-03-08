import { useState, useRef, useEffect } from "react";
import className from "classnames/bind";
import style from "./profile.module.scss";
import FormGroup from "../../../compoments/FormGroup";
import Validation from "../../../validation/index";

const cx = className.bind(style);

function Profile() {
 
  const LocalStores = JSON.parse(localStorage.getItem('login'))
  
  console.log(localStorage)
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const rule = inputRef.current;
    Validation(rule);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h3>Profile</h3>
      </div>
      <div className={cx("form-header")}>
        <form
          action=""
          method="POST"
          className={cx("form")}
          id="login-form-2"
          ref={inputRef}
          
        >
          <FormGroup
         
            _type={"text"}
            _name={"name-profile"}
            _id={"name-profile"}
           
            _Rules={"require"}
            _value={LocalStores ? LocalStores.Fullname : '' }
          >
            <h4>Full name: </h4>
          </FormGroup>
          <FormGroup
            _type={"text"}
            _name={"date-profile"}
            _id={"date-profile"}
           
            _Rules={"require"}
            _value={LocalStores ? LocalStores.dayofbirth : ''}
          >
            <h4>Day of Birth: </h4>
          </FormGroup>
          <FormGroup
            _type={"email"}
            _name={"email-profile"}
            _id={"email-profile"}
            _placeholder={"Email"}
            _Rules={"require|email"}
            _value={LocalStores ? LocalStores.Email : '' }
          >
            <h4>Email: </h4>
          </FormGroup>
          <FormGroup
            _type={"number"}
            _name={"number-profile"}
            _id={"number-profile"}
            _placeholder={"number"}
            _Rules={"require|min:10"}
            _value={LocalStores ? LocalStores.phone : ''}
          >
            <h4>Number Phone: </h4>
          </FormGroup>
          <div className={cx("form-action")}>
            <button className={cx("btn-action")}>Update</button>
            <button className={cx("btn-cancel")}>cancel</button>
          </div>
          <div
            className={cx("message")}
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
            }}
          ></div>
        </form>
      </div>
    </div>
  );
}

export default Profile;

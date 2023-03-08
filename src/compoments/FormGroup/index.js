import className from "classnames/bind";
import style from "./FormGroup.module.scss";
import {useState} from 'react'
const cx = className.bind(style);


function FormGroup({
  _type = "",
  _name = "",
  _id = "",
  _placeholder = "",
  _Rules= '',
  _value,
  children,
  onUpdate
}) {
  const [_valueItem, Setvalue] = useState(_value|| "");
  return (
    
    <div className={cx("main",['form-select'])}>
      {children}
      <div className={cx("form-group")}>
        <input
        onChange={e => Setvalue(e.target.value)}
      
          type={_type}
          name={_name}
          id={_id}
          placeholder={_placeholder}
          rules={_Rules}
         value={_valueItem|| ''}
        ></input>
      </div>
      <span className={cx('form-message')} style={{
        color:"red",
        display: "block",
        marginTop:"12px",
        marginLeft:"6px"
        }}></span>
    </div>
  );
}

export default FormGroup;

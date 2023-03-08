import className from "classnames/bind";
import style from "./FormLayout.module.scss";
import Login from './Login'
import  Profile from './Profile'
const cx = className.bind(style);

function FormLayout() {
  return (
    <div className={cx("wrapper")}>
       <Login></Login>
        <Profile></Profile>
  
    </div>
       
      
    
  );
}

export default FormLayout;

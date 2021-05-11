import React from "react";
import investigates from "../../assets/investigates.svg";
import iconExit from "../../assets/iconExit.svg";

const SubMenu = ({ onExit }) => {
  return (
    <div className="sub-menu">
      <span className="triangle"></span>
      <span className="sub-menu-content">
        <img src={investigates} />
        <a
          href={
            process.env.REACT_APP_HREF_INV ? process.env.REACT_APP_HREF_INV : ""
          }
        >
          Расследования
        </a>
      </span>
      <span className="sub-menu-content" onClick={onExit}>
        <img src={iconExit} />
        Выйти
      </span>
    </div>
  );
};

export default SubMenu;

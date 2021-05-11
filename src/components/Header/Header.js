import React from "react";
import photo from "../../assets/photo.svg";
import settings from "../../assets/settingsicon.svg";
import SubMenu from "../SubMenu/SubMenu";
import { connect } from "react-redux";
import { logout } from "../../store/actions/actionAuth";

const Header = (props) => {
  return (
    <div className="header">
      <div className="label">Клиент TraceDoc</div>
      <div className="avatar-block">
        <span style={{ marginRight: "15px" }}>{props.login}</span>
        <img style={{ marginRight: "15px" }} src={photo} />
        <span className="settings">
          <img style={{ cursor: "pointer" }} src={settings} />
          <SubMenu onExit={props.logout} />
        </span>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    login: state.auth.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

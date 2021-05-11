import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Documents from "./containers/Documents/Documents";
import { connect } from "react-redux";
import Auth from "./containers/Auth/Auth";
import { isAuth } from "./helpers";
import { restoreStorage } from "./store/actions/actionAuth";

class App extends Component {
  componentDidMount() {
    const { restoreStorage } = this.props;
    restoreStorage();
  }

  render() {
    const { login, password } = this.props;
    return (
      <div className="App">
        {isAuth() && login && password ? (
          <>
            <Header />
            <Content>
              <Documents />
            </Content>
          </>
        ) : (
          <Auth />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    password: state.auth.password,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    restoreStorage: () => dispatch(restoreStorage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

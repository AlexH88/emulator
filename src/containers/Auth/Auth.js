import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import { auth } from "../../store/actions/actionAuth";

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      login: {
        value: "",
        type: "text",
        label: "Логин",
        errorMessage: "Введите корректный login",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 3,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введите корректный пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 3,
        },
      },
    },
  };

  loginHandler = () => {};

  submitHandler = (event) => {
    event.preventDefault();
    let login = this.state.formControls.login.value;
    let password = this.state.formControls.password.value;
    this.props.auth(login, password);
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.login) {
      isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="auth">
          <div className="auth-wrap">
            <form onSubmit={this.submitHandler}>
              {this.renderInputs()}

              <Button type="success" disabled={!this.state.isFormValid}>
                Авторизоваться
              </Button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (login, password) => dispatch(auth(login, password)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);

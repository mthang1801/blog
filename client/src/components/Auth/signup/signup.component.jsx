import React from "react";
import {
  FormContainer,
  FormHeader,
  Title,
  SubTitle,
  FormGroups,
  ButtonGroups
} from "../auth.styles";
import CustomInput from "../../UI/custom-input/custom-input.component";
import {Button} from "@material-ui/core"
import Spinner from "../../spinner/spinner.component"
const INITIAL_STATE = {
  controls: {
    name: {
      type: "text",
      name: "name",
      valid: false,
      label: "Name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    email: {
      type: "email",
      name: "email",
      valid: false,
      label: "Email",
      validation: {
        required: true,
        isEmail: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    password: {
      type: "password",
      name: "password",
      label: "Password",
      valid: false,
      validation: {
        required: true,
        minLength: 6,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
    confirmPassword: {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
      valid: false,
      validation: {
        required: true,
        minLength: 6,
        match: true,
      },
      value: "",
      touched: false,
      validationErrors: "",
    },
  },
  formIsValid: false,
  loaded: false,
  disabled: true,
  loading : false 
};


class Signup extends React.Component {
  state = { ...INITIAL_STATE };
  checkValidity = (value, rules) => {
    let isValid = true;
    let errorsMessage = [];
    if (rules.required) {
      isValid = value.trim().length && isValid;
      if (!isValid) {
        errorsMessage.push("This field is required");
      }
    }
    if (rules.isEmail) {
      const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
      if (!isValid) {
        errorsMessage.push("Email is invalid");
      }
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
      if (!isValid) {
        errorsMessage.push(`Invalid, at least ${rules.minLength} characters`);
      }
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
      if (!isValid) {
        errorsMessage.push(`Invalid, at most ${rules.maxLength} characters`);
      }
    }
    if (rules.match) {
      isValid = value.trim() === this.state.controls.password.value && isValid;
      if (!isValid) {
        errorsMessage.push("Password and confirm Password do not match");
      }
    }
    return errorsMessage;
  };
  handleChange = (e, name) => {
    let updatedControls = { ...this.state.controls };
    let updatedControlElement = { ...updatedControls[name] };
    updatedControlElement.value = e.target.value;
    const checkValid = this.checkValidity(
      e.target.value,
      updatedControlElement.validation
    );
    updatedControlElement.valid = checkValid.length === 0;
    updatedControlElement.touched = true;
    updatedControlElement.validationErrors = checkValid;
    updatedControls[name] = updatedControlElement;
    let { email, password, confirmPassword } = updatedControls;
    const formIsValid =
      email.valid &&
      updatedControlElement.valid &&
      password.valid &&
      confirmPassword.valid;
    this.setState({ controls: updatedControls, formIsValid });
  };

  handleSubmit = async (e) => {   
    this.setState({loading : true}) 
    e.preventDefault()
    
    let {name, email , password} = this.state.controls 
    name = name.value ;
    email = email.value ;
    password = password.value ; 
    try{
      const {data : {createUser : {token}}} = await this.props.createUser({variables : {data : {
        name,
        email,
        password
      }}})
      localStorage.setItem("token", token)
      localStorage.setItem("expireDate", new Date(Date.now() + 60*60*1000))
    }catch(err){
      console.log(err)
    }
    
  }
  render() {
    const { formIsValid , disabled} = this.state;
    const keysFormInput = Object.keys(this.state.controls).map(
      (key) => this.state.controls[key]
    );      
    if(this.state.loading)
      return <Spinner/>
    return (
      <FormContainer onSubmit={this.handleSubmit}>
        <FormHeader>
          <Title>Sign Up</Title>
          <SubTitle>Sign up your account via email and password.</SubTitle>
        </FormHeader>
        <FormGroups>
          {keysFormInput.map(
            ({
              name,
              label,
              touched,
              type,
              valid,
              validation,
              validationErrors,
              value,
            }) => (
              <CustomInput
                key={name}
                type={type}
                name={name}
                value={value}
                label={label}
                touched={touched}
                valid={valid}
                require={validation.required}
                touched={touched}
                validationErrors={validationErrors}
                onChange={e => this.handleChange(e,name)}
              />
            )
          )}
          <ButtonGroups>
          <Button
            variant="contained" 
            color="primary"                   
            disabled={!formIsValid} 
            onClick={this.handleSubmit}           
          >
            Submit
          </Button>
          </ButtonGroups>
        </FormGroups>
      </FormContainer>
    );
  }
}

export default Signup;

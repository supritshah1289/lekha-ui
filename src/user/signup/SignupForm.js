import React, { useState } from "react";
import { signup } from "../../util/APIUtils";
import { toast } from "react-toastify";

function SignupForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(Object.assign({}, data));

    const signUpRequest = Object.assign({}, data);

    signup(signUpRequest)
      .then((response) => {
        toast.success(
          "You're successfully registered. Please login to continue!"
        );
        this.props.history.push("/login");
      })
      .catch((error) => {
        toast.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={data.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={data.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={data.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-item">
        <button type="submit" className="btn btn-block btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default SignupForm;

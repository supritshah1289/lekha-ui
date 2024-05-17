import React, { useState, useRef, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { toast } from "react-toastify";
import { login } from "../../util/APIUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginForm() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {});

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   const loginRequest = Object.assign({}, data);

  //   login(loginRequest)
  //     .then((response) => {
  //       localStorage.setItem(ACCESS_TOKEN, response.accessToken);
  //       toast.success("You're successfully logged in!");
  //       if (response.accessToken) {
  //         console.log("navigating......");
  //         console.log("response: " + JSON.stringify(response));
  //         navigate("/profile");
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(
  //         (error && error.message) ||
  //           "Oops! Something went wrong. Please try again!"
  //       );
  //     });
  // }

  const handleSubmit = async (e) => {
    console.log(
      "Submitting................................................................"
    );
    e.preventDefault();
    try {
      const userData = await login(data).unwrap();
      console.log(userData);
      setData({});
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;

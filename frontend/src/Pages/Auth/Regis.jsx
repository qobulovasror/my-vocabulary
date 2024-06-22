import { useState } from "react";
import { Link } from "react-router-dom";
import {
  hindConfPass,
  hindEmail,
  hindPass,
} from "../../validator/emailValidator";
import { toast } from "react-toastify";

const Regis = (props) => {
  const { setUser, setToken } = props;
  const [errTxt, setErrTxt] = useState({
    email: [],
    password: [],
    confPass: [],
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setErrTxt({ ...errTxt, email: hindEmail(e.target.value) });
    }
    if (e.target.name === "password") {
      setErrTxt({ ...errTxt, password: hindPass(e.target.value) });
    }
    if (e.target.name === "confPassword") {
      setErrTxt({
        ...errTxt,
        confPass: hindConfPass(e.target.value, formData.password),
      });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !(
        errTxt.email.length === 0 &&
        errTxt.password.length === 0 &&
        errTxt.confPass.length === 0
      )
    ) {
      if (errTxt.email) toast.error(errTxt.email[0]);
      if (errTxt.password) toast.error(errTxt.password[0]);
      if (errTxt.confPass) toast.error(errTxt.confPass[0]);
      return;
    }
    if (formData.name.length < 3) return toast.error("Your name is invalid");
    try {
      const respons = await fetch('http://localhost:5000/api/user', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
        })
      })
      respons.json().then(res=>{
        console.log(res);
        if(res.ok===false){
          console.log("err: ",res);
          toast.error(res.message)
          return;
        }
        setUser({name: res.name, email: res.email, role: res.role})
        setToken(res['x-auth-token'])
        window.localStorage.setItem('user-auth', res['x-auth-token'])
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-5">
            <div className="card p-4">
              <h2 className="text-center">Sign Up</h2>
              <form onSubmit={(e) => submitHandler(e)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                    onChange={changeHandler}
                    value={formData.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    placeholder="Enter your email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    onChange={changeHandler}
                    value={formData.email}
                  />
                  {errTxt.email && (
                    <ul id="emailHelp" className="form-text">
                      {errTxt.email.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-light"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    name="password"
                    onChange={changeHandler}
                    value={formData.password}
                  />
                  {errTxt.password && (
                    <ul id="emailHelp" className="form-text">
                      {errTxt.password.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPass" className="form-label">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-light"
                    id="confirmPass"
                    placeholder="Re-enter your password"
                    name="confPassword"
                    onChange={changeHandler}
                    value={formData.confPassword}
                  />
                  {errTxt.confPass && (
                    <ul id="emailHelp" className="form-text">
                      {errTxt.confPass.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="text-center p-1">
                  By creating an account, you agree to the Terms of Service and
                  Privacy Policy.
                </p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={(e) => submitHandler(e)}
                >
                  CREATE A NEW ACCOUNT
                </button>
                <p
                  className="d-block text-center p-3 text-primary"
                  style={{ fontSize: "20px" }}
                >
                  Have an accaunt? <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Regis;
import { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { hindEmail } from "../../validator/emailValidator";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [errTxt, setErrTxt] = useState({
    email: [],
  });

  const changeHandler = (e) => {
    setEmail(e.target.value);
    if (e.target.name === "email") {
      setErrTxt({ ...errTxt, email: hindEmail(e.target.value) });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.length < 3) return toast.error("email is invalid");
    try {
      const respons = await fetch('http://localhost:5000/api/reset', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
        })
      })
      respons.json().then(res=>{
        if(res.ok===false){
          toast.error(res.message)
          return;
        }
      })
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-5">
            <div className="card p-4">
              <h2 className="text-center">Reset Password</h2>
              <p>
                Please enter the email address that you used to register, and we
                will send you an email with a link to reset your password.
              </p>
              <form onSubmit={submitHandler}>
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
                    value={email}
                  />
                  {errTxt.email && (
                    <ul id="emailHelp" className="form-text">
                      {errTxt.email.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={submitHandler}
                >
                  Reset my password
                </button>
                <p
                  className="d-block text-center p-3 text-primary"
                  style={{ fontSize: "20px" }}
                >
                  Return to {" "}
                  <Link to="/login">Sign In</Link>
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

export default Reset;
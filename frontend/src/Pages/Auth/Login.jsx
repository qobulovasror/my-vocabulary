import { useState } from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify'
import {
  hindEmail,
  hindPass,
} from "../../validator/emailValidator";

const Login = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setUser, setToken } = props;
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errTxt, setErrTxt] = useState({
    email: [],
    password: [],
  });
  
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setErrTxt({ ...errTxt, email: hindEmail(e.target.value) });
    }
    if (e.target.name === "password") {
      setErrTxt({ ...errTxt, password: hindPass(e.target.value) });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.email.length < 3) return toast.error("email is invalid");
    if (formData.password.length < 8) return toast.error("password is invalid");
    try {
      const respons = await fetch('http://localhost:5000/api/auth', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase(),
          password: formData.password,
        })
      })
      respons.json().then(res=>{
        if(res.ok===false){
          toast.error(res.message)
          return;
        }
        setUser({name: res.name, email: res.email, role: res.role})
        setToken(res['x-auth-token'])
        window.localStorage.setItem('user-auth', res['x-auth-token'])
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
              <h2 className="text-center">Sign In</h2>
              <form onSubmit={(e) => submitHandler(e)}>
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
                    onChange={changeHandler}
                    value={formData.email}
                    name="email"
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
                    type={showPass? "text" : "password"}
                    className="form-control bg-light"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    onChange={changeHandler}
                    value={formData.password}
                    name="password"
                  />
                </div>
                {errTxt.password && (
                    <ul id="emailHelp" className="form-text">
                      {errTxt.password.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onChange={()=>setShowPass(!showPass)}
                    value={showPass}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    show password
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </button>
                <Link to="/reset" className="d-block text-center p-3">Forgot password?</Link>
                <Link
                  className="btn"
                  style={{ width: "100%", boxShadow: "0 0 4px 0" }}
                  to="/regis"
                >
                  CREATE AN ACCOUNT
                </Link>
              </form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
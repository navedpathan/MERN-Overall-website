import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import signpic from '../images/signpic.png'

const SignUp = () => {

  const history = useHistory();

  const [user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    
    const { name, email, phone, work, password, cpassword } = user;
    
    const res = await fetch("/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });
    
    const data = await res.json();
    
    if(res.status == 422 || !data) {
      window.alert("Invalid Registration");
    }
    else {
      window.alert("Successfully Registration");
      history.push("/login")
    }
  }

  return (
    <>
      <section className="vh-100 p-md-2">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p className="text-left h2 fw-bold mb-4 mx-md-4">Sign up</p>

                      <form method='POST' className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" name='name' className="control" value={user.name} onChange={handleInputs} placeholder='Your Name' />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" name='email' id="form3Example3c" className="control" value={user.email} onChange={handleInputs} placeholder='Your Email' />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-phone fa-lg me-3 fa-fw fa-flip-horizontal"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="number" name='phone' id="form3Example4c" className="control" value={user.phone} onChange={handleInputs} placeholder='Mobile Number' />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-briefcase fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" name='work' id="form3Example1c" className="control" value={user.work} onChange={handleInputs} placeholder='Your Profession' />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" name='password' id="form3Example4c" className="control" value={user.password} onChange={handleInputs} placeholder='Password' />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" name='cpassword' id="form3Example4cd" className="control" value={user.cpassword} onChange={handleInputs} placeholder='Confirm your password' />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-left mb-4">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-left mb-4">
                          <button type="submit" name='signup' className="btn btn-primary btn-lg" onClick={PostData}>Register</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <div className="signup-img ml-5">
                        <figure>
                          <img src={signpic} alt="registration pic" />
                        </figure>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp
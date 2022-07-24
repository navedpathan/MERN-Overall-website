import React, { useState, useContext } from 'react';
import logpic from '../images/logpic.png'
import { useHistory, NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {

  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data = await res.json();

    if(res.status == 400 || !data) {
      window.alert("Invalid Credientials");
    }
    else {
      dispatch({type:"USER", payload:true});
      window.alert("User Login Successfully");
      history.push("/");
    }

  }

  return (
    <>
    <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">

      <div className="login-img mt-1">
                 <figure>
                   <img src={logpic} alt="login pic" />
                 </figure>
      </div>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

        <form method='POST'>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center h2 fw-bold mx-1 mb-0">Login</p>
          </div>

          {/* <!-- Email input --> */}
          <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" name='email' id="form3Example3c" className="control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your Email'/>
                    </div>
                  </div>

          {/* <!-- Password input --> */}
          <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name='password' id="form3Example4c" className="control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                    </div>
                  </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg" onClick={loginUser}>Login</button>

            <p className="large fw-bold mt-2 pt-1 mb-0">Don't have an account? 
            <NavLink to="/signup" className="link-danger"> Register</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Login
import React, { useState, useEffect, useContext } from 'react';
import '../css/About.css';
import profile from '../images/profile.jpg';
import profile2 from '../images/profile2.jpg';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const About = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {

    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json"
        },
        // credentials:"include"
      });

      const data = await res.json();
      dispatch({ type: "USER", payload: true });
      
      console.log(data);
      setUserData(data);
      
      if (!res.status == 200) {
        const err = new Error(res.err);
        throw err;
      }
    }
    catch (err) {
       console.log(err);
       history.push('/login');
    }
  }

  // useEffect(() => {
    callAboutPage();
  // }, []);

  return (
    <>

      {/* <!------ Include the above in your HEAD tag ----------> */}

      <div className="container emp-profile">
        <form method='GET'>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src={ userData.name == "Sheena Anil Bhardwaj" ? profile : profile2} alt="" />
                <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>
                { userData.name }
                </h5>
                <p className="proile-rating">RANKINGS : <span>7/10</span></p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>WORK LINK</p>
                <a href="https://www.youtube.com/" target="_taker">Youtube</a><br />
                <a href="https://www.instagram.com/" target="_taker">Instagram</a><br />
                <a href="https://www.linkedin.com/" target="_taker">Linkedin</a>
                <p>SKILLS</p>
                <a href="https://www.github.com/" target="_taker">Software Developer</a><br />
                <a href="https://www.github.com/" target="_taker">Web Developer</a><br />
                <a href="https://www.github.com/" target="_taker">Android Developer</a><br />
                <a href="https://www.github.com/" target="_taker">Machine Learning</a><br />
                <a href="https://www.github.com/" target="_taker">Digital Marketing</a><br />
                <a href="https://www.github.com/" target="_taker">Entrepreneurship</a><br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  {/* <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.id }</p>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.name }</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.email }</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.phone }</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{ userData.work }</p>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About
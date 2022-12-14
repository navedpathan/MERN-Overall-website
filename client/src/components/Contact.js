import React, { useEffect, useState, useContext } from 'react'
import '../css/Contact.css';
import { UserContext } from '../App';


const Contact = () => {
    const { state, dispatch } = useContext(UserContext);

  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

  const userContact = async () => {

    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      dispatch({ type: "USER", payload: true });

      console.log(data);
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

      if (res.status !== 200) {
        const err = new Error(res.err);
        throw err;
      }
    }
    catch (err) {
       console.log(err);
    }
  }

  useEffect(() => {
    userContact();
  }, []);

//   storing data in states

   const handleInputs = (e) => {
       const name = e.target.name;
       const value = e.target.value;

       setUserData({ ...userData, [name]:value});
   }

//    send the data to Backend

  const contactForm = async (e) => {
      e.preventDefault();

      const { name, email, phone, message } = userData;
      
      const res = await fetch('/contact', {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
              name, email, phone, message
          })
      });

      const data = await res.json();

      if(res.status == 400 || !data) {
          window.alert("please filled the message");
      }
      else {
          window.alert("message sent successfully");
          setUserData({ ...userData, message:"" });
      }
  }

  return (
    <>
     <div className="contact_info">
     <div className="container">
         <div className="row">
             <div className="col-lg-10 offset-lg-1">
                 <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                     {/* <!-- Contact Item --> */}
                     <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                         <div className="contact_info_image"><img src="https://img.icons8.com/office/24/000000/iphone.png" alt=""/></div>
                         <div className="contact_info_content">
                             <div className="contact_info_title">Phone</div>
                             <div className="contact_info_text">+91 9876 543 2198</div>
                         </div>
                     </div> 
                     {/* <!-- Contact Item --> */}
                     <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                         <div className="contact_info_image"><img src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png" alt=""/></div>
                         <div className="contact_info_content">
                             <div className="contact_info_title">Email</div>
                             <div className="contact_info_text">contact@bbbootstrap.com</div>
                         </div>
                     </div>
                      {/* <!-- Contact Item --> */}
                     <div className="contact_info_item d-flex flex-row align-items-center justify-content-start">
                         <div className="contact_info_image"><img src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png" alt=""/></div>
                         <div className="contact_info_content">
                             <div className="contact_info_title">Address</div>
                             <div className="contact_info_text">298,Menlo Park,CA,USA</div> 
                         </div>
                 </div>
             </div>
         </div>
     </div>

 {/* <!-- Contact Form --> */}
 <div className="contact_form">
     <div className="container">
         <div className="row">
             <div className="col-lg-10 offset-lg-1">
                 <div className="contact_form_container">
                     <div className="contact_form_title">Get in Touch</div>
                     <form method='POST' id="contact_form">
                         <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between"> <input type="text" id="contact_form_name" className="contact_form_name input_field"
                         name="name"
                         value={userData.name}
                         onChange={handleInputs} placeholder="Your name" required="required" data-error="Name is required."/> 
                         
                         <input type="text" id="contact_form_email" className="contact_form_email input_field"
                         name="email"
                         value={userData.email}
                         onChange={handleInputs} placeholder="Your email" required="required" data-error="Email is required."/> 
                         
                         <input type="text" id="contact_form_phone" className="contact_form_phone input_field"
                         name="phone"
                         value={userData.phone}
                         onChange={handleInputs} placeholder="Your phone number"/> 
                         </div>
                         
                         <div className="contact_form_text"> <textarea id="contact_form_message" className="text_field contact_form_message"
                         name="message"
                         value={userData.message}
                         onChange={handleInputs} rows="4" placeholder="Message" required="required" data-error="Please, write us a message."></textarea> </div>
                         
                         <div className="contact_form_button"> <button type="submit" className="button contact_submit_button"
                         onClick={contactForm}>Send Message</button> </div>
                     </form>
                 </div>
             </div>
         </div>
     </div>
     </div>
     </div>
     </div>
    </>
  )
}

export default Contact
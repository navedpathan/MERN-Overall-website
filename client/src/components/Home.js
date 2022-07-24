import React, { useEffect, useState } from 'react'
import '../css/App.css'

const Home = () => {

  const [username, setUsername] = useState('');
  const [show, setShow] = useState(false);

  const userHomePage = async () => {

    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      console.log(data);
      setUsername(data.name);
      setShow(true);
    }
    catch (err) {
       console.log(err);
    }
  }

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
    <div className="home-page"></div>
        <h6>WELCOME</h6>
        <p className='home-text'>{username}</p>
        <h4>{ show ? 'Happy, to see u back !' : 'We are the ActionTaker !'}</h4>
    </>
  )
}

export default Home
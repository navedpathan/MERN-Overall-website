import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
  return (
    <>
    <div className="page-wrap d-flex flex-row align-items-center" style={{minHeight: "85vh"}}>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12 text-center">
                <span className="display-1 d-block">404</span>
                <div className="mb-4 lead" style={{fontWeight:"300"}}>WE ARE SORRY, PAGE NOT FOUND!</div>
                <NavLink to='/' style={{fontWeight:"500"}}>Back to HomePage</NavLink>
            </div>
        </div>
    </div>
</div>

    </>
  )
}

export default Errorpage
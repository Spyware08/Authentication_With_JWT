import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='d-flex flex-column text-center p-5 border border-secondary-subtle rounded bg-light m-5'>
      <div>
        <h2 className=''>Welcome Here</h2>
      </div>
      <br /> <br />
      <div >
        <button type="button" className="btn btn-primary"><Link to="/signup" className='text-white text-decoration-none'>Signin</Link></button>
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-success"><Link to="/login" className='text-white text-decoration-none' >Login</Link></button>
      </div>
    </div>
  )
}

export default Landing
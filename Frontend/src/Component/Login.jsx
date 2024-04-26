import React, { useRef } from 'react'
import "./formstyle.css"
import API from '../API/api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate=useNavigate()

    const log_email = useRef()
    const log_password = useRef()

    async function handle_Submit(e) {
        e.preventDefault()
        if (log_email.current && log_password.current) {
            const log_data = {
                email: log_email.current.value,
                password: log_password.current.value
            }
            console.log(log_data);

            try{
              const res=  await API.post("/login",log_data)
             console.log(res.data);
             navigate("/home")

            } catch(e){
                console.log(e);

            }
        }
    }
    return (
        <div>

            <form className='login_form p-4'>
                <div className="mb-3">
                    <label className="form-label">User Email</label>
                    <input type="email" className="form-control" ref={log_email} id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" ref={log_password} id="exampleInputPassword1" />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handle_Submit}>Submit</button>
            </form>
        </div>
    )
}

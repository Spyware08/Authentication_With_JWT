import React, { useRef, useState } from 'react'
import "./formstyle.css"
import API from '../API/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {


    const navigate = useNavigate()
    
    const user_name = useRef(null)
    const pass_word = useRef(null)
    const u_email = useRef(null)
    const u_mob = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user_name.current && pass_word.current && u_email.current && u_mob.current) {
            const signup_data = {
                username: user_name.current.value,
                password: pass_word.current.value,
                email: u_email.current.value,
                mob: u_mob.current.value
            };
            console.log(signup_data);
            try {
                await API.post("/signup", signup_data).then(e => {
                    return navigate("/home")
                } )
            } catch (e) {
                if (e.response && e.response.status == 409) {
                    return res.send("useralready register")
                }
                return console.log(e);
            }
        }
    }

    return (
        <form action='/signup' method='post' className="row g-3 p-4 main_form">
            <div className="col-md-6">
                <label className="form-label">Username</label>
                <input type="text" name='username' className="form-control" ref={user_name} />
            </div>
            <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" name='password' className="form-control" ref={pass_word} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" ref={u_email} />
            </div>
            <div className="md-6">
                <label className="form-label">Mobile No.</label>
                <input type="number" name='mob' className="form-control" ref={u_mob} />
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Sign in</button>
            </div>
        </form>
    )
}

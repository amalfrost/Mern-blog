import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { UserModel } from '../models/userModel'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const navigate = useNavigate()

    const onRegister: SubmitHandler<UserModel> = async (data) => {
        console.log(data)
        registerUser(data)
    }
    const registerUser = async (data: UserModel) => {
        const registerRes = api.post("/auth/register", data)
        console.log(registerRes)
    }
    const INPUT_STYLE = "border-b-[1px] border-blue-600 w-full p-2 rounded hover";
    return (

        <div className='max-w-md mx-auto mt-10 p-6   shadow-blue-600   rounded-lg shadow' >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit(onRegister)} >
                <input className={INPUT_STYLE} type='email' placeholder='Email' {...register("email", {
                    required: true
                })} />
                <input className={INPUT_STYLE} type='password' placeholder='Password' {...register("password", {
                    required: true
                })} />
                <input className={INPUT_STYLE} type='text' placeholder='User Name' {...register("userName")} />
                <button type="submit" className="w-full mt-2 bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700" > Register </button>
            </form>
            <p className="bg-blue-600 mt-2 text-center cursor-pointer p-2 rounded text-white" onClick={() => navigate("/login")} > Already have an account? Login </p>
        </div>
    )
}

export default Register
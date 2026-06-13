import React, { useEffect } from 'react'
import { useForm, } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form";
import type { UserModel } from '../models/userModel'
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/axios';
import { setCredentials } from '../features/auth/authSlice';
import type { RootState } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>()
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<UserModel> = async (data) => {


        console.log("Form Submitted");

        const response = await login(data);
        dispatch(setCredentials(response))
        localStorage.setItem("userData", JSON.stringify(response.user))
        localStorage.setItem("token", JSON.stringify(response.token))

        // console.log(response);


    }

    const login = async (userData: UserModel) => {
        const response = await api.post("/auth/login", userData)

        // console.log(response.data)
        return response?.data
    }

    useEffect(() => {
        if (auth?.isAuthenticated) {
            navigate("/")
        }
    }, [auth])

    const INPUT_STYLE = 'border-b-[1px] border-blue-600 w-full p-2 rounded  hover:border-blue-700 '
    return (
        <div className="max-w-md mx-auto mt-10 p-6   shadow-blue-600   rounded-lg shadow">

            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <input className={INPUT_STYLE} placeholder="Email" type='text' {...register("email", {
                    required: true
                })} />
                <input className={INPUT_STYLE} placeholder="Password" type='text' {...register("password", {
                    required: true
                })} />

                <button
                    type="submit"
                    className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
            <p className='bg-blue-600 mt-2 text-center cursor-pointer p-2 rounded text-white' onClick={() => navigate("/register")} >Register</p>
        </div>
    )
}

export default Login
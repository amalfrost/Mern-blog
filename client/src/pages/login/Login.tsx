import React from 'react'
import { useForm, } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form";
import type { UserModel } from '../../models/userModel'


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>()
    const onSubmit: SubmitHandler<UserModel> = async (data) => {
        console.log(data)
    }

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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
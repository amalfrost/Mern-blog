import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { PostModel } from './postModel'
import api from '../../api/axios'

const CreatePost = () => {
    const user = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [submitData, setSubmitData] = useState([])
    useEffect(() => {
        if (!user.isAuthenticated) {
            console.log("Please login or register to create a post")
            navigate("/login")
        }
    }, [])

    const onCreate: SubmitHandler<PostModel> = async (data) => {
        const imagesArr = data.images
            .trim()
            .split("\n")
            .map(img => img.trim());

        const payload = {
            ...data,
            images: imagesArr
        };

        console.log(payload);

        api.post('/posts', payload).then(res => console.log(res))

        // await createPost(payload)
    };

    const INPUT_STYLE = "border-b-[1px] border-blue-600 w-full p-2 rounded hover";


    return (
        <>
            <form onSubmit={handleSubmit(onCreate)} >

                <input className={INPUT_STYLE} placeholder='Title' type='text' {...register("title")} />
                <input className={INPUT_STYLE} placeholder='excerpt' type='text' {...register("excerpt")} />
                <input className={INPUT_STYLE} placeholder='Content' type='text' {...register("content")} />
                <input className={INPUT_STYLE} placeholder='coverImage Url' type='text' {...register("coverImage")} />
                <textarea className={INPUT_STYLE} placeholder='images Url' type='text' {...register("images")} />

                <button type='submit' >Create</button>
            </form>
        </>
    )
}

export default CreatePost
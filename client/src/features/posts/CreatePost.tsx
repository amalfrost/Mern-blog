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
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md p-8">


                    <h1 className="text-3xl font-bold text-center mb-8">
                        Create New Post
                    </h1>

                    <form
                        onSubmit={handleSubmit(onCreate)}
                        className="space-y-6"
                    >
                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Title
                            </label>
                            <input
                                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter post title"
                                {...register("title", { required: true })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}

                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Excerpt
                            </label>
                            <textarea
                                rows={3}
                                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Short description of your article"
                                {...register("excerpt")}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Content
                            </label>
                            <textarea
                                rows={10}
                                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write your article here..."
                                {...register("content")}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Cover Image URL
                            </label>
                            <input
                                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://example.com/image.jpg"
                                {...register("coverImage")}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                Additional Images
                            </label>
                            <textarea
                                rows={4}
                                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter image URLs"
                                {...register("images")}
                            />
                        </div>

                        <button
                            type="submit"
                            className="
                w-full
                bg-blue-600
                text-white
                py-3
                rounded-lg
                font-medium
                cursor-pointer
                hover:bg-blue-700
                transition
            "
                        >
                            Publish Post
                        </button>
                    </form>

                </div>

            </div>

        </>
    )
}

export default CreatePost
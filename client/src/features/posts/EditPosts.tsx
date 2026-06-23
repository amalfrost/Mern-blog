import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/axios'
import type { PostModel } from './postModel'
import { useForm } from 'react-hook-form'

const EditPosts = () => {
    const { slug } = useParams()
    const [post, setPost] = useState<PostModel>([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    useEffect(() => {
        async function fetchPosts() {
            const res = await api.get(`/posts/slug/${slug}`);

            setPost(res.data.post)
            reset(res.data.post);
        }
        fetchPosts()
    }, [slug, reset])

    function onSubmit(data) {
        console.log(data)
        const imagesArr = []
        if (data.images.length > 1) {

            imagesArr = data.images?.trim().split("\n")
                .map(img => img.trim());
        }

        data.slug = ''
        const slug = ''
        const payload = { ...data, slug: slug, images: imagesArr }
        console.log(payload, 'payload')

        api.put(`/posts/${payload._id}`, payload).then(res => console.log(res))
    }
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md p-8">

                ```
                <h1 className="text-3xl font-bold mb-8 text-center">
                    Edit Post
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <input
                        placeholder="Title"
                        className="w-full border rounded-lg p-3"
                        {...register("title", { required: true })}
                    />

                    <input
                        placeholder="Excerpt"
                        className="w-full border rounded-lg p-3"
                        {...register("excerpt", { required: true })}
                    />

                    <input
                        placeholder="Cover Image URL"
                        className="w-full border rounded-lg p-3"
                        {...register("coverImage")}
                    />

                    <textarea
                        placeholder="Content"
                        rows={10}
                        className="w-full border rounded-lg p-3"
                        {...register("content", {
                            required: true,
                        })}
                    />

                    <textarea
                        placeholder="Images"
                        rows={4}
                        className="w-full border rounded-lg p-3"
                        {...register("images")}
                    />

                    <button
                        type="submit"
                        className="
                w-full
                bg-blue-600
                text-white
                py-3
                rounded-lg
                hover:bg-blue-700
                transition
                cursor-pointer
            "
                    >
                        Update Post
                    </button>
                </form>
            </div>

        </div>

    )
}

export default EditPosts
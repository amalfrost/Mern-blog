import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import type { PostModel } from '../features/posts/postModel'

const Post = () => {
    const { slug } = useParams()
    console.log(slug)
    const [post, setPost] = useState<PostModel>()

    useEffect(() => {
        async function fetchPosts() {
            const response = await api.get(`/posts/slug/${slug}`)
            // console.log(response.data)
            setPost(response.data.post)
        }
        fetchPosts()
    }, [slug])
    console.log(post)
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">


            <article className="bg-white rounded-xl shadow-md overflow-hidden">

                <img
                    src={post?.coverImage}
                    alt={post?.title}
                    className="w-full h-[400px] object-cover"
                />

                <div className="p-8">

                    <h1 className="text-4xl font-bold text-slate-900 mb-6">
                        {post?.title}
                    </h1>

                    <div className="border-b border-slate-200 mb-6 pb-4 flex justify-between">
                        <p className="text-sm text-slate-500">
                            By : {post?.author?.email}
                        </p>
                        <p className="text-sm text-slate-500">
                            Updated on : {new Date(post?.updatedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none text-slate-700 leading-8">
                        <p>{post?.content}</p>
                    </div>

                </div>

            </article>


        </div>

    )
}

export default Post
import { useEffect, useState } from 'react'
import api from '../../api/axios'
import type { PostModel } from './postModel'
import PostSideBar from './PostSideBar'
import { useNavigate } from 'react-router-dom'

const ShowPost = () => {
    // posts
    const [posts, setPosts] = useState<PostModel[]>([])
    const navigate = useNavigate()
    const getAllPosts = async () => {
        const response = await api.get("/posts")
        console.log(response.data)
        setPosts(response.data)
    }
    useEffect(() => {
        getAllPosts()
    }, [])
    function handlePostClick(slug) {
        console.log(slug)
        navigate(`/post/${slug}`)
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Posts Section */}
                <div className="lg:col-span-3 flex flex-col gap-8">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            onClick={() => handlePostClick(post.slug)}
                            className="
                    bg-white
                    rounded-xl
                    shadow-md
                    overflow-hidden
                    cursor-pointer
                    transition
                    duration-300
                    hover:shadow-xl
                    hover:-translate-y-1
                "
                        >{
                                /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(post?.coverImage || "") && (
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-64 object-cover"
                                    />
                                )
                            }

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                                    {post.title}
                                </h2>

                                <p className="text-slate-600 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <PostSideBar />
                </div>

            </div>

        </div>

    )
}

export default ShowPost
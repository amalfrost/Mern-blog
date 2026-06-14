import { useEffect, useState } from 'react'
import api from '../../api/axios'
import type { PostModel } from './postModel'
import PostSideBar from './PostSideBar'

const ShowPost = () => {
    // posts
    const [posts, setPosts] = useState<PostModel[]>([])
    const getAllPosts = async () => {
        const response = await api.get("/posts")
        console.log(response.data)
        setPosts(response.data)
    }
    useEffect(() => {
        getAllPosts()
    }, [])
    return (
        <div className='flex flex-col items-center gap-[10px] ' >
            <div>
                {posts.map(post => (
                    <div key={post._id}>
                        <h1>{post.title}</h1>
                        <img src={post.images[0]} />
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
            <PostSideBar />
        </div>
    )
}

export default ShowPost
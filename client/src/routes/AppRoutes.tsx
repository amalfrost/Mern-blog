import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import MainLayout from '../layouts/MainLayout'
import ShowPost from '../features/posts/ShowPost'
import Post from '../components/Post'
import CreatePost from '../features/posts/CreatePost'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="posts" element={<ShowPost />} />
                <Route path="createPosts" element={<CreatePost />} />
                <Route path="/post/:slug" element={<Post />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
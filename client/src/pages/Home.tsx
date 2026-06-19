import React from 'react';
import ShowPost from '../features/posts/ShowPost';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-slate-50">
            <section className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
                        Welcome to Bloggy
                    </span>

                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                        Share Ideas,
                        <br />
                        Inspire Minds.
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
                        Bloggy is a modern platform for writers, developers, and
                        creators to share knowledge, tell stories, and connect with
                        a community of curious readers. Publish your thoughts,
                        explore fresh perspectives, and grow your audience.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button onClick={() => navigate("/createPosts")} className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg font-medium">
                            Start Writing
                        </button>

                        <button onClick={() => navigate("/posts")}
                            className="px-6 py-3 cursor-pointer border  border-slate-300 rounded-lg font-medium text-slate-700">
                            Explore Blogs
                        </button>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">
                            Write Freely
                        </h3>
                        <p className="text-slate-600">
                            Create and publish articles on topics you are passionate
                            about, from technology and design to personal experiences.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">
                            Share Knowledge
                        </h3>
                        <p className="text-slate-600">
                            Help others learn through tutorials, insights, and
                            practical experiences from your journey.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-3">
                            Grow Together
                        </h3>
                        <p className="text-slate-600">
                            Join a community of readers and writers who value
                            meaningful content and continuous learning.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
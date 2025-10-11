import React, { useEffect, useState } from "react";
import heroPhone from "../assets/hero.png";
import { FaGooglePlay, FaApple, FaDownload, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Fetch app data from /public/api.json
    useEffect(() => {
        setLoading(true);
        fetch("/api.json")
            .then((res) => res.json())
            .then((data) => {
                // sort by downloads → trending top 8
                const sorted = [...data].sort((a, b) => b.downloads - a.downloads);
                setApps(sorted.slice(0, 8));
            })
            .catch((err) => console.error("Error fetching apps:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="w-full">
            {/* 🦸 Hero Section */}
            <section className="text-center py-16 px-6 bg-base-100">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    We Build{" "} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                        Productive 
                    </span>{" "}
                    Apps
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto mb-8">
                    At <span className="font-semibold text-primary">HERO.IO</span>, we
                    craft innovative apps that make everyday life simpler, smarter, and
                    more exciting. Our mission is to turn your ideas into digital
                    experiences that truly make an impact.
                </p>
                <div className="flex justify-center gap-4 mb-10">
                    <button className="btn btn-outline btn-primary flex items-center gap-2">
                        <FaGooglePlay /> <a href="https://play.google.com/store/games?hl=en"> Google Play </a>Google Play
                    </button>
                    <button className="btn btn-outline btn-primary flex items-center gap-2">
                        <FaApple /> <a href=" https://www.apple.com/in/app-store/"> App Store </a>
                    </button>
                </div>

                {/* 📱 Phone Image */}
                <div className="flex justify-center mb-12">
                    <img
                        src={heroPhone}
                        alt="App Preview"
                        className="max-w-[320px] md:max-w-[400px] drop-shadow-2xl"
                    />
                </div>
            </section>

            {/* 📊 Stats Section */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-12">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-8">
                        Trusted By Millions, Built For You
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-4xl font-bold">29.6M</h3>
                            <p>Total Downloads</p>
                            <p className="text-sm opacity-75">21% More Than Last Month</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">906K</h3>
                            <p>Total Reviews</p>
                            <p className="text-sm opacity-75">46% More Than Last Month</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold">132+</h3>
                            <p>Active Apps</p>
                            <p className="text-sm opacity-75">31 More Will Launch</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*  Trending Apps */}
            <section className="py-16 bg-base-200">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-3">Trending Apps</h2>
                    <p className="text-gray-500 mb-10">
                        Explore trending apps on the market developed by us.
                    </p>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {apps.map((app) => (
                                <div
                                    key={app.id}
                                    className="card bg-base-100 shadow-md p-3 hover:shadow-lg transition cursor-pointer"
                                    onClick={() => navigate(`/apps/${app.id}`)}
                                >
                                    <div className="h-32 bg-gray-200 rounded-md mb-4 overflow-hidden">
                                        <img
                                            src={app.image}
                                            alt={app.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-sm mb-2 text-gray-200">
                                        {app.title}
                                    </h3>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span className="flex items-center gap-1 text-green-500">
                                            <FaDownload />{" "}
                                            {app.downloads > 1000000
                                                ? `${(app.downloads / 1000000).toFixed(1)}M`
                                                : `${Math.round(app.downloads / 1000)}K`}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-400">
                                            <FaStar /> {app.ratingAvg}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 🪄 Show All */}
                    <button
                        onClick={() => navigate("/apps")}
                        className="btn btn-primary mt-10 bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none"
                    >
                        Show All
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;

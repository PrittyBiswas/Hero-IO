import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaDownload, FaStar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import loderImg from "../../src/assets/App-Error.png";

const AppDetails = () => {
    const { id } = useParams();
    const [app, setApp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [installed, setInstalled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/api.json")
            .then((res) => res.json())
            .then((data) => {
                const found = data.find((item) => String(item.id) === id);
                setApp(found || null);

                // check localStorage
                const installedApps = JSON.parse(localStorage.getItem("installedApps") || "[]");
                const isInstalled = installedApps.some((a) => a.id === found?.id);
                setInstalled(isInstalled);
            })
            .catch((err) => console.error("Error fetching app details:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleInstall = () => {
        if (!app) return;
        const installedApps = JSON.parse(localStorage.getItem("installedApps") || "[]");
        installedApps.push(app);
        localStorage.setItem("installedApps", JSON.stringify(installedApps));
        setInstalled(true);
        setShowAlert(true);

        // hide alert after 3 seconds
        setTimeout(() => setShowAlert(false), 3000);
    };

    if (loading)
        return (
            <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner text-primary w-10 h-10"></span>
            </div>
        );


    {/*  loderImg */ }


    if (!app)

        return (
            <div className="flex flex-col justify-center items-center min-h-screen  text-center">
                <img
                    src={loderImg}
                    alt="Loader"
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain mb-6"
                />
                <p className="text-gray-400 text-sm sm:text-base md:text-lg mt-2 max-w-md">
                    Try visiting another app page.
                </p>
            </div>


        );

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 relative">
            {/*  Styled Alert */}
            {showAlert && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    ✅ {app.title} installed successfully!
                </div>
            )}

            {/*  Top Section */}
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                {/* App Image */}
                <div className="w-64 h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                    <img
                        src={app.image}
                        alt={app.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* App Info */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-1 text-gray-100">{app.title}</h1>
                    <p className="text-gray-400 mb-4">
                        Developed by <span className="text-primary">{app.companyName}</span>
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center border-r border-gray-700">
                            <p className="text-2xl font-bold text-green-400">
                                {app.downloads > 1000000
                                    ? `${(app.downloads / 1000000).toFixed(1)}M`
                                    : `${(app.downloads / 1000).toFixed(0)}K`}
                            </p>
                            <p className="text-sm text-gray-400">Downloads</p>
                        </div>
                        <div className="text-center border-r border-gray-700">
                            <p className="text-2xl font-bold text-yellow-400">{app.ratingAvg}</p>
                            <p className="text-sm text-gray-400">Average Ratings</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-blue-400">
                                {Math.round(app.reviews / 1000)}K
                            </p>
                            <p className="text-sm text-gray-400">Total Reviews</p>
                        </div>
                    </div>

                    {/* Install Button */}
                    <button
                        onClick={handleInstall}
                        disabled={installed}
                        className={`btn w-full md:w-auto ${installed
                            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                    >
                        {installed
                            ? "Installed"
                            : `Install Now (${app.size} MB)`}
                    </button>
                </div>
            </div>

            {/* 📊 Ratings Chart */}
            <div className="mt-16">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">Ratings</h2>
                <div className="bg-base-100 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart
                            layout="vertical"
                            data={app.ratings}
                            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                        >
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Bar dataKey="count" fill="#F97316" radius={[4, 4, 4, 4]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 📝 Description Section */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3 text-gray-200">Description</h2>
                <div className="bg-base-100 p-6 rounded-lg leading-relaxed text-gray-400 text-sm space-y-4">
                    <p>{app.description}</p>
                    <p>
                        This focus app takes the proven Pomodoro technique and makes it more practical for modern lifestyles.
                        Users can create custom work and break intervals, track sessions, and review detailed analytics.
                        It provides motivational streaks, achievements, and gamified task management that make focus fun again.
                    </p>
                    <p>
                        By combining focus tracking, task management, and mindfulness tools,
                        the app ensures you not only work harder but smarter. It’s a companion that helps
                        maintain balance and productivity throughout your day.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AppDetails;

import React, { useEffect, useState } from "react";
import { FaDownload, FaStar, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Correct import
import loderImg from "../../src/assets/App-Error.png";

const Apps = () => {
    const [apps, setApps] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); // ✅ Initialize navigate

    useEffect(() => {
        setLoading(true);
        fetch("/api.json")
            .then((res) => res.json())
            .then((data) => {
                setApps(data);
                setFilteredApps(data);
            })
            .catch((err) => console.error("Error loading apps:", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (search.trim() === "") {
                setFilteredApps(apps);
            } else {
                const filtered = apps.filter((app) =>
                    app.title.toLowerCase().includes(search.toLowerCase())
                );
                setFilteredApps(filtered);
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(delay);
    }, [search, apps]);

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 md:px-12">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Our All Applications</h1>
                <p className="text-gray-400 text-sm max-w-xl mx-auto">
                    Explore all apps developed by us. Discover trending and useful apps
                    for productivity, learning, and lifestyle.
                </p>
            </div>

            {/* Search Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 max-w-6xl mx-auto">
                <p className="font-medium text-gray-300 mb-4 md:mb-0">
                    ({filteredApps.length}) Apps Found
                </p>

                <div className="flex items-center gap-2 border border-gray-600 rounded-full px-4 py-2 bg-base-100 shadow-sm">
                    <FaSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Apps..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setLoading(true);
                        }}
                        className="outline-none bg-transparent w-40 md:w-60 text-sm text-gray-200 placeholder-gray-500"
                    />
                </div>
            </div>

            {/* Loading Animation */}
            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <span className="loading loading-spinner text-primary w-10 h-10"></span>
                </div>
            ) : filteredApps.length === 0 ? (
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
            ) : (
                <>
                    {/* App Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto ">
                        {filteredApps.map((app) => (
                            <div
                                key={app.id}
                                className="card bg-base-100 shadow-md hover:shadow-lg transition border border-base-300 cursor-pointer p-2"
                                onClick={() => navigate(`/apps/${app.id}`)}
                            >
                                <div className="h-32 bg-gray-200 rounded-md overflow-hidden">
                                    <img
                                        src={app.image}
                                        alt={app.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-sm mb-2 mt-2 text-gray-200">
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

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <button className="btn bg-gradient-to-r from-[#7B2FF7] to-[#F107A3] text-white border-none">
                            Load More
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Apps;
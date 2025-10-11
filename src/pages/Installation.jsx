import React, { useState, useEffect } from "react";
import { FaDownload, FaStar, FaFileAlt } from "react-icons/fa";

const Installation = () => {
    const [sortBy, setSortBy] = useState("size");
    const [apps, setApps] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        fetch("/api.json")
            .then((res) => res.json())
            .then((data) => {
                // Load installed apps from localStorage (if any)
                const installedApps = JSON.parse(localStorage.getItem("installedApps") || "[]");
                setApps(installedApps);
                setFilteredApps(installedApps.slice(0, 10));
            })
            .catch((err) => console.error("Error loading apps:", err));
    }, []);

    const handleSortChange = (e) => {
        const sortType = e.target.value;
        setSortBy(sortType);

        const sorted = [...filteredApps].sort((a, b) => {
            if (sortType === "size") return a.size - b.size;
            if (sortType === "rating") return b.ratingAvg - a.ratingAvg;
            if (sortType === "downloads") return b.downloads - a.downloads;
            return 0;
        });

        setFilteredApps(sorted);
    };

    const handleUninstall = (appId, appTitle) => {
        const updatedApps = filteredApps.filter((app) => app.id !== appId);
        setFilteredApps(updatedApps);
        localStorage.setItem("installedApps", JSON.stringify(updatedApps));

        setAlertMessage(`❌ ${appTitle} uninstalled successfully!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 md:px-12 relative">
            {/* ✅ Styled Alert */}
            {showAlert && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {alertMessage}
                </div>
            )}

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2 text-white">
                    Your Installed Apps
                </h1>
                <p className="text-gray-400 text-sm max-w-xl mx-auto">
                    Explore all trending apps on the market developed by us.
                </p>
            </div>

            {/* Filter Row */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 max-w-5xl mx-auto">
                <p className="font-medium text-gray-300 mb-3 md:mb-0">
                    {filteredApps.length} Apps Found
                </p>

                {/* Sort Dropdown */}
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="select select-bordered select-sm w-44 text-sm"
                >
                    <option value="size">Sort by Size</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="downloads">Sort by Downloads</option>
                </select>
            </div>

            {/* Installed Apps List */}
            <div className="max-w-5xl mx-auto space-y-4">
                {filteredApps.map((app, index) => (
                    <div
                        key={app.id || index}
                        className="flex items-center justify-between bg-base-100 shadow-sm rounded-md p-4 hover:shadow-md transition"
                    >
                        {/* Left: Icon + Info */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-md overflow-hidden">
                                <img
                                    src={app.image}
                                    alt={app.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-100 text-sm md:text-base">
                                    {app.title}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                    <span className="flex items-center gap-1 text-green-500">
                                        <FaDownload />{" "}
                                        {app.downloads > 1000000
                                            ? `${(app.downloads / 1000000).toFixed(1)}M`
                                            : `${(app.downloads / 1000).toFixed(0)}K`}
                                    </span>
                                    <span className="flex items-center gap-1 text-yellow-400">
                                        <FaStar /> {app.ratingAvg}
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-400">
                                        <FaFileAlt /> {app.size} MB
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Uninstall Button */}
                        <button
                            onClick={() => handleUninstall(app.id, app.title)}
                            className="btn btn-sm bg-[#E74C3C] hover:bg-[#C0392B] border-none text-white rounded-md"
                        >
                            Uninstall
                        </button>
                    </div>
                ))}

                {filteredApps.length === 0 && (
                    <p className="text-center text-gray-400 mt-10">
                        No installed apps found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Installation;

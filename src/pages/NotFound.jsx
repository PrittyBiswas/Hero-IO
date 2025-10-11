import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../src/assets/error-404.png"
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <img src={errorImg} alt="" />
            <p className="text-gray-600 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
            <Link to="/" className="btn btn-primary">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;

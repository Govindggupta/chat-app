import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface NotFoundProps {
    user: boolean;
}

const NotFound = ({ user }: NotFoundProps) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRedirect(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (redirect) {
        return <Navigate to={user ? "/" : "/login"} />;
    }

    return (
        <section className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

            <Helmet>
                <title>404 - Not Found | Get back to Convo</title>
                <meta name="description" content="Page not found in Get back to Convo" />
            </Helmet>

            <div className="text-center">
                <FaExclamationTriangle className="mx-auto h-24 w-24 text-yellow-500 animate-bounce" />
                <h1 className="mt-6 text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                    404
                </h1>
                <h2 className="mt-4 text-3xl font-semibold text-gray-700 dark:text-gray-300">
                    Page Not Found
                </h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Redirecting you to {user ? "home" : "login"} page in 5 seconds...
                </p>
                <Link
                    to={user ? "/" : "/login"}
                    className="mt-8 inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    {user ? "Back to Home" : "Go to Login"}
                </Link>
            </div>
        </section>
    );
};

export default NotFound;

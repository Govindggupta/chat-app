import { useState, useEffect } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MdNotificationsActive } from "react-icons/md"
import { HiMiniUserGroup } from "react-icons/hi2"
import { FiSun, FiMoon } from "react-icons/fi"

// const Profile = lazy(() => import("../dialog/Profile"))
// const Notification = lazy(() => import("../dialog/Notification"))
// const NewGroup = lazy(() => import("../dialog/NewGroup"))

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // On mount, read the theme from localStorage or default to 'light'
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Convo
                </h1>

                <div className="flex items-center space-x-4">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <MdNotificationsActive size={24} />
                            <span>Notifications</span>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <HiMiniUserGroup size={24} />
                            <span>New Group</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer">
                            {/* Profile image will go here */}
                        </div>
                    </div>

                    {/* Theme Toggle - Always visible */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 text-gray-900 dark:text-white"
                    >
                        {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
                    </button>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                        >
                            <BsThreeDotsVertical size={20} />
                        </button>

                        <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700
                transform transition-all duration-200 ease-in-out origin-top-right
                ${showMenu
                                ? 'opacity-100 scale-100 translate-y-0'
                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                        >
                            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors duration-200">
                                <span>Notifications</span>
                            </div>
                            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors duration-200">
                                <span>New Group</span>
                            </div>
                            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors duration-200">
                                <span>Profile</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
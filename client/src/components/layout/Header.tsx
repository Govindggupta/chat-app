import { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FiSun, FiMoon } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Profile from "../dialog/Profile";
import NewGroup from "../dialog/NewGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [theme, setTheme] = useState("light");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);

    useEffect(() => {
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

    const handleProfileClick = () => {
        setIsProfileOpen(true);
        setShowMenu(false); // Close the mobile menu when opening profile
    };

    const handleNewGroupClick = () => {
        setIsNewGroupOpen(true);
        setShowMenu(false); // Close the mobile menu when opening New Group
    };

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/login");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
            // Add error handling UI here
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return (
        <>
            <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Convo</h1>

                    <div className="flex items-center space-x-4">
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8 text-gray-900 dark:text-white">
                            <div
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={handleNewGroupClick}
                            >
                                <HiMiniUserGroup size={24} />
                                <span>New Group</span>
                            </div>
                            <div
                                onClick={handleProfileClick}
                                className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer"
                            >
                                {/* Profile image */}
                            </div>
                            {/* Desktop Logout Button - Icon Only */}
                            <button
                                onClick={handleLogout}
                                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                title="Logout"
                            >
                                <BiLogOut size={24} />
                            </button>
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

                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
                                    <div
                                        onClick={handleNewGroupClick}
                                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors duration-200"
                                    >
                                        <span>New Group</span>
                                    </div>
                                    <div
                                        onClick={handleProfileClick}
                                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors duration-200"
                                    >
                                        <span>Profile</span>
                                    </div>
                                    {/* Mobile Logout Option */}
                                    <div
                                        onClick={handleLogout}
                                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-red-600 dark:text-red-400 transition-colors duration-200 border-t border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <BiLogOut size={20} />
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Profile Dialog */}
            <Transition appear show={isProfileOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsProfileOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all mx-4">
                                    <Profile />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* New Group Dialog */}
            <Transition appear show={isNewGroupOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsNewGroupOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all mx-4">
                                    <NewGroup />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Header;
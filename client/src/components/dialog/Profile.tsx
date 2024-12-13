import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useFileHandler } from "6pp";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("JohnDoe");
  const [bio, setBio] = useState("Hey there! I'm using Convo");
  const avatar = useFileHandler("single", 10);

  const handleLogout = () => {
    // Add logout logic here
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden">
      {/* Profile Header with Image */}
      <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <img
              src={avatar.preview || "/avatar-placeholder.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition-colors duration-200"
            >
              <FaCamera size={16} />
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                className="hidden"
                onChange={avatar.changeHandler}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-6 py-4 space-y-6">
        {/* Username */}
        <div className="text-center">
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-2xl font-bold text-center bg-transparent border-b-2 border-indigo-500 focus:outline-none dark:text-white"
            />
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <h2 className="text-2xl font-bold dark:text-white">{username}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="text-center">
          {isEditing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 text-sm bg-transparent border-2 border-indigo-500 rounded-md focus:outline-none dark:text-gray-300"
              rows={3}
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400">{bio}</p>
          )}
        </div>

        {/* Edit/Save Button */}
        {isEditing && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Logout Button */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <BiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
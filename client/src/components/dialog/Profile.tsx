import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useFileHandler } from "6pp";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Hey there! I'm using Convo");
  const avatar = useFileHandler("single", 10);

  const email = "johndoe@example.com"; // Example email, replace with actual user email
  const username = "JohnDoe"; // Example username

  // const handleLogout = () => {
  //   // Add logout logic here
  // };

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
        {/* Username Display */}
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white">{username}</h2>
        </div>

        {/* Email Display */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{email}</p>
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
        <div className="flex justify-center">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Edit Bio
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
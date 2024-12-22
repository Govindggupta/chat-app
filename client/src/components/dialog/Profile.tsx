import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useFileHandler } from "6pp";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Hey there! I'm using Convo");
  const avatar = useFileHandler("single", 10);
  const [fullName, setFullName] = useState("Lalu Pratap");


  interface AuthUser {
    user: {
      username: string;
      email: string;
      fullName: string; 
      bio: string;
      avatar: string; 
    };  
  }
  const { data: authUser } = useQuery<AuthUser>({
    queryKey: ["authUser"],
  });
  console.log("authUser:", authUser); // Debug: Log the entire authUser object
console.log("authUser avatar:", authUser?.user.avatar); // Debug: Log the avatar field

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden">
      <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <img
              src={authUser?.user.avatar || "/avatar-placeholder.png"}
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

      <div className="mt-20 px-6 py-4 space-y-2">
        <div className="text-center">
          {isEditing ? (
            <>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 text-sm bg-transparent border-2 border-indigo-500 rounded-md focus:outline-none dark:text-gray-300"
                placeholder="Full Name"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 text-sm bg-transparent border-2 border-indigo-500 rounded-md focus:outline-none dark:text-gray-300 mt-3"
                rows={3}
                placeholder="Bio"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold dark:text-white pb-2">{authUser?.user.fullName}</h2>
              <p className="text-gray-600 dark:text-gray-400">{bio}</p>
            </>
          )}
        </div>

        <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">@{authUser?.user.username}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{authUser?.user.email}</p>
        </div>

        <div className="flex justify-center">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Edit Profile
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
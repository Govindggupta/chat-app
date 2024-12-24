import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useFileHandler } from "6pp";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AuthUser } from "../../interface/auth";
import { Loader } from "../../App";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Hey there! I'm using Convo");
  const avatar = useFileHandler("single", 10);
  const [fullName, setFullName] = useState("Lalu Pratap");

  const { username } = useParams();

  const { data: authUser, isLoading: authUserLoading } = useQuery<AuthUser>({
    queryKey: ["authUser"],
  });

  const { data: user, isLoading: userLoading } = useQuery<AuthUser>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
  });

  // Check if either query is loading
  if (authUserLoading || userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
        <div className="text-white text-xl">Loading...</div> 
      </div>
    );
  }

  const isMyProfile = authUser?.user.username === user?.user.username;

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden">
      <div className="relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <img
              src={user?.user.avatar || "/avatar-placeholder.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
            {isMyProfile && (
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
            )}
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
              <h2 className="text-2xl font-bold dark:text-white pb-2">{user?.user.fullName}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.user.bio}</p>
            </>
          )}
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">@{user?.user.username}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{user?.user.email}</p>
        </div>

        <div className="flex justify-center">
          {isMyProfile ? (
            !isEditing ? (
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
            )
          ) : (
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Add Friend
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
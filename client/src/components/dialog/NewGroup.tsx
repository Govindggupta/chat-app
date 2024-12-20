import { useState } from "react";
import { FaPlus, FaUsers } from "react-icons/fa";

const NewGroup = () => {
  const [groupName, setGroupName] = useState("");

  // Dummy user data
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
    { id: 4, name: "Emily Davis" },
    { id: 5, name: "William Brown" },
    { id: 6, name: "Olivia Wilson" },
    { id: 7, name: "Sophia Garcia" },
    { id: 8, name: "James Martinez" },
    { id: 9, name: "Isabella Robinson" },
    { id: 10, name: "Ethan Clark" },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden">
      {/* Header */}
      <div className="relative h-20 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FaUsers /> Create New Group
        </h2>
      </div>

      {/* Form */}
      <div className="px-6 py-4 space-y-6">
        {/* Group Name Input */}
        <div>
          <label
            htmlFor="group-name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Group Name
          </label>
          <input
            type="text"
            id="group-name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            className="w-full mt-2 p-2 bg-transparent border-2 border-indigo-500 rounded-md focus:outline-none focus:border-indigo-700 dark:text-gray-300"
          />
        </div>

        {/* User List */}
        <div className="h-60 overflow-y-auto border-2 border-gray-200 dark:border-gray-700 rounded-lg">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="text-gray-700 dark:text-gray-300">{user.name}</span>
                <button
                  className="px-3 py-3 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-1"
                >
                  <FaPlus size={12} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Create Group Button */}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Create Group
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewGroup;

import { useState } from "react"
import { IoSend, IoAdd } from "react-icons/io5"
import { IoMdImages } from "react-icons/io"
import { IoDocumentText } from "react-icons/io5"

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage("")
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle the selected files (e.g., upload or preview)
      console.log(files);
    }
  }

  return (
    <div className="p-2 sm:p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <IoAdd className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1 sm:p-2">
              <label className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <IoMdImages className="text-gray-500 dark:text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Photo/Video</span>
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={handleFileSelect} 
                  className="hidden" 
                />
              </label>
              <label className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <IoDocumentText className="text-gray-500 dark:text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Document</span>
                <input 
                  type="file" 
                  accept="*/*" 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  multiple 
                />
              </label>
            </div>
          )}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSend}
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <IoSend className="text-blue-500 text-lg sm:text-xl" />
        </button>
      </div>
    </div>
  )
}

export default MessageInput

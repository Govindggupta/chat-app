import AppLayout from "../components/layout/AppLayout"
import { BiMessageSquareDots, BiConversation } from "react-icons/bi"
import { BsChatDots } from "react-icons/bs"

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center max-w-xl">
        <div className="flex justify-center gap-4 mb-8">
          <BiConversation className="text-5xl text-blue-500" />
          <BsChatDots className="text-5xl text-blue-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Welcome to Convo</h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          Connect and chat with your friends in real-time.
        </p>
        
        <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400">
          <BiMessageSquareDots className="text-xl" />
          <span>Select a chat or start a new conversation</span>
        </div>
      </div>
    </div>
  )
}

export default AppLayout()(Home);
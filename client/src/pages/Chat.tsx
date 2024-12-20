import ChatHeader from "../components/layout/ChatHeader";
import ChatContent from "../components/layout/ChatContent";
import MessageInput from "../components/dialog/MessageInput";
import AppLayout from "../components/layout/AppLayout";

const Chat = () => {

  const user = {
    profileImage: "/avatar-placeholder.png",
    name: "John Doe"
  }

  return (
    <>
      <ChatHeader user={user} />
      <ChatContent />
      <MessageInput />
    </>
  )
}

export default AppLayout()(Chat)

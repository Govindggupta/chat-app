import { lazy, useState } from 'react';
import { sampleChats } from '../../constants/sampleData';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Search = lazy(() => import("../dialog/Search"));

const ChatList = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const formatTime = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 w-full max-w-md border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Chats</h2>
        
        <Search />

        <div className="space-y-2 mt-4">
          {sampleChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200
                ${selectedChat === chat.id
                  ? 'bg-indigo-50 dark:bg-gray-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {/* Avatar(s) */}
              <div className="relative flex">
                {chat.type === 'individual' ? (
                  <div className="relative">
                    <img
                      src={chat.participants[1].avatar}
                      alt={chat.participants[1].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                        ${chat.participants[1].isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                    />
                  </div>
                ) : (
                  <div className="flex -space-x-4">
                    {chat.participants.slice(1, 4).map((participant, index) => (
                      <div 
                        key={participant.id} 
                        className="relative"
                        style={{ 
                          zIndex: 3 - index,
                          marginLeft: index === 0 ? '0' : '-34px'
                        }}
                      >
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                        />
                      </div>
                    ))}
                    {chat.participants.length > 4 && (
                      <div 
                        className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800"
                        style={{ 
                          marginLeft: '-24px',
                          zIndex: 0 
                        }}
                      >
                        +{chat.participants.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chat.type === 'individual'
                      ? chat.participants[1].name
                      : chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(chat.lastMessage.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {chat.lastMessage.content}
                </p>
              </div>

              {/* Unread Count */}
              {chat.unreadCount > 0 && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-xs font-medium text-white">
                    {chat.unreadCount}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
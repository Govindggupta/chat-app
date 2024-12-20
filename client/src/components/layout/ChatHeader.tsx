import { BiArrowBack } from 'react-icons/bi';
import Profile from '../dialog/Profile';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface User {
  profileImage: string;
  name: string;
}

interface ChatHeaderProps {
  user: User;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleBack = () => {
    // Logic to go back to the previous screen
    window.history.back();
  };

  const handleProfile = () => {
    setProfileOpen(true);
  }

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleBack} 
          className="md:hidden text-gray-600 dark:text-gray-300"
        >
          <BiArrowBack className="text-2xl" />
        </button>
        
        <div onClick={handleProfile} className="flex items-center">
          <img
            src={user.profileImage}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</h2>
        </div>
      </header>

      <Transition appear show={isProfileOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50" 
          onClose={() => setProfileOpen(false)}
        >
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
    </>
  );
};

export default ChatHeader;

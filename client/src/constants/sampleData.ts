export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  }
  
  export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
  }
  
  export interface Chat {
    id: string;
    type: 'individual' | 'group';
    name: string; // For groups
    participants: User[];
    lastMessage: Message;
    unreadCount: number;
  }
  
  export const sampleUsers: User[] = [
    {
      id: 'u1',
      name: 'John Doe',
      avatar: '/avatar-placeholder.png',
      isOnline: true,
    },
    {
      id: 'u2',
      name: 'Jane Smith',
      avatar: '/avatar-placeholder.png',
      isOnline: false,
    },
    {
      id: 'u3',
      name: 'Mike Johnson',
      avatar: '/avatar-placeholder.png',
      isOnline: true,
    },
    {
      id: 'u4',
      name: 'Sarah Wilson',
      avatar: '/avatar-placeholder.png',
      isOnline: true,
    },
    {
      id: 'u5',
      name: 'Alex Brown',
      avatar: '/avatar-placeholder.png',
      isOnline: false,
    },
  ];
  
  export const sampleChats: Chat[] = [
    {
      id: 'c1',
      type: 'individual',
      name: '',
      participants: [sampleUsers[0], sampleUsers[1]],
      lastMessage: {
        id: 'm1',
        senderId: 'u2',
        content: 'See you tomorrow!',
        timestamp: '2024-03-20T10:30:00Z',
      },
      unreadCount: 2,
    },
    {
      id: 'c2',
      type: 'individual',
      name: '',
      participants: [sampleUsers[0], sampleUsers[2]],
      lastMessage: {
        id: 'm2',
        senderId: 'u1',
        content: 'Thanks for the help!',
        timestamp: '2024-03-20T09:45:00Z',
      },
      unreadCount: 0,
    },
    {
      id: 'c3',
      type: 'individual',
      name: '',
      participants: [sampleUsers[0], sampleUsers[3]],
      lastMessage: {
        id: 'm3',
        senderId: 'u4',
        content: 'Let me check and get back to you',
        timestamp: '2024-03-20T08:15:00Z',
      },
      unreadCount: 1,
    },
    {
      id: 'c4',
      type: 'group',
      name: 'Project Team',
      participants: [sampleUsers[0], sampleUsers[1], sampleUsers[2], sampleUsers[3]],
      lastMessage: {
        id: 'm4',
        senderId: 'u2',
        content: 'Meeting at 3 PM tomorrow',
        timestamp: '2024-03-20T11:00:00Z',
      },
      unreadCount: 5,
    },
    {
      id: 'c5',
      type: 'group',
      name: 'Family Group',
      participants: [sampleUsers[0], sampleUsers[2], sampleUsers[4]],
      lastMessage: {
        id: 'm5',
        senderId: 'u5',
        content: 'Don\'t forget mom\'s birthday!',
        timestamp: '2024-03-20T07:30:00Z',
      },
      unreadCount: 3,
    },
  ];
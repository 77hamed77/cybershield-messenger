import { Contact, ChatItem, Call, Message, MessageType, CallType } from '@/types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'أبو احمد',
    username: '@abuahmad',
    status: 'online',
    avatarUrl: '/images/logo.png',
    isOnline: true,
    bio: 'مدير مهام شعبة التجنيد الاستخباراتي ',
    mission: 'أمن دولة'
  },
  {
    id: '2',
    name: 'المردغلي',
    username: '@martin1',
    status: 'online',
    avatarUrl: '/images/logo.png',
    isOnline: true,
    bio: 'Senior Security Analyst',
    mission: 'Blue Team Lead'
  },
  {
    id: '3',
    name: 'جسومي المعفط',
    username: '@andrew',
    status: 'online',
    avatarUrl: '/images/logo.png',
    isOnline: true,
    bio: 'Cybersecurity Specialist',
    mission: 'Threat Intelligence'
  },
  {
    id: '4',
    name: 'أبو محمد',
    username: '@abumohammed',
    status: 'last seen just now',
    avatarUrl: '/images/logo13.png',
    isOnline: false,
    bio: 'مدير مهام شعبة التجنيد الاستخباراتي',
    mission: 'أمن دولة'
  },
  {
    id: '5',
    name: ' الإدارة ابو قحطان ' ,
    username: '@admin',
    status: 'online',
    avatarUrl: '/images/logo12.png',
    isOnline: true,
    bio: 'إدارة فريق الأمن السيبراني',
    mission: 'إدارة عامة'
  },
  {
    id: '6',
    name: 'Alice Johnson',
    username: '@alice',
    status: 'last seen 2 hours ago',
    avatarUrl: '/images/logo.png',
    isOnline: false,
    bio: 'Security Operations Center',
    mission: 'SOC Analyst'
  },
  {
    id: '7',
    name: 'بهاء بندورة',
    username: '@baha',
    status: 'last seen 1 hour ago',
    avatarUrl: '/images/logo.png',
    isOnline: false,
    bio: 'مدير مهام شعبة التجنيد الاستخباراتي',
    mission: 'أمن دولة'
  },
  {
    id: '8',
    name: 'محمد صطوف',
    username: '@mohammed',
    status: 'last seen 30 minutes ago',
    avatarUrl: '/images/logo.png',
    isOnline: false,
    bio: 'مدير مهام شعبة التجنيد الاستخباراتي',
    mission: 'أمن دولة'
  }
];

export const mockChats: ChatItem[] = [
  {
    id: '1',
    title: 'Saved Messages',
    subtitle: 'image.jpeg',
    time: 'Fri',
    avatarUrl: '/images/logo10.png',
    pinned: true,
    isRead: true,
    isMuted: false,
    isArchived: false,
    unreadCount: 0
  },
  {
    id: '2',
    title: 'Blue Team',
    subtitle: 'Hasan Web · GIF',
    time: '9/29',
    avatarUrl: '/images/logo11.png',
    unreadCount: 0,
    isRead: true,
    pinned: false,
    isMuted: false,
    isArchived: false
  },
  {
    id: '3',
    title: 'أبو محمد',
    subtitle: 'مرحبا انا استخدم واتس ب؟',
    time: 'Sun',
    avatarUrl: '/images/logo13.png',
    unreadCount: 0,
    isRead: false,
    pinned: false,
    isMuted: false,
    isArchived: false
  },
  {
    id: '4',
    title: ' أبو قحطان الإدارة',
    subtitle: '🌐👑 تعميم: على جميع العاملين في مشروع الحماية ...',
    time: '11:30',
    avatarUrl: '/images/logo12.png',
    unreadCount: 153,
    isRead: false,
    pinned: false,
    isMuted: false,
    isArchived: false
  },
  {
    id: '5',
    title: 'Alice Johnson',
    subtitle: 'What about a super ice...',
    time: '11:30',
    avatarUrl: '/images/logo.png',
    unreadCount: 0,
    isRead: true,
    pinned: false,
    isMuted: false,
    isArchived: false
  },
  {
    id: '6',
    title: 'بهاء بندورة',
    subtitle: 'Photo',
    time: '10:42',
    avatarUrl: '/images/logo.png',
    unreadCount: 17,
    isRead: false,
    pinned: false,
    isMuted: false,
    isArchived: false
  },
  {
    id: '7',
    title: ' محمد صطوف',
    subtitle: ' اشو الوضع ',
    time: 'Sat',
    avatarUrl: '/images/logo.png',
    unreadCount: 32,
    isRead: false,
    pinned: false,
    isMuted: false,
    isArchived: false
  }
];

export const mockCalls: Call[] = [
  {
    id: '1',
    name: 'المردغلي',
    avatarUrl: '/images/logo.png',
    type: CallType.OUTGOING,
    time: '10/13',
    duration: '2:30'
  },
  {
    id: '2',
    name: 'كرواسون المعفط',
    avatarUrl: '/images/logo.png',
    type: CallType.OUTGOING,
    time: '10/11',
    duration: '1:45'
  },
  {
    id: '3',
    name: 'جسومي العفطي',
    avatarUrl: '/images/logo.png',
    type: CallType.OUTGOING,
    time: '10/8',
    duration: '3:20'
  },
  {
    id: '4',
    name: 'بقلاوة الحلاوة',
    avatarUrl: '/images/logo.png',
    type: CallType.MISSED,
    time: '9/30'
  },
  {
    id: '5',
    name: 'بيل الكلاسيكي',
    avatarUrl: '/images/logo.png',
    type: CallType.INCOMING,
    time: '9/24',
    duration: '5:15'
  },
  {
    id: '6',
    name: 'أبو جذبات البروباغندي',
    avatarUrl: '/images/logo.png',
    type: CallType.OUTGOING,
    time: '9/16',
    duration: '1:30'
  },
  {
    id: '7',
    name: 'الجولاني',
    avatarUrl: '/images/logo.png',
    type: CallType.OUTGOING,
    time: '9/15',
    duration: '2:45'
  },
  {
    id: '8',
    name: 'أبو البراء فرع الذكاء الاصطناعي',
    avatarUrl: '/images/logox.svg',
    type: CallType.INCOMING,
    time: '9/15',
    duration: '4:10'
  },
  {
    id: '9',
    name: 'تع بورد ',
    avatarUrl: '/images/logox.avg',
    type: CallType.INCOMING,
    time: '9/10',
    duration: '6:30'
  },
  {
    id: '10',
    name: 'ميركافا المفرطب',
    avatarUrl: '/images/logo.png',
    type: CallType.OUTGOING,
    time: '9/10',
    duration: '3:45'
  },
  {
    id: '11',
    name: 'ديمتري كرستوجورجينا',
    avatarUrl: '/images/logo13.png',
    type: CallType.OUTGOING,
    time: '9/6',
    duration: '2:15'
  },
  {
    id: '12',
    name: 'البندورة الحمرة',
    avatarUrl: '/images/logo12.png',
    type: CallType.MISSED,
    time: '8/22'
  },
  {
    id: '13',
    name: 'الشطاف المبربق',
    avatarUrl: '/images/logo11.png',
    type: CallType.OUTGOING,
    time: '8/20',
    duration: '1:50'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'يمعود عم اشتغل على برنامج مراقبة براد الشاي',
    isSentByMe: false,
    time: '10:10',
    isRead: true,
    type: MessageType.TEXT,
    chatId: '1'
  },
  {
    id: '2',
    content: '/images/logo.png10',
    isSentByMe: false,
    time: '10:15',
    isRead: true,
    type: MessageType.IMAGE,
    chatId: '1'
  },
  {
    id: '3',
    content: '/images/logo3.png',
    isSentByMe: false,
    time: '10:15',
    isRead: true,
    type: MessageType.IMAGE,
    chatId: '1'
  },
  {
    id: '4',
    content: 'صباح النسور طريران حربي محلق فوق السور',
    isSentByMe: true,
    time: '11:40',
    isRead: true,
    type: MessageType.TEXT,
    chatId: '1'
  },
  {
    id: '5',
    content: 'أنت ما تبطل جذب',
    isSentByMe: true,
    time: '11:43',
    isRead: true,
    type: MessageType.TEXT,
    chatId: '1'
  },
  {
    id: '6',
    content: 'بدي اشخلك بصباحك ما اجحشك?',
    isSentByMe: false,
    time: '11:45',
    isRead: true,
    type: MessageType.TEXT,
    chatId: '1'
  },
  {
    id: '7',
    content: 'يا مجنون',
    isSentByMe: false,
    time: '11:45',
    isRead: true,
    type: MessageType.TEXT,
    chatId: '1'
  },
  {
    id: '8',
    content: 'طير احمر طير مبرقع',
    isSentByMe: true,
    time: '11:50',
    isRead: true,
    type: MessageType.TEXT,
    chatId: '1'
  },
  {
    id: '9',
    content: '/images/logo1.png',
    isSentByMe: true,
    time: '11:51',
    isRead: true,
    type: MessageType.IMAGE,
    chatId: '1'
  },
  {
    id: '10',
    content: '/images/logo.png',
    isSentByMe: true,
    time: '11:51',
    isRead: true,
    type: MessageType.IMAGE,
    chatId: '1'
  }
];

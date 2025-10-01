/**
 * ملف اللغة العربية - CyberShield Messenger
 * يحتوي على جميع النصوص والترجمات للتطبيق
 */

export const ar = {
  // التطبيق العام
  app: {
    name: "CyberShield Messenger",
    description: "منصة الاتصالات الآمنة لفريق الأمن السيبراني الذكي",
    version: "1.0.0",
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    success: "تم بنجاح",
    cancel: "إلغاء",
    confirm: "تأكيد",
    save: "حفظ",
    delete: "حذف",
    edit: "تعديل",
    add: "إضافة",
    search: "بحث",
    filter: "تصفية",
    sort: "ترتيب",
    refresh: "تحديث",
    back: "رجوع",
    next: "التالي",
    previous: "السابق",
    done: "تم",
    close: "إغلاق",
    open: "فتح",
    view: "عرض",
    hide: "إخفاء",
    show: "إظهار",
    select: "اختيار",
    clear: "مسح",
    reset: "إعادة تعيين",
    apply: "تطبيق",
    submit: "إرسال",
    send: "إرسال",
    receive: "استقبال",
    online: "متصل",
    offline: "غير متصل",
    away: "بعيد",
    busy: "مشغول",
    typing: "يكتب...",
    lastSeen: "آخر ظهور",
    now: "الآن",
    today: "اليوم",
    yesterday: "أمس",
    thisWeek: "هذا الأسبوع",
    thisMonth: "هذا الشهر",
    thisYear: "هذا العام"
  },

  // الصفحة الرئيسية
  home: {
    title: "مرحباً بك في CyberShield",
    subtitle: "منصة الاتصالات الآمنة",
    description: "تطبيق مراسلة آمن ومتطور لحماية خصوصيتك وأمانك الرقمي",
    features: {
      security: "أمان عسكري المستوى",
      encryption: "تشفير منتهي للتشفير",
      privacy: "حماية كاملة للخصوصية",
      communication: "تواصل آمن ومتقدم"
    },
    getStarted: "ابدأ الآن",
    learnMore: "اعرف المزيد"
  },

  // تسجيل الدخول
  login: {
    title: "تسجيل الدخول",
    subtitle: "أدخل بيانات تسجيل الدخول التي تلقيتها من فريق الإدارة",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    usernamePlaceholder: "أدخل اسم المستخدم",
    passwordPlaceholder: "أدخل كلمة المرور",
    loginButton: "تسجيل الدخول",
    loginSuccess: "تم تسجيل الدخول بنجاح",
    loginError: "خطأ في تسجيل الدخول",
    showPassword: "إظهار كلمة المرور",
    hidePassword: "إخفاء كلمة المرور",
    warning: "تحذير",
    warningMessage: "يرجى العلم أن أي محاولة لتسريب أو مشاركة بيانات الحساب مع أي طرف آخر ستؤدي إلى اتخاذ إجراءات قانونية مشددة ضدك",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    createAccount: "إنشاء حساب جديد",
    terms: "الشروط والأحكام",
    privacy: "سياسة الخصوصية"
  },

  // شاشة البداية
  splash: {
    title: "CyberShield Messenger",
    subtitle: "منصة الاتصالات الآمنة لفريق الأمن السيبراني الذكي",
    loading: "جاري التحميل...",
    copyright: "© 2024 CyberShield Team. جميع الحقوق محفوظة."
  },

  // المحادثات
  chats: {
    title: "المحادثات",
    subtitle: "جميع محادثاتك",
    searchPlaceholder: "البحث في المحادثات أو المستخدمين",
    noChats: "لا توجد محادثات",
    noChatsDescription: "ابدأ محادثة جديدة",
    newChat: "محادثة جديدة",
    allChats: "جميع المحادثات",
    archived: "المؤرشفة",
    pinned: "المثبتة",
    unread: "غير المقروءة",
    read: "مقروءة",
    muted: "مكتومة",
    starred: "المفضلة",
    lastMessage: "آخر رسالة",
    noMessages: "لا توجد رسائل",
    startConversation: "ابدأ المحادثة",
    chatActions: {
      pin: "تثبيت",
      unpin: "إلغاء التثبيت",
      archive: "أرشفة",
      unarchive: "إلغاء الأرشفة",
      mute: "كتم",
      unmute: "إلغاء الكتم",
      star: "إضافة للمفضلة",
      unstar: "إزالة من المفضلة",
      delete: "حذف المحادثة",
      markRead: "تعيين كمقروءة",
      markUnread: "تعيين كغير مقروءة",
      moveToFolder: "نقل إلى مجلد",
      removeFromFolder: "إزالة من المجلد"
    }
  },

  // تفاصيل المحادثة
  chatDetail: {
    title: "المحادثة",
    typeMessage: "اكتب رسالتك...",
    sendMessage: "إرسال الرسالة",
    attachFile: "إرفاق ملف",
    voiceMessage: "رسالة صوتية",
    recording: "جاري التسجيل",
    stopRecording: "إيقاف التسجيل",
    sendVoiceMessage: "إرسال الرسالة الصوتية",
    cancelRecording: "إلغاء التسجيل",
    messageOptions: {
      copy: "نسخ النص",
      save: "حفظ الرسالة",
      forward: "إعادة توجيه",
      reply: "الرد",
      edit: "تعديل",
      delete: "حذف الرسالة",
      download: "تحميل"
    },
    callActions: {
      voiceCall: "مكالمة صوتية",
      videoCall: "مكالمة فيديو",
      endCall: "إنهاء المكالمة",
      minimize: "تصغير",
      maximize: "تكبير",
      mute: "كتم الصوت",
      unmute: "إلغاء كتم الصوت",
      speaker: "مكبر الصوت",
      camera: "الكاميرا",
      settings: "إعدادات المكالمة"
    },
    mediaTypes: {
      image: "صورة",
      video: "فيديو",
      audio: "صوت",
      file: "ملف",
      document: "مستند"
    }
  },

  // المكالمات
  calls: {
    title: "المكالمات",
    subtitle: "سجل المكالمات",
    searchPlaceholder: "البحث في المكالمات أو المستخدمين",
    noCalls: "لا توجد مكالمات",
    noCallsDescription: "سجل المكالمات سيظهر هنا",
    allCalls: "جميع المكالمات",
    missed: "الفائتة",
    incoming: "الواردة",
    outgoing: "الصادرة",
    callTypes: {
      voice: "صوتية",
      video: "فيديو"
    },
    callStatus: {
      connected: "متصل",
      connecting: "جاري الاتصال",
      ended: "انتهت",
      missed: "فائتة",
      declined: "مرفوضة"
    },
    callActions: {
      callBack: "إعادة الاتصال",
      viewInfo: "عرض المعلومات",
      delete: "حذف المكالمة",
      clearHistory: "مسح السجل"
    }
  },

  // جهات الاتصال
  contacts: {
    title: "جهات الاتصال",
    subtitle: "إدارة جهات الاتصال",
    searchPlaceholder: "البحث في جهات الاتصال أو المستخدمين",
    noContacts: "لا توجد جهات اتصال",
    noContactsDescription: "أضف جهة اتصال جديدة للبدء",
    addContact: "إضافة جهة اتصال",
    contactInfo: "معلومات جهة الاتصال",
    profile: "الملف الشخصي",
    status: "الحالة",
    bio: "نبذة شخصية",
    mission: "المهمة",
    username: "اسم المستخدم",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    lastSeen: "آخر ظهور",
    online: "متصل",
    offline: "غير متصل",
    away: "بعيد",
    busy: "مشغول",
    contactActions: {
      sendMessage: "إرسال رسالة",
      voiceCall: "مكالمة صوتية",
      videoCall: "مكالمة فيديو",
      shareContact: "مشاركة جهة الاتصال",
      blockUser: "حظر المستخدم",
      unblockUser: "إلغاء حظر المستخدم",
      startSecretChat: "بدء محادثة سرية",
      viewSharedMedia: "عرض الوسائط المشتركة",
      notificationSettings: "إعدادات الإشعارات"
    }
  },

  // الإعدادات
  settings: {
    title: "الإعدادات",
    subtitle: "تفضيلات التطبيق",
    searchPlaceholder: "البحث في الإعدادات",
    profile: "الملف الشخصي",
    editProfile: "تعديل الملف الشخصي",
    appearance: "المظهر",
    theme: "الثيم",
    language: "اللغة",
    notifications: "الإشعارات",
    privacy: "الخصوصية والأمان",
    storage: "التخزين والبيانات",
    help: "المساعدة",
    support: "الدعم الفني",
    logout: "تسجيل الخروج",
    account: "الحساب",
    security: "الأمان",
    data: "البيانات",
    advanced: "متقدم",
    quickAccess: "الوصول السريع",
    savedMessages: "الرسائل المحفوظة",
    recentCalls: "المكالمات الأخيرة",
    groups: "المجموعات والقنوات",
    addGroup: "إضافة مجموعة",
    addChannel: "إضافة قناة",
    savedMessagesDescription: "عرض وإدارة الرسائل المحفوظة",
    recentCallsDescription: "عرض سجل المكالمات وإدارة المكالمات",
    languageDescription: "تغيير لغة التطبيق والمنطقة",
    notificationsDescription: "تكوين تفضيلات الإشعارات",
    privacyDescription: "إدارة إعدادات الخصوصية والأمان",
    storageDescription: "إدارة بيانات التطبيق واستخدام التخزين",
    appearanceDescription: "تخصيص مظهر التطبيق والألوان",
    // إعدادات إضافية
    general: "عام",
    chatSettings: "إعدادات المحادثة",
    callSettings: "إعدادات المكالمات",
    mediaSettings: "إعدادات الوسائط",
    backupSettings: "إعدادات النسخ الاحتياطي",
    syncSettings: "إعدادات المزامنة",
    experimental: "تجريبي",
    beta: "بيتا",
    version: "الإصدار",
    buildNumber: "رقم البناء",
    lastUpdate: "آخر تحديث",
    systemInfo: "معلومات النظام",
    deviceInfo: "معلومات الجهاز",
    networkInfo: "معلومات الشبكة",
    performance: "الأداء",
    memory: "الذاكرة",
    storageUsage: "استخدام التخزين",
    battery: "البطارية",
    temperature: "درجة الحرارة"
  },

  // إعدادات المظهر
  appearance: {
    title: "المظهر",
    theme: "الثيم",
    themeOptions: {
      dark: "داكن",
      light: "فاتح",
      system: "نظام التشغيل"
    },
    fontSize: "حجم الخط",
    fontSizeOptions: {
      small: "صغير",
      medium: "متوسط",
      large: "كبير"
    },
    colors: "الألوان",
    layout: "التخطيط",
    animations: "الحركات",
    enableAnimations: "تفعيل الحركات",
    reduceMotion: "تقليل الحركة"
  },

  // إعدادات اللغة
  language: {
    title: "اللغة",
    currentLanguage: "اللغة الحالية",
    selectLanguage: "اختر اللغة",
    languages: {
      ar: "العربية",
      en: "English"
    },
    direction: "اتجاه النص",
    rtl: "من اليمين إلى اليسار",
    ltr: "من اليسار إلى اليمين",
    applyChanges: "تطبيق التغييرات",
    restartRequired: "يتطلب إعادة تشغيل التطبيق"
  },

  // إعدادات الإشعارات
  notifications: {
    title: "الإشعارات والأصوات",
    enableNotifications: "تفعيل الإشعارات",
    messageNotifications: "إشعارات الرسائل",
    callNotifications: "إشعارات المكالمات",
    groupNotifications: "إشعارات المجموعات",
    sound: "الصوت",
    vibration: "الاهتزاز",
    led: "مؤشر LED",
    preview: "معاينة الرسالة",
    showPreview: "إظهار معاينة الرسالة",
    quietHours: "ساعات الهدوء",
    enableQuietHours: "تفعيل ساعات الهدوء",
    startTime: "وقت البداية",
    endTime: "وقت النهاية",
    weekendMode: "وضع نهاية الأسبوع",
    priority: "الأولوية",
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة"
  },

  // إعدادات الخصوصية
  privacy: {
    title: "الخصوصية والأمان",
    lastSeen: "آخر ظهور",
    showLastSeen: "إظهار آخر ظهور",
    hideLastSeen: "إخفاء آخر ظهور",
    showToContacts: "إظهار لجهات الاتصال فقط",
    showToEveryone: "إظهار للجميع",
    hideCompletely: "إخفاء كامل",
    readReceipts: "إيصالات القراءة",
    showReadReceipts: "إظهار إيصالات القراءة",
    hideReadReceipts: "إخفاء إيصالات القراءة",
    typingIndicator: "مؤشر الكتابة",
    showTyping: "إظهار مؤشر الكتابة",
    hideTyping: "إخفاء مؤشر الكتابة",
    profilePhoto: "صورة الملف الشخصي",
    showProfilePhoto: "إظهار صورة الملف الشخصي",
    hideProfilePhoto: "إخفاء صورة الملف الشخصي",
    blockedUsers: "المستخدمون المحظورون",
    blockedContacts: "جهات الاتصال المحظورة",
    unblock: "إلغاء الحظر",
    block: "حظر",
    report: "الإبلاغ",
    reportUser: "الإبلاغ عن المستخدم",
    reportReason: "سبب الإبلاغ",
    reportReasons: {
      spam: "رسائل مزعجة",
      harassment: "مضايقة",
      inappropriate: "محتوى غير لائق",
      fake: "حساب وهمي",
      other: "أخرى"
    }
  },

  // إعدادات التخزين
  storage: {
    title: "التخزين والبيانات",
    storageUsage: "استخدام التخزين",
    totalStorage: "إجمالي التخزين",
    usedStorage: "المستخدم",
    availableStorage: "المتاح",
    clearCache: "مسح الذاكرة المؤقتة",
    clearData: "مسح البيانات",
    clearChats: "مسح المحادثات",
    clearMedia: "مسح الوسائط",
    clearCalls: "مسح المكالمات",
    exportData: "تصدير البيانات",
    importData: "استيراد البيانات",
    backupData: "نسخ احتياطي",
    restoreData: "استعادة البيانات",
    deleteAccount: "حذف الحساب",
    deleteAccountWarning: "تحذير: حذف الحساب نهائياً",
    deleteAccountDescription: "سيتم حذف جميع البيانات نهائياً ولا يمكن استعادتها"
  },

  // المجلدات
  folders: {
    title: "المجلدات",
    createFolder: "إنشاء مجلد",
    editFolder: "تعديل المجلد",
    deleteFolder: "حذف المجلد",
    folderName: "اسم المجلد",
    folderColor: "لون المجلد",
    folderIcon: "أيقونة المجلد",
    moveToFolder: "نقل إلى مجلد",
    removeFromFolder: "إزالة من المجلد",
    folderContents: "محتويات المجلد",
    noFolders: "لا توجد مجلدات",
    noFoldersDescription: "أنشئ مجلداً جديداً لتنظيم محادثاتك",
    defaultFolders: {
      work: "العمل",
      personal: "شخصي",
      family: "العائلة",
      friends: "الأصدقاء",
      bots: "البوتات",
      channels: "القنوات",
      groups: "المجموعات"
    },
    folderIcons: {
      work: "💼",
      personal: "👤",
      family: "👨‍👩‍👧‍👦",
      friends: "👥",
      bots: "🤖",
      channels: "📢",
      groups: "👥",
      star: "⭐",
      heart: "❤️",
      folder: "📁",
      archive: "📦"
    }
  },

  // الرسائل
  messages: {
    noMessages: "لا توجد رسائل",
    noMessagesDescription: "ابدأ المحادثة بإرسال رسالة",
    messageSent: "تم إرسال الرسالة",
    messageReceived: "تم استلام الرسالة",
    messageRead: "تم قراءة الرسالة",
    messageDelivered: "تم تسليم الرسالة",
    messageFailed: "فشل في إرسال الرسالة",
    retry: "إعادة المحاولة",
    deleteMessage: "حذف الرسالة",
    editMessage: "تعديل الرسالة",
    replyToMessage: "الرد على الرسالة",
    forwardMessage: "إعادة توجيه الرسالة",
    copyMessage: "نسخ الرسالة",
    saveMessage: "حفظ الرسالة",
    unsaveMessage: "إلغاء حفظ الرسالة",
    messageTypes: {
      text: "نص",
      image: "صورة",
      video: "فيديو",
      audio: "صوت",
      file: "ملف",
      location: "موقع",
      contact: "جهة اتصال",
      sticker: "ملصق",
      gif: "GIF"
    }
  },

  // الأخطاء والتحذيرات
  errors: {
    networkError: "خطأ في الشبكة",
    serverError: "خطأ في الخادم",
    authenticationError: "خطأ في المصادقة",
    permissionError: "خطأ في الصلاحيات",
    validationError: "خطأ في التحقق",
    notFound: "غير موجود",
    unauthorized: "غير مصرح",
    forbidden: "محظور",
    timeout: "انتهت مهلة الاتصال",
    unknown: "خطأ غير معروف",
    tryAgain: "حاول مرة أخرى",
    contactSupport: "اتصل بالدعم الفني"
  },

  // النجاح
  success: {
    saved: "تم الحفظ",
    deleted: "تم الحذف",
    updated: "تم التحديث",
    created: "تم الإنشاء",
    sent: "تم الإرسال",
    received: "تم الاستلام",
    connected: "تم الاتصال",
    disconnected: "تم قطع الاتصال",
    loggedIn: "تم تسجيل الدخول",
    loggedOut: "تم تسجيل الخروج",
    settingsApplied: "تم تطبيق الإعدادات",
    dataExported: "تم تصدير البيانات",
    dataImported: "تم استيراد البيانات",
    backupCreated: "تم إنشاء النسخة الاحتياطية",
    backupRestored: "تم استعادة النسخة الاحتياطية"
  },

  // التأكيدات
  confirmations: {
    deleteChat: "هل أنت متأكد من حذف هذه المحادثة؟",
    deleteMessage: "هل أنت متأكد من حذف هذه الرسالة؟",
    deleteContact: "هل أنت متأكد من حذف جهة الاتصال؟",
    deleteFolder: "هل أنت متأكد من حذف هذا المجلد؟",
    blockUser: "هل أنت متأكد من حظر هذا المستخدم؟",
    unblockUser: "هل أنت متأكد من إلغاء حظر هذا المستخدم؟",
    clearHistory: "هل أنت متأكد من مسح السجل؟",
    clearCache: "هل أنت متأكد من مسح الذاكرة المؤقتة؟",
    clearData: "هل أنت متأكد من مسح البيانات؟",
    logout: "هل أنت متأكد من تسجيل الخروج؟",
    deleteAccount: "هل أنت متأكد من حذف الحساب؟",
    unsavedChanges: "لديك تغييرات غير محفوظة. هل تريد المتابعة؟"
  },

  // الوقت والتاريخ
  time: {
    now: "الآن",
    today: "اليوم",
    yesterday: "أمس",
    thisWeek: "هذا الأسبوع",
    thisMonth: "هذا الشهر",
    thisYear: "هذا العام",
    lastWeek: "الأسبوع الماضي",
    lastMonth: "الشهر الماضي",
    lastYear: "العام الماضي",
    minutesAgo: "منذ {count} دقيقة",
    hoursAgo: "منذ {count} ساعة",
    daysAgo: "منذ {count} يوم",
    weeksAgo: "منذ {count} أسبوع",
    monthsAgo: "منذ {count} شهر",
    yearsAgo: "منذ {count} عام",
    inMinutes: "خلال {count} دقيقة",
    inHours: "خلال {count} ساعة",
    inDays: "خلال {count} يوم",
    inWeeks: "خلال {count} أسبوع",
    inMonths: "خلال {count} شهر",
    inYears: "خلال {count} عام"
  },

  // الوحدات
  units: {
    bytes: "بايت",
    kilobytes: "كيلوبايت",
    megabytes: "ميجابايت",
    gigabytes: "جيجابايت",
    terabytes: "تيرابايت",
    seconds: "ثانية",
    minutes: "دقيقة",
    hours: "ساعة",
    days: "يوم",
    weeks: "أسبوع",
    months: "شهر",
    years: "عام",
    items: "عنصر",
    messages: "رسالة",
    chats: "محادثة",
    contacts: "جهة اتصال",
    calls: "مكالمة",
    folders: "مجلد"
  },

  // الاختصارات
  shortcuts: {
    title: "اختصارات لوحة المفاتيح",
    navigation: "التنقل",
    actions: "الإجراءات",
    general: "عام",
    other: "أخرى",
    navigateChats: "الانتقال إلى المحادثات",
    navigateCalls: "الانتقال إلى المكالمات",
    navigateContacts: "الانتقال إلى جهات الاتصال",
    navigateSettings: "الانتقال إلى الإعدادات",
    newChat: "محادثة جديدة",
    search: "البحث",
    quickActions: "الإجراءات السريعة",
    showShortcuts: "إظهار الاختصارات",
    closeModal: "إغلاق النافذة",
    toggleTheme: "تبديل الثيم",
    tip: "اضغط Ctrl + / لإظهار هذه القائمة في أي وقت"
  },

  // حالات التحميل
  loading: {
    loading: "جاري التحميل...",
    pleaseWait: "يرجى الانتظار بينما نقوم بتحميل بياناتك",
    noResults: "لا توجد نتائج",
    tryDifferentKeywords: "جرب كلمات مفتاحية مختلفة",
    recent: "حديث",
    clear: "مسح",
    progress: "التقدم",
    tryAgain: "حاول مرة أخرى"
  },

  // إمكانية الوصول
  accessibility: {
    title: "إعدادات إمكانية الوصول",
    fontSize: "حجم الخط",
    fontSizeSmall: "صغير",
    fontSizeMedium: "متوسط",
    fontSizeLarge: "كبير",
    highContrast: "تباين عالي",
    highContrastDescription: "تحسين التباين للألوان",
    reduceMotion: "تقليل الحركة",
    reduceMotionDescription: "تقليل الحركات والانتقالات",
    keyboardNavigation: "التنقل بلوحة المفاتيح",
    keyboardNavigationDescription: "تفعيل التنقل بلوحة المفاتيح",
    screenReader: "قارئ الشاشة",
    screenReaderDescription: "دعم قارئ الشاشة",
    tip: "هذه الإعدادات تحسن تجربة المستخدم للأشخاص ذوي الاحتياجات الخاصة"
  },

  // إعدادات إضافية
  additionalSettings: {
    tapToChangePhoto: "اضغط لتغيير الصورة",
    changeProfilePhoto: "تغيير صورة الملف الشخصي"
  },

};

export default ar;

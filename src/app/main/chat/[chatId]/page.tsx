'use client';

import { useParams, useRouter } from 'next/navigation';
import ChatDetailScreen from '@/components/chat/ChatDetailScreen';

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.chatId as string;

  // Mock data - في التطبيق الحقيقي ستأتي من API
  const chatData = {
    id: chatId,
    title: `Chat ${chatId}`,
    avatarUrl: '/images/logo.png'
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ChatDetailScreen
      chatId={chatId}
      title={chatData.title}
      avatarUrl={chatData.avatarUrl}
      onBack={handleBack}
    />
  );
}

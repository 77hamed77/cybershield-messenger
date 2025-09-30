'use client';

import { useParams, useRouter } from 'next/navigation';
import ContactInfoScreen from '@/components/contacts/ContactInfoScreen';

export default function ContactInfoPage() {
  const params = useParams();
  const router = useRouter();
  const contactId = params.contactId as string;

  // Mock data - في التطبيق الحقيقي ستأتي من API
  const contactData = {
    id: contactId,
    name: `Contact ${contactId}`,
    username: `@user${contactId}`,
    avatarUrl: '/images/logo.png',
    isOnline: true,
    status: 'Online',
    bio: 'This is a sample bio for the contact',
    mission: 'Cybersecurity Specialist'
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ContactInfoScreen
      contact={contactData}
      onBack={handleBack}
    />
  );
}

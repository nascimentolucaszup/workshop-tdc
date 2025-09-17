// app/notifications/flow/page.tsx
import { Metadata } from 'next';
import NotificationFlowLayout from '@/components/NotificationFlow/NotificationFlowLayout';

export const metadata: Metadata = {
  title: 'Recomendações de Notificações | Dashboard',
  description: 'Fluxo de criação de notificações baseadas em tendências com IA',
};

export default function NotificationFlowPage() {
  return <NotificationFlowLayout />;
}
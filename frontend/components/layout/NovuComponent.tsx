import { NovuProvider, PopoverNotificationCenter, NotificationBell, IMessage } from '@novu/notification-center';
import { useSession } from 'next-auth/react';

export const NovuComponent = () => {
  const { data: session } = useSession();

  function onNotificationClick(message: IMessage) {
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }
  return (
    <NovuProvider subscriberId={session.id.toString()} applicationIdentifier={'BD1YbC0hzRY6'}>
      <PopoverNotificationCenter onNotificationClick={onNotificationClick} colorScheme="dark">
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};

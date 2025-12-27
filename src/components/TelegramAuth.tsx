import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { playSuccessSound } from '@/utils/sounds';

interface TelegramAuthProps {
  botUsername: string;
  onAuth?: (user: any) => void;
}

const TelegramAuth = ({ botUsername, onAuth }: TelegramAuthProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();

  useEffect(() => {
    const handleTelegramAuth = (event: MessageEvent) => {
      if (event.data.type === 'telegram_auth' && event.data.user) {
        const user = event.data.user;
        login(user);
        playSuccessSound();
        if (onAuth) {
          onAuth(user);
        }
      }
    };

    window.addEventListener('message', handleTelegramAuth);

    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.setAttribute('data-telegram-login', botUsername);
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '10');
      script.setAttribute('data-request-access', 'write');
      script.setAttribute('data-userpic', 'true');
      script.setAttribute('data-auth-url', `${window.location.origin}/auth/telegram/callback`);
      script.async = true;
      
      containerRef.current.appendChild(script);
    }

    return () => {
      window.removeEventListener('message', handleTelegramAuth);
    };
  }, [botUsername, login, onAuth]);

  return <div ref={containerRef} className="flex justify-center" />;
};

export default TelegramAuth;

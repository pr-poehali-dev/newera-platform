import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TelegramAuth from '@/components/TelegramAuth';
import { useAuth } from '@/hooks/useAuth';
import { playHoverSound, playClickSound } from '@/utils/sounds';

const Index = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {isAuthenticated && user && (
        <div className="absolute top-6 right-6 z-50">
          <Button
            variant="ghost"
            onClick={() => {
              playClickSound();
              logout();
            }}
            onMouseEnter={playHoverSound}
            className="text-muted-foreground hover:text-foreground"
          >
            Выйти
          </Button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="flex items-center justify-center gap-6 mb-8">
            <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="float-animation">
              <path d="M50 60L90 40L90 100L50 120V60Z" fill="url(#gradient1)" opacity="0.9"/>
              <path d="M90 40L130 60V120L90 100V40Z" fill="url(#gradient2)" opacity="0.8"/>
              <path d="M50 120L90 100L130 120L90 140L50 120Z" fill="url(#gradient3)" opacity="0.7"/>
              <path d="M90 100L130 120V160L90 140V100Z" fill="url(#gradient4)" opacity="0.85"/>
              <path d="M50 120L90 140V160L50 140V120Z" fill="url(#gradient5)" opacity="0.75"/>
              <defs>
                <linearGradient id="gradient1" x1="50" y1="40" x2="90" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4d4dff"/>
                  <stop offset="1" stopColor="#6b6bff"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="90" y1="40" x2="130" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5a5aff"/>
                  <stop offset="1" stopColor="#7878ff"/>
                </linearGradient>
                <linearGradient id="gradient3" x1="50" y1="100" x2="130" y2="140" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3d3dff"/>
                  <stop offset="1" stopColor="#5555ff"/>
                </linearGradient>
                <linearGradient id="gradient4" x1="90" y1="100" x2="130" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4747ff"/>
                  <stop offset="1" stopColor="#6363ff"/>
                </linearGradient>
                <linearGradient id="gradient5" x1="50" y1="120" x2="90" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3838ff"/>
                  <stop offset="1" stopColor="#5050ff"/>
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-8xl font-bold tracking-tight text-white slide-in-bottom">
              NewEra
            </h1>
          </div>

          <nav className="flex items-center justify-center gap-8 text-muted-foreground">
            <a
              href="/collections"
              className="text-lg hover:text-white transition-colors duration-200"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              Сборки
            </a>
            <span className="text-muted-foreground/30">/</span>
            <a
              href="/modifications"
              className="text-lg hover:text-white transition-colors duration-200"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              Модификации
            </a>
            <span className="text-muted-foreground/30">/</span>
            <a
              href="/fixes"
              className="text-lg hover:text-white transition-colors duration-200"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              Фиксы
            </a>
          </nav>

          {!isAuthenticated && (
            <div className="pt-8">
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border bounce-in">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Войти в NewEra</DialogTitle>
                    <DialogDescription className="text-center">
                      Авторизуйтесь через Telegram для доступа ко всем функциям
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="flex justify-center">
                      <TelegramAuth
                        botUsername="newera_auth_bot"
                        onAuth={() => {
                          setIsLoginOpen(false);
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        Нажимая кнопку, вы соглашаетесь с условиями использования
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

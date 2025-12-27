import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { playHoverSound, playClickSound } from '@/utils/sounds';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TelegramAuth from '@/components/TelegramAuth';

const COLLECTIONS = [
  {
    id: 1,
    title: "NewEra Premium Collection",
    description: "Полная приватная сборка с эксклюзивными модификациями",
    price: 2499,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    downloads: 1240,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Graphics Overhaul Pack",
    description: "Улучшенная графика и реалистичные текстуры",
    price: 1499,
    image: "https://images.unsplash.com/photo-1587095951604-b9d924a3fda0?w=800",
    downloads: 2150,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Roleplay Server Pack",
    description: "Готовая сборка для RP серверов",
    price: 3499,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800",
    downloads: 890,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Ultimate Car Pack",
    description: "Коллекция из 200+ реалистичных автомобилей",
    price: 1999,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    downloads: 3420,
    rating: 4.9,
  },
  {
    id: 5,
    title: "Sound Realism Bundle",
    description: "Полная переработка звукового оформления",
    price: 899,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    downloads: 2780,
    rating: 4.6,
  },
  {
    id: 6,
    title: "City Renovation Pack",
    description: "Обновленные текстуры всех зданий города",
    price: 1799,
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    downloads: 1560,
    rating: 4.8,
  },
];

const Collections = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0f]/80 border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => navigate('/')}
              onMouseEnter={playHoverSound}
            >
              <svg width="32" height="32" viewBox="0 0 200 200" fill="none" className="group-hover:scale-110 transition-transform">
                <path d="M50 60L90 40L90 100L50 120V60Z" fill="url(#grad1)" opacity="0.9"/>
                <path d="M90 40L130 60V120L90 100V40Z" fill="url(#grad2)" opacity="0.8"/>
                <defs>
                  <linearGradient id="grad1" x1="50" y1="40" x2="90" y2="120">
                    <stop stopColor="#4d4dff"/>
                    <stop offset="1" stopColor="#6b6bff"/>
                  </linearGradient>
                  <linearGradient id="grad2" x1="90" y1="40" x2="130" y2="120">
                    <stop stopColor="#5a5aff"/>
                    <stop offset="1" stopColor="#7878ff"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-bold tracking-tight text-white">NewEra</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="/collections" 
                className="text-sm text-white transition-colors"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                Сборки
              </a>
              <span className="text-muted-foreground/30">/</span>
              <a 
                href="/modifications" 
                className="text-sm text-muted-foreground hover:text-white transition-colors"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                Модификации
              </a>
              <span className="text-muted-foreground/30">/</span>
              <a 
                href="/fixes" 
                className="text-sm text-muted-foreground hover:text-white transition-colors"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                Фиксы
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <Button
                variant="ghost"
                onClick={() => {
                  playClickSound();
                  logout();
                }}
                onMouseEnter={playHoverSound}
                className="text-muted-foreground hover:text-white"
              >
                Выйти
              </Button>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white rounded-full"
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
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4 text-white slide-in-bottom">Сборки</h1>
            <p className="text-muted-foreground text-lg">
              Готовые наборы модификаций для полного преображения игры
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {COLLECTIONS.map((collection, index) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden bg-[#0f0f14] rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] slide-in-bottom"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  playClickSound();
                  navigate(`/mod/${collection.id}`);
                }}
                onMouseEnter={playHoverSound}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/40 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 text-white border-0 text-sm px-3">
                      ₽{collection.price}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Download" size={14} />
                      <span>{collection.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span>{collection.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Collections;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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

const MODS = [
  {
    id: 1,
    title: "Realistic Traffic AI",
    description: "Реалистичное поведение водителей и пешеходов",
    price: 0,
    category: "Скрипты",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
    downloads: 5240,
    rating: 4.7,
    isFree: true,
  },
  {
    id: 2,
    title: "Ultra Graphics Pack",
    description: "4K текстуры и улучшенные эффекты",
    price: 899,
    category: "Графика",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
    downloads: 3150,
    rating: 4.9,
    isFree: false,
  },
  {
    id: 3,
    title: "Weapon Pack 2024",
    description: "50+ новых реалистичных моделей оружия",
    price: 599,
    category: "Оружие",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=800",
    downloads: 2840,
    rating: 4.6,
    isFree: false,
  },
  {
    id: 4,
    title: "Sound Enhancement Mod",
    description: "Улучшенные звуки двигателей и окружения",
    price: 0,
    category: "Звуки",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    downloads: 4120,
    rating: 4.5,
    isFree: true,
  },
  {
    id: 5,
    title: "Custom Interiors",
    description: "Новые интерьеры для зданий",
    price: 799,
    category: "Карты",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    downloads: 1890,
    rating: 4.8,
    isFree: false,
  },
  {
    id: 6,
    title: "Character Skins Collection",
    description: "Коллекция из 100+ скинов персонажей",
    price: 0,
    category: "Скины",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800",
    downloads: 6230,
    rating: 4.4,
    isFree: true,
  },
];

const CATEGORIES = ["Все", "Скрипты", "Графика", "Оружие", "Звуки", "Карты", "Скины"];

const Modifications = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const filteredMods = MODS.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                className="text-sm text-muted-foreground hover:text-white transition-colors"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                Сборки
              </a>
              <span className="text-muted-foreground/30">/</span>
              <a 
                href="/modifications" 
                className="text-sm text-white transition-colors"
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
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-white slide-in-bottom">Модификации</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Индивидуальные моды для настройки вашей игры
            </p>

            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Поиск модификаций..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#0f0f14] border-white/10 text-white placeholder:text-muted-foreground"
              />
              <Button 
                variant="secondary" 
                size="icon"
                onMouseEnter={playHoverSound} 
                onClick={playClickSound}
                className="bg-[#0f0f14] hover:bg-[#15151a] border-white/10"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(category);
                  }}
                  onMouseEnter={playHoverSound}
                  className={selectedCategory === category 
                    ? "bg-primary text-white border-primary hover:bg-primary/90" 
                    : "bg-transparent border-white/10 text-muted-foreground hover:text-white hover:border-white/20"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredMods.map((mod, index) => (
              <div
                key={mod.id}
                className="group relative overflow-hidden bg-[#0f0f14] rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] slide-in-bottom"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  playClickSound();
                  navigate(`/mod/${mod.id}`);
                }}
                onMouseEnter={playHoverSound}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={mod.image}
                    alt={mod.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex gap-2">
                    {mod.isFree ? (
                      <Badge className="bg-green-500/90 text-white border-0 text-xs">
                        Бесплатно
                      </Badge>
                    ) : (
                      <Badge className="bg-primary/90 text-white border-0 text-xs">
                        ₽{mod.price}
                      </Badge>
                    )}
                    <Badge className="bg-black/60 text-white border-0 text-xs backdrop-blur-sm">
                      {mod.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {mod.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Download" size={14} />
                      <span>{mod.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500" />
                      <span>{mod.rating}</span>
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

export default Modifications;

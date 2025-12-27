import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
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

const MOCK_MODS = [
  {
    id: 1,
    title: "Восстановить сборку",
    description: "Восстановите свою приватную сборку GTA",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    buttonText: "СБОРКУ",
  },
  {
    id: 2,
    title: "Купить приватную сборку",
    description: "Получите доступ к эксклюзивным модификациям",
    image: "https://images.unsplash.com/photo-1587095951604-b9d924a3fda0?w=800",
    buttonText: "ПРИВАТНУЮ",
  },
  {
    id: 3,
    title: "Настройки GTA Custom",
    description: "Персонализируйте игру под себя",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800",
    buttonText: "CUSTOM",
  },
  {
    id: 4,
    title: "Скачать лаунчер",
    description: "Удобный менеджер модификаций",
    image: "https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?w=800",
    buttonText: "ЛАУНЧЕР",
  },
];

const SECTIONS = [
  { id: 'info', label: 'О группе', icon: 'Info' },
  { id: 'money', label: 'Донат', icon: 'DollarSign' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'services', label: 'Услуги', icon: 'ShoppingBag' },
];

const Index = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-purple-500 to-primary flex items-center justify-center pulse-glow">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">NewEra</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#collections" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Сборки
            </a>
            <a href="#modifications" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Модификации
            </a>
            <a href="#fixes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Фиксы
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 bounce-in">
                <div className="flex items-center gap-2">
                  {user.avatar && (
                    <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                  )}
                  <span className="text-sm font-medium">{user.firstName || user.username}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    playClickSound();
                    logout();
                  }}
                  onMouseEnter={playHoverSound}
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="rounded-full px-6 bg-primary hover:bg-primary/90 glow-effect"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    New Era
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
            )}
          </div>
        </div>
      </header>

      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-purple-600 to-primary flex items-center justify-center shadow-2xl shadow-primary/50 pulse-glow float-animation">
                <Icon name="Zap" size={48} className="text-white" />
              </div>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tight slide-in-bottom">
                NewEra
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Оформление группы <span className="text-primary font-semibold">ВКонтакте</span>
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {SECTIONS.map((section, index) => (
              <button
                key={section.id}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 hover:border-primary/50 transition-all duration-300 flex items-center justify-center group backdrop-blur-sm shimmer slide-in-bottom"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
              >
                <Icon name={section.icon as any} size={24} className="text-primary group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {MOCK_MODS.map((mod, index) => (
              <Card
                key={mod.id}
                className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-secondary border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer slide-in-bottom shimmer hover:glow-effect"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => {
                  playClickSound();
                  navigate('/catalog');
                }}
                onMouseEnter={playHoverSound}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10" />
                </div>
                <CardContent className="p-0 relative">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                        NewEra
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{mod.description}</p>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 rounded-xl font-semibold glow-effect"
                      onMouseEnter={playHoverSound}
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                      }}
                    >
                      {mod.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 mt-16 bg-gradient-to-b from-background to-card">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center pulse-glow">
                <Icon name="User" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Петрунников Родион</p>
                <p className="text-xs text-muted-foreground">Администратор NewEra</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 NewEra. Все права защищены
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

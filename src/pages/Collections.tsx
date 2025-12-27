import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { playHoverSound, playClickSound } from '@/utils/sounds';

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
];

const Collections = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/95 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-purple-500 to-primary flex items-center justify-center pulse-glow">
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">NewEra</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/collections" className="text-sm font-medium text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Сборки
            </a>
            <a href="/modifications" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Модификации
            </a>
            <a href="/fixes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Фиксы
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <Button
                variant="outline"
                onClick={() => {
                  playClickSound();
                  navigate('/profile');
                }}
                onMouseEnter={playHoverSound}
                className="gap-2"
              >
                {user.avatar && <img src={user.avatar} alt={user.username} className="w-6 h-6 rounded-full" />}
                {user.firstName || user.username}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  playClickSound();
                  navigate('/');
                }}
                onMouseEnter={playHoverSound}
                className="bg-primary hover:bg-primary/90"
              >
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 slide-in-bottom">Сборки</h2>
            <p className="text-muted-foreground text-lg">
              Готовые наборы модификаций для полного преображения игры
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {COLLECTIONS.map((collection, index) => (
              <Card
                key={collection.id}
                className="group relative overflow-hidden bg-gradient-to-br from-card to-secondary border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer slide-in-bottom hover:glow-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  playClickSound();
                  navigate(`/mod/${collection.id}`);
                }}
                onMouseEnter={playHoverSound}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10" />
                </div>
                <CardContent className="p-0 relative">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary/90 text-white border-0">
                        ₽{collection.price}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Icon name="Download" size={12} className="mr-1" />
                        {collection.downloads}
                      </Badge>
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Icon name="Star" size={12} className="mr-1" />
                        {collection.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{collection.description}</p>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                      }}
                      onMouseEnter={playHoverSound}
                    >
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;

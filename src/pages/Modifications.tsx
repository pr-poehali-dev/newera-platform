import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { playHoverSound, playClickSound } from '@/utils/sounds';

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
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredMods = MODS.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <a href="/collections" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Сборки
            </a>
            <a href="/modifications" className="text-sm font-medium text-foreground transition-colors" onMouseEnter={playHoverSound}>
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
            <h2 className="text-5xl font-bold mb-4 slide-in-bottom">Модификации</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Индивидуальные моды для настройки вашей игры
            </p>

            <div className="flex gap-4 mb-8">
              <Input
                placeholder="Поиск модификаций..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-secondary border-border"
              />
              <Button variant="secondary" onMouseEnter={playHoverSound} onClick={playClickSound}>
                <Icon name="Search" size={20} />
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(category);
                  }}
                  onMouseEnter={playHoverSound}
                  className={selectedCategory === category ? "bg-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredMods.map((mod, index) => (
              <Card
                key={mod.id}
                className="group relative overflow-hidden bg-gradient-to-br from-card to-secondary border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer slide-in-bottom hover:glow-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  playClickSound();
                  navigate(`/mod/${mod.id}`);
                }}
                onMouseEnter={playHoverSound}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10" />
                </div>
                <CardContent className="p-0 relative">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {mod.isFree ? (
                        <Badge className="bg-green-500/90 text-white border-0">
                          Бесплатно
                        </Badge>
                      ) : (
                        <Badge className="bg-primary/90 text-white border-0">
                          ₽{mod.price}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {mod.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Icon name="Download" size={12} className="mr-1" />
                        {mod.downloads}
                      </Badge>
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Icon name="Star" size={12} className="mr-1" />
                        {mod.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold mb-2">{mod.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{mod.description}</p>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                      }}
                      onMouseEnter={playHoverSound}
                    >
                      {mod.isFree ? 'Скачать' : 'Купить'}
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

export default Modifications;

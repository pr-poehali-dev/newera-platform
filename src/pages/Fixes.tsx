import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/useAuth';
import { playHoverSound, playClickSound } from '@/utils/sounds';

const FIXES = [
  {
    id: 1,
    title: "Crash Fix Collection",
    description: "Исправления критических вылетов игры",
    downloads: 8240,
    version: "1.0.2372",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  },
  {
    id: 2,
    title: "Performance Optimizer",
    description: "Оптимизация производительности для слабых ПК",
    downloads: 12150,
    version: "Все версии",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800",
  },
  {
    id: 3,
    title: "Texture Bug Fix",
    description: "Исправление багов с текстурами и моделями",
    downloads: 5840,
    version: "1.0.2699",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800",
  },
  {
    id: 4,
    title: "Online Connection Fix",
    description: "Решение проблем с подключением к онлайну",
    downloads: 3920,
    version: "Все версии",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
  },
  {
    id: 5,
    title: "Audio Glitch Fix",
    description: "Исправление проблем со звуком",
    downloads: 2150,
    version: "1.0.2802",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800",
  },
  {
    id: 6,
    title: "Controller Support Fix",
    description: "Улучшенная поддержка геймпадов",
    downloads: 4560,
    version: "Все версии",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=800",
  },
];

const Fixes = () => {
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
            <a href="/collections" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Сборки
            </a>
            <a href="/modifications" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onMouseEnter={playHoverSound}>
              Модификации
            </a>
            <a href="/fixes" className="text-sm font-medium text-foreground transition-colors" onMouseEnter={playHoverSound}>
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
            <h2 className="text-5xl font-bold mb-4 slide-in-bottom">Фиксы</h2>
            <p className="text-muted-foreground text-lg">
              Исправления ошибок и улучшения стабильности игры
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {FIXES.map((fix, index) => (
              <Card
                key={fix.id}
                className="group relative overflow-hidden bg-gradient-to-br from-card to-secondary border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer slide-in-bottom hover:glow-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  playClickSound();
                  navigate(`/mod/${fix.id}`);
                }}
                onMouseEnter={playHoverSound}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10" />
                </div>
                <CardContent className="p-0 relative">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={fix.image}
                      alt={fix.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-500/90 text-white border-0">
                        Бесплатно
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Icon name="Download" size={12} className="mr-1" />
                        {fix.downloads}
                      </Badge>
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {fix.version}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold mb-2">{fix.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{fix.description}</p>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound();
                      }}
                      onMouseEnter={playHoverSound}
                    >
                      Скачать
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

export default Fixes;

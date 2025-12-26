import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

const MOCK_MODS = [
  {
    id: 1,
    title: "Los Santos Redux",
    description: "Полная графическая модернизация GTA V с реалистичными текстурами",
    price: 1499,
    category: "Глобальные сборки",
    game: "GTA V",
    rating: 4.8,
    downloads: 15240,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    isPaid: true,
    author: "ModMaster",
  },
  {
    id: 2,
    title: "Realistic Traffic Pack",
    description: "Реалистичный трафик и улучшенное AI водителей",
    price: 0,
    category: "Скрипты",
    game: "GTA V",
    rating: 4.5,
    downloads: 32100,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
    isPaid: false,
    author: "CityBuilder",
  },
  {
    id: 3,
    title: "Vice City Remastered",
    description: "Обновленная Vice City с HD текстурами и новым освещением",
    price: 999,
    category: "Глобальные сборки",
    game: "GTA Vice City",
    rating: 4.9,
    downloads: 8750,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
    isPaid: true,
    author: "RetroGamer",
  },
  {
    id: 4,
    title: "Super Cars Pack 2024",
    description: "50+ новых суперкаров с реалистичной физикой",
    price: 799,
    category: "Транспорт",
    game: "GTA V",
    rating: 4.7,
    downloads: 21400,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    isPaid: true,
    author: "SpeedDemon",
  },
  {
    id: 5,
    title: "Custom Skins Collection",
    description: "Более 100 уникальных скинов персонажей",
    price: 0,
    category: "Скины",
    game: "GTA San Andreas",
    rating: 4.3,
    downloads: 45200,
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800",
    isPaid: false,
    author: "SkinMaster",
  },
  {
    id: 6,
    title: "Night Life Enhancement",
    description: "Улучшенная ночная жизнь города с новыми клубами",
    price: 599,
    category: "Карты",
    game: "GTA V",
    rating: 4.6,
    downloads: 12800,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    isPaid: true,
    author: "NightOwl",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredMods = MOCK_MODS.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'paid' && mod.isPaid) ||
                           (selectedCategory === 'free' && !mod.isPaid);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">NewEra</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="story-link text-sm font-medium">Главная</a>
            <a href="/catalog" className="story-link text-sm font-medium">Каталог</a>
            <a href="/community" className="story-link text-sm font-medium">Сообщество</a>
            <a href="/discussions" className="story-link text-sm font-medium">Обсуждения</a>
          </nav>

          <div className="flex items-center gap-3">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost">Вход</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Войти в аккаунт</DialogTitle>
                  <DialogDescription>
                    Введите ваши данные для входа в систему
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full">Войти</Button>
                  <div className="text-center text-sm text-muted-foreground">или</div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Telegram
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Icon name="Share2" size={16} className="mr-2" />
                      VK
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
              <DialogTrigger asChild>
                <Button>Регистрация</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Создать аккаунт</DialogTitle>
                  <DialogDescription>
                    Присоединяйтесь к NewEra — крупнейшему хабу модов для GTA
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Пароль</Label>
                    <Input id="reg-password" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm">Повторите пароль</Label>
                    <Input id="reg-confirm" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full">Создать аккаунт</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    На ваш email будет отправлено письмо для подтверждения
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Модификации нового поколения
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Крупнейший маркетплейс модов для Grand Theft Auto. Покупай, скачивай, делись опытом.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Icon name="Download" size={20} />
                Начать
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Play" size={20} />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="container">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск модификаций..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Icon name="SlidersHorizontal" size={20} />
                Фильтры
              </Button>
            </div>

            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="paid">Платные</TabsTrigger>
                <TabsTrigger value="free">Бесплатные</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMods.map((mod, index) => (
              <Card key={mod.id} className="hover-scale animate-scale-in overflow-hidden cursor-pointer" style={{ animationDelay: `${index * 50}ms` }} onClick={() => navigate(`/mod/${mod.id}`)}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={mod.image} 
                    alt={mod.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {mod.isPaid ? (
                      <Badge className="bg-accent text-accent-foreground">₽{mod.price}</Badge>
                    ) : (
                      <Badge variant="secondary">Бесплатно</Badge>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{mod.title}</CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                      <Icon name="Star" size={16} className="fill-primary text-primary" />
                      <span>{mod.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{mod.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{mod.category}</Badge>
                    <Badge variant="outline">{mod.game}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{mod.author[0]}</AvatarFallback>
                    </Avatar>
                    <span>{mod.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Icon name="Download" size={14} />
                      <span>{mod.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2">
                    {mod.isPaid ? (
                      <>
                        <Icon name="ShoppingCart" size={16} />
                        Купить
                      </>
                    ) : (
                      <>
                        <Icon name="Download" size={16} />
                        Скачать
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12 mt-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Zap" size={24} className="text-primary" />
                <span className="font-bold text-lg">NewEra</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Маркетплейс модификаций для Grand Theft Auto нового поколения
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Каталог</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Все моды</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Платные</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Бесплатные</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Популярные</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Сообщество</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Стена</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Обсуждения</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Авторы</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Поддержка</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">О платформе</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 NewEra. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
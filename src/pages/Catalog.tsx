import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ALL_MODS = [
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
  {
    id: 7,
    title: "Weapon Realism Mod",
    description: "Реалистичная баллистика и звуки оружия",
    price: 0,
    category: "Оружие",
    game: "GTA V",
    rating: 4.4,
    downloads: 18900,
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=800",
    isPaid: false,
    author: "Gunsmith",
  },
  {
    id: 8,
    title: "Liberty City Redux",
    description: "Графическая модернизация GTA IV",
    price: 1299,
    category: "Глобальные сборки",
    game: "GTA IV",
    rating: 4.7,
    downloads: 9500,
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
    isPaid: true,
    author: "ModMaster",
  },
  {
    id: 9,
    title: "Classic Radio Stations",
    description: "Пак классических радиостанций из предыдущих частей",
    price: 0,
    category: "Скрипты",
    game: "GTA V",
    rating: 4.2,
    downloads: 28700,
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800",
    isPaid: false,
    author: "MusicLover",
  },
];

const ITEMS_PER_PAGE = 6;

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [gameFilter, setGameFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMods = ALL_MODS.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'paid' && mod.isPaid) ||
                        (priceFilter === 'free' && !mod.isPaid);
    const matchesGame = gameFilter === 'all' || mod.game === gameFilter;
    return matchesSearch && matchesCategory && matchesPrice && matchesGame;
  });

  const sortedMods = [...filteredMods].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedMods.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMods = sortedMods.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModClick = (modId: number) => {
    navigate(`/mod/${modId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">NewEra</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="story-link text-sm font-medium">Главная</a>
            <a href="/catalog" className="story-link text-sm font-medium text-primary">Каталог</a>
            <a href="/community" className="story-link text-sm font-medium">Сообщество</a>
            <a href="/discussions" className="story-link text-sm font-medium">Обсуждения</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/messages')}>
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Каталог модификаций</h2>
          <p className="text-muted-foreground">Найдите идеальные моды для вашей игры</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Категория</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      <SelectItem value="Глобальные сборки">Глобальные сборки</SelectItem>
                      <SelectItem value="Транспорт">Транспорт</SelectItem>
                      <SelectItem value="Скины">Скины</SelectItem>
                      <SelectItem value="Скрипты">Скрипты</SelectItem>
                      <SelectItem value="Карты">Карты</SelectItem>
                      <SelectItem value="Оружие">Оружие</SelectItem>
                      <SelectItem value="Графика">Графика</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Игра</label>
                  <Select value={gameFilter} onValueChange={setGameFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все игры</SelectItem>
                      <SelectItem value="GTA V">GTA V</SelectItem>
                      <SelectItem value="GTA IV">GTA IV</SelectItem>
                      <SelectItem value="GTA San Andreas">GTA San Andreas</SelectItem>
                      <SelectItem value="GTA Vice City">GTA Vice City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Цена</label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все</SelectItem>
                      <SelectItem value="free">Бесплатные</SelectItem>
                      <SelectItem value="paid">Платные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('all');
                    setGameFilter('all');
                    setPriceFilter('all');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск модификаций..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">По популярности</SelectItem>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                      <SelectItem value="newest">Сначала новые</SelectItem>
                      <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                      <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Найдено модификаций: <span className="font-semibold text-foreground">{sortedMods.length}</span>
              </p>
              
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedMods.map((mod, index) => (
                <Card 
                  key={mod.id} 
                  className="hover-scale animate-scale-in overflow-hidden cursor-pointer" 
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleModClick(mod.id)}
                >
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
                    <Button className="w-full gap-2" onClick={(e) => {
                      e.stopPropagation();
                      handleModClick(mod.id);
                    }}>
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

            {paginatedMods.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold mb-2">Модификации не найдены</p>
                  <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
                </CardContent>
              </Card>
            )}

            {totalPages > 1 && paginatedMods.length > 0 && (
              <div className="flex justify-center pt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;

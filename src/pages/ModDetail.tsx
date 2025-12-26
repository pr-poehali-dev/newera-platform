import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const MOCK_MOD = {
  id: 1,
  title: "Los Santos Redux",
  description: "Полная графическая модернизация GTA V с реалистичными текстурами",
  fullDescription: `Los Santos Redux — это комплексная модификация, полностью меняющая визуальное восприятие GTA V. 
  
  Включает в себя:
  • Улучшенные текстуры в 4K разрешении для всех зданий и объектов
  • Новую систему освещения с реалистичными тенями
  • Улучшенные эффекты погоды и времени суток
  • Оптимизированные модели для лучшей производительности
  • Совместимость с популярными ENB пресетами
  
  Требования:
  • GTA V версии 1.0.2845.0 или новее
  • 16 ГБ оперативной памяти
  • Видеокарта с 8 ГБ видеопамяти
  • 15 ГБ свободного места на диске`,
  price: 1499,
  category: "Глобальные сборки",
  game: "GTA V",
  rating: 4.8,
  downloads: 15240,
  images: [
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200",
  ],
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  isPaid: true,
  author: "ModMaster",
  authorMods: 24,
  publishDate: "15 декабря 2024",
  lastUpdate: "20 декабря 2024",
  version: "2.1.0",
  reviews: [
    { id: 1, author: "GamerPro", rating: 5, text: "Потрясающая графика! Игра выглядит совершенно по-новому", date: "2 дня назад" },
    { id: 2, author: "CityFan", rating: 4, text: "Отличная модификация, но требует мощное железо", date: "5 дней назад" },
    { id: 3, author: "NightRider", rating: 5, text: "Лучшая графическая сборка для GTA V!", date: "1 неделю назад" },
  ]
};

const ModDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(0);

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
            <a href="#" className="story-link text-sm font-medium">Каталог</a>
            <a href="#" className="story-link text-sm font-medium">Сообщество</a>
          </nav>
          <Button variant="ghost">
            <Icon name="User" size={20} />
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => window.history.back()}>
          <Icon name="ArrowLeft" size={16} />
          Назад к каталогу
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4 animate-fade-in">
              <img 
                src={MOCK_MOD.images[selectedImage]} 
                alt={MOCK_MOD.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="grid grid-cols-3 gap-2">
                {MOCK_MOD.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img}
                    alt={`Screenshot ${idx + 1}`}
                    className={`h-24 object-cover rounded cursor-pointer hover-scale ${
                      selectedImage === idx ? 'ring-2 ring-primary' : 'opacity-60'
                    }`}
                    onClick={() => setSelectedImage(idx)}
                  />
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Видеообзор</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="Play" size={48} className="text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Описание</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Отзывы ({MOCK_MOD.reviews.length})</TabsTrigger>
                <TabsTrigger value="changelog" className="flex-1">История изменений</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>О модификации</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{MOCK_MOD.fullDescription}</pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Оставить отзыв</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm mb-2">Ваша оценка</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={24}
                            className={`cursor-pointer ${
                              star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'
                            }`}
                            onClick={() => setRating(star)}
                          />
                        ))}
                      </div>
                    </div>
                    <Textarea placeholder="Поделитесь своим мнением о модификации..." />
                    <Button>Отправить отзыв</Button>
                  </CardContent>
                </Card>

                {MOCK_MOD.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="fill-primary text-primary" />
                          <span className="text-sm font-semibold">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="changelog">
                <Card>
                  <CardHeader>
                    <CardTitle>История обновлений</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>v2.1.0</Badge>
                        <span className="text-sm text-muted-foreground">20 декабря 2024</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Улучшена производительность на 15%</li>
                        <li>Добавлены новые текстуры для центра города</li>
                        <li>Исправлены ошибки с освещением</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">v2.0.0</Badge>
                        <span className="text-sm text-muted-foreground">15 декабря 2024</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Полная переработка системы освещения</li>
                        <li>Новые 4K текстуры</li>
                        <li>Совместимость с последней версией игры</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">{MOCK_MOD.title}</CardTitle>
                <CardDescription>{MOCK_MOD.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">₽{MOCK_MOD.price}</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={20} className="fill-primary text-primary" />
                    <span className="font-semibold">{MOCK_MOD.rating}</span>
                  </div>
                </div>

                <Button className="w-full gap-2" size="lg">
                  <Icon name="ShoppingCart" size={20} />
                  Купить модификацию
                </Button>

                <Button variant="outline" className="w-full gap-2">
                  <Icon name="Heart" size={20} />
                  В избранное
                </Button>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Категория</span>
                    <Badge variant="outline">{MOCK_MOD.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Игра</span>
                    <Badge variant="outline">{MOCK_MOD.game}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Версия</span>
                    <span className="font-mono">{MOCK_MOD.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Скачиваний</span>
                    <span>{MOCK_MOD.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Опубликовано</span>
                    <span>{MOCK_MOD.publishDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Обновлено</span>
                    <span>{MOCK_MOD.lastUpdate}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-semibold mb-2">Автор</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{MOCK_MOD.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{MOCK_MOD.author}</p>
                      <p className="text-xs text-muted-foreground">{MOCK_MOD.authorMods} модификаций</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Профиль
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModDetail;

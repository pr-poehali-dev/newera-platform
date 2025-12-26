import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const PURCHASED_MODS = [
  {
    id: 1,
    title: "Los Santos Redux",
    downloadUrl: "https://example.com/download/ls-redux",
    purchaseDate: "20 декабря 2024",
    price: 1499,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400",
  },
  {
    id: 4,
    title: "Super Cars Pack 2024",
    downloadUrl: "https://example.com/download/cars-pack",
    purchaseDate: "18 декабря 2024",
    price: 799,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
  },
];

const TRANSACTIONS = [
  { id: 1, mod: "Los Santos Redux", amount: 1499, date: "20 дек 2024, 14:30", status: "Успешно" },
  { id: 2, mod: "Super Cars Pack 2024", amount: 799, date: "18 дек 2024, 18:15", status: "Успешно" },
  { id: 3, mod: "Night Life Enhancement", amount: 599, date: "15 дек 2024, 20:45", status: "Успешно" },
];

const MY_POSTS = [
  { id: 1, text: "Только что установил Los Santos Redux — графика потрясающая! 🔥", likes: 24, comments: 5, date: "2 часа назад" },
  { id: 2, text: "Кто-нибудь пробовал новый пак машин? Стоит ли покупать?", likes: 12, comments: 8, date: "1 день назад" },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('mods');

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarFallback className="text-2xl">GM</AvatarFallback>
                </Avatar>
                <CardTitle>GamerMaster</CardTitle>
                <CardDescription>gamer@example.com</CardDescription>
                <Badge className="mx-auto mt-2">Игрок</Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Separator />
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Статус</span>
                  <span className="font-medium">Активен</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Регистрация</span>
                  <span className="font-medium">15 дек 2024</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Куплено модов</span>
                  <span className="font-medium">{PURCHASED_MODS.length}</span>
                </div>
                <Separator className="my-2" />
                <Button variant="outline" className="w-full gap-2">
                  <Icon name="Settings" size={16} />
                  Настройки
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="mods">Мои сборки</TabsTrigger>
                <TabsTrigger value="transactions">Транзакции</TabsTrigger>
                <TabsTrigger value="posts">Посты</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>

              <TabsContent value="mods" className="space-y-6 mt-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Купленные модификации</h2>
                  <p className="text-muted-foreground mb-6">
                    Здесь находятся все ваши приобретенные моды с доступом к скачиванию
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PURCHASED_MODS.map((mod) => (
                    <Card key={mod.id} className="hover-scale">
                      <div className="flex gap-4 p-4">
                        <img 
                          src={mod.image} 
                          alt={mod.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold">{mod.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Куплено: {mod.purchaseDate}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" className="gap-1">
                              <Icon name="Download" size={14} />
                              Скачать
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Icon name="ExternalLink" size={14} />
                              Детали
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {PURCHASED_MODS.length === 0 && (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">У вас пока нет купленных модификаций</p>
                      <Button>Перейти в каталог</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6 mt-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">История транзакций</h2>
                  <p className="text-muted-foreground mb-6">
                    Полная история ваших покупок и платежей
                  </p>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {TRANSACTIONS.map((transaction) => (
                        <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                          <div className="space-y-1">
                            <p className="font-medium">{transaction.mod}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="font-semibold">₽{transaction.amount}</p>
                            <Badge variant="outline" className="text-xs">
                              <Icon name="CheckCircle" size={12} className="mr-1" />
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts" className="space-y-6 mt-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Мои посты</h2>
                  <p className="text-muted-foreground mb-6">
                    Все ваши сообщения на стене сообщества
                  </p>
                </div>

                <div className="space-y-4">
                  {MY_POSTS.map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>GM</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold">GamerMaster</p>
                            <p className="text-sm text-muted-foreground">{post.date}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreVertical" size={16} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{post.text}</p>
                      </CardContent>
                      <CardFooter className="justify-between">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Icon name="Heart" size={16} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Icon name="MessageCircle" size={16} />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Icon name="Share2" size={16} />
                          Поделиться
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Настройки профиля</h2>
                  <p className="text-muted-foreground mb-6">
                    Управление вашим аккаунтом и персональными данными
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Личная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Никнейм</Label>
                      <Input id="username" defaultValue="GamerMaster" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="gamer@example.com" disabled />
                      <p className="text-xs text-muted-foreground">
                        <Icon name="CheckCircle" size={12} className="inline mr-1" />
                        Email подтвержден
                      </p>
                    </div>
                    <Button>Сохранить изменения</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Безопасность</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Текущий пароль</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Новый пароль</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Повторите новый пароль</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button variant="outline">Изменить пароль</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Социальные сети</CardTitle>
                    <CardDescription>Привязанные аккаунты для быстрого входа</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="MessageCircle" size={20} className="text-primary" />
                        <span>Telegram</span>
                      </div>
                      <Badge variant="outline">Не подключено</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Share2" size={20} className="text-primary" />
                        <span>VKontakte</span>
                      </div>
                      <Badge variant="outline">Не подключено</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

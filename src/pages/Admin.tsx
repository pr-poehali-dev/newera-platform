import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MOCK_USERS = [
  { id: 1, username: "GamerPro", email: "gamer@example.com", role: "Пользователь", status: "Бывалый", timeSpent: "12ч 30м", isBlocked: false, emailVerified: true },
  { id: 2, username: "ModMaster", email: "modmaster@example.com", role: "Автор", status: "Авторитет", timeSpent: "45ч 15м", isBlocked: false, emailVerified: true },
  { id: 3, username: "CityBuilder", email: "city@example.com", role: "Пользователь", status: "Освоившийся", timeSpent: "5ч 20м", isBlocked: false, emailVerified: true },
  { id: 4, username: "Spammer123", email: "spam@example.com", role: "Пользователь", status: "Новичок", timeSpent: "0ч 45м", isBlocked: true, emailVerified: false },
];

const MOCK_MODS_PENDING = [
  { id: 1, title: "Night City Remastered", author: "NeonBuilder", category: "Глобальные сборки", price: 1299, date: "26 дек 2024", status: "pending" },
  { id: 2, title: "Russian Cars Pack", author: "RusMods", category: "Транспорт", price: 0, date: "25 дек 2024", status: "pending" },
];

const MOCK_WALL_POSTS = [
  { id: 1, author: "GamerPro", content: "Только что установил Los Santos Redux — графика потрясающая! 🔥", likes: 24, reports: 0, date: "2 часа назад" },
  { id: 2, author: "Spammer123", content: "КУПИТЕ ЛУЧШИЕ МОДЫ ЗДЕСЬ!!! http://scam-site.com", likes: 0, reports: 5, date: "1 час назад" },
];

const ROLES = [
  { value: "founder", label: "Основатель", level: 100 },
  { value: "director", label: "Руководитель", level: 90 },
  { value: "admin", label: "Администратор", level: 80 },
  { value: "moderator", label: "Модератор", level: 70 },
  { value: "media_partner", label: "Медиа-партнер", level: 50 },
  { value: "author", label: "Автор", level: 40 },
  { value: "authority", label: "Авторитет", level: 30 },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">Админ-панель NewEra</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">Основатель</Badge>
            <Button variant="ghost" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="mods">Модификации</TabsTrigger>
            <TabsTrigger value="content">Контент</TabsTrigger>
            <TabsTrigger value="showcase">Витрина</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Всего пользователей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,243</div>
                  <p className="text-xs text-muted-foreground mt-1">+12% за месяц</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Модификаций</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">456</div>
                  <p className="text-xs text-muted-foreground mt-1">24 ожидают проверки</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Доход за месяц</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽156,890</div>
                  <p className="text-xs text-muted-foreground mt-1">+28% к прошлому</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Активность</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">892</div>
                  <p className="text-xs text-muted-foreground mt-1">пользователей онлайн</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Модификации на модерации</CardTitle>
                  <CardDescription>Ожидают одобрения</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_MODS_PENDING.slice(0, 3).map((mod) => (
                      <div key={mod.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{mod.title}</p>
                          <p className="text-sm text-muted-foreground">{mod.author} • {mod.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Icon name="Check" size={14} />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последние жалобы</CardTitle>
                  <CardDescription>Требуют внимания модераторов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_WALL_POSTS.filter(p => p.reports > 0).map((post) => (
                      <div key={post.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm mb-1">{post.content}</p>
                          <p className="text-xs text-muted-foreground">{post.author} • {post.date}</p>
                        </div>
                        <Badge variant="destructive">{post.reports} жалоб</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Управление пользователями</h2>
                <p className="text-muted-foreground">Просмотр, редактирование и модерация пользователей</p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Поиск пользователей..." className="w-64" />
                <Button variant="outline">
                  <Icon name="Filter" size={16} />
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Время на сайте</TableHead>
                      <TableHead>Статус аккаунта</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_USERS.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.username[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.username}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {user.email}
                            {user.emailVerified && (
                              <Icon name="CheckCircle" size={14} className="text-green-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{user.timeSpent}</TableCell>
                        <TableCell>
                          {user.isBlocked ? (
                            <Badge variant="destructive">Заблокирован</Badge>
                          ) : (
                            <Badge variant="secondary">Активен</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Icon name="MoreVertical" size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Управление пользователем: {user.username}</DialogTitle>
                                <DialogDescription>
                                  Изменение ролей, статусов и прав доступа
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Роль пользователя</Label>
                                  <Select defaultValue={user.role.toLowerCase()}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {ROLES.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                          {role.label} (ур. {role.level})
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                  <Label htmlFor="block-user" className="flex flex-col space-y-1">
                                    <span>Блокировка аккаунта</span>
                                    <span className="text-xs font-normal text-muted-foreground">
                                      Заблокированный пользователь не сможет войти
                                    </span>
                                  </Label>
                                  <Switch id="block-user" checked={user.isBlocked} />
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                  <Label htmlFor="verify-email" className="flex flex-col space-y-1">
                                    <span>Email подтвержден</span>
                                    <span className="text-xs font-normal text-muted-foreground">
                                      Ручное подтверждение email
                                    </span>
                                  </Label>
                                  <Switch id="verify-email" checked={user.emailVerified} />
                                </div>

                                <div className="pt-4 space-y-2">
                                  <Button className="w-full">Сохранить изменения</Button>
                                  <Button variant="destructive" className="w-full">
                                    <Icon name="Ban" size={16} className="mr-2" />
                                    Заблокировать навсегда
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mods" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Управление модификациями</h2>
                <p className="text-muted-foreground">Модерация, редактирование и публикация модов</p>
              </div>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить мод
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Модификации на проверке</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Автор</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_MODS_PENDING.map((mod) => (
                      <TableRow key={mod.id}>
                        <TableCell className="font-medium">{mod.title}</TableCell>
                        <TableCell>{mod.author}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{mod.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {mod.price === 0 ? (
                            <Badge variant="secondary">Бесплатно</Badge>
                          ) : (
                            <span className="font-semibold">₽{mod.price}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{mod.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Icon name="Eye" size={14} className="mr-1" />
                                  Просмотр
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>{mod.title}</DialogTitle>
                                  <DialogDescription>Проверка модификации перед публикацией</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="aspect-video bg-muted rounded-lg"></div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Категория</Label>
                                      <Input defaultValue={mod.category} />
                                    </div>
                                    <div>
                                      <Label>Цена (₽)</Label>
                                      <Input type="number" defaultValue={mod.price} />
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Описание</Label>
                                    <Textarea rows={4} placeholder="Описание модификации..." />
                                  </div>
                                  <div className="flex gap-2">
                                    <Button className="flex-1">
                                      <Icon name="Check" size={16} className="mr-2" />
                                      Одобрить
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                      <Icon name="X" size={16} className="mr-2" />
                                      Отклонить
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Модерация контента</h2>
              <p className="text-muted-foreground">Управление постами, комментариями и обсуждениями</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Посты на стене</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {MOCK_WALL_POSTS.map((post) => (
                  <div key={post.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{post.author}</span>
                        <span className="text-sm text-muted-foreground">• {post.date}</span>
                      </div>
                      <p className="mb-2">{post.content}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{post.likes} лайков</span>
                        {post.reports > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {post.reports} жалоб
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="showcase" className="space-y-6 mt-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Управление витриной</h2>
              <p className="text-muted-foreground">Настройка главной страницы и рекомендаций</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Рекомендуемые модификации</CardTitle>
                <CardDescription>Моды, отображаемые на главной странице</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Заголовок секции</Label>
                  <Input defaultValue="Модификации нового поколения" />
                </div>
                <div className="space-y-2">
                  <Label>Описание</Label>
                  <Textarea defaultValue="Крупнейший маркетплейс модов для Grand Theft Auto" />
                </div>
                <div className="space-y-2">
                  <Label>Баннер (URL изображения)</Label>
                  <Input placeholder="https://example.com/banner.jpg" />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="showcase-active">Активна</Label>
                  <Switch id="showcase-active" defaultChecked />
                </div>
                <Button>Сохранить изменения</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Избранные модификации</CardTitle>
                <CardDescription>Выберите моды для отображения в блоке "Популярное"</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить мод в избранное
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

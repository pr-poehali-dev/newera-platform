import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MOCK_DISCUSSIONS = [
  {
    id: 1,
    title: "Лучшие ENB пресеты для GTA V в 2024",
    author: { username: "GraphicsFan", role: "Авторитет" },
    category: "Графика",
    replies: 45,
    views: 1230,
    isPinned: true,
    isLocked: false,
    lastReply: "10 минут назад",
    lastReplyAuthor: "ModMaster",
  },
  {
    id: 2,
    title: "Помогите с установкой Los Santos Redux",
    author: { username: "Newbie123", role: "Новичок" },
    category: "Помощь",
    replies: 12,
    views: 345,
    isPinned: false,
    isLocked: false,
    lastReply: "2 часа назад",
    lastReplyAuthor: "TechSupport",
  },
  {
    id: 3,
    title: "Обсуждение: какие моды вы хотите видеть на платформе?",
    author: { username: "AdminTeam", role: "Администратор" },
    category: "Общее",
    replies: 89,
    views: 2450,
    isPinned: true,
    isLocked: false,
    lastReply: "1 час назад",
    lastReplyAuthor: "GamerPro",
  },
  {
    id: 4,
    title: "Ретро-подборка: лучшие моды для GTA San Andreas",
    author: { username: "RetroGamer", role: "Авторитет" },
    category: "Обзоры",
    replies: 67,
    views: 1890,
    isPinned: false,
    isLocked: false,
    lastReply: "5 часов назад",
    lastReplyAuthor: "CityBuilder",
  },
  {
    id: 5,
    title: "[РЕШЕНО] Конфликт модов транспорта с глобальной сборкой",
    author: { username: "CarLover", role: "Пользователь" },
    category: "Техподдержка",
    replies: 8,
    views: 234,
    isPinned: false,
    isLocked: true,
    lastReply: "1 день назад",
    lastReplyAuthor: "ModMaster",
  },
  {
    id: 6,
    title: "Как оптимизировать GTA V с большим количеством модов?",
    author: { username: "PerformanceGuy", role: "Освоившийся" },
    category: "Помощь",
    replies: 23,
    views: 678,
    isPinned: false,
    isLocked: false,
    lastReply: "3 часа назад",
    lastReplyAuthor: "TechWizard",
  },
];

const CATEGORIES = [
  { value: "all", label: "Все категории" },
  { value: "general", label: "Общее" },
  { value: "help", label: "Помощь" },
  { value: "reviews", label: "Обзоры" },
  { value: "graphics", label: "Графика" },
  { value: "tech", label: "Техподдержка" },
];

const Discussions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const currentUserRole = "Пользователь";

  const canCreateDiscussion = ["Основатель", "Администратор", "Модератор", "Авторитет"].includes(currentUserRole);

  const filteredDiscussions = MOCK_DISCUSSIONS.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pinnedDiscussions = filteredDiscussions.filter(d => d.isPinned);
  const regularDiscussions = filteredDiscussions.filter(d => !d.isPinned);

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
            <a href="#" className="story-link text-sm font-medium text-primary">Обсуждения</a>
          </nav>
          <Button variant="ghost">
            <Icon name="User" size={20} />
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2">Обсуждения</h2>
              <p className="text-muted-foreground">Форумы, вопросы и обсуждения о модификациях</p>
            </div>

            {canCreateDiscussion ? (
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={16} />
                    Создать тему
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новая тема обсуждения</DialogTitle>
                    <DialogDescription>
                      Создайте новую тему для обсуждения с сообществом
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic-title">Название темы</Label>
                      <Input id="topic-title" placeholder="О чем вы хотите поговорить?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic-category">Категория</Label>
                      <Select>
                        <SelectTrigger id="topic-category">
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.filter(c => c.value !== 'all').map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic-content">Содержание</Label>
                      <Textarea
                        id="topic-content"
                        rows={6}
                        placeholder="Опишите тему подробнее..."
                      />
                    </div>
                    <Button className="w-full">Создать обсуждение</Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="text-sm text-muted-foreground text-right">
                <Icon name="Lock" size={14} className="inline mr-1" />
                Создание тем доступно пользователям с ролью:<br />
                <span className="font-medium">Основатель, Администратор, Модератор, Авторитет</span>
              </div>
            )}
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по обсуждениям..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {pinnedDiscussions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Icon name="Pin" size={14} />
                Закрепленные темы
              </h3>
              {pinnedDiscussions.map((discussion, index) => (
                <Card key={discussion.id} className="hover-scale animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="gap-1">
                            <Icon name="Pin" size={12} />
                            Закреплено
                          </Badge>
                          <Badge variant="outline">{discussion.category}</Badge>
                          {discussion.isLocked && (
                            <Badge variant="secondary" className="gap-1">
                              <Icon name="Lock" size={12} />
                              Закрыто
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                          {discussion.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback>{discussion.author.username[0]}</AvatarFallback>
                            </Avatar>
                            <span>{discussion.author.username}</span>
                            <Badge variant="outline" className="text-xs">{discussion.author.role}</Badge>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Icon name="MessageCircle" size={14} />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Eye" size={14} />
                            <span>{discussion.views}</span>
                          </div>
                        </div>
                        <div className="text-xs">
                          Последний ответ: {discussion.lastReply}
                          <br />
                          от {discussion.lastReplyAuthor}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {regularDiscussions.map((discussion, index) => (
              <Card key={discussion.id} className="hover-scale animate-scale-in" style={{ animationDelay: `${(pinnedDiscussions.length + index) * 50}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{discussion.category}</Badge>
                        {discussion.isLocked && (
                          <Badge variant="secondary" className="gap-1">
                            <Icon name="Lock" size={12} />
                            Закрыто
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                        {discussion.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback>{discussion.author.username[0]}</AvatarFallback>
                          </Avatar>
                          <span>{discussion.author.username}</span>
                          <Badge variant="outline" className="text-xs">{discussion.author.role}</Badge>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Icon name="MessageCircle" size={14} />
                          <span>{discussion.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          <span>{discussion.views}</span>
                        </div>
                      </div>
                      <div className="text-xs text-right">
                        Последний ответ: {discussion.lastReply}
                        <br />
                        от {discussion.lastReplyAuthor}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredDiscussions.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Обсуждения не найдены</p>
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры или создайте новую тему</p>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center pt-4">
            <Button variant="outline" className="gap-2">
              <Icon name="RefreshCw" size={16} />
              Загрузить ещё
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussions;

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const MOCK_POSTS = [
  {
    id: 1,
    author: { username: "GamerPro", role: "Бывалый" },
    content: "Только что установил Los Santos Redux — графика потрясающая! Игра выглядит совершенно по-новому. Особенно впечатляют ночные сцены с новым освещением 🔥",
    likes: 24,
    comments: 5,
    isPinned: false,
    date: "2 часа назад",
  },
  {
    id: 2,
    author: { username: "ModMaster", role: "Автор" },
    content: "Друзья, готовится к релизу новая глобальная сборка Vice City Reborn! Полностью переработанная Vice City с современной графикой. Следите за обновлениями!",
    likes: 156,
    comments: 42,
    isPinned: true,
    date: "5 часов назад",
  },
  {
    id: 3,
    author: { username: "CityBuilder", role: "Освоившийся" },
    content: "Кто-нибудь пробовал новый пак машин? Стоит ли покупать? Интересует качество моделей и совместимость с другими модами.",
    likes: 12,
    comments: 8,
    isPinned: false,
    date: "1 день назад",
  },
  {
    id: 4,
    author: { username: "RetroGamer", role: "Авторитет" },
    content: "Товарищи, помните — всегда делайте бэкап перед установкой новых модов! Сегодня потратил 3 часа на восстановление игры после неудачной установки. Берегите свои сохранения!",
    likes: 89,
    comments: 15,
    isPinned: false,
    date: "2 дня назад",
  },
  {
    id: 5,
    author: { username: "NightOwl", role: "Пользователь" },
    content: "Ищу единомышленников для совместного тестирования мультиплеерных модов на GTA V. Кто в теме?",
    likes: 7,
    comments: 3,
    isPinned: false,
    date: "3 дня назад",
  },
];

const MOCK_COMMENTS = [
  { id: 1, postId: 1, author: "CityFan", content: "Полностью согласен! Особенно радуют улучшенные тени", date: "1 час назад" },
  { id: 2, postId: 1, content: "А какие требования к железу? У меня GTX 1660", author: "Gamer123", date: "30 минут назад" },
];

const Community = () => {
  const [newPost, setNewPost] = useState('');
  const [showComments, setShowComments] = useState<number | null>(null);

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
            <a href="#" className="story-link text-sm font-medium text-primary">Сообщество</a>
            <a href="#" className="story-link text-sm font-medium">Обсуждения</a>
          </nav>
          <Button variant="ghost">
            <Icon name="User" size={20} />
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">Стена сообщества</h2>
            <p className="text-muted-foreground mb-6">Делитесь опытом, задавайте вопросы, общайтесь с другими игроками</p>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>GM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Что у вас нового? Поделитесь своими мыслями..."
                      rows={3}
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="resize-none"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Image" size={16} className="mr-2" />
                    Фото
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Link" size={16} className="mr-2" />
                    Ссылка
                  </Button>
                </div>
                <Button disabled={!newPost.trim()}>
                  Опубликовать
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Separator />

          <div className="space-y-4">
            {MOCK_POSTS.map((post, index) => (
              <Card key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar>
                        <AvatarFallback>{post.author.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{post.author.username}</span>
                          <Badge variant="outline" className="text-xs">{post.author.role}</Badge>
                          {post.isPinned && (
                            <Badge className="text-xs gap-1">
                              <Icon name="Pin" size={12} />
                              Закреплено
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-relaxed">{post.content}</p>
                </CardContent>

                <CardFooter className="flex-col items-stretch gap-3">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Icon name="Heart" size={16} />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      >
                        <Icon name="MessageCircle" size={16} />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Icon name="Share2" size={16} />
                        Поделиться
                      </Button>
                    </div>
                  </div>

                  {showComments === post.id && (
                    <div className="space-y-3 pt-3 border-t">
                      {MOCK_COMMENTS.filter(c => c.postId === post.id).map((comment) => (
                        <div key={comment.id} className="flex gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-muted p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}

                      <div className="flex gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>GM</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Textarea
                            placeholder="Написать комментарий..."
                            rows={2}
                            className="resize-none"
                          />
                          <Button size="sm">
                            <Icon name="Send" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

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

export default Community;

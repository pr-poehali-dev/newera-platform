import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const MOCK_CHATS = [
  {
    id: 1,
    user: { username: "ModMaster", avatar: "MM", role: "Автор" },
    lastMessage: "Спасибо за покупку! Если возникнут вопросы — пишите",
    timestamp: "10 минут назад",
    unread: 2,
    isOnline: true,
  },
  {
    id: 2,
    user: { username: "TechSupport", avatar: "TS", role: "Администратор" },
    lastMessage: "Ваш запрос обработан. Проверьте почту",
    timestamp: "2 часа назад",
    unread: 0,
    isOnline: false,
  },
  {
    id: 3,
    user: { username: "GamerPro", avatar: "GP", role: "Бывалый" },
    lastMessage: "Привет! Подскажи, как установить эту сборку?",
    timestamp: "1 день назад",
    unread: 1,
    isOnline: true,
  },
  {
    id: 4,
    user: { username: "CityBuilder", avatar: "CB", role: "Освоившийся" },
    lastMessage: "Отличный мод, всё работает! 👍",
    timestamp: "3 дня назад",
    unread: 0,
    isOnline: false,
  },
];

const MOCK_MESSAGES = [
  {
    id: 1,
    chatId: 1,
    isOwn: false,
    content: "Здравствуйте! Спасибо за покупку Los Santos Redux",
    timestamp: "14:30",
  },
  {
    id: 2,
    chatId: 1,
    isOwn: true,
    content: "Привет! Отличная сборка, всё установилось без проблем",
    timestamp: "14:32",
  },
  {
    id: 3,
    chatId: 1,
    isOwn: false,
    content: "Рад слышать! Если возникнут вопросы по настройке — обращайтесь",
    timestamp: "14:35",
  },
  {
    id: 4,
    chatId: 1,
    isOwn: true,
    content: "Скажите, а можно ли использовать эту сборку вместе с другими графическими модами?",
    timestamp: "14:40",
  },
  {
    id: 5,
    chatId: 1,
    isOwn: false,
    content: "Да, совместимость с большинством ENB пресетов есть. Главное не устанавливайте conflicting texture mods",
    timestamp: "14:42",
  },
  {
    id: 6,
    chatId: 1,
    isOwn: true,
    content: "Отлично, спасибо за информацию!",
    timestamp: "14:45",
  },
  {
    id: 7,
    chatId: 1,
    isOwn: false,
    content: "Спасибо за покупку! Если возникнут вопросы — пишите",
    timestamp: "14:50",
  },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = MOCK_CHATS.filter(chat =>
    chat.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentChat = MOCK_CHATS.find(chat => chat.id === selectedChat);
  const currentMessages = MOCK_MESSAGES.filter(msg => msg.chatId === selectedChat);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="md:col-span-1">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Сообщения</h2>
                  <Button size="icon" variant="ghost">
                    <Icon name="Plus" size={20} />
                  </Button>
                </div>
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <ScrollArea className="h-[600px]">
                <div className="divide-y">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedChat === chat.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback>{chat.user.avatar}</AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold truncate">{chat.user.username}</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {chat.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                              <Badge className="ml-auto">{chat.unread}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            {selectedChat && currentChat ? (
              <CardContent className="p-0 flex flex-col h-[calc(100vh-12rem)]">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{currentChat.user.avatar}</AvatarFallback>
                      </Avatar>
                      {currentChat.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{currentChat.user.username}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{currentChat.user.role}</Badge>
                        {currentChat.isOnline && (
                          <span className="text-xs text-green-500">В сети</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={20} />
                  </Button>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Input
                      placeholder="Введите сообщение..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newMessage.trim()) {
                          setNewMessage('');
                        }
                      }}
                    />
                    <Button
                      disabled={!newMessage.trim()}
                      onClick={() => setNewMessage('')}
                    >
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent className="flex items-center justify-center h-[calc(100vh-12rem)]">
                <div className="text-center">
                  <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-semibold mb-2">Выберите диалог</p>
                  <p className="text-sm text-muted-foreground">
                    Выберите чат слева, чтобы начать общение
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip,
  Smile,
  Circle
} from "lucide-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(1);

  const chatList = [
    {
      id: 1,
      name: "Design Team",
      type: "group",
      lastMessage: "The new mockups look great!",
      time: "2 min",
      unread: 3,
      online: true,
      members: ["Sarah Chen", "Mike Johnson", "Emma Davis"],
      avatar: "DT"
    },
    {
      id: 2,
      name: "Sarah Chen",
      type: "direct",
      lastMessage: "Can you review the latest designs?",
      time: "10 min",
      unread: 0,
      online: true,
      avatar: "SC"
    },
    {
      id: 3,
      name: "Product Planning",
      type: "group",
      lastMessage: "Meeting scheduled for tomorrow at 10 AM",
      time: "1 hour",
      unread: 1,
      online: false,
      members: ["John Doe", "Alice Brown", "Bob Wilson"],
      avatar: "PP"
    },
    {
      id: 4,
      name: "Mike Johnson",
      type: "direct",
      lastMessage: "Thanks for the feedback!",
      time: "2 hours",
      unread: 0,
      online: false,
      avatar: "MJ"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      avatar: "SC",
      message: "Hey everyone! I've just uploaded the new design mockups to our shared folder.",
      time: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      sender: "You",
      avatar: "JD",
      message: "Awesome! I'll take a look and provide feedback by EOD.",
      time: "10:32 AM",
      isMe: true
    },
    {
      id: 3,
      sender: "Mike Johnson",
      avatar: "MJ",
      message: "The color scheme looks really clean. Love the blue gradient approach.",
      time: "10:35 AM",
      isMe: false
    },
    {
      id: 4,
      sender: "Sarah Chen",
      avatar: "SC",
      message: "Thanks Mike! I tried to align it with our brand guidelines while making it more modern.",
      time: "10:37 AM",
      isMe: false
    },
    {
      id: 5,
      sender: "You",
      avatar: "JD",
      message: "The new mockups look great! Really impressed with the user flow improvements.",
      time: "Just now",
      isMe: true
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add message logic here
      setMessage("");
    }
  };

  const selectedChatData = chatList.find(chat => chat.id === selectedChat);

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      
      <div className="flex-1 flex">
        {/* Chat List */}
        <div className="w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === chat.id 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-success fill-success" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium truncate">{chat.name}</h4>
                        <span className="text-xs opacity-75">{chat.time}</span>
                      </div>
                      <p className="text-sm opacity-75 truncate">{chat.lastMessage}</p>
                      {chat.type === "group" && (
                        <p className="text-xs opacity-60 mt-1">
                          {chat.members?.join(", ")}
                        </p>
                      )}
                    </div>
                    
                    {chat.unread > 0 && (
                      <Badge className="bg-destructive text-destructive-foreground">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {selectedChatData?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedChatData?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedChatData?.type === "group" 
                      ? `${selectedChatData.members?.length} members`
                      : selectedChatData?.online ? "Online" : "Last seen 2 hours ago"
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
                >
                  {!msg.isMe && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                        {msg.avatar}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`flex-1 max-w-xs lg:max-w-md ${msg.isMe ? "text-right" : ""}`}>
                    {!msg.isMe && (
                      <p className="text-xs text-muted-foreground mb-1">{msg.sender}</p>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        msg.isMe
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <Button type="button" variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              
              <Button type="button" variant="ghost" size="sm">
                <Smile className="w-4 h-4" />
              </Button>
              
              <Button type="submit" className="btn-primary">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
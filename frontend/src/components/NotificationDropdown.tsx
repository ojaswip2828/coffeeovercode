import { useState } from "react";
import { Bell, Check, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  {
    id: 1,
    title: "New task assigned",
    message: "You've been assigned to 'Website Redesign'",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Meeting reminder",
    message: "Team standup in 30 minutes",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Task completed",
    message: "Sarah completed 'User Research'",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    title: "Comment added",
    message: "New comment on 'Mobile App UI'",
    time: "2 hours ago",
    unread: false,
  },
];

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between p-3">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-1 text-xs"
            >
              <Check className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start p-3 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">
                      {notification.title}
                    </p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center p-3 cursor-pointer">
          <Eye className="h-4 w-4 mr-2" />
          View All Activity
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
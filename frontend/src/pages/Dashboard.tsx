import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { 
  CalendarDays, 
  MessageSquare, 
  Users, 
  BarChart, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Activity,
  Plus,
  StickyNote,
  Calendar as CalendarIcon
} from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("Meeting notes for tomorrow's presentation...");
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review project proposals", status: "in-progress", priority: "high", dueDate: "Today" },
    { id: 2, title: "Update team documentation", status: "completed", priority: "medium", dueDate: "Yesterday" },
    { id: 3, title: "Prepare quarterly presentation", status: "pending", priority: "high", dueDate: "Tomorrow" },
    { id: 4, title: "Code review for mobile app", status: "in-progress", priority: "low", dueDate: "This week" },
  ]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        title: newTask,
        status: "pending",
        priority: "medium",
        dueDate: "Today"
      }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
        : task
    ));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "pending": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const quickActions = [
    { title: "New Chat", icon: MessageSquare, color: "text-primary" },
    { title: "Team View", icon: Users, color: "text-accent" },
    { title: "Analytics", icon: BarChart, color: "text-success" },
    { title: "Calendar", icon: CalendarDays, color: "text-warning" }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Good morning, John! 👋</h1>
              <p className="text-muted-foreground">
                Here's your personal workspace. Manage tasks, schedule, and jot down notes.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                Activity
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Jump into your most common tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.title}
                        variant="outline"
                        className="h-20 flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs">{action.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Tasks */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    My Tasks
                  </CardTitle>
                  <CardDescription>
                    Your current and upcoming tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a new task..."
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    />
                    <Button onClick={addTask} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${getStatusColor(task.status)}`}
                        >
                          {task.status === "completed" && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                        </div>
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Schedule
                </CardTitle>
                <CardDescription>
                  Plan your deadlines and meetings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="w-5 h-5" />
                  Quick Notes
                </CardTitle>
                <CardDescription>
                  Jot down ideas and reminders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Start writing your notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <Button className="mt-3" size="sm">
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Progress</CardTitle>
                <CardDescription>Your productivity summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tasks Completed</span>
                    <span>3/8</span>
                  </div>
                  <Progress value={37.5} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">3</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
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

export default Dashboard;
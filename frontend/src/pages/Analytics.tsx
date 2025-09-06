import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Users, 
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Analytics = () => {
  const productivityData = [
    { month: "Jan", tasks: 45, projects: 8, efficiency: 85 },
    { month: "Feb", tasks: 52, projects: 10, efficiency: 78 },
    { month: "Mar", tasks: 48, projects: 12, efficiency: 82 },
    { month: "Apr", tasks: 61, projects: 9, efficiency: 91 },
    { month: "May", tasks: 55, projects: 11, efficiency: 88 },
    { month: "Jun", tasks: 67, projects: 13, efficiency: 94 }
  ];

  const teamPerformanceData = [
    { name: "Design", completed: 89, pending: 12, efficiency: 94 },
    { name: "Engineering", completed: 156, pending: 24, efficiency: 87 },
    { name: "Product", completed: 67, pending: 8, efficiency: 91 },
    { name: "QA", completed: 43, pending: 6, efficiency: 88 }
  ];

  const projectStatusData = [
    { name: "Completed", value: 12, color: "#10B981" },
    { name: "In Progress", value: 8, color: "#3B82F6" },
    { name: "On Hold", value: 3, color: "#F59E0B" },
    { name: "Cancelled", value: 1, color: "#EF4444" }
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 8.2, tasks: 6 },
    { day: "Tue", hours: 7.8, tasks: 8 },
    { day: "Wed", hours: 8.5, tasks: 7 },
    { day: "Thu", hours: 7.2, tasks: 5 },
    { day: "Fri", hours: 8.0, tasks: 9 },
    { day: "Sat", hours: 2.1, tasks: 2 },
    { day: "Sun", hours: 1.5, tasks: 1 }
  ];

  const keyMetrics = [
    {
      title: "Project Completion Rate",
      value: "94.2%",
      change: "+5.1%",
      trend: "up",
      icon: Target,
      description: "Projects completed on time"
    },
    {
      title: "Team Productivity",
      value: "87.5%",
      change: "+2.3%",
      trend: "up",
      icon: TrendingUp,
      description: "Overall team efficiency"
    },
    {
      title: "Average Task Time",
      value: "2.4 days",
      change: "-0.3 days",
      trend: "up",
      icon: Clock,
      description: "Time to complete tasks"
    },
    {
      title: "Active Members",
      value: "12/15",
      change: "80% active",
      trend: "stable",
      icon: Users,
      description: "Team engagement rate"
    }
  ];

  const recentAchievements = [
    {
      title: "Mobile App Launch",
      description: "Successfully launched v2.0 of mobile application",
      date: "2 days ago",
      type: "project",
      impact: "high"
    },
    {
      title: "Design System Completion",
      description: "Finished comprehensive design system library",
      date: "1 week ago",
      type: "milestone",
      impact: "medium"
    },
    {
      title: "100% Test Coverage",
      description: "Achieved full test coverage for critical modules",
      date: "2 weeks ago",
      type: "quality",
      impact: "high"
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Track team performance and project insights
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              const isPositive = metric.trend === "up";
              
              return (
                <Card key={index} className="card-interactive">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                        <p className="text-2xl font-bold mb-1">{metric.value}</p>
                        <div className="flex items-center gap-1">
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3 text-success" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-destructive" />
                          )}
                          <span className={`text-xs ${isPositive ? "text-success" : "text-destructive"}`}>
                            {metric.change}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                      </div>
                      <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Productivity Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Productivity Trend
                </CardTitle>
                <CardDescription>
                  Monthly tasks completed and efficiency metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="tasks" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.1}
                      name="Tasks Completed"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="hsl(var(--accent))" 
                      fill="hsl(var(--accent))" 
                      fillOpacity={0.1}
                      name="Efficiency %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>
                  Completed vs pending tasks by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformanceData.map((team) => (
                    <div key={team.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{team.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {team.efficiency}% efficiency
                        </span>
                      </div>
                      <Progress 
                        value={(team.completed / (team.completed + team.pending)) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{team.completed} completed</span>
                        <span>{team.pending} pending</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Status */}
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Distribution of project statuses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Hours and tasks this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="hsl(var(--primary))" name="Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Latest team accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                      {achievement.type === "project" && <Target className="w-4 h-4 text-primary" />}
                      {achievement.type === "milestone" && <CheckCircle2 className="w-4 h-4 text-success" />}
                      {achievement.type === "quality" && <AlertTriangle className="w-4 h-4 text-warning" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {achievement.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                        <Badge 
                          variant={achievement.impact === "high" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {achievement.impact} impact
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Circle,
  MoreHorizontal,
  Settings,
  UserPlus
} from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Product Manager",
      department: "Product",
      email: "john.doe@company.com",
      phone: "+1 (555) 123-4567",
      avatar: "JD",
      status: "online",
      location: "New York, NY",
      joinDate: "Jan 2023",
      completedTasks: 45,
      activeProjects: 3,
      skills: ["Strategy", "Leadership", "Analytics"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Lead Designer",
      department: "Design",
      email: "sarah.chen@company.com",
      phone: "+1 (555) 234-5678",
      avatar: "SC",
      status: "online",
      location: "San Francisco, CA",
      joinDate: "Mar 2023",
      completedTasks: 38,
      activeProjects: 4,
      skills: ["UI/UX", "Figma", "Design Systems"]
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Senior Developer",
      department: "Engineering",
      email: "mike.johnson@company.com",
      phone: "+1 (555) 345-6789",
      avatar: "MJ",
      status: "away",
      location: "Austin, TX",
      joinDate: "Feb 2023",
      completedTasks: 52,
      activeProjects: 2,
      skills: ["React", "Node.js", "TypeScript"]
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "UX Researcher",
      department: "Design",
      email: "emma.davis@company.com",
      phone: "+1 (555) 456-7890",
      avatar: "ED",
      status: "offline",
      location: "Chicago, IL",
      joinDate: "May 2023",
      completedTasks: 29,
      activeProjects: 2,
      skills: ["User Research", "Analytics", "Testing"]
    },
    {
      id: 5,
      name: "Alice Brown",
      role: "QA Engineer",
      department: "Engineering",
      email: "alice.brown@company.com",
      phone: "+1 (555) 567-8901",
      avatar: "AB",
      status: "online",
      location: "Seattle, WA",
      joinDate: "Apr 2023",
      completedTasks: 33,
      activeProjects: 3,
      skills: ["Testing", "Automation", "Bug Tracking"]
    },
    {
      id: 6,
      name: "Bob Wilson",
      role: "Backend Developer",
      department: "Engineering",
      email: "bob.wilson@company.com",
      phone: "+1 (555) 678-9012",
      avatar: "BW",
      status: "away",
      location: "Portland, OR",
      joinDate: "Jun 2023",
      completedTasks: 41,
      activeProjects: 2,
      skills: ["Python", "Database", "API Design"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-success fill-success";
      case "away":
        return "text-warning fill-warning";
      case "offline":
        return "text-muted-foreground fill-muted-foreground";
      default:
        return "text-muted-foreground fill-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "away":
        return "Away";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  const departmentColors = {
    "Product": "bg-primary-light text-primary",
    "Design": "bg-accent-light text-accent-foreground",
    "Engineering": "bg-success-light text-success"
  };

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Team Members</h1>
              <p className="text-muted-foreground">
                Manage and collaborate with your team
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Manage Roles
              </Button>
              <Button className="btn-primary">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-9"
              />
            </div>
            <Button variant="outline">All Departments</Button>
            <Button variant="outline">All Roles</Button>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{teamMembers.length}</div>
                  <div className="text-sm text-muted-foreground">Total Members</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    {teamMembers.filter(m => m.status === "online").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Online Now</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">16</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">238</div>
                  <div className="text-sm text-muted-foreground">Total Tasks</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="card-interactive">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <Circle 
                          className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)}`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={departmentColors[member.department as keyof typeof departmentColors]}
                    >
                      {member.department}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {getStatusText(member.status)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-primary">{member.completedTasks}</div>
                      <div className="text-muted-foreground">Tasks Done</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-accent">{member.activeProjects}</div>
                      <div className="text-muted-foreground">Projects</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
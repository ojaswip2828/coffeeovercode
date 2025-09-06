import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, User } from "lucide-react";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  assignee: string;
  tags: string[];
  dueDate: string;
  columnId: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

function TaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="mb-3 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-sm">{task.title}</h4>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task.assignee}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                {task.priority}
              </Badge>
              <span className="text-xs text-muted-foreground">{task.dueDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Kanban = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      color: "bg-gray-100",
      tasks: [
        {
          id: "1",
          title: "Design Homepage",
          description: "Create wireframes and mockups for the new homepage",
          priority: "High",
          assignee: "Sarah Chen",
          tags: ["Design", "UI/UX"],
          dueDate: "Dec 15",
          columnId: "todo"
        },
        {
          id: "2", 
          title: "API Integration",
          description: "Integrate third-party payment API",
          priority: "Medium",
          assignee: "Mike Johnson", 
          tags: ["Backend", "API"],
          dueDate: "Dec 18",
          columnId: "todo"
        }
      ]
    },
    {
      id: "inprogress",
      title: "In Progress", 
      color: "bg-blue-100",
      tasks: [
        {
          id: "3",
          title: "User Authentication",
          description: "Implement login and registration system",
          priority: "High",
          assignee: "Alex Rodriguez",
          tags: ["Backend", "Security"],
          dueDate: "Dec 12",
          columnId: "inprogress"
        }
      ]
    },
    {
      id: "review",
      title: "In Review",
      color: "bg-yellow-100", 
      tasks: [
        {
          id: "4",
          title: "Mobile Responsive Design",
          description: "Ensure all pages work on mobile devices",
          priority: "Medium",
          assignee: "Emma Wilson",
          tags: ["Frontend", "Mobile"],
          dueDate: "Dec 10",
          columnId: "review"
        }
      ]
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-100",
      tasks: [
        {
          id: "5", 
          title: "Database Schema",
          description: "Design and implement database structure",
          priority: "High",
          assignee: "David Kim",
          tags: ["Database", "Backend"],
          dueDate: "Dec 8",
          columnId: "done"
        }
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active task and its current column
    let activeTask: Task | undefined;
    let activeColumnIndex = -1;
    let activeTaskIndex = -1;

    columns.forEach((column, colIndex) => {
      const taskIndex = column.tasks.findIndex(task => task.id === activeId);
      if (taskIndex !== -1) {
        activeTask = column.tasks[taskIndex];
        activeColumnIndex = colIndex;
        activeTaskIndex = taskIndex;
      }
    });

    if (!activeTask) return;

    // Check if we're dropping on a column or another task
    let targetColumnId = overId;
    let targetTaskIndex = 0;

    // If dropping on a task, find its column
    columns.forEach(column => {
      const taskIndex = column.tasks.findIndex(task => task.id === overId);
      if (taskIndex !== -1) {
        targetColumnId = column.id;
        targetTaskIndex = taskIndex;
      }
    });

    // If dropping on a column header, use that column
    const targetColumn = columns.find(col => col.id === targetColumnId);
    if (!targetColumn) return;

    const targetColumnIndex = columns.findIndex(col => col.id === targetColumnId);

    if (activeColumnIndex === targetColumnIndex) {
      // Same column - reorder
      const newTasks = arrayMove(columns[activeColumnIndex].tasks, activeTaskIndex, targetTaskIndex);
      const newColumns = [...columns];
      newColumns[activeColumnIndex] = { ...newColumns[activeColumnIndex], tasks: newTasks };
      setColumns(newColumns);
    } else {
      // Different column - move
      const newColumns = [...columns];
      
      // Remove from source column
      newColumns[activeColumnIndex] = {
        ...newColumns[activeColumnIndex],
        tasks: newColumns[activeColumnIndex].tasks.filter(task => task.id !== activeId)
      };
      
      // Add to target column
      const updatedTask = { ...activeTask, columnId: targetColumnId };
      newColumns[targetColumnIndex] = {
        ...newColumns[targetColumnIndex],
        tasks: [...newColumns[targetColumnIndex].tasks, updatedTask]
      };
      
      setColumns(newColumns);
    }

    setActiveId(null);
  };

  const getAllTaskIds = () => {
    return columns.flatMap(column => column.tasks.map(task => task.id));
  };

  return (
    <div className="flex h-screen bg-background">
      <Navigation />
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Project Board</h1>
          <p className="text-muted-foreground">Drag and drop to manage your tasks and track progress</p>
        </div>
        
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SortableContext items={getAllTaskIds()} strategy={verticalListSortingStrategy}>
              {columns.map((column) => (
                <Card key={column.id} className="h-fit">
                  <CardHeader 
                    className={`${column.color} rounded-t-lg`}
                    data-column-id={column.id}
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold">
                        {column.title}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {column.tasks.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3 min-h-32">
                    {column.tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    
                    <Button variant="outline" className="w-full justify-center gap-2 mt-4 border-dashed">
                      <Plus className="w-4 h-4" />
                      Add Task
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeId ? (
              <TaskCard 
                task={columns.flatMap(col => col.tasks).find(task => task.id === activeId)!} 
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
};

export default Kanban;
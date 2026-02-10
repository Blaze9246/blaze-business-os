"use client";

import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  Clock,
  Filter,
  Search,
} from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TaskStatus = "todo" | "in_progress" | "review" | "done";
type TaskPriority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string;
  dueDate?: string;
  tags?: string[];
}

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: "todo", title: "To Do", color: "border-zinc-500" },
  { id: "in_progress", title: "In Progress", color: "border-primary-500" },
  { id: "review", title: "Review", color: "border-accent-500" },
  { id: "done", title: "Done", color: "border-success" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Create Instagram Content Calendar",
    description: "Plan posts for next week focusing on summer collection",
    status: "todo",
    priority: "high",
    assignedTo: "Social Manager",
    dueDate: "2024-02-10",
    tags: ["social", "content"],
  },
  {
    id: "2",
    title: "SEO Blog: Summer Fashion Trends",
    description: "Write 1500-word article on upcoming summer trends",
    status: "in_progress",
    priority: "urgent",
    assignedTo: "Content Manager",
    dueDate: "2024-02-09",
    tags: ["seo", "blog"],
  },
  {
    id: "3",
    title: "Email Campaign: Valentine's Day",
    description: "Design and schedule Valentine's Day promotional emails",
    status: "in_progress",
    priority: "high",
    assignedTo: "Email Manager",
    dueDate: "2024-02-08",
    tags: ["email", "campaign"],
  },
  {
    id: "4",
    title: "Lead List: Tech Enthusiasts",
    description: "Find and validate 50 email leads in tech niche",
    status: "review",
    priority: "medium",
    assignedTo: "Lead Manager",
    dueDate: "2024-02-07",
    tags: ["leads"],
  },
  {
    id: "5",
    title: "Shopify Store Sync",
    description: "Sync product data and update metafields",
    status: "done",
    priority: "medium",
    assignedTo: "Operations Manager",
    dueDate: "2024-02-06",
    tags: ["automation"],
  },
  {
    id: "6",
    title: "Product Video: New Collection",
    description: "Create promotional video for spring collection",
    status: "todo",
    priority: "high",
    assignedTo: "Video Manager",
    dueDate: "2024-02-12",
    tags: ["video", "content"],
  },
  {
    id: "7",
    title: "Weekly Analytics Report",
    description: "Compile and send weekly performance report",
    status: "todo",
    priority: "low",
    assignedTo: "Operations Manager",
    dueDate: "2024-02-11",
    tags: ["analytics"],
  },
  {
    id: "8",
    title: "Customer Segmentation",
    description: "Update customer segments based on recent purchases",
    status: "in_progress",
    priority: "medium",
    assignedTo: "Email Manager",
    dueDate: "2024-02-10",
    tags: ["email", "data"],
  },
];

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  medium: "bg-primary-500/10 text-primary-400 border-primary-500/20",
  high: "bg-accent-500/10 text-accent-400 border-accent-500/20",
  urgent: "bg-error/10 text-error border-error/20",
};

export default function TasksPage() {
  const [tasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTasksByStatus = (status: TaskStatus) =>
    filteredTasks.filter((task) => task.status === status);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Tasks</h1>
            <p className="text-zinc-500">Manage and track your team's work</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-void border border-border rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-zinc-400 hover:text-zinc-100 hover:border-border-subtle transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);

            return (
              <div
                key={column.id}
                className="flex flex-col w-80 bg-surface/50 rounded-xl border border-border"
              >
                {/* Column Header */}
                <div
                  className={cn(
                    "flex items-center justify-between p-4 border-b-2",
                    column.color
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-100">
                      {column.title}
                    </span>
                    <span className="px-2 py-0.5 text-xs bg-surface-elevated text-zinc-400 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button className="p-1 text-zinc-500 hover:text-zinc-300 rounded">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Tasks */}
                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                  {columnTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>

                {/* Add Task Button */}
                <button className="flex items-center gap-2 p-3 text-zinc-500 hover:text-zinc-300 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add task</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="group bg-surface border border-border rounded-lg p-4 hover:border-border-subtle hover:shadow-lg transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <span
          className={cn(
            "text-xs px-2 py-1 rounded-full border",
            priorityColors[task.priority]
          )}
        >
          {task.priority}
        </span>
        <button className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-zinc-300 rounded transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <h3 className="font-medium text-zinc-100 mb-1">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-zinc-500 line-clamp-2 mb-3">{task.description}</p>
      )}

      <div className="flex items-center gap-3 text-xs text-zinc-500">
        {task.assignedTo && (
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{task.assignedTo}</span>
          </div>
        )}
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-surface-elevated text-zinc-400 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff < 0) return `${Math.abs(diff)} days ago`;
  return `${diff} days left`;
}

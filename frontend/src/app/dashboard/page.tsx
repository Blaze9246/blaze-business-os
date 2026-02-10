"use client";

import {
  TrendingUp,
  CheckCircle2,
  Bot,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
} from "lucide-react";

const stats = [
  {
    name: "Monthly Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    name: "Active Tasks",
    value: "24",
    change: "+3 today",
    trend: "up",
    icon: CheckCircle2,
    color: "text-primary-400",
    bgColor: "bg-primary-500/10",
  },
  {
    name: "AI Agents",
    value: "6",
    change: "All active",
    trend: "up",
    icon: Bot,
    color: "text-accent-400",
    bgColor: "bg-accent-500/10",
  },
  {
    name: "Connected Stores",
    value: "3",
    change: "1 needs attention",
    trend: "down",
    icon: Store,
    color: "text-zinc-400",
    bgColor: "bg-zinc-500/10",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "task",
    title: "SEO Blog Post Generated",
    description: "AI Agent completed 'Summer Fashion Trends 2024'",
    time: "2 minutes ago",
    icon: CheckCircle2,
    color: "text-success",
  },
  {
    id: 2,
    type: "workflow",
    title: "Midnight Magic Completed",
    description: "Daily build finished successfully",
    time: "1 hour ago",
    icon: Activity,
    color: "text-primary-400",
  },
  {
    id: 3,
    type: "agent",
    title: "Social Manager Started",
    description: "Creating Instagram content for Fashion Hub",
    time: "2 hours ago",
    icon: Bot,
    color: "text-accent-400",
  },
  {
    id: 4,
    type: "store",
    title: "Store Sync Failed",
    description: "Home & Garden - Shopify API error",
    time: "3 hours ago",
    icon: Store,
    color: "text-error",
  },
  {
    id: 5,
    type: "task",
    title: "Lead Hunter Found 15 Leads",
    description: "New email prospects added to pipeline",
    time: "5 hours ago",
    icon: TrendingUp,
    color: "text-success",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">
          Good {getGreeting()}, Zain!
        </h1>
        <p className="text-zinc-500 mt-1">
          Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              key={stat.name}
              className="bg-surface border border-border rounded-xl p-6 hover:border-border-subtle transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    stat.trend === "up" ? "text-success" : "text-error"
                  )}
                >
                  <TrendIcon className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-zinc-100">{stat.value}</p>
                <p className="text-sm text-zinc-500">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-zinc-100">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 hover:bg-surface-elevated/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-void flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-100">
                      {activity.title}
                    </p>
                    <p className="text-sm text-zinc-500 truncate">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions / AI Agents Status */}
        <div className="bg-surface border border-border rounded-xl">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-zinc-100">AI Agent Status</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: "Content Manager", status: "Active", task: "Writing blog post" },
              { name: "Social Manager", status: "Busy", task: "Creating Instagram content" },
              { name: "Email Manager", status: "Active", task: "Monitoring campaigns" },
              { name: "Lead Manager", status: "Offline", task: "Scheduled for 2PM" },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    agent.status === "Active" && "bg-success animate-pulse",
                    agent.status === "Busy" && "bg-accent-400",
                    agent.status === "Offline" && "bg-zinc-600"
                  )}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-zinc-100">{agent.name}</p>
                  <p className="text-xs text-zinc-500">{agent.task}</p>
                </div>
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    agent.status === "Active" && "bg-success/10 text-success",
                    agent.status === "Busy" && "bg-accent-500/10 text-accent-400",
                    agent.status === "Offline" && "bg-zinc-500/10 text-zinc-500"
                  )}
                >
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

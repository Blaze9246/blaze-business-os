export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'manager' | 'viewer';
  createdAt: string;
}

export interface AIAgent {
  id: string;
  name: string;
  slug: string;
  role: string;
  description: string;
  capabilities: string[];
  status: 'active' | 'busy' | 'offline';
  currentTaskId?: string;
  totalTasksCompleted: number;
  successRate: number;
}

export interface Store {
  id: string;
  name: string;
  slug: string;
  shopifyDomain: string;
  status: 'active' | 'inactive' | 'error';
  monthlyRevenueTarget: number;
  currentMonthRevenue: number;
  clientName?: string;
  clientEmail?: string;
  lastSyncAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedToAgentId?: string;
  assignedToUserId?: string;
  storeId?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
}

export interface Workflow {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: 'scheduled' | 'manual' | 'webhook';
  schedule?: string;
  status: 'active' | 'paused' | 'draft';
  lastRunAt?: string;
  lastRunStatus?: string;
  runCount: number;
}

export interface DailyBriefing {
  date: string;
  summary: string;
  tasksCompleted: number;
  tasksCreated: number;
  workflowsRun: number;
  revenueGenerated: number;
  insights: string[];
}

export interface RevenueTarget {
  year: number;
  month: number;
  targetAmount: number;
  actualAmount: number;
  gap: number;
  progress: number;
}

export interface StoreSales {
  date: string;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  uniqueCustomers: number;
}

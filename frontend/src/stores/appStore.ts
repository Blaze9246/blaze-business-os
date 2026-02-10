import { create } from 'zustand';
import { Task, AIAgent, Store, Workflow } from '@/types';

interface AppState {
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // AI Agents
  agents: AIAgent[];
  setAgents: (agents: AIAgent[]) => void;
  
  // Stores
  stores: Store[];
  setStores: (stores: Store[]) => void;
  
  // Workflows
  workflows: Workflow[];
  setWorkflows: (workflows: Workflow[]) => void;
  
  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Tasks
  tasks: [],
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]
  })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates } : t)
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id)
  })),
  
  // AI Agents
  agents: [],
  setAgents: (agents) => set({ agents }),
  
  // Stores
  stores: [],
  setStores: (stores) => set({ stores }),
  
  // Workflows
  workflows: [],
  setWorkflows: (workflows) => set({ workflows }),
  
  // UI State
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  currentView: 'dashboard',
  setCurrentView: (view) => set({ currentView: view }),
}));

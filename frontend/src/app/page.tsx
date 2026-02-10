'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'agents', label: 'AI Agents', icon: '🤖' },
    { id: 'stores', label: 'Stores', icon: '🏪' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'tasks':
        return <TasksContent />;
      case 'agents':
        return <AgentsContent />;
      case 'stores':
        return <StoresContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#131316] border-b border-[#27272a]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
            <span>🔥</span>
          </div>
          <span className="font-semibold">Blaze OS</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-400"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#131316] border-r border-[#27272a] p-4
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="hidden lg:flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
            <span>🔥</span>
          </div>
          <span className="font-semibold">Blaze OS</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                currentPage === item.id
                  ? 'bg-violet-500/20 text-violet-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        {renderContent()}
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-2">Good afternoon, Zain!</h1>
      <p className="text-gray-400 mb-6">Here's what's happening with your business today.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Revenue', value: '$24,500', change: '+12.5%', color: 'text-green-400' },
          { label: 'Tasks', value: '24', change: '+3 today', color: 'text-violet-400' },
          { label: 'AI Agents', value: '6', change: 'All active', color: 'text-amber-400' },
          { label: 'Stores', value: '3', change: '1 needs attention', color: 'text-red-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#131316] border border-[#27272a] rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-400 text-sm">{stat.label}</span>
              <span className={`text-xs ${stat.color}`}>{stat.change}</span>
            </div>
            <div className="text-xl lg:text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-[#131316] border border-[#27272a] rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        
        {[
          { title: 'SEO Blog Post Generated', desc: "AI Agent completed 'Summer Fashion Trends 2024'", time: '2m ago' },
          { title: 'Midnight Magic Completed', desc: 'Daily build finished successfully', time: '1h ago' },
          { title: 'Social Manager Started', desc: 'Creating Instagram content for Fashion Hub', time: '2h ago' },
          { title: 'Store Sync Failed', desc: 'Home & Garden - Shopify API error', time: '3h ago' },
        ].map((activity, i) => (
          <div key={i} className="flex items-start gap-3 py-3 border-b border-[#27272a] last:border-0">
            <div className="w-10 h-10 bg-[#18181B] rounded-lg flex items-center justify-center flex-shrink-0">
              <span>✓</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{activity.title}</div>
              <div className="text-gray-400 text-sm truncate">{activity.desc}</div>
            </div>
            <div className="text-gray-500 text-xs whitespace-nowrap">{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksContent() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Campaign Generator V2', status: 'todo', priority: 'urgent' },
    { id: 2, title: 'AI Hunter Agent', status: 'todo', priority: 'high' },
    { id: 3, title: 'Systeme.io Integration', status: 'todo', priority: 'high' },
    { id: 4, title: 'Shopify Store Connection', status: 'inprogress', priority: 'medium' },
    { id: 5, title: 'Hunter.io API Setup', status: 'inprogress', priority: 'medium' },
    { id: 6, title: 'MVP Dashboard UI', status: 'done', priority: 'urgent' },
  ]);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-gray-500' },
    { id: 'inprogress', title: 'In Progress', color: 'border-violet-500' },
    { id: 'review', title: 'Review', color: 'border-amber-500' },
    { id: 'done', title: 'Done', color: 'border-green-500' },
  ];

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Tasks</h1>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-[800px] lg:min-w-0">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 bg-[#131316] border border-[#27272a] rounded-xl p-4">
              <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${column.color}`}>
                <span className="font-semibold">{column.title}</span>
                <span className="text-sm text-gray-400">
                  {tasks.filter(t => t.status === column.id).length}
                </span>
              </div>
              
              <div className="space-y-3">
                {tasks
                  .filter(task => task.status === column.id)
                  .map(task => (
                    <div key={task.id} className="bg-[#1A1A1E] border border-[#27272a] rounded-lg p-3">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <p className="mt-2 text-sm">{task.title}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgentsContent() {
  const agents = [
    { name: 'Content Manager', status: 'Active', task: 'Writing blog post', color: 'bg-green-500' },
    { name: 'Social Manager', status: 'Busy', task: 'Creating Instagram content', color: 'bg-amber-500' },
    { name: 'Email Manager', status: 'Active', task: 'Monitoring campaigns', color: 'bg-green-500' },
    { name: 'Lead Manager', status: 'Offline', task: 'Scheduled for 2PM', color: 'bg-gray-500' },
    { name: 'Video Manager', status: 'Active', task: 'Editing product video', color: 'bg-green-500' },
    { name: 'Analytics Manager', status: 'Active', task: 'Generating reports', color: 'bg-green-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">AI Agents</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div key={agent.name} className="bg-[#131316] border border-[#27272a] rounded-xl p-4 flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${agent.color} ${agent.status === 'Active' ? 'animate-pulse' : ''}`} />
            <div className="flex-1">
              <div className="font-medium">{agent.name}</div>
              <div className="text-sm text-gray-400">{agent.task}</div>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${
              agent.status === 'Active' ? 'bg-green-500/20 text-green-400' :
              agent.status === 'Busy' ? 'bg-amber-500/20 text-amber-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoresContent() {
  const stores = [
    { name: 'Essora Skincare', status: 'Active', revenue: '$12,500', orders: 45 },
    { name: 'Blaze Ignite', status: 'Active', revenue: '$8,000', orders: 23 },
    { name: 'Fashion Hub', status: 'Warning', revenue: '$4,000', orders: 12 },
  ];

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Stores</h1>
      
      <div className="space-y-4">
        {stores.map((store) => (
          <div key={store.name} className="bg-[#131316] border border-[#27272a] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{store.name}</div>
              <span className={`text-xs px-2 py-1 rounded ${
                store.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {store.status}
              </span>
            </div>
            <div className="flex gap-8 text-sm">
              <div>
                <span className="text-gray-400">Revenue: </span>
                <span>{store.revenue}</span>
              </div>
              <div>
                <span className="text-gray-400">Orders: </span>
                <span>{store.orders}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-[#131316] border border-[#27272a] rounded-xl p-4 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <span className="text-2xl font-bold">Z</span>
          </div>
          <div>
            <div className="font-semibold">Zain Moolla</div>
            <div className="text-sm text-gray-400">Admin</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <div>zain@blazeignite.com</div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Company</label>
            <div>Blaze Ignite</div>
          </div>
        </div>
      </div>
    </div>
  );
}

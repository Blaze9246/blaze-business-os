-- Blaze Business OS Database Schema
-- Enterprise-grade PostgreSQL schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users (Admins/Managers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT DEFAULT 'admin', -- admin, manager, viewer
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Agents (Workforce)
CREATE TABLE ai_agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL, -- content_manager, social_manager, email_manager, operations_manager, lead_manager, video_manager
    description TEXT,
    capabilities JSONB DEFAULT '[]',
    status TEXT DEFAULT 'active', -- active, busy, offline
    current_task_id UUID,
    total_tasks_completed INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shopify Stores
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    shopify_domain TEXT UNIQUE NOT NULL,
    shopify_access_token TEXT,
    status TEXT DEFAULT 'active',
    monthly_revenue_target DECIMAL(10,2) DEFAULT 0,
    current_month_revenue DECIMAL(10,2) DEFAULT 0,
    client_name TEXT,
    client_email TEXT,
    settings JSONB DEFAULT '{}',
    last_sync_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store Sales Data
CREATE TABLE store_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    total_sales DECIMAL(10,2) DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    unique_customers INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(store_id, date)
);

-- Tasks / To-Dos
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo', -- todo, in_progress, review, done
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    assigned_to_agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
    assigned_to_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    store_id UUID REFERENCES stores(id) ON DELETE SET NULL,
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_by UUID REFERENCES users(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workflows
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    type TEXT NOT NULL, -- scheduled, manual, webhook
    schedule TEXT, -- cron expression for scheduled workflows
    script_path TEXT NOT NULL,
    config JSONB DEFAULT '{}',
    status TEXT DEFAULT 'active', -- active, paused, draft
    last_run_at TIMESTAMPTZ,
    last_run_status TEXT,
    run_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workflow Executions
CREATE TABLE workflow_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'running', -- running, completed, failed, cancelled
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    output TEXT,
    error_message TEXT,
    triggered_by UUID REFERENCES users(id),
    metadata JSONB DEFAULT '{}'
);

-- API Keys Management
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    service TEXT NOT NULL, -- shopify, openai, stripe, etc.
    key_value TEXT, -- encrypted
    is_configured BOOLEAN DEFAULT false,
    last_used_at TIMESTAMPTZ,
    status TEXT DEFAULT 'active',
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills Library
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'available', -- available, installed, deprecated
    install_path TEXT,
    version TEXT DEFAULT '1.0.0',
    dependencies JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Installed Skills
CREATE TABLE installed_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
    installed_by UUID REFERENCES users(id),
    installed_at TIMESTAMPTZ DEFAULT NOW(),
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true
);

-- Daily Briefings
CREATE TABLE daily_briefings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    summary TEXT,
    tasks_completed INTEGER DEFAULT 0,
    tasks_created INTEGER DEFAULT 0,
    workflows_run INTEGER DEFAULT 0,
    revenue_generated DECIMAL(10,2) DEFAULT 0,
    insights JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Revenue Targets
CREATE TABLE revenue_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    target_amount DECIMAL(10,2) NOT NULL,
    actual_amount DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(year, month)
);

-- Lead Generation Activities
CREATE TABLE lead_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    strategy TEXT NOT NULL,
    leads_generated INTEGER DEFAULT 0,
    leads_contacted INTEGER DEFAULT 0,
    leads_converted INTEGER DEFAULT 0,
    cost DECIMAL(10,2) DEFAULT 0,
    date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Client Reports
CREATE TABLE client_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL, -- monthly, weekly, custom
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    content JSONB NOT NULL,
    sent_to_client BOOLEAN DEFAULT false,
    sent_at TIMESTAMPTZ,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    agent_id UUID REFERENCES ai_agents(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT, -- task, workflow, store, etc.
    entity_id UUID,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned_agent ON tasks(assigned_to_agent_id);
CREATE INDEX idx_tasks_store ON tasks(store_id);
CREATE INDEX idx_store_sales_store_date ON store_sales(store_id, date);
CREATE INDEX idx_workflow_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_agents_updated_at BEFORE UPDATE ON ai_agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON stores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

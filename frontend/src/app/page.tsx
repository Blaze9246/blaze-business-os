export default function DashboardPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0A0A0B', 
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{ 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        bottom: 0, 
        width: '250px', 
        background: '#131316',
        borderRight: '1px solid #27272a',
        padding: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🔥</span>
          </div>
          <span style={{ fontWeight: 600 }}>Blaze OS</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { label: 'Dashboard', active: true },
            { label: 'Tasks' },
            { label: 'AI Agents' },
            { label: 'Stores' },
            { label: 'Settings' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                background: item.active ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                color: item.active ? '#A855F7' : '#A1A1AA'
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '250px', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Good afternoon, Zain!
        </h1>
        <p style={{ color: '#A1A1AA', marginBottom: '2rem' }}>
          Here's what's happening with your business today.
        </p>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {[
            { label: 'Revenue', value: '$24,500', change: '+12.5%', color: '#22C55E' },
            { label: 'Tasks', value: '24', change: '+3 today', color: '#8B5CF6' },
            { label: 'AI Agents', value: '6', change: 'All active', color: '#F59E0B' },
            { label: 'Stores', value: '3', change: '1 needs attention', color: '#EF4444' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: '#131316',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '1.5rem'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <span style={{ color: '#A1A1AA', fontSize: '0.875rem' }}>{stat.label}</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: stat.color,
                  fontWeight: 500
                }}>
                  {stat.change}
                </span>
              </div>
              <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Task Board Preview */}
        <div style={{ 
          background: '#131316',
          border: '1px solid #27272a',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Recent Activity
          </h2>
          
          {[
            { title: 'SEO Blog Post Generated', desc: "AI Agent completed 'Summer Fashion Trends 2024'", time: '2m ago' },
            { title: 'Midnight Magic Completed', desc: 'Daily build finished successfully', time: '1h ago' },
            { title: 'Social Manager Started', desc: 'Creating Instagram content for Fashion Hub', time: '2h ago' },
            { title: 'Store Sync Failed', desc: 'Home & Garden - Shopify API error', time: '3h ago' },
          ].map((activity, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 0',
                borderBottom: i < 3 ? '1px solid #27272a' : 'none'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                background: '#18181B',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span>✓</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{activity.title}</div>
                <div style={{ color: '#A1A1AA', fontSize: '0.875rem' }}>{activity.desc}</div>
              </div>
              <div style={{ color: '#71717A', fontSize: '0.75rem' }}>{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

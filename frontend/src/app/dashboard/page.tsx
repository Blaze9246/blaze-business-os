export default function DashboardPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Blaze Business OS - Dashboard</h1>
      <p>App is now live and working!</p>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$24,500</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Tasks</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>24</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>AI Agents</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>6</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Stores</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>3</p>
        </div>
      </div>
    </div>
  );
}

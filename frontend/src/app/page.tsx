export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Blaze Business OS</h1>
      <p>Welcome to your dashboard!</p>
      <div style={{ marginTop: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
          <h3>Revenue: $24,500</h3>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
          <h3>Tasks: 24</h3>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
          <h3>AI Agents: 6</h3>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
          <h3>Stores: 3</h3>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/dashboard";
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Loading Blaze Business OS...</p>
    </div>
  );
}

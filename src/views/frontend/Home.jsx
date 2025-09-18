import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = '/assets/js/frontend-landingpage/homepage.js';
    s.async = false;
    s.onload = () => {};
    s.onerror = () => { if (s.parentNode) s.parentNode.removeChild(s); };
    document.body.appendChild(s);
    return () => { if (s.parentNode) s.parentNode.removeChild(s); };
  }, []);

  return (
    <section className="bg-primary-subtle py-14">
      <div className="container-fluid text-center">
        <h1 className="fw-bolder fs-12">Welcome</h1>
        <p className="text-primary fs-4 fw-bolder mb-0">This is the Home</p>
        <img 
          src="/assets/images/frontend-pages/matecota.jpeg" 
          alt="Matecota" 
          style={{ width: '300px', height: 'auto', marginTop: '20px', borderRadius: '8px' }} 
        />
      </div>
    </section>
  );
}

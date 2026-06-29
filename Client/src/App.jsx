import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import CreatePage from './pages/CreatePage.jsx';
import HomePage from './pages/HomePage.jsx';

function Navigation() {
    const location = useLocation();

    return (
        <nav style={{
            backgroundColor: '#2563eb',
            padding: 0,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                <li style={{ margin: 0 }}>
                    <a
                        href="/"
                        style={{
                            display: 'block',
                            color: 'white',
                            textDecoration: 'none',
                            padding: '16px 24px',
                            fontWeight: 500,
                            transition: 'background-color 0.3s',
                            borderBottom: location.pathname === '/' ? '3px solid #fbbf24' : '3px solid transparent',
                            backgroundColor: location.pathname === '/' ? '#1d4ed8' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/';
                        }}
                        onMouseEnter={(e) => {
                            if (location.pathname !== '/') {
                                e.target.style.backgroundColor = '#1d4ed8';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (location.pathname !== '/') {
                                e.target.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        🏠 Home
                    </a>
                </li>
                <li style={{ margin: 0 }}>
                    <a
                        href="/create"
                        style={{
                            display: 'block',
                            color: 'white',
                            textDecoration: 'none',
                            padding: '16px 24px',
                            fontWeight: 500,
                            transition: 'background-color 0.3s',
                            borderBottom: location.pathname === '/create' ? '3px solid #fbbf24' : '3px solid transparent',
                            backgroundColor: location.pathname === '/create' ? '#1d4ed8' : 'transparent',
                            cursor: 'pointer'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/create';
                        }}
                        onMouseEnter={(e) => {
                            if (location.pathname !== '/create') {
                                e.target.style.backgroundColor = '#1d4ed8';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (location.pathname !== '/create') {
                                e.target.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        ➕ Create Product
                    </a>
                </li>
            </ul>
        </nav>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
                <Navigation />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
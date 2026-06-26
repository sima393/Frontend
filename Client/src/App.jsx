import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePage from './pages/CreatePage.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
    return (
        <BrowserRouter>
            <div>
                <nav style={{ padding: '10px', marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
                    <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
                    <Link to="/create">Create Product</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
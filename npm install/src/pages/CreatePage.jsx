import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Explicitly pointing to your running Node.js server port
const API_URL = 'http://localhost:3000/api/products';

const CreatePage = () => {
    // 1. State Hooks
    const [productName, setProductName] = useState('');
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 2. Fetch all products when the page loads
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            // Updated to print the exact network error code to the UI
            setError(`Connection Error: ${err.message} (${err.response?.status || 'Network Blocked/Server Down'})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 3. Handle Add Product Form Submission
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const name = productName.trim();
        if (!name) {
            alert('Please enter a product name');
            return;
        }

        try {
            const response = await axios.post(API_URL, { name: name });
            if (response.status === 201 || response.status === 200) {
                setProductName(''); 
                fetchProducts();     
            }
        } catch (err) {
            console.error('Error adding product:', err);
            alert(`Failed to save product: ${err.message}`);
        }
    };

    // 4. Handle Delete Product
    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    // 5. Handle Edit Product Name
    const handleEditProduct = async (id, currentName) => {
        const newName = window.prompt('Update product name:', currentName);
        if (!newName || newName.trim() === '') return;

        try {
            await axios.put(`${API_URL}/${id}`, { name: newName.trim() });
            fetchProducts();
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h1 style={{ color: '#111827', marginTop: 0, marginBottom: '24px' }}>Product Management</h1>

                <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                    <input 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name..." 
                        style={{ flex: 1, padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', outline: 'none' }}
                    />
                    <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', fontWeight: '600', padding: '12px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        Add Product
                    </button>
                </form>

                {error && <p style={{ color: '#dc2626', textAlign: 'center', fontWeight: '500', padding: '10px', backgroundColor: '#fef2f2', borderRadius: '6px' }}>{error}</p>}
                {loading && <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading products...</p>}

                <div style={{ marginTop: '20px' }}>
                    {!loading && products.length === 0 && !error && (
                        <p style={{ color: '#6b7280', textAlign: 'center' }}>No products found. Add one above!</p>
                    )}
                    
                    {products.map((product) => (
                        <div key={product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '12px' }}>
                            <span style={{ fontWeight: '500', color: '#374151' }}>{product.name}</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleEditProduct(product._id, product.name)} style={{ backgroundColor: 'white', border: '1px solid #d1d5db', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product._id)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
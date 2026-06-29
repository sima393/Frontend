import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

const CreatePage = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all products when the page loads
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError(`Connection Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle Add Product Form Submission
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const name = productName.trim();
        
        if (!name) {
            alert('Please enter a product name');
            return;
        }

        try {
            const body = {
                name,
                quantity: Number(quantity) || 0,
                price: Number(price) || 0,
            };

            if (imageUrl.trim()) {
                body.image = imageUrl.trim();
            }

            const response = await axios.post(API_URL, body);
            if (response.status === 201 || response.status === 200) {
                setProductName('');
                setQuantity('');
                setPrice('');
                setImageUrl('');
                fetchProducts();
                alert('Product created successfully!');
            }
        } catch (err) {
            console.error('Error adding product:', err);
            alert(`Failed to save product: ${err.message}`);
        }
    };

    // Handle Delete Product
    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchProducts();
        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    // Handle Edit Product
    const handleEditProduct = async (product) => {
        const newName = window.prompt('Update product name:', product.name);
        if (!newName || newName.trim() === '') return;

        const newQuantity = window.prompt('Update quantity:', product.quantity ?? 0);
        if (newQuantity === null) return;

        const newPrice = window.prompt('Update price:', product.price ?? 0);
        if (newPrice === null) return;

        const newImage = window.prompt('Update image URL (optional):', product.image ?? '');
        if (newImage === null) return;

        try {
            const body = {
                name: newName.trim(),
                quantity: Number(newQuantity) || 0,
                price: Number(newPrice) || 0,
            };

            if (newImage.trim()) {
                body.image = newImage.trim();
            }

            await axios.put(`${API_URL}/${product._id}`, body);
            fetchProducts();
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.style.display = 'flex';
        }
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ color: '#111827', marginTop: 0, marginBottom: '16px' }}>Create & Manage Products</h1>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name..."
                        style={{
                            flex: '1 1 120px',
                            padding: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '16px',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        min="0"
                        style={{
                            flex: '1 1 120px',
                            padding: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '16px',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        style={{
                            flex: '1 1 120px',
                            padding: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '16px',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image URL (optional)"
                        style={{
                            flex: '1 1 120px',
                            padding: '12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '16px',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <button
                        onClick={handleAddProduct}
                        style={{
                            padding: '12px 20px',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: '14px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                    >
                        Add Product
                    </button>
                </div>

                {error && <p style={{ color: '#dc2626', marginBottom: '16px', padding: '10px', backgroundColor: '#fef2f2', borderRadius: '6px' }}>{error}</p>}
                {loading && <p style={{ textAlign: 'center', color: '#6b7280' }}>Loading products...</p>}

                <div style={{ marginTop: '20px' }}>
                    {!loading && products.length === 0 && !error && (
                        <p style={{ color: '#6b7280', textAlign: 'center' }}>No products found. Add one above!</p>
                    )}

                    {products.map((product) => (
                        <div
                            key={product._id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '16px',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '8px',
                                marginBottom: '12px',
                                fontSize: '16px',
                                fontWeight: '500',
                                color: '#374151',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '2px solid #e5e7eb',
                                            flexShrink: 0
                                        }}
                                        onError={handleImageError}
                                    />
                                ) : null}
                                {!product.image && (
                                    <div
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
                                            borderRadius: '8px',
                                            border: '2px dashed #9ca3af',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6b7280',
                                            fontSize: '12px',
                                            flexShrink: 0
                                        }}
                                    >
                                        No Image
                                    </div>
                                )}

                                <div style={{ flex: 1, marginLeft: '16px' }}>
                                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
                                        {product.name}
                                    </p>
                                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
                                        <div>Quantity: <strong style={{ color: '#2563eb' }}>{product.quantity ?? 0}</strong></div>
                                        <div>Price: <strong style={{ color: '#2563eb' }}>${(product.price ?? 0).toFixed(2)}</strong></div>
                                        {product.image && (
                                            <div style={{ marginTop: '6px', fontSize: '12px', color: '#9ca3af', wordBreak: 'break-all' }}>
                                                {product.image}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        color: '#374151',
                                        border: '1px solid #d1d5db',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    style={{
                                        backgroundColor: '#fee2e2',
                                        color: '#dc2626',
                                        border: '1px solid #fca5a5',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fecaca'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fee2e2'}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
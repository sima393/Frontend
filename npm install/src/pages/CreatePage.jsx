import React, { useState } from 'react';

const CreatePage = () => {
    const [productName, setProductName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Product Created: ${productName}`);
        setProductName(''); 
    };

    return (
        <div>
            <h2>Create Product</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter product name" 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreatePage; // <-- Add this line at the bottom!
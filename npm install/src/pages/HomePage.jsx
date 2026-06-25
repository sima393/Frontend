import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/product";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // States for creating a product
    const [newProductName, setNewProductName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:3000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.log("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newProductName.trim()) return alert("Please enter a product name");

        try {
            setIsSubmitting(true);
            const response = await axios.post("http://localhost:3000/api/products", {
                name: newProductName
            });

            // Update local state instantly with the new product from the database
            setProducts((prevProducts) => [...prevProducts, response.data]);
            setNewProductName(""); // Reset input field
        } catch (error) {
            console.log("Error adding product:", error);
            alert("Failed to add product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="mt-5" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            
            {/* --- PRODUCT CREATION TABLE --- */}
            <h3 style={{ marginBottom: "15px" }}>Create New Product</h3>
            <form onSubmit={handleAddProduct}>
                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px", border: "1px solid #ddd" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Field</th>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>User Input</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: "12px", fontWeight: "bold", width: "30%", borderBottom: "1px solid #ddd" }}>
                                Product Name:
                            </td>
                            <td style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                                <input
                                    type="text"
                                    placeholder="e.g. Wireless Mouse"
                                    value={newProductName}
                                    onChange={(e) => setNewProductName(e.target.value)}
                                    style={{ width: "95%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                                    disabled={isSubmitting}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ padding: "12px", textAlign: "right", backgroundColor: "#fafafa" }}>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    style={{ 
                                        padding: "8px 20px", 
                                        backgroundColor: "#28a745", 
                                        color: "white", 
                                        border: "none", 
                                        borderRadius: "4px", 
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {isSubmitting ? "Saving..." : "Create Product"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            <hr style={{ margin: "30px 0", border: "0", borderTop: "1px solid #eee" }} />

            {/* --- PRODUCT LIST DISPLAY --- */}
            <h3 style={{ marginBottom: "15px" }}>Available Products</h3>
            {isLoading ? (
                <div>Loading products...</div>
            ) : (
                <>
                    {products.length > 0 ? (
                        <div>
                            {products.map((product) => (
                                <Product
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>There are no products available.</div>
                    )}
                </>
            )}
        </div>
    );
};

export default HomePage;
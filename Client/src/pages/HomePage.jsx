import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const navigate = useNavigate();

    const API_URL = "http://localhost:3000/api/products";

    const updateHomeStats = async () => {
        try {
            const response = await axios.get(API_URL);
            const products = response.data;

            const total = products.length;
            const stock = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
            const value = products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);

            setTotalProducts(total);
            setTotalStock(stock);
            setTotalValue(value.toFixed(2));
        } catch (error) {
            console.error("Error updating stats:", error);
        }
    };

    useEffect(() => {
        updateHomeStats();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <h1 style={{ fontSize: "48px", color: "#111827", marginBottom: "20px" }}>
                    Welcome to Product Management
                </h1>
                <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "40px" }}>
                    Manage your product inventory efficiently. Create, update, and delete products with ease.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", margin: "40px auto", maxWidth: "1000px" }}>
                    <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <div style={{ fontSize: "36px", fontWeight: "bold", color: "#2563eb", marginBottom: "10px" }}>
                            {totalProducts}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "16px" }}>
                            Total Products
                        </div>
                    </div>

                    <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <div style={{ fontSize: "36px", fontWeight: "bold", color: "#2563eb", marginBottom: "10px" }}>
                            ${totalValue}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "16px" }}>
                            Inventory Value
                        </div>
                    </div>

                    <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                        <div style={{ fontSize: "36px", fontWeight: "bold", color: "#2563eb", marginBottom: "10px" }}>
                            {totalStock}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "16px" }}>
                            Total Stock
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/create")}
                    style={{
                        display: "inline-block",
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "14px 32px",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "16px",
                        cursor: "pointer",
                        border: "none",
                        marginTop: "20px",
                        transition: "background-color 0.3s"
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#1d4ed8"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#2563eb"}
                >
                    + Create New Product
                </button>
            </div>
        </div>
    );
};

export default HomePage;
import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/product";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:3000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="mt-5">
            {isLoading ? (
                <div>Loading...</div>
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
import { useState, useEffect } from "react";
import { getProducts } from "../server/ProductApi"; // named import

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    getProducts()
      .then((data) => {
        if (active) {
          setProducts(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err?.message || "Failed to fetch products");
          setLoading(false);
        }
      });

    return () => { active = false; };
  }, []);

  return { products, setProducts, loading, error };
};

export default useProduct;

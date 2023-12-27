import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  async function productData() {
    try {
      setLoading(true);
      setError(false);
      const result = await axios.get(`http://localhost:4001/products`);
      setProducts(result.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    productData();
  }, []);

  async function deleteproductData(productID) {
    await axios.delete(`http://localhost:4001/products/${productID}`);
    productData();
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {loading ? <h1>Loading...</h1> : null}
        {error ? <h1>Fetching Error...</h1> : null}
        {products.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteproductData(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

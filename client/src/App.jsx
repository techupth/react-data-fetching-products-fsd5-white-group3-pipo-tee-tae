//1)ให้สร้าง Request ด้วย Axios เพื่อดึงข้อมูล Product จาก Server แล้วนำมา Render ที่หน้าเว็บไซต์

import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  async function productData() {
    const result = await axios.get(`http://localhost:4001/products`);
    setProducts(result.data.data);
  }

  useEffect(() => {
    productData();
  }, [products]);

  async function deleteProductData(productID) {
    await axios.delete(`http://localhost:4001/products/$(productID)`);
  }

  deleteProductData();

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        <div className="product">
          <div className="product-preview">
            <img
              src="https://via.placeholder.com/350/350"
              alt="some product"
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: ...</h1>
            <h2>Product price: ... Baht</h2>
            <p>Product description: .....</p>
          </div>

          <button className="delete-button">x</button>
        </div>
      </div>
    </div>
  );
}

export default App;

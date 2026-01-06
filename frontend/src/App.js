import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaUserCircle, FaCaretDown } from "react-icons/fa";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import AddressManager from "./components/AddressManager";
import PaymentManager from "./components/PaymentManager";
import Wallet from "./components/Wallet";
import AdminOrders from "./components/AdminOrders";
import AdminAnalytics from "./components/AdminAnalytics";

import "./App.css";

function App() {
  /* ================= AUTH ================= */
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");

  /* ================= PRODUCTS ================= */
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ================= CART ================= */
  const [cartItems, setCartItems] = useState([]);

  /* ================= FILTERS ================= */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  /* ================= PAGINATION ================= */
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= AUTO LOGIN ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data);
        setPage("products");
      })
      .catch(() => {
        localStorage.clear();
        setUser(null);
        setPage("login");
      });
  }, []);

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    if (page !== "products") return;

    axios
      .get("http://localhost:5000/api/products", {
        params: {
          page: pageNumber,
          limit: 6,
          sort,
          search,
          category,
        },
      })
      .then(res => {
        setProducts(res.data.products || []);
        setTotalPages(res.data.pages || 1);
      })
      .catch(() => {
        setProducts([]);
        setTotalPages(1);
      });
  }, [page, pageNumber, sort, search, category]);

  /* ================= LOGIN ================= */
  const handleLogin = userData => {
    setUser(userData);
    setPage("products");
  };

  /* ================= CART ================= */
  const addToCart = product => {
    setCartItems(prev => {
      const found = prev.find(i => i._id === product._id);
      return found
        ? prev.map(i =>
            i._id === product._id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setPage("login");
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  /* ================= LOGIN / SIGNUP ================= */
  if (!user) {
    return page === "login" ? (
      <Login onLogin={handleLogin} goToSignup={() => setPage("signup")} />
    ) : (
      <Signup onSignup={() => setPage("login")} />
    );
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div className="navbar">
        <h2 className="logo">🛒 MyStore</h2>

        <input
          className="search-input"
          placeholder="Search products"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPageNumber(1);
          }}
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>All</option>
          <option>Men</option>
          <option>Women</option>
          <option>Electronics</option>
        </select>

        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="name">Name A–Z</option>
        </select>

        <button onClick={() => setPage("cart")}>
          <FaShoppingCart /> {cartCount}
        </button>

        <div className="account-dropdown">
          <button className="account-btn">
            <FaUserCircle /> Account <FaCaretDown />
          </button>
          <div className="dropdown-menu">
            <p onClick={() => setPage("orders")}>Orders</p>
            <p onClick={() => setPage("addresses")}>Addresses</p>
            <p onClick={() => setPage("payment")}>Payments</p>
            <p onClick={() => setPage("wallet")}>Wallet</p>
            <hr />
            <p className="logout-text" onClick={logout}>Logout</p>
          </div>
        </div>

        {user.isAdmin && (
          <>
            <button onClick={() => setPage("admin")}>Admin</button>
            <button onClick={() => setPage("analytics")}>Analytics</button>
          </>
        )}
      </div>

      {/* ================= PRODUCT DETAILS ================= */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          addToCart={addToCart}
          buyNow={p => {
            setCartItems([{ ...p, qty: 1 }]);
            setSelectedProduct(null);
            setPage("cart");
          }}
          goBack={() => setSelectedProduct(null)}
        />
      )}

      {/* ================= PRODUCTS ================= */}
      {!selectedProduct && page === "products" && (
        <>
          <div className="products">
            {products.map(p => (
              <ProductCard
                key={p._id}
                product={p}
                addToCart={addToCart}
                onView={() => setSelectedProduct(p)}
              />
            ))}
          </div>

          <div className="pagination">
            <button disabled={pageNumber === 1} onClick={() => setPageNumber(p => p - 1)}>
              ◀ Prev
            </button>
            <span>Page {pageNumber} of {totalPages}</span>
            <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(p => p + 1)}>
              Next ▶
            </button>
          </div>
        </>
      )}

      {/* ✅ CART FIXED HERE */}
      {page === "cart" && (
        <Cart
          cartItems={cartItems}
          setCartItems={setCartItems}   // 🔥 THIS FIXES EVERYTHING
          setPage={setPage}
        />
      )}

      {page === "checkout" && <Checkout cartItems={cartItems} setPage={setPage} />}
      {page === "orders" && <OrderHistory setPage={setPage} />}
      {page === "addresses" && <AddressManager setPage={setPage} />}
      {page === "payment" && <PaymentManager setPage={setPage} />}
      {page === "wallet" && <Wallet setPage={setPage} />}
      {page === "admin" && <AdminOrders setPage={setPage} />}
      {page === "analytics" && <AdminAnalytics setPage={setPage} />}
    </>
  );
}

export default App;





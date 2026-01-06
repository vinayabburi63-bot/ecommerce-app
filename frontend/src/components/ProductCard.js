function ProductCard({ product, addToCart, onView }) {
  return (
    <div className="amz-card">
      <div className="amz-image-box" onClick={onView}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/no-image.png";
          }}
        />
      </div>

      <div className="amz-body">
        <h3 className="amz-title">{product.name}</h3>
        <p className="amz-price">₹{product.price}</p>

        <button
          className="amz-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;








function ViewProducts({ products, filter, setFilter }) {
  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="text-primary mb-3">📦 View Products</h4>
      <div className="mb-4 d-flex flex-wrap gap-3">
        {["all", "Supplements", "Gym Equipment", "Apparel"].map((c) => (
          <button
            key={c}
            className={`btn ${
              filter === c
                ? `btn-${
                    c === "all"
                      ? "primary"
                      : c === "Supplements"
                      ? "success"
                      : c === "Gym Equipment"
                      ? "warning text-dark"
                      : "info"
                  }`
                : "btn-outline-primary"
            }`}
            onClick={() => setFilter(c)}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      <div className="table-responsive" style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark" style={{ position: "sticky", top: 0 }}>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      width="70"
                      height="70"
                      style={{ objectFit: "cover", borderRadius: "10px" }}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.quantity}</td>
                  <td>{p.price.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ViewProducts;
function SearchProduct({ searchInput, setSearchInput, searchResults, performSearch }) {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="text-warning mb-3">🔍 Search Products</h4>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or category"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={performSearch} className="btn btn-warning text-dark">Search</button>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h5>Results:</h5>
          <ul className="list-group">
            {searchResults.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.name} — {item.category} — PKR {item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default SearchProduct;

function DeleteProduct({ handleDelete, deleteInput, setDeleteInput, text }) {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="text-danger mb-3">🗑️ Delete Product</h4>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter Product ID or Name"
        value={deleteInput}
        onChange={(e) => setDeleteInput(e.target.value)}
      />
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      {text && (
        <h6 className="text-center mt-3" style={{ color: text.includes("✅") ? "green" : "red" }}>
          {text}
        </h6>
      )}
    </div>
  );
}
export default DeleteProduct

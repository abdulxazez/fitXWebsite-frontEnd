

function AddProduct({ register, handleSubmit, errors, onSubmit }) {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="text-success mb-3">➕ Add New Product</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Product ID</label>
          <input {...register("productId")} className="form-control" placeholder="Enter ID" />
          {errors.productId && <p className="text-danger">{errors.productId.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input {...register("productName")} className="form-control" placeholder="Enter name" />
          {errors.productName && <p className="text-danger">{errors.productName.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input {...register("quantity")} type="number" className="form-control" placeholder="Enter quantity" />
          {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input {...register("price")} type="number" className="form-control" placeholder="Enter price" />
          {errors.price && <p className="text-danger">{errors.price.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select {...register("category")} className="form-select">
            <option>Supplements</option>
            <option>Gym Equipment</option>
            <option>Apparel</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input {...register("image")} type="file" className="form-control" accept="image/*" />
        </div>

        <button type="submit" className="btn btn-success">Save Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
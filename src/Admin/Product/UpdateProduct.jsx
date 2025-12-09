// components/UpdateProduct.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchProduct, updateProd } from '../../service/api';

// Separate Zod schemas for search and update
const searchSchema = z.object({
  searchingProd: z.string().min(3, {message: "Product ID must be at least 3 characters"})  
});

const updateSchema = z.object({
  productName: z.string()
    .min(3, { message: "Product name must be at least 3 characters" })
    .max(100, { message: "Product name must be less than 100 characters" }),
  price: z.string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "Price must be a valid number greater than or equal to 0"
    }),
  quantity: z.string()
    .min(1, { message: "Quantity is required" })
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Quantity must be a valid number greater than or equal to 0"
    }),
  category: z.string()
    .min(1, { message: "Category is required" })
    .max(50, { message: "Category must be less than 50 characters" }),
  description: z.string()
    .optional()
});

const UpdateProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); 
  const [productFound, setProductFound] = useState(false);
  const [idFound, setIdFound] = useState(null)
  // React Hook Form for SEARCH
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    formState: { errors: searchErrors },
    reset: resetSearch
  } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchingProd: ''
    }
  });

  // React Hook Form for UPDATE
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: updateErrors },
    reset: resetUpdate,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      productName: '',
      price: '',
      quantity: '',
      category: '',
      description: ''
    }
  });

  // Watch form values for real-time validation display
  const watchedValues = watch();

  
  const onSubmit1 = async (data) => {
    console.log('Searching for:', data)
    
    
    ;
    setLoading(true);
    setMessage('');
    
    try {
      const token = window.localStorage.getItem('jwtToken');
      if (!token) {
        setMessage('❌ Please login first');
        setLoading(false);
        return;
      }

      const tokenAuth = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      console.log(token);
      setIdFound(data.searchingProd);
      // Send only the search ID, not the entire data object
      const res = await searchProduct( data.searchingProd , tokenAuth);
      console.log("Axios Response: ", res.data);
      // Check if product was found
      if (res.data && res.data.success) {
        const product = res.data.data;
        setSelectedProduct(product);
        
        // Fill update form with found product data
        setValue('productName', product.name || '');
        setValue('price', product.price?.toString() || '');
        setValue('quantity', product.stock?.toString() || product.quantity?.toString() || '');
        setValue('category', product.category || '');
        setValue('description', product.description || '');
        
        setProductFound(true); // CORRECT: Call setProductFound with true
        setMessage('✅ Product found! You can now update it.');
      } else {
        setMessage('❌ Product not found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setMessage(`❌ Search failed: ${error.response?.data?.message || 'Please try again'}`);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    
    try {
      console.log('Updating product:', selectedProduct.productId, data);
       const token = window.localStorage.getItem('jwtToken');
      if (!token) {
        setMessage('❌ Please login first');
        setLoading(false);
        return;
      }

      const tokenAuth = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      console.log();
      console.log(idFound)
     const res = await updateProd(idFound, data, tokenAuth)
      setMessage('✅ Product updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      setMessage('❌ Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const resetSearchForm = () => {
    setProductFound(false);
    setSelectedProduct(null);
    resetUpdate();
    resetSearch();
    setMessage('');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card shadow border-0">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">
              <i className="bi bi-pencil-square me-2"></i>
              Update Product
            </h4>
          </div>
          <div className="card-body p-4">
            
            {/* Message Display */}
            {message && (
              <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} d-flex align-items-center`}>
                <i className={`bi ${message.includes('✅') ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
                {message}
              </div>
            )}

            {!productFound ? (
              // SEARCH FORM
              <form onSubmit={handleSubmitSearch(onSubmit1)}>
                <h4>Enter Product ID to update</h4>
                <div className="mb-3">
                  <input 
                    type="text"
                    id="searchingProd"
                    className={`form-control ${searchErrors.searchingProd ? 'is-invalid' : ''}`}
                    {...registerSearch("searchingProd")}
                    placeholder="Enter product ID (min 3 characters)"
                  />
                  {searchErrors.searchingProd && (
                    <div className="invalid-feedback">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {searchErrors.searchingProd.message}
                    </div>
                  )}
                </div>
                <button 
                  className='btn btn-primary mt-2' 
                  type='submit'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search me-2"></i>
                      Find Product
                    </>
                  )}
                </button>
              </form>
            ) : (
              // UPDATE FORM
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Updating Product: <span className="text-primary">{selectedProduct?.name}</span></h5>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={resetSearchForm}
                  >
                    <i className="bi bi-arrow-left me-1"></i>
                    Back to Search
                  </button>
                </div>

                <form onSubmit={handleSubmitUpdate(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="productName" className="form-label fw-semibold">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${updateErrors.productName ? 'is-invalid' : ''}`}
                        id="productName"
                        {...registerUpdate("productName")}
                        placeholder="Enter product name"
                      />
                      {updateErrors.productName && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {updateErrors.productName.message}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="price" className="form-label fw-semibold">
                        Price *
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className={`form-control ${updateErrors.price ? 'is-invalid' : ''}`}
                          id="price"
                          step="0.01"
                          min="0"
                          {...registerUpdate("price")}
                          placeholder="0.00"
                        />
                      </div>
                      {updateErrors.price && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {updateErrors.price.message}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="quantity" className="form-label fw-semibold">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        className={`form-control ${updateErrors.quantity ? 'is-invalid' : ''}`}
                        id="quantity"
                        min="0"
                        {...registerUpdate("quantity")}
                        placeholder="Enter quantity"
                      />
                      {updateErrors.quantity && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {updateErrors.quantity.message}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="category" className="form-label fw-semibold">
                        Category *
                      </label>
                      <input
                        type="text"
                        className={`form-control ${updateErrors.category ? 'is-invalid' : ''}`}
                        id="category"
                        {...registerUpdate("category")}
                        placeholder="Enter category"
                      />
                      {updateErrors.category && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {updateErrors.category.message}
                        </div>
                      )}
                    </div>

                    <div className="col-12 mb-4">
                      <label htmlFor="description" className="form-label fw-semibold">
                        Description
                      </label>
                      <textarea
                        className={`form-control ${updateErrors.description ? 'is-invalid' : ''}`}
                        id="description"
                        rows="4"
                        {...registerUpdate("description")}
                        placeholder="Enter product description..."
                      />
                      {updateErrors.description && (
                        <div className="invalid-feedback d-flex align-items-center">
                          <i className="bi bi-exclamation-circle me-1"></i>
                          {updateErrors.description.message}
                        </div>
                      )}
                      <div className="form-text">
                        {watchedValues.description?.length || 0}/500 characters
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button 
                      type="submit" 
                      className="btn btn-warning"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Update Product
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
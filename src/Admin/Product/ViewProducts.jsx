import { useEffect, useState } from "react";
import { getProduct } from "../../service/api";

function ViewProducts({ filter, setFilter }) {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Backend URL where images are served from
  const BACKEND_URL = "http://localhost:5000"; // Change if your backend runs on different port
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = window.localStorage.getItem('jwtToken');
        const tokenAuth = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        const res = await getProduct(tokenAuth);
        setProducts(res.data);
        
        // Debug what we're getting
        if (res.data.length > 0) {
          console.log("First product image structure:", res.data[0].image);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // SIMPLE image URL function
  const getImageUrl = (imageData) => {
    if (!imageData) return null;
    
    console.log("Processing image data:", imageData);
    
    // If imageData has filename property (most common)
    if (imageData.filename) {
      return `${BACKEND_URL}/images/${imageData.filename}`;
    }
    
    // If imageData is just the filename string
    if (typeof imageData === 'string') {
      return `${BACKEND_URL}/images/${imageData}`;
    }
    
    // If imageData has name property (your case)
    if (imageData.name) {
      return `${BACKEND_URL}/images/${imageData.name}`;
    }
    
    return null;
  };

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      {/* Simple Zoom Modal */}
      {selectedImage && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}>
            <button
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer"
              }}
              onClick={() => setSelectedImage(null)}
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              style={{ maxWidth: "100%", maxHeight: "90vh" }}
            />
          </div>
        </div>
      )}

      <div className="p-4 bg-white rounded shadow-sm">
        <h4 className="text-primary mb-3">📦 View Products</h4>

        <div className="mb-4 d-flex flex-wrap gap-3">
          {["all", "Supplements", "Gym Equipment", "Apparel"].map((c) => (
            <button
              key={c}
              className={`btn ${filter === c ? getBtnClass(c) : "btn-outline-primary"}`}
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
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const imageUrl = getImageUrl(p.image);
                const hasImage = imageUrl !== null;
                
                return (
                  <tr key={p.productId}>
                    <td>{p.productId}</td>
                    <td>
                      <div 
                        style={{ cursor: hasImage ? "pointer" : "default" }}
                        onClick={() => hasImage && setSelectedImage(imageUrl)}
                      >
                        {hasImage ? (
                          <img
                            src={imageUrl}
                            alt={p.productName}
                            width="70"
                            height="70"
                            style={{ 
                              objectFit: "cover", 
                              borderRadius: "10px",
                              border: "2px solid #dee2e6"
                            }}
                            onError={(e) => {
                              // Log the error
                              console.error(`Image failed to load: ${imageUrl}`);
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div style="width:70px;height:70px;background:#f0f0f0;border-radius:10px;display:flex;align-items:center;justify-content:center;border:2px dashed #ccc">
                                  <span style="color:#666;font-size:12px">No Image</span>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div style={{
                            width: "70px",
                            height: "70px",
                            background: "#f0f0f0",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px dashed #ccc"
                          }}>
                            <span style={{ color: "#666", fontSize: "12px" }}>No Image</span>
                          </div>
                        )}
                        {hasImage && <div className="small text-muted mt-1">Click to zoom</div>}
                      </div>
                    </td>
                    <td>{p.productName}</td>
                    <td>{p.category || "Uncategorized"}</td>
                    <td>{p.quantity}</td>
                    <td>{typeof p.price === 'number' ? p.price.toLocaleString() : p.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function getBtnClass(category) {
  const classes = {
    "all": "btn-primary",
    "Supplements": "btn-success", 
    "Gym Equipment": "btn-warning text-dark",
    "Apparel": "btn-info"
  };
  return classes[category] || "btn-primary";
}

export default ViewProducts;
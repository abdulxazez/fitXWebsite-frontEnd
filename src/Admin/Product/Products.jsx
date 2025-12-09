import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdateProduct from './UpdateProduct'
import ViewProducts from './ViewProducts'
import DeleteProduct  from './DeleteProduct'
import AddProduct from './AddProduct'
import { useNavigate } from "react-router-dom";
import {addingProduct} from "../../service/api";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  productName: z.string().min(3, { message: "Please provide at least 3 letters" }),
  productId: z.string().min(3, { message: "Please enter ProductId" }),
  quantity: z.string().min(1, { message: "Please Enter Quantity" }),
  price: z.string().min(4, { message: "Price must be greater than 999" }),
  category: z.string().optional(),
  image: z
    .any() // Use 'any' instead of 'instanceof(File)' to handle undefined
    .refine((file) => {
      // First check if a file exists
      if (!file) {
        throw new Error("Please select an image file.");
      }
      return true;
    })
   
});

function Products() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const [activeSection, setActiveSection] = useState("");
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

 
const onSubmitAdd = async (data) => {
    const token = window.localStorage.getItem('jwtToken');
    console.log("jwtToken:", token);
    console.log("Form data:", data);
    
    // IMPORTANT: Check what data.image actually is
    console.log("=== DEBUG Image Info ===");
    console.log("data.image value:", data.image);
    console.log("Type:", typeof data.image);
    console.log("Is File?", data.image instanceof File);
    console.log("Is Array?", Array.isArray(data.image));
    console.log("Has 0 index?", data.image?.[0]);
    console.log("======================");

    setText(`✅ "${data.productName}" added successfully!`);
    
    try {
        const formData = new FormData();
        
        // Append text fields
        formData.append('productName', data.productName);
        formData.append('productId', data.productId);
        formData.append('quantity', data.quantity);
        formData.append('price', data.price);
        if (data.category) formData.append('category', data.category);
        
        // CORRECT WAY: Handle the image properly
        let fileToUpload = null;
        
        if (data.image) {
            // Case 1: It's a single File object (what your Zod schema expects)
            if (data.image instanceof File) {
                fileToUpload = data.image;
                formData.append('image', data.image);
                console.log("Appended single file:", data.image.name, data.image.type);
            }
            // Case 2: It's an array with a file (from multiple file input)
            else if (Array.isArray(data.image) && data.image.length > 0 && data.image[0] instanceof File) {
                fileToUpload = data.image[0];
                formData.append('image', data.image[0]);
                console.log("Appended file from array:", data.image[0].name);
            }
            // Case 3: It's a FileList (from regular file input)
            else if (data.image instanceof FileList && data.image.length > 0) {
                fileToUpload = data.image[0];
                formData.append('image', data.image[0]);
                console.log("Appended file from FileList:", data.image[0].name);
            }
            else {
                console.error("Unexpected data.image format:", data.image);
                throw new Error("Image format is not recognized. Please select a valid image file.");
            }
        } else {
            console.error("No image in data");
            throw new Error("Please select an image file");
        }
        
        // Debug FormData
        console.log("=== FormData Contents ===");
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File - "${value.name}" (${value.type}, ${value.size} bytes)`);
            } else {
                console.log(`${key}: "${value}"`);
            }
        }
        console.log("=========================");
        
        const tokenAuth = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        
        await addingProduct(formData, tokenAuth);
        console.log("Product added successfully");
        
    } catch (error) {
        console.log("Product Not Added:", error);
        setText(`❌ Error: ${error.message}`);
    }
};
  //deleteProduct
  const handleDelete = () => {
    if (!deleteInput.trim()) {
      setText("❌ Please enter a product name or ID.");
      return;
    }
    const match = products.find(
      (p) =>
        p.name.toLowerCase() === deleteInput.toLowerCase() ||
        p.id.toString() === deleteInput
    );
    if (match) {
      setProducts((prev) =>
        prev.filter(
          (p) =>
            p.name.toLowerCase() !== deleteInput.toLowerCase() &&
            p.id.toString() !== deleteInput
        )
      );
      setText(`✅ "${match.name}" has been deleted successfully.`);
    } else {
      setText("❌ Product not found.");
    }
    setDeleteInput("");
  }

  
  const performSearch = () => {
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
  };

  
  const renderSection = () => {
    switch (activeSection) {
      case "add":
        return <AddProduct register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmitAdd} />;
      case "delete":
        return <DeleteProduct handleDelete={handleDelete} deleteInput={deleteInput} setDeleteInput={setDeleteInput} text={text} />;
      case "view":
        return <ViewProducts filter={filter} setFilter={setFilter} />;
      case "search":
        return <UpdateProduct searchInput={searchInput} setSearchInput={setSearchInput} searchResults={searchResults} performSearch={performSearch} />;
      default:
        return <p className="text-center text-muted mt-5">Select an option above to manage products.</p>;
    }
  };

  // ====== RENDER ======
  return (
    <div className="container-fluid py-4 bg-light">
      <h1 className="text-primary fw-bold ms-3 mb-4">Product Management</h1>

      {/* Menu Cards */}
      <div className="row g-4 justify-content-center">
        {[
          { key: "add", icon: "bi-plus-circle text-success", title: "Add Product", desc: "Add new items to the store.", btn: "btn-success" },
          { key: "delete", icon: "bi-trash3 text-danger", title: "Delete Product", desc: "Remove outdated products.", btn: "btn-danger" },
          { key: "view", icon: "bi-eye text-primary", title: "View Products", desc: "See all listed products.", btn: "btn-primary" },
          { key: "search", icon: "bi-search text-warning", title: "Update Product", desc: "Update Items using Product Id", btn: "btn-warning text-dark" },
        ].map((card) => (
          <div key={card.key} className="col-12 col-sm-6 col-md-6 col-lg-3" onClick={() => setActiveSection(card.key)} style={{ cursor: "pointer" }}>
            <div className="card text-center shadow-sm border-0 p-4 h-100">
              <div className="card-body">
                <i className={`bi fs-1 mb-3 ${card.icon}`}></i>
                <h4 className="fw-bold text-dark mb-3">{card.title}</h4>
                <p className="text-secondary small">{card.desc}</p>
                <button className={`btn fw-semibold px-4 ${card.btn}`}>{card.title}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Section */}
      <div className="container mt-5">{renderSection()}</div> 
    </div>
  );
}

export default Products;

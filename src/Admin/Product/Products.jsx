import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchProduct from './SearchProduct'
import ViewProducts from './ViewProducts'
import DeleteProduct  from './DeleteProduct'
import AddProduct from './AddProduct'
import { useNavigate } from "react-router-dom";
import {addingProduct} from "../../service/api";

const schema = z.object({
  productName: z.string().min(3, { message: "Please provide at least 3 letters" }),
  productId: z.string().min(3, {message: "Please enter ProductId"}),
  quantity: z.string().min(1, {message: "Please Enter Quantity"}),
  price: z.string().min(4, {message: "Price must be greater than 999"}),
  category: z.string().optional(),
  image: z.any().optional(),
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

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Whey Protein",
      category: "Supplements",
      price: 6500,
      quantity: 30,
      image: "https://m.media-amazon.com/images/I/61fP5h5PnXL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      name: "Dumbbell Set",
      category: "Gym Equipment",
      price: 12000,
      quantity: 15,
      image: "https://m.media-amazon.com/images/I/71wM4mX3hWL._AC_SL1500_.jpg",
    },
    {
      id: 3,
      name: "FitX Hoodie",
      category: "Apparel",
      price: 3200,
      quantity: 40,
      image: "https://m.media-amazon.com/images/I/71K7Q4bEGrL._AC_SL1500_.jpg",
    },
  ]);

 
  const onSubmitAdd = async (data) => {
    console.log(data)
    if (!data.productName) return;
    const newProduct = {
      id: products.length + 1,
      name: data.productName,
      category: data.category || "Misc",
      price: Number(data.price) || 0,
      quantity: Number(data.quantity) || 0,
      image: data.image?.[0]
        ? URL.createObjectURL(data.image[0])
        : "https://via.placeholder.com/100",
    };
    setProducts((prev) => [...prev, newProduct]);
    
    setText(`✅ "${data.productName}" added successfully!`);
try{
    await addingProduct(data);
    reset();
    console.log("data added")
} catch (error) {
  console.log("Not Added")
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
        return <ViewProducts products={products} filter={filter} setFilter={setFilter} />;
      case "search":
        return <SearchProduct searchInput={searchInput} setSearchInput={setSearchInput} searchResults={searchResults} performSearch={performSearch} />;
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
          { key: "search", icon: "bi-search text-warning", title: "Search Product", desc: "Find items by name or category.", btn: "btn-warning text-dark" },
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

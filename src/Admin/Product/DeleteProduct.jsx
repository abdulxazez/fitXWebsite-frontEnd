import {z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteProduct } from "../../service/api";


const schema = z.object({
  productId: z.string().min(3, { message: "Please provide at least 3 letters" }),
  
});

function DeleteProduct({ handleDelete, deleteInput, setDeleteInput, text }) {

  const {handleSubmit, reset, register, formState : { errors }} = useForm({
    resolver: zodResolver(schema)
  })
  const onSubmit = async  (id) => {
    try{
      const token = window.localStorage.getItem('jwtToken')
      console.log("jwtToken:", token);
      const tokenAuth = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }};
       const res = await deleteProduct(id.productId, tokenAuth);
    }
    catch (error){
      console.log(error)
    }
  }
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h4 className="text-danger mb-3">🗑️ Delete Product</h4>
     <form onSubmit={handleSubmit(onSubmit)}>
       <input
        type="text"
        id="productId"
        className="form-control mb-3"
        placeholder="Enter Product ID or Name"
       
        {...register("productId")}
      />
      {errors.productId && <p className="text-danger">{errors.productId.message}</p>}
      <button onClick={handleDelete} type="submit" className="btn btn-danger">Delete</button>
     </form>
      {text && (
        <h6 className="text-center mt-3" style={{ color: text.includes("✅") ? "green" : "red" }}>
          {text}
        </h6>
      )}
    </div>
  );
}
export default DeleteProduct

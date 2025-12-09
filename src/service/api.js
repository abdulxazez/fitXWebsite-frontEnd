import axios from "axios";

const url="http://localhost:5000";

export const addUser = async (userData) => {
  try {
    
    const response = await axios.post(`${url}/api/registration`, userData);
    return response;
  } catch (error) {
    console.log("error occurred");
  }
};


export const checkOrder = async(paymentData) =>{

  return await axios.post(`${url}/Payments`, paymentData);
  
}

export const searchProduct = async (productId, tokenAuth) => {
  // Make sure to pass the search query as a query parameter
  return await axios.get(
    `${url}/Products/search?searchingProd=${encodeURIComponent(productId)}`, 
    tokenAuth  // config object goes as second parameter
  )
}
export const addPayment = async(paymentData) => {
  return await axios.post("/", );
}

export const addingProduct = async(productData, tokenAuth)=>{
  return await axios.post(`${url}/Products/add`, productData, tokenAuth);
};
export const updateProd = async(productId, productData, tokenAuth)=>{
  return await axios.post(`${url}/Products/${productId}`, productData, tokenAuth);
};
export const getProduct = async(tokenAuth)=>{ 
  return await axios.get(`${url}/Products/view`, tokenAuth);  
}
export const deleteProduct = async(productId, tokenAuth) => {
    return await axios.delete(`${url}/Products/${productId}`, tokenAuth)
};
export const postLoginCredentials = async(loginData)=>{
  console.log("Data received")

 try{
   return await axios.post(`${url}/loginPage`,loginData);
 } catch (error) {
  console.log("")
 }
};
export const postcontact=async(contactData)=>
{
return await axios.post(`${url}/contacts`,contactData);
};
export const adminLogin = async(loginData)=>{
  console.log("Data received")

 try{
   return await axios.post(`${url}/admin/loginPage`,loginData);
 } catch (error) {
  console.log("Error passing through axios")
 }
};
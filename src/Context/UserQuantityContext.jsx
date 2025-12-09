// Context/UserQuantityContext.js
import { createContext, useContext, useState } from "react";

export const UserQuantityContext = createContext();

export const UserQuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(0); // Start with 0 users
  
  // Function to add a user
  const addUserToCount = () => {
    console.log("Adding user to count. Current:", quantity, "New:", quantity + 1);
    setQuantity(prev => prev + 1);
  };
  
  return (
    <UserQuantityContext.Provider 
      value={{ 
        quantity, 
        addUserToCount // Only expose this function
      }}
    >
      {children}
    </UserQuantityContext.Provider>
  );
};
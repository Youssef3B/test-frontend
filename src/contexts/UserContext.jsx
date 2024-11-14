import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [allUsers, setAllUsers] = useState([]);

  async function getUserFromHisId(id) {
    if (!id) {
      return;
    }
    const url = `https://test-deploy-api-0e9g.onrender.com/api/user/getUserById/${id}`;
    try {
      const res = await axios.get(url);
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  async function UpdateUserFromHisId(id, formData) {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/user/editUserById/${id}`;

    try {
      const res = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart
        },
      });

      if (res) {
        console.log("Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  async function getAllUsers() {
    const url = `https://test-deploy-api-0e9g.onrender.com/api/user/allusers`;
    try {
      const res = await axios.get(url);
      if (res) {
        setAllUsers(res.data);
      }
    } catch (error) {
      console.log("Error Fetch All Users", error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        getUserFromHisId,
        UpdateUserFromHisId,
        getAllUsers,
        allUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("User Context used outside the User Provider");
  }
  return context;
}

export { UserProvider, useUser };

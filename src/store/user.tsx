// // CurrentUserContext.tsx
// import React, { createContext, useState, useContext } from 'react';

// type UserContextType = {
//   user: any; // Define the type for user here
//   setUser: React.Dispatch<any>;
// };
// const CurrentUserContext = createContext<UserContextType >({
//   user: null,
//   setUser: () => null,
// });


// export default CurrentUserContext;
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  getuser: () => void;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getuser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await data.json();
        console.log(response);
        if (response.status === "success") {
          setUser(response.user);
        } else {
          setUser(null);

        }
      }
    } catch (err) {
      console.log(err);

    }
  };

  useEffect(() => {
    setLoading(true);
    getuser();
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getuser, loading }}> {/* Provide the context value */}
      {children}
    </UserContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;

}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  getuser: () => void;
  loading: boolean;
  token: string;

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
  const [token, setToken] = useState<string>("");

  const getuser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        const data = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // if (!data.ok) {
        //   throw new Error('Backend services are down. Please try again later.');

        // }
        const response = await data.json();
        console.log(response);
        if (response.status === "success") {
          setUser(response.user);
        } else {
          setUser(null);
          localStorage.removeItem("token");

        }
      }
    } catch (err) {
      console.log(err);
      throw new Error('Something went wrong.');
    }
  };

  useEffect(() => {
    setLoading(true);
    getuser();
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getuser, loading, token }}> {/* Provide the context value */}
      {children}
    </UserContext.Provider>
  );
}

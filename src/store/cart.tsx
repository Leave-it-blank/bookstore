import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Cart {
    id: number;
    username: string;
    email: string;
}

interface CartContextType {
    cart: Cart | null;
    setCart: (user: Cart | null) => void;
    getCart: () => void;
    loading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export function UserProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getCart = async () => {
        try {
            const token = localStorage.getItem("cart");
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
                    setCart(response.user);
                } else {
                    setCart(null);

                }
            }
        } catch (err) {
            console.log(err);

        }
    };

    useEffect(() => {
        setLoading(true);
        getCart();
        setLoading(false);
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart, getCart, loading }}> {/* Provide the context value */}
            {children}
        </CartContext.Provider>
    );
}

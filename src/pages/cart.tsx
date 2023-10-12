import React, { useState, useEffect } from 'react';

interface cart {
    itemID: number;
    itemName: string;
    price: number;
    itemType: string;
    quantity: number;
    type: string;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<cart[]>([]);

    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if (cart) {
            setCartItems(JSON.parse(cart));
        }
    }, []);


    //  { itemID: 1, itemName: 'Product 1', price: 10 },
    // { itemID: 2, itemName: 'Product 2', price: 20 },
    // { itemID: 3, itemName: 'Product 3', price: 30 },

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
    };

    const removeItem = (item: any) => {
        //just remove one item from cart with the id
        const newCart = cartItems.filter((cartItem) => cartItem.itemID !== item.itemID);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex justify-center flex-col ">
            <h1 className="text-3xl font-semibold mb-4"> Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className='text-[25px] flex justify-center h-[400px] items-center'>Your cart is empty.</p>
            ) : (
                <div className='flex flex-col gap-5'>
                    {cartItems.map((item) => (
                        <div
                            key={item.itemID}
                            className=" grid grid-cols-8 justify-center gap-10 items-center border-b border-gray-300 py-2"
                        >
                            <div className='col-span-1 flex justify-center flex-col gap-1 items-center capitalize border-r'>
                                <p className="text-lg font-semibold">{item.itemType}</p>
                                <p className="text-lg font-semibold">{item.type}</p>


                            </div>
                            <div className='col-start-2 col-span-3 border-r'>
                                <p className="text-lg font-semibold">{item.itemName}</p>
                            </div>
                            <div className='col-start-5 border-r'>
                                <p className="text-lg font-semibold">{item.quantity + " qty"}</p>
                            </div>
                            <div className='col-start-7 border-r'>
                                <p className="text-gray-600">₹{item.price}</p>
                            </div>
                            <button
                                onClick={() => removeItem(item)}
                                className="bg-neutral-800 text-white rounded-md py-2 col-start-8"
                            >
                                Remove from cart
                            </button>
                        </div>
                    ))}

                    <div className="mt-4">
                        <p className="text-2xl  font-bold">
                            Total: ₹{calculateTotal()}
                        </p>
                    </div>
                    <br />
                    <div className='w-full flex justify-center'>
                        <button className="inline-flex w-full text-white md:w-fit  items-center justify-center   px-20 py-4 relative   bg-black rounded-[16px] overflow-hidden">
                            Checkout
                        </button>
                    </div>

                </div>
            )
            }
        </div >
    );
};

export default Cart;



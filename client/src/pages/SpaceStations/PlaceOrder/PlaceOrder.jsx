import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar/Navbar';

const PlaceOrder = () => {
    const cartItemsFromStore = useSelector(store => store.cart.cartItems);
    const [cartItems, setCartItems] = useState(cartItemsFromStore);
    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });
    
    const deliveryCharge = 50; // Assuming a fixed delivery charge

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        console.log('Order Placed', { cartItems, address, totalPrice });
        // Logic to place order...
    };

    return (
        <div>
            <Navbar />
            <div className="w-full max-w-7xl mx-auto p-6 flex gap-8">
                {/* Cart Items Section */}
                <div className="w-3/5">
                    <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <div key={item.product_id} className="flex justify-between items-center border-b-2 pb-4">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h1 className="text-xl font-bold">{item.name}</h1>
                                        <p className="text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                                <div className="text-lg font-bold">${item.price} x {item.quantity}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price and Address Form Section */}
                <div className="w-2/5">
                    {/* Total Price + Delivery Charge */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-2xl mb-6">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 pb-2 border-white">Order Total</h2>
                        <div className="text-xl mb-4 flex justify-between">
                            <span>Items Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="text-xl mb-4 flex justify-between">
                            <span>Delivery Charges:</span>
                            <span>${deliveryCharge.toFixed(2)}</span>
                        </div>
                        <div className="text-3xl font-bold mt-4 flex justify-between">
                            <span>Total:</span>
                            <span>${(totalPrice + deliveryCharge).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Delivery Address Form */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                        <form onSubmit={handlePlaceOrder} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={address.name}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-lg border border-gray-300"
                                required
                            />
                            <input
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                value={address.street}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-lg border border-gray-300"
                                required
                            />
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={address.city}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-lg border border-gray-300"
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={address.state}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-lg border border-gray-300"
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="zip"
                                placeholder="Zip Code"
                                value={address.zip}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-lg border border-gray-300"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={address.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-lg border border-gray-300"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;

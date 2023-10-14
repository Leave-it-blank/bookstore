import { useState } from "react";
import toast from "react-hot-toast";
export const FormComponent = ({ closeModal, form, userDetails, setUserDetails }: any) => {
    const handleChange = (e: any) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(userDetails);
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/store/handlepreorder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ form, userDetails }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                console.log(data)
                toast.success("Successfully Submited Request.");

                // window.location.href = '/';
            } else {
                if (data.error) {
                    toast.error(data.error)
                } else {
                    toast.error("Something went wrong. Please try again")
                }

            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong. Please try again")
        });
        closeModal();
    }
    return (
        <>
            <div className="  mx-auto h-[78vh]    flex flex-col  items-center rounded-md  p-5 justify-between">
                <div className="py-2  flex justify-between w-full  my-4 items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Pre-Order</h1>
                        <p className="mt-2 text-sm text-gray-500">Please fill in the form below to pre-order this book.</p>
                    </div>
                    <div>
                        <button onClick={closeModal} className="    text-white text-center  p-3    bg-neutral-800 rounded-xl overflow-hidden">
                            X
                        </button>
                    </div>

                </div>
                <form className="flex flex-col gap-3 w-full " onChange={handleChange} onSubmit={handleSubmit}>

                    <h2 className="text-gray-800 font-semibold text-xl capitalize">Your Information</h2>
                    <div className="grid  gap-5 grid-cols-2  xl:grid-cols-4 w-full ">
                        <input type="text" value={form.firstName} name="firstName" className="w-full border rounded-md border-gray-200 p-2" placeholder="First Name" />
                        <input type="text" value={form.lastName} name="lastName" className="w-full border rounded-md border-gray-200 p-2" placeholder="Last Name" />
                        <input type="text" value={form.phone} name="phone" className="w-full border rounded-md border-gray-200 p-2" placeholder="Phone" />
                        <input type="text" value={form.email} name="email" className="w-full border rounded-md border-gray-200 p-2" placeholder="Email" />
                    </div>
                    <h2 className="text-gray-800 font-semibold text-xl capitalize">Address</h2>
                    <textarea rows={4} value={form.address} name="address" className="w-full border rounded-md border-gray-200 p-2" placeholder="Address" />
                    <div className="grid  gap-5 grid-cols-2  xl:grid-cols-4 w-full ">
                        <input type="text" value={form.city} name="city" className="w-full border rounded-md border-gray-200 p-2" placeholder="City" />
                        <input type="text" value={form.state} name="state" className="w-full border rounded-md border-gray-200 p-2" placeholder="State" />
                        <input type="text" value={form.zip} name="zip" className="w-full border rounded-md border-gray-200 p-2" placeholder="Zip" />
                        <input type="text" value={form.country} name="country" className="w-full border rounded-md border-gray-200 p-2" placeholder="Country" />
                    </div>
                    <h2 className="text-gray-800 font-semibold text-xl capitalize">Any Remarks?</h2>
                    <textarea rows={5} value={form.message} name="message" className="w-full border rounded-md border-gray-200 p-2" placeholder="Message" />
                    <button
                        className="  w-full   text-white text-center  px-5 py-3     bg-black rounded-xl overflow-hidden"

                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

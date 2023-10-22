import { useUser } from '@/store/user';
import React, { Key, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
export default function Profile() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const router = useRouter();
    const { user, token, loading } = useUser();
    if (!user && loading) {
        return <LoadingSpinner />;
    }
    if (!user) {
        router.push('/login')
        return <>
            Login Required.
        </>
    }
    const validate = async () => {
        if (password == "" || newPassword == "") {
            setErrors(["Please fill all the fields"]);
            return false;
        }

        if (password.length < 8 || newPassword.length < 8) {
            setErrors(["Password must be atleast 8 characters long"]);
            return false;
        }
        if (password.length > 20 || newPassword.length > 20) {
            setErrors(["Password must be less than 20 characters long"]);
            return false;
        }

        if (password == newPassword) {
            setErrors(["Passwords match. Please use different password."]);
            return false;
        }
        setErrors([]);
        return true;
    }
    const handlePasswordChange = async (e: any) => {
        e.preventDefault();
        // Handle password change logic (e.g., API call)
        const validateForm = await validate();
        if (!validateForm) {
            console.log("validate failed")
            return;
        }
        const userData = {
            password: password,
            newpass: newPassword,
        }
        userPasswordChange(userData);

    };
    const userPasswordChange = async (userData: { password: string, newpass: string }) => {
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/change-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(userData),

        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                toast.success("Successfully Changed Password.");
            } else {
                if (data.error) {
                    setErrors([data.error]);
                }
                toast.error(data.error)
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong. Please try again")
        });
    }

    const handleTwoFactorToggle = () => {
        // Handle two-factor authentication setup (e.g., API call)
        setTwoFactorEnabled(!twoFactorEnabled);
    };
    return <div className='flex flex-col gap-5 justify-around min-h-[700px] bg-white rounded-md p-3 md:p-10'>
        <div className="  flex items-center justify-center">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md  w-full">
                <div className="text-center mb-4">

                    <h1 className="text-2xl font-bold text-gray-800 mt-2">{user.email.split("@")[0].split(".").join(" ")}</h1>
                    <p className="text-gray-600">{user.role}</p>
                </div>
                <div className="text-left">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Bio</h2>
                    <p className="text-gray-600">
                        Click to add
                    </p>
                </div>
                <div className="text-left mt-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
                    <p className="text-gray-600">
                        Email: {user.email}
                        <br />
                        Phone:   Not available
                    </p>
                </div>
            </div>
        </div>
        <div className=" flex items-center justify-center">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 text-start md:text-center mb-4">Account Settings</h1>

                {/* Password Change Form */}
                <form onSubmit={handlePasswordChange}>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Change Password</h2>
                    {
                        errors.length > 0 &&
                        (
                            <div className='my-2 w-full bg-slate-50 p-2 rounded-md'>
                                {errors.map((error: any, index: Key | null | undefined) => {
                                    return <div key={index} className="text-red-600 caption-top text-xs">{error}</div>;
                                })}
                            </div>
                        )
                    }
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="password">Current Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="w-full px-3 py-2 border rounded-md"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <button className="bg-neutral-800 text-white font-semibold px-4 py-2 rounded-md">
                        Change Password
                    </button>
                </form>

                {/* Two-Factor Authentication Toggle */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Two-Factor Authentication</h2>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="twoFactor"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={twoFactorEnabled}
                            disabled
                            onChange={handleTwoFactorToggle}
                        />
                        <label htmlFor="twoFactor" className="ml-2 text-gray-700 cursor-pointer">
                            Enable Two-Factor Authentication
                        </label>
                    </div>
                </div>
            </div>
        </div></div>;
}
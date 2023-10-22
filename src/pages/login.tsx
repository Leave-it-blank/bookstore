// pages/login.tsx
import { useState, useContext, useEffect, Key } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useUser } from '../store/user';
import { useRouter, Router } from 'next/router';
const Login: React.FC = () => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any>([]);
    const UserContext = useUser();
    const Router = useRouter();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        console.log("login")
        // Implement your login logic here
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                console.log(data)
                toast.success("Successfully logged In.");
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("refresh_token", data.refreshToken);
                UserContext.getuser();
                //  getuser();
                // window.location.href = '/';
                Router.back();
            } else {
                if (data.error) {
                    setErrors([data.error]);
                    toast.error(data.error)
                } else {
                    toast.error("Something went wrong. Please try again")
                }

            }
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong. Please try again")
        });
    };
    useEffect(() => {
        if (UserContext.user != null) {
            Router.back();
        }
    }, [UserContext, Router]);

    return (
        <div className=" min-h-[450px] md:min-h-[700px] flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">

                <h2 className="text-2xl font-semibold mb-6">Login</h2>
                {
                    errors.length > 0 &&
                    (
                        <div className='my-2 w-full bg-slate-50 p-2 rounded-md' >
                            {errors.map((error: any, index: number) => {
                                return <div key={index} className="text-red-600 capitalize text-xs">{error}</div>;
                            })}
                        </div>
                    )
                }
                <form onSubmit={handleLogin} method='post'>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-2 border rounded-md w-full"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 p-2 border rounded-md w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-4 rounded-md  w-full"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4">
                    {`Don't have an account?`} <Link className='text-sky-600' href="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

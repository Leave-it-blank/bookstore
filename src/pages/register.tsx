// pages/register.tsx
import { Key, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useUser } from '../store/user';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<any>([]);
    const UserContext = useUser();
    useEffect(() => {
        if (UserContext.user != null) {
            window.location.href = "/";
        }
    }, [UserContext]);

    const userRegisterRequest = async (userData: { name: string, email: string, password: string, city: string }) => {
        await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                console.log(data)
                toast.success("Successfully Registered.");
                window.location.href = '/login?email=' + email + "?successfullyRegistered=true";
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

    const validate = async () => {
        if (email == "" || password == "" || city == "") {
            setErrors(["Please fill all the fields"]);
            return false;
        }
        if (name.length < 3) {
            setErrors(["Name must be atleast 3 characters long"]);
            return false;
        }
        if (name.length > 20) {
            setErrors(["Name must be less than 20 characters long"]);
            return false;
        }
        if (password.length < 8) {
            setErrors(["Password must be atleast 8 characters long"]);
            return false;
        }
        if (password.length > 20) {
            setErrors(["Password must be less than 20 characters long"]);
            return false;
        }

        if (city.length < 2) {
            setErrors(["City must be atleast 3 characters long"]);
            return false;
        }
        if (city.length > 27) {
            setErrors(["City must be less than 27 characters long"]);
            return false;
        }
        if (password !== verifyPassword) {
            setErrors(["Passwords don't match. Please verify your password."]);
            return false;
        }
        setErrors([]);
        return true;
    }

    const handleRegister = async (e: any) => {
        // Implement your registration logic here
        e.preventDefault();
        const validateForm = await validate();
        if (!validateForm) {
            console.log("validate failed")
            return;
        }

        const userData = { name, email, password, city };
        // console.log("Register  registration logic here");
        userRegisterRequest(userData);
    };

    return (
        <div className=" min-h-[600px] flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Register</h2>
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
                <form onSubmit={handleRegister} method='post'>
                    <input
                        type="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mb-4 p-2 border rounded-md w-full"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                        className="mb-4 p-2 border rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}

                        className="mb-4 p-2 border rounded-md w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        min={8}
                        max={20}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 p-2 border rounded-md w-full"
                    />
                    <input
                        type="password"
                        placeholder="Verify Password"
                        required
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        className="mb-4 p-2 border rounded-md w-full"
                    />
                    <button
                        type="submit"

                        className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-4 rounded-md  w-full"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4">
                    Already have an account? <Link className='text-sky-600' href="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

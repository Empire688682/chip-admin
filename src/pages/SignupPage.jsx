import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../component/Context';

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const { apiUrl } = useGlobalContext();
    const [error, setError] = useState("");
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const loginUser = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/user/login`,
                data,
                { withCredentials: true });
            console.log("Res:", response);
            const { message, user } = response.data;

            if (!response.ok) {
                setError(message || "Authentication failed");
                return;
            }

            const now = new Date().getTime();
            const userDataWithTimestamp = { ...user, timestamp: now };
            localStorage.setItem("userData", JSON.stringify(userDataWithTimestamp));
            setData({
                email: "",
                password: "",
            });
            window.location.reload();
        } catch (error) {
            console.error("Auth Error:", error);
            setError(error?.response?.data?.message);
        }
        finally {
            setLoading(false)
        }
    }

    const handleFormSubmission = (e) => {
        e.preventDefault();
        loginUser();
    }

    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 4000);
    }, [error])

    return (
        <div className="min-h-screen absolute w-full flex items-center justify-center text-black px-4">
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-6 z-70">
                <div className="bg-white rounded-xl shadow-lg w-full md:max-w-md max-w:[300px] p-8 relative">

                    <h2 className="text-2xl font-bold mb-4 text-blue-600">
                        Login
                    </h2>

                    <form onSubmit={handleFormSubmission} className="space-y-4">
                        <input
                            onChange={handleOnchange}
                            value={data.email}
                            name="email"
                            type="email"
                            required
                            placeholder="Email"
                            className="w-full border rounded-lg outline-none border-gray-500 px-4 py-2"
                        />
                        <input
                            onChange={handleOnchange}
                            value={data.password}
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            className="w-full border rounded-lg outline-none border-gray-500 px-4 py-2"
                        />
                        {
                            error && <p className='text-red-600 text-center'>
                                {error}
                            </p>
                        }

                        <p className='cursor-pointer underline text-center'>Forgot Password</p>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                        >
                            {
                                loading ? "Processing"
                                    :
                                    "Login"
                            }
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

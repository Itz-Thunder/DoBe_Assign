import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', res.data.access_token);
            navigate('/home');
        } catch (err: any) {
            if (err.response?.status === 401) {
                setShowRegister(true);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                >
                    Login
                </button>

                {showRegister && (
                    <RegisterModal
                        username={username}
                        password={password}
                        onClose={() => setShowRegister(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Login;

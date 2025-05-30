import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:3000/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data))
            .catch(() => navigate('/login'));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
                <p className="text-gray-700 mb-2">
                    Username: <strong>{user?.username}</strong>
                </p>
                <p className="text-gray-500 mb-6">User ID: {user?.id}</p>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;

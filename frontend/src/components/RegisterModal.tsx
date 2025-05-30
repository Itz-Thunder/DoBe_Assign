import axios from 'axios';

const RegisterModal = ({
    username,
    password,
    onClose,
}: {
    username: string;
    password: string;
    onClose: () => void;
}) => {
    const handleRegister = async () => {
        await axios.post('http://localhost:3000/auth/register', {
            username,
            password,
        });
        alert('Registration successful! You can now log in.');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs text-center">
                <h2 className="text-lg font-semibold mb-4">Register New Account</h2>
                <p className="text-sm text-gray-600 mb-4">
                    User not found. Do you want to register with the same credentials?
                </p>
                <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-2"
                >
                    Register
                </button>
                <button
                    onClick={onClose}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RegisterModal;

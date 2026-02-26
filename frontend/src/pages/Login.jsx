import { useState } from "react";
import { loginUser } from "../api/authServices";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      const token = response.data.access_token;

      localStorage.setItem("token", token);

      if (formData.role === "driver") {
        navigate("/driver-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7E7CE]">
      <div className="bg-[#102C26] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-white text-2xl  font-bold text-center mb-6">
          WELCOME!!!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="driver">Driver</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded hover:bg-[#F7E7CE] transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#F7E7CE] cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
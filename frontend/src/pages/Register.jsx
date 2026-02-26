import { useState } from "react";
import { registerUser, registerDriver } from "../api/authServices";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicle_number: "",
    vehicle_type: "",
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
      if (role === "user") {
        await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        });
      } else {
        await registerDriver(formData);
      }

      alert("Registration successful!");
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FF6044]">
    <div className="bg-[#ECEFF1] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          BCOME A MEMBER
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="driver">Driver</option>
          </select>

          {/* Common Fields */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Driver Fields */}
          {role === "driver" && (
            <>
              <input
                type="text"
                name="vehicle_number"
                placeholder="Vehicle Number"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                name="vehicle_type"
                placeholder="Vehicle Type"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded hover:bg-[#FF6044] transition"
          >
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#FF6044] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
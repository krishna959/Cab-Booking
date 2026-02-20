// fall back to localhost if the environment variable isn't set (common during development)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    // throw so callers can catch and display a message
    throw new Error(json.detail || "Registration failed");
  }
  return json;
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.detail || "Login failed");
  }
  return json;
}
// RIDE and REQUEST

export async function requestRide(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/rides/request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();
}


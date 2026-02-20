const API = process.env.REACT_APP_API_URL;

export async function createRide(data) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/rides/request`,{
        method: "POST",
        headers:{
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await res.json();

    if(res.ok) {
        localStorage.setItem("activeRideId", result.ride_id);
    }
    return result;
}
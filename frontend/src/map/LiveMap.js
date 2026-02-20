import { useEffect , useRef, useState } from "react";

const LiveMap = ({rideId}) => {
    const wsRef = useRef(null);
    const [location,setLocation] = useState(null);

    useEffect(()=> {
        const ws = new WebSocket(`ws://localhost:8000/ws/ride/${rideId}`);
        wsRef.current =ws;

        ws.onopen = () =>{
            console.log("WebSocket connected")
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setLocation(data);
        };
        ws.onclose = () =>{
            console.log("WebSocket dissconnected")
        };
        ws.onerror = (error) =>{
            console.log("WebSocket error:",error);
        };
        return () => {
            ws.close();
        };
    }, [rideId]);
    return (
        <div>
            <h3>Live Driver LOacation</h3>
            {location ?(
                <p>
                    Latitude: {location.latitude} <br />
                    Longitude: {location.longitude}
                </p>
            ):(
                <p>waiting for driver location...</p>
            )}
        </div>
    );
};
export default LiveMap;
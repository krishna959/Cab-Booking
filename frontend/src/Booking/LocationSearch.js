import { useState } from "react";

function LocationSearch({ onChange }) {
    const [pickup, setPickup] = useState("");
    const [drop , setDrop] = useState("");

    return(
        <div className="p-4 space-y-3">
            <input
                className="w-full p-2 border"
                placeholder="Pickup location"
                value={pickup}
                onChange={(e) =>{
                setPickup(e.target.value);
                onChange("pickup",e.target.value);
                }
                } 
                />
            <input
                className="w-full p-2 border"
                placeholder="Drop location"
                value={drop}
                onChange={(e) => {
                    setDrop(e.target.value);
                    onChange("drop",e.target.value);
                }}
            
            />
        </div>
    );
}
export default LocationSearch;

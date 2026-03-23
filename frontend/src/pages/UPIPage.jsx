import { useEffect, useState } from "react";
import { makepayment } from "../api/payment";
import { completeRide } from "../api/rideService";

function UPIPage(){
  const [paymentdone, setPaymentDone] = useState([])

  const fetchRides = async() => {
    try {
      const complete = await completeRide();

      setPaymentDone(complete.data);
    } catch (err) {
      console.error("Failed to fetch payment:",err)
    }
  };

  useEffect(() => {
    (async() => {
      await fetchRides();
    })();
  },[]);
  const handlepayment = async(id) => {
    await makepayment(id);
    fetchRides();
  };
}

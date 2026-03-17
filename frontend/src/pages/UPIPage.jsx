import { useNavigate } from "react-router-dom";
import QrReader from "react-qr-reader";

function UPIpage() {
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      navigate("/"); // redirect to homepage
    }
  };

  return <QrReader onScan={handleScan} onError={(err) => console.error(err)} />;
}
export default UPIpage;

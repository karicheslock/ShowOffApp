import { useEffect } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {


  useEffect(() => {
    document.title = 'Dashboard - ShowOff';
}, [] );

  return (
    <div>
      <Navbar />
      Hello from Dashboard
    </div>
  )
}

export default Dashboard;
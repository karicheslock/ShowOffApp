import { useEffect } from "react";
//import { getAllCollections } from "../services/firebase-services";
import Navbar from "../components/Navbar";
import { query, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

function Dashboard() {


  useEffect(() => {
    document.title = 'Dashboard - ShowOff';
  }, [] );

  //const userCollectionsArray = getAllCollections();

  const getAllCollections = async () => {
    const q = query(collection(db, 'userCollections'));
    const result = await getDocs(q);

    result.forEach((doc) => {
      console.log(doc.id)
    })
  }

  getAllCollections();
  //console.log(userCollectionsArray)

  return (
    <div className="container">
      <Navbar />
      <div className="bg-amber-50 h-full">
        
      </div>
    </div>
  )
}

export default Dashboard;
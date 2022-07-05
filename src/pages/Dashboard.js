import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';

function Dashboard() {

  const [userCollectionsArray, setUserCollectionsArray] = useState([]);

  const myCollection = 'userCollections';
  
  useEffect(() => {
    const images = onSnapshot(collection(db, myCollection), (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id
        }
      });
      setUserCollectionsArray(documents);
    });
    return () => images();
  }, [myCollection]);

  useEffect(() => {
    document.title = 'Dashboard - ShowOff';
  }, [] );

  return (
    <div className="container">
      <Navbar />
      <div className="bg-amber-50 h-full">
          {userCollectionsArray.map((userCollection) => {
            return (
              <div key={userCollection.id}>
                <div>             
                  <p>{userCollection.title}</p>
                  <p>{userCollection.description}</p>
                </div>
                <div className="flex flex-wrap">
                  {userCollection.imageArray.slice(0,3).map((image) => (
                      <img src={image} alt="User Collection Item" className="w-1/12 h-max" />
                  ))}
                  {(userCollection.imageArray.length > 3) && <Link to='/profile/:username'>Click here to see the rest of this collection</Link>}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Dashboard;
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
      <div className="bg-amber-50 h-full flex flex-col items-center w-screen">
          {userCollectionsArray.map((userCollection) => {
            return (
              <div key={userCollection.id} className="flex flex-col border-2 border-amber-900 rounded w-2/5 m-4 py-1 items-center">
                <div className="border-4 border-double border-amber-900 w-3/4 text-center">             
                  <p className="text-3xl text-amber-900"><span className="font-blaka-hollow text-amber-400"><span className="font-blaka-hollow text-amber-400 text-5xl">T</span>ITLE: </span> <span className="font-bold">{userCollection.title}</span></p>
                  <p className="text-xl text-amber-900"><span className="font-blaka-hollow text-amber-400"><span className="font-blaka-hollow text-amber-400 text-3xl">D</span>ESCRIPTION: </span> {userCollection.description}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center">
                  {userCollection.imageArray.slice(0,3).map((image) => (
                      <img src={image} alt="User Collection Item" className="w-1/5 h-max rounded mx-2 border-2 border-amber-900 my-4 hover:w-2/5" />
                  ))}
                  {(userCollection.imageArray.length > 3) && <Link to='/profile/:username' className="text-amber-900 underline decoration-solid decoration-amber-900 hover:text-amber-400 hover:decoration-amber-400">Click here to see the rest of this collection</Link>}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Dashboard;
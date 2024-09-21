import React, { useEffect, useState } from "react";
import ReactCarousel from "./ReactCarousel";
import "../styles/Home.css";
import Products from "./Products";
import { db } from "../firebase";
import Footer from "./Footer";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const productsCollection = collection(db, "products");

    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        item: doc.data(),
      }));
      setData(productsData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ReactCarousel />
      <div>
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

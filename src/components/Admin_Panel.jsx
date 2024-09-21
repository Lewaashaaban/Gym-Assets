import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/AdminPanel.css";

const Admin_Panel = () => {
  const [proData, setProData] = useState([]);

  useEffect(() => {
    // Create a reference to the 'user_details' collection
    const userDetailsCollection = collection(db, "user_details");

    // Set up a real-time listener
    const unsubscribe = onSnapshot(userDetailsCollection, (snapshot) => {
      setProData(snapshot.docs.map((doc) => doc.data()));
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="admin_panel">
      <div className="admin_data">
        <ul>
          <li>
            <h6 className="table_head">Name</h6>
            {proData.map((item, index) => (
              <p key={index} className="table_data">
                {item.name}
              </p>
            ))}
          </li>
          <li>
            <h6 className="table_head">Email</h6>
            {proData.map((item, index) => (
              <p key={index} className="table_data">
                {item.email}
              </p>
            ))}
          </li>

          <li>
            <h6 className="table_head">Price</h6>
            {proData.map((item, index) => (
              <p key={index} className="table_data">
                {item.price}
              </p>
            ))}
          </li>
          <li>
            <h6 className="table_head">Product Details</h6>
            {proData.map((item, index) => (
              <p key={index} className="table_data">
                {item.product_name}
              </p>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Admin_Panel;

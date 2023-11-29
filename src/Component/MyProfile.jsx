import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../Firebase/FirebaseConfig";
import Navbar from "./Navbar";

const MyProfile = () => {
  const GetCurrentUser = () => {
    const [user, setUser] = useState(null); // Initialize user as null

    const userCollection = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);

    return user;
  };

  let loggedUser = GetCurrentUser();
  const firstname = loggedUser ? loggedUser[0]?.username.split(" ") : [];

  return (
    <>
      <Navbar />
      {loggedUser && loggedUser[0]?.email ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              width: "75%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="leftmy-profile" style={{ width: "35%" }}>
              <div
                style={{
                  boxShadow: "1px 1px 10px grey",
                  backgroundColor: "white",
                  height: "max-content",
                  display: "flex",
                }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG0KXv5HVFNRBzWebIOPk1efHXDUX-nbkSa4D2NJrEzQ&s"
                  alt=""
                  style={{ width: "4rem", height: "100%" }}
                />
                <div style={{ alignItems: "center" }}>
                  <p
                    style={{
                      marginTop: "0.7rem ",
                      marginBottom: "0.2rem",
                      fontSize: "14px",
                    }}
                  >
                    Hello,
                  </p>
                  <p style={{ fontWeight: "bold" }}>{loggedUser[0].username}</p>
                </div>
              </div>
            </div>
            <div
              className="rightmy-profile"
              style={{
                height: "60vh",
                backgroundColor: "white",
                width: "60%",
                borderRadius:"8px",
                boxShadow: "1px 1px 10px grey",
              }}
            >
              <p
                style={{
                  margin: "1rem",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                Personal Information
              </p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <input
                  type="text"
                  name=""
                  id=""
                  value={firstname[0]}
                  readOnly
                  style={{ padding: "10px" }}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  value={firstname[1] ? firstname[1] : ""}
                  readOnly
                />
              </div>
              <div style={{ margin: "1rem" }}>
                <p>Your Gender</p>
                <div style={{ marginTop: "1rem" }}>
                  <label htmlFor="">
                    {" "}
                    <input type="radio" /> Male
                  </label>
                  <label htmlFor="" style={{ padding: "0rem 1rem" }}>
                    {" "}
                    <input type="radio" /> Female
                  </label>
                </div>
                </div>
                <div style={{ margin: "1rem" }}>
                  <p>Email Address</p>
                  <div style={{ marginTop: "1rem" }}>
                  <input
                  type="text"
                  name=""
                  id=""
                  value={loggedUser[0].email }
                  readOnly
                  style={{ padding: "10px" }}
                />
                  </div>
                </div>
                <div style={{ margin: "1rem" }}>
                  <p>Mobile Number</p>
                  <div style={{ marginTop: "1rem" }}>
                  <input
                  type="text"
                  name=""
                  id=""
                  value={loggedUser[0].number}
                  readOnly
                  style={{ padding: "10px" }}
                />
                  </div>
                </div>
              </div>
            
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

export default MyProfile;
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase/FirebaseConfig';
import ShowCardCart from './ShowCardCart';
import Navbar from './Navbar';

const ShowCarts = () => {
    const [cardData, setCardData] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                    }
                    getUsers()
                } else {
                    setUser(null)
                }
            })
        }

        getCurrentUser();
    }, []);

    useEffect(() => {
        if (user) {
            const getCardData = async () => {
                const cartArray = [];
                const path = `cart-${user[0].uid}`;

                try {
                    const querySnapshot = await getDocs(collection(db, path));

                    querySnapshot.forEach((doc) => {
                        cartArray.push({ ...doc.data(), id: doc.id });
                    });

                    setCardData(cartArray);
                } catch (error) {
                    console.error('Error fetching card data:', error);
                }
            }

            getCardData();
        }
    }, [user]);

    return (
        <> 

        <Navbar/>
        <div style={{marginTop:"2rem"}}>
            {cardData.map((item) => {
                return (
                    <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              width: "70%",
              display: "flex",
              boxShadow:"1px 1px 16px grey",
              padding:"1rem",
              borderRadius:"7px"
              
            }}
          >
                    <ShowCardCart key={item.id} itemdata={item} />
                    </div></div>
                )
            })}
            
            </div>
        </>
    )
}

export default ShowCarts;

import React, { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext=createContext(null)
const auth=getAuth(app)


const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider=new GoogleAuthProvider()
    const createUser=(email,password)=>{
      setLoading(true)
      return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
      }
    
      const logOut=()=>{
        setLoading(true)
        return signOut(auth)
      }
   // ==================================================
// user UpdateProfile and name  Section Part Start
// ============================================================
const userDetails=(name,photoUrl)=>{
  updateProfile(auth.currentUser, {
    displayName: name, photoURL: photoUrl
  })
  .then(() => setUser((user) => (
    { ...user, displayName: name, photoURL: photoUrl })))
 .catch((error) => { console.log(error) });
}
// ==================================================
// user UpdateProfile and name  Section Part end
// ============================================================
      const googleSignIn=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
      }

      useEffect(()=>{
          const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            if(currentUser){
              axios.post("https://fanal-project-server-muntasirmamuon.vercel.app/jwt",{email:currentUser.email.toLocaleLowerCase()})
              .then(data=>{
                console.log(data.data.jwtToken);

                if(data.data){
                  localStorage.setItem('access-token',data.data.jwtToken)
                  setLoading(false)
                 
                }
              })
            }else{
              localStorage.removeItem('access-token')  
              setLoading(false)
             }
            console.log(currentUser);
          })
          return ()=>{
            return unsubscribe()
          }
      },[])

      const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        userDetails,
        googleSignIn
      };

      return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
      );
}


export default AuthProvider
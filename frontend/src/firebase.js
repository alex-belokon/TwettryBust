import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA9q2TJQJlyRRpxA5lUwpElLiNVG2gfM0w",
    authDomain: "twettrybust.firebaseapp.com",
    projectId: "twettrybust",
    storageBucket: "twettrybust.appspot.com",
    messagingSenderId: "850698197056",
    appId: "1:850698197056:web:34853b01c7a9ba05ee67a5"
};

export const app = initializeApp(firebaseConfig);
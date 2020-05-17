import React from "react";
import PlusBuddy from "./src/routes/DrawerRouter";
import AuthProvider from "./db/AuthProvider";

//Firestore is not designed for expo, this is a work around.
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
  return (
    <AuthProvider>
      <PlusBuddy />
    </AuthProvider>
  );
};

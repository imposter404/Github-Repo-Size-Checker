// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }

// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { use, useEffect, useState } from 'react';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
// //   let loaded =false;
//   const [loaded,setLoaded]=useState(false)
//   setTimeout(()=>{
//     setLoaded(true)
//   },5000)

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hide();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }
//   return <Stack />;
// }
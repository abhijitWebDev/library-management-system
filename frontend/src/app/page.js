'use client'
import { useEffect, useState } from "react";
import axios from 'axios'

export default function Home() {
  const [books,setBooks]=useState([]);


  useEffect(()=> {
    fetchData();
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h1 className="text-red-500">Welcome to library managment system</h1>
    </main>
  );
}

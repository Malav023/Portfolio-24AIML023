import { useState } from 'react'
import Head from './Header.jsx'
import About from './About.jsx'
import './App.css'

const person = {
  name: 'Student Portfolio',
  theme: {
    backgroundColor: 'black',
    color: 'pink',
    padding: '20px',
    borderRadius: '8px'
  }
};

export default function App() {
  return (
    <>
      <Head />
      <About />
    </>
  );
}
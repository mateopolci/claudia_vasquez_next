import React from 'react'
import Image from "next/image";
import Cuadro from "/public/Cuadro.jpg";

function Grid() {
  return (
    <div>
        <Image src={Cuadro} alt='Test' className="w-72 my-12"/>
        <Image src={Cuadro} alt='Test' className="w-72 my-12"/>
        <Image src={Cuadro} alt='Test' className="w-72 my-12"/>
    </div>
  )
}

export default Grid
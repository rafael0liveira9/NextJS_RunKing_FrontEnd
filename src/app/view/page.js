'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";


export default function View() {

  return (
    <main className="fullContainer">
      <Header title={"Visualizar Resultado"}></Header>
      <div className="mainContainer" style={{ width: "100%", justifyContent: "flex-start" }}>
        <div className="mainView">
          <div className="viewButtonsDiv">
            <button className="btnBlue viewBtn">Baixar CSV</button>
            <button className="btnRed viewBtn">Apagar Tudo</button>
          </div>
          <div className="viewInfoDiv">
            <ul className="viewList">
              <li className="viewListTitle"><h6>Número de peito</h6><h6>Tempo</h6></li>
              <li className="viewListItem"><h6>10001</h6><h6>00:00:00</h6></li>
              <li className="viewListItem"><h6>10002</h6><h6>00:00:00</h6></li>
              <li className="viewListItem"><h6>10003</h6><h6>00:00:00</h6></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main >
  )
}

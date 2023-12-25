'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/loading";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import Separator from "@/components/separator";


export default function Settings() {
  const router = useRouter();
  const path = usePathname()
  const [firstSelected, setFirstSelected] = useState(true)
  const [secondSelected, setSecondSelected] = useState(true)
  const [thirdSelected, setThirdSelected] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const URL_API_RUNKING = "https://api.runking.com.br/"

  function getSettings() {

    setFirstSelected(localStorage.getItem("event_raia_one") == "true" ? true : false);
    setSecondSelected(localStorage.getItem("event_raia_two") == "true" ? true : false);
    setThirdSelected(localStorage.getItem("event_raia_tree") == "true" ? true : false);
  }


  function saveSettings() {
    localStorage.setItem("event_raia_one", firstSelected);
    localStorage.setItem("event_raia_two", secondSelected);
    localStorage.setItem("event_raia_tree", thirdSelected);

    setIsLoading(true)

    setTimeout(() => {

      setIsLoading(false)
    }, 2000);


  }

  useEffect(() => {
    getSettings()
  }, [path])

  return (
    <main className="fullContainer">
      <Header title="Configurações do evento"></Header>
      <div className="mainContainer" style={{ width: "100%", justifyContent: "flex-start" }}>
        <div className="settingsContent">
          <div className="settingsRaia">
            <h4>Mostrar RAIA 1</h4>
            <div className="divRaiaSelect"
              onClick={() => setFirstSelected(!firstSelected)}
            >
              {firstSelected == true
                ?
                <button className="divButtonTrue">Mostrar</button>
                :
                <button className="divButtonFalse">Ocultar</button>
              }
            </div>
          </div>
          <Separator color={"#09263F61"} width={"100%"} height={"1px"}></Separator>
          <div className="settingsRaia">
            <h4>Mostrar RAIA 2</h4>
            <div className="divRaiaSelect"
              onClick={() => setSecondSelected(!secondSelected)}
            >
              {secondSelected == true
                ?
                <button className="divButtonTrue">Mostrar</button>
                :
                <button className="divButtonFalse">Ocultar</button>
              }
            </div>
          </div>
          <Separator color={"#09263F61"} width={"100%"} height={"1px"}></Separator>
          <div className="settingsRaia">
            <h4>Mostrar RAIA 3</h4>
            <div className="divRaiaSelect"
              onClick={() => setThirdSelected(!thirdSelected)}
            >
              {thirdSelected == true
                ?
                <button className="divButtonTrue">Mostrar</button>
                :
                <button className="divButtonFalse">Ocultar</button>
              }
            </div>
          </div>
          <Separator color={"#09263F61"} width={"100%"} height={"1px"}></Separator>
          <div className="settingSaveBtn">
            <button className="btnGreen"
              style={{ width: "120px" }}
              disabled={isLoading}
              onClick={() => saveSettings()}
            > {isLoading === true ? <Loading></Loading> : "SALVAR"}</button>
          </div>

        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main >
  )
}

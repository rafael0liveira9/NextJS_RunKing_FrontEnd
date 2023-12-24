'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import RaiaCard from "@/components/raia";


export default function EventSelect() {
  const router = useRouter();
  const path = usePathname()
  const [user, setUser] = useState({})
  const [eventSelected, setEventSelected] = useState({})
  const [events, setEvents] = useState([])

  const URL_API_RUNKING = "https://api.runking.com.br/"


  useEffect(() => {
    alreadyLogin();

    if (user.jwt != "") {
      console.log("pegando eventos");
      getEvents();
    }
  }, [path])

  function alreadyLogin() {
    const user = {
      id: localStorage.getItem("user_id") || "",
      name: localStorage.getItem("user_name") || "",
      email: localStorage.getItem("user_email") || "",
      jwt: localStorage.getItem("user_jwt") || "",
    };

    const event = {
      id: localStorage.getItem("event_id") || "",
      title: localStorage.getItem("event_title") || "",
      type: localStorage.getItem("event_type") || "",
      slug: localStorage.getItem("event_slug") || "",
      logo: localStorage.getItem("event_logo") || "",
      cep: localStorage.getItem("event_cep") || "",
      address: localStorage.getItem("event_address") || "",
      neighborhood: localStorage.getItem("event_neighborhood") || "",
      city: localStorage.getItem("event_city") || "",
      uf: localStorage.getItem("event_uf") || "",
      country: localStorage.getItem("event_country") || "",
      mainDate: localStorage.getItem("event_date") || "",
      raiaOne: localStorage.getItem("event_raia_one") || "",
      raiaTwo: localStorage.getItem("event_raia_two") || "",
      raiaTree: localStorage.getItem("event_raia_tree") || "",
    }

    setUser(user)
    setEventSelected(event)

    if (user.id == "") {
      router.push("/")
    }

  }


  async function getEvents() {
    try {

      const response = await fetch(`${URL_API_RUNKING}eventsByLogin`, {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem("user_jwt")
        }
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      setEvents(data);

    } catch (error) {
      console.error("Erro na requisição:", error.message);
    }
  }

  return (
    <main className="fullContainer">
      <Header title={eventSelected?.title || "Inicio"} user={user}></Header>
      <div className="mainContainer" style={{ width: "100%", justifyContent: "flex-start" }}>
        <div className="homeContent">
          <div className="btnDiv">
            <button className="btnGreen btnGeneral" >INICIAR</button>
            <button className="btnRed btnGeneral" >FINALIZAR</button>
          </div>
          <div className="raiaDiv">
            <RaiaCard status={eventSelected?.raiaOne == "true" ? true : false} title="RAIA 1" number={1000}></RaiaCard>
            <RaiaCard status={eventSelected?.raiaTwo == "true" ? true : false} title="RAIA 2" number={1230}></RaiaCard>
            <RaiaCard status={eventSelected?.raiaTree == "true" ? true : false} title="RAIA 3" number={1247}></RaiaCard>
          </div>
        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main>
  )
}

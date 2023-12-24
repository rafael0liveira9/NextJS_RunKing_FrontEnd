'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import RaiaCard from "@/components/raia";
import Loading from "@/components/loading";
import RaiaModal from "@/components/modal/raiamodal";


export default function EventSelect() {
  const router = useRouter();
  const path = usePathname()
  const [user, setUser] = useState({})
  const [eventSelected, setEventSelected] = useState({})
  const [events, setEvents] = useState([])
  const [isLoading, setisLoading] = useState(false)

  const [modalRaiaOne, setModalRaiaOne] = useState(false)
  const [modalRaiaTwo, setModalRaiaTwo] = useState(false)
  const [modalRaiaTree, setModalRaiaTree] = useState(false)

  const [numberRaiaOne, setNumberRaiaOne] = useState("-")
  const [numberRaiaTwo, setNumberRaiaTwo] = useState("-")
  const [numberRaiaTree, setNumberRaiaTree] = useState("-")

  const URL_API_RUNKING = "https://api.runking.com.br/"


  useEffect(() => {
    alreadyLogin();

    if (user.jwt != "") {
      console.log("pegando eventos");
      getEvents();
    }
  }, [path])

  useEffect(() => {
    if (localStorage.getItem("raia_one_number") != undefined) {
      setNumberRaiaOne(localStorage.getItem("raia_one_number"))
    } else {
      setNumberRaiaOne("-")
    }
    if (localStorage.getItem("raia_two_number") != undefined) {
      setNumberRaiaTwo(localStorage.getItem("raia_two_number"))
    } else {
      setNumberRaiaOne("-")
    }
    if (localStorage.getItem("raia_tree_number") != undefined) {
      setNumberRaiaTree(localStorage.getItem("raia_tree_number"))
    } else {
      setNumberRaiaOne("-")
    }

  }, [modalRaiaOne, modalRaiaTwo, modalRaiaTree])

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

  function openRaiaOneModal() {
    setisLoading(true);
    setModalRaiaOne(true);
  }

  function openRaiaTwoModal() {
    setModalRaiaOne(false)
    setModalRaiaTwo(true)
  }

  function openRaiaTreeModal() {
    setModalRaiaTwo(false)
    setModalRaiaTree(true)
  }

  function closeRaiaModals() {
    setModalRaiaOne(false)
    setModalRaiaTwo(false)
    setModalRaiaTree(false)
    setisLoading(false)
  }

  return (
    <main className="fullContainer">
      <Header title={eventSelected?.title || "Inicio"} user={user}></Header>

      {modalRaiaOne === true &&
        <RaiaModal
          confirm={eventSelected?.raiaTwo == "true" ? () => openRaiaTwoModal() : () => closeRaiaModals()}
          cancel={() => closeRaiaModals()}
          raia={1}
          next={eventSelected?.raiaTwo == "true" ? true : false}></RaiaModal>
      }
      {modalRaiaTwo == true &&
        <RaiaModal
          confirm={eventSelected?.raiaTree == "true" ? () => openRaiaTreeModal() : () => closeRaiaModals()}
          cancel={() => closeRaiaModals()}
          raia={2}
          next={eventSelected?.raiaTree == "true" ? true : false}></RaiaModal>
      }
      {modalRaiaTree == true &&
        <RaiaModal
          confirm={() => closeRaiaModals()}
          cancel={() => closeRaiaModals()}
          raia={3}
          next={false}></RaiaModal>
      }

      <div className="mainContainer" style={{ width: "100%", justifyContent: "flex-start" }}>
        <div className="homeContent">
          <div className="btnDiv">
            <button className="btnGreen btnGeneral"
              disabled={(eventSelected?.raiaOne == false && eventSelected?.raiaTwo == false && eventSelected?.raiaTree == false) || isLoading}
              onClick={() => openRaiaOneModal()}
            >{isLoading === true ? <Loading></Loading> : "INICIAR"}</button>
            <button className="btnRed btnGeneral"
              disabled={(eventSelected?.raiaOne == false && eventSelected?.raiaTwo == false && eventSelected?.raiaTree == false) || isLoading}
              onClick={() => console.log("bbb")}
            >{isLoading === true ? <Loading></Loading> : "FINALIZAR"}</button>
          </div>
          <div className="raiaDiv">
            {!eventSelected?.raiaOne && !eventSelected?.raiaTwo && !eventSelected?.raiaTree
              ?
              <p style={{ marginTop: "100px" }}>Nenhuma RAIA Selecionada!</p>
              :
              ""
            }
            <RaiaCard status={eventSelected?.raiaOne == "true" ? true : false} title="RAIA 1" number={numberRaiaOne}></RaiaCard>
            <RaiaCard status={eventSelected?.raiaTwo == "true" ? true : false} title="RAIA 2" number={numberRaiaTwo}></RaiaCard>
            <RaiaCard status={eventSelected?.raiaTree == "true" ? true : false} title="RAIA 3" number={numberRaiaTree}></RaiaCard>
          </div>
        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main>
  )
}

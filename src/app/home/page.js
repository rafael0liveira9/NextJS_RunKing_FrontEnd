'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import RaiaCard from "@/components/raia";
import Loading from "@/components/loading";
import RaiaModal from "@/components/modal/raiamodal";
import ConfirmModal from "@/components/modal/confirmation";


export default function EventSelect() {
  const router = useRouter();
  const path = usePathname()
  const [user, setUser] = useState({})
  const [eventSelected, setEventSelected] = useState({})
  const [isLoadingIni, setisLoadingIni] = useState(false)
  const [isLoadingFin, setisLoadingFin] = useState(false)
  const [isRunning, setIsRunning] = useState(false);

  const [modalRaiaOne, setModalRaiaOne] = useState(false)
  const [modalRaiaTwo, setModalRaiaTwo] = useState(false)
  const [modalRaiaTree, setModalRaiaTree] = useState(false)
  const [modalConfirm, setModalConfirm] = useState(false)

  const [raiaOne, setRaiaOne] = useState()
  const [raiaTwo, setRaiaTwo] = useState()
  const [raiaTree, setRaiaTree] = useState()

  const [numberRaiaOne, setNumberRaiaOne] = useState("-")
  const [numberRaiaTwo, setNumberRaiaTwo] = useState("-")
  const [numberRaiaTree, setNumberRaiaTree] = useState("-")

  const [timeRaiaOne, setTimeRaiaOne] = useState("-")
  const [timeRaiaTwo, setTimeRaiaTwo] = useState("-")
  const [timeRaiaTree, setTimeRaiaTree] = useState("-")

  const URL_API_RUNKING = "https://api.runking.com.br/"


  useEffect(() => {
    alreadyLogin();
  }, [path])

  useEffect(() => {

    if (localStorage.getItem("raia_one_number") != undefined) {

      setNumberRaiaOne(localStorage.getItem("raia_one_number"))
      setTimeRaiaOne(formatTime(localStorage.getItem("raia_one_time")))
    } else {
      console.log("erro 1")
      setNumberRaiaOne("-")
      setTimeRaiaOne("-")
    }
    if (localStorage.getItem("raia_two_number") != undefined) {

      setNumberRaiaTwo(localStorage.getItem("raia_two_number"))
      setTimeRaiaTwo(formatTime(localStorage.getItem("raia_two_time")))
    } else {
      console.log("erro 2")
      setNumberRaiaTwo("-")
      setTimeRaiaTwo("-")
    }
    if (localStorage.getItem("raia_tree_number") != undefined) {

      setNumberRaiaTree(localStorage.getItem("raia_tree_number"))
      setTimeRaiaTree(formatTime(localStorage.getItem("raia_tree_time")))
    } else {
      console.log("erro 3")
      setNumberRaiaTree("-")
      setTimeRaiaTree("-")
    }

  }, [modalRaiaOne, modalRaiaTwo, modalRaiaTree, path])

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

    setRaiaOne(localStorage.getItem("event_raia_one"))
    setRaiaTwo(localStorage.getItem("event_raia_two"))
    setRaiaTree(localStorage.getItem("event_raia_tree"))

  }

  const eventStart = async () => {
    setModalRaiaOne(false)
    setModalRaiaTwo(false)
    setModalRaiaTree(false)
    setisLoadingFin(false)
    setisLoadingIni(true)

    localStorage.setItem(`raia_one_time`, 0)
    localStorage.setItem(`raia_two_time`, 0)
    localStorage.setItem(`raia_tree_time`, 0)
    setTimeRaiaOne(0)
    setTimeRaiaTwo(0)
    setTimeRaiaTree(0)

    if (raiaOne != "true") {
      localStorage.setItem("raia_one_number", "-")
      setNumberRaiaOne("-")
    }
    if (raiaTwo != "true") {
      localStorage.setItem("raia_two_number", "-")
      setNumberRaiaTwo("-")
    }
    if (raiaTree != "true") {
      localStorage.setItem("raia_tree_number", "-")
      setNumberRaiaTree("-")
    }

    setIsRunning(true);

  };

  const eventStop = () => {
    setIsRunning(false);
    setisLoadingIni(false)

    router.push("/view")
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    return formattedTime;
  };

  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  useEffect(() => {
    let interval;

    const fetchTimes = async () => {

      if (raiaOne == 'true') {
        let seconds = parseInt(localStorage.getItem(`raia_one_time`), 10) || 0;
        seconds += 1;

        const formattedTime = formatTime(seconds);

        localStorage.setItem(`raia_one_time`, seconds);
        setTimeRaiaOne(formattedTime)
      }

      if (raiaTwo == 'true') {
        let seconds = parseInt(localStorage.getItem(`raia_two_time`), 10) || 0;
        seconds += 1;

        const formattedTime = formatTime(seconds);

        localStorage.setItem(`raia_two_time`, seconds);
        setTimeRaiaTwo(formattedTime)
      }

      if (raiaTree == 'true') {
        let seconds = parseInt(localStorage.getItem(`raia_tree_time`), 10) || 0;
        seconds += 1;

        const formattedTime = formatTime(seconds);

        localStorage.setItem(`raia_tree_time`, seconds);
        setTimeRaiaTree(formattedTime)
      }
    };

    if (isRunning) {
      interval = setInterval(fetchTimes, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);



  function openRaiaOneModal() {
    modalConfirm === true ? setModalConfirm(false) : ""
    setModalRaiaOne(true);
  }

  function openRaiaTwoModal() {
    modalRaiaOne === true ? setModalRaiaOne(false) : ""
    setModalRaiaTwo(true)
  }

  function openRaiaTreeModal() {
    modalRaiaTwo === true ? setModalRaiaTwo(false) : ""
    setModalRaiaTree(true)
  }

  function closeRaiaModals() {
    modalRaiaOne === true ? setModalRaiaOne(false) : ""
    modalRaiaTwo === true ? setModalRaiaTwo(false) : ""
    modalRaiaTree === true ? setModalRaiaTree(false) : ""
    isLoadingIni === true ? setisLoadingIni(false) : ""
    isLoadingFin === true ? setisLoadingFin(false) : ""
    modalConfirm === true ? setModalConfirm(false) : ""
  }

  return (
    <main className="fullContainer">
      <Header title={eventSelected?.title || "Inicio"} user={user}></Header>


      {modalConfirm === true && <ConfirmModal
        confirm={
          eventSelected?.raiaOne == "true" ?
            () => openRaiaOneModal()
            : eventSelected?.raiaTwo == "true" ?
              () => openRaiaTwoModal()
              : eventSelected?.raiaTree == "true" ?
                () => openRaiaTreeModal() :
                ""
        }
        cancel={() => setModalConfirm(false)}
        question={"apagar os dados e iniciar outra corrida"}
      ></ConfirmModal>}


      {modalRaiaOne === true &&
        <RaiaModal
          confirm={eventSelected?.raiaTwo == "true" ? () => openRaiaTwoModal() : eventSelected?.raiaTree == "true" ? () => openRaiaTreeModal() : () => eventStart()}
          cancel={() => closeRaiaModals()}
          raia={1}
          next={eventSelected?.raiaTwo == "true" ? true : false}></RaiaModal>
      }
      {modalRaiaTwo == true &&
        <RaiaModal
          confirm={eventSelected?.raiaTree == "true" ? () => openRaiaTreeModal() : () => eventStart()}
          cancel={() => closeRaiaModals()}
          raia={2}
          next={eventSelected?.raiaTree == "true" ? true : false}></RaiaModal>
      }
      {modalRaiaTree == true &&
        <RaiaModal
          confirm={() => eventStart()}
          cancel={() => closeRaiaModals()}
          raia={3}
          next={false}></RaiaModal>
      }

      <div className="mainContainer" style={{ width: "100%", justifyContent: "flex-start" }}>
        <div className="homeContent">
          <div className="btnDiv">

            <button
              className={isLoadingIni === true
                ? "btnDisabled btnGeneral"
                : "btnGreen btnGeneral"
              }
              disabled={(eventSelected?.raiaOne == false && eventSelected?.raiaTwo == false && eventSelected?.raiaTree == false) || isLoadingIni === true}
              onClick={numberRaiaOne != "-" || numberRaiaTwo != "-" || numberRaiaTree != "-"
                ? () => setModalConfirm(true)
                :
                eventSelected?.raiaOne == "true" ?
                  () => openRaiaOneModal()
                  : eventSelected?.raiaTwo == "true" ?
                    () => openRaiaTwoModal()
                    : eventSelected?.raiaTree == "true" ?
                      () => openRaiaTreeModal() :
                      ""
              }

            >{isLoadingIni === true
              ? <><img src="/icons/play-circle-grey.svg"></img><p style={{ fontWeight: "bold" }}>INICIAR</p></>
              : <><img src="/icons/play-circle-black.svg"></img><p style={{ fontWeight: "bold" }}>INICIAR</p></>}
            </button>

            <button
              className={isLoadingIni === false
                ? "btnDisabled btnGeneral"
                : "btnRed btnGeneral"
              }
              disabled={(eventSelected?.raiaOne == false && eventSelected?.raiaTwo == false && eventSelected?.raiaTree == false) || isLoadingIni === false}
              onClick={() => eventStop()}
            >{isLoadingIni === false
              ? <><img src="/icons/stop-circle-grey.svg"></img><p style={{ fontWeight: "bold" }}>FINALIZAR</p></>
              : <><img src="/icons/stop-circle-white.svg"></img><p style={{ fontWeight: "bold" }}>FINALIZAR</p></>}
            </button>

          </div>
          <div className="raiaDiv">
            {eventSelected?.raiaOne != "true" && eventSelected?.raiaTwo != "true" && eventSelected?.raiaTree != "true" ?
              <p style={{ margin: "100px" }}>Nenhuma Raia Selecionada</p>
              : ""}
            <RaiaCard status={eventSelected?.raiaOne == "true" ? true : false} title="RAIA 1" number={numberRaiaOne} time={timeRaiaOne}></RaiaCard>
            <RaiaCard status={eventSelected?.raiaTwo == "true" ? true : false} title="RAIA 2" number={numberRaiaTwo} time={timeRaiaTwo}></RaiaCard>
            <RaiaCard status={eventSelected?.raiaTree == "true" ? true : false} title="RAIA 3" number={numberRaiaTree} time={timeRaiaTree}></RaiaCard>
          </div>
        </div>
      </div>
      <FloatMenu></FloatMenu>
      <Footer></Footer>
    </main>
  )
}

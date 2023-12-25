'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatMenu from "@/components/floatMenu";
import ConfirmModal from "@/components/modal/confirmation";


export default function View() {

  const path = usePathname();

  const [deleteModal, setDeleteModal] = useState(false)

  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")

  const [raiaOne, setRaiaOne] = useState()
  const [raiaTwo, setRaiaTwo] = useState()
  const [raiaTree, setRaiaTree] = useState()

  const [numberRaiaOne, setNumberRaiaOne] = useState("-")
  const [numberRaiaTwo, setNumberRaiaTwo] = useState("-")
  const [numberRaiaTree, setNumberRaiaTree] = useState("-")

  const [timeRaiaOne, setTimeRaiaOne] = useState("-")
  const [timeRaiaTwo, setTimeRaiaTwo] = useState("-")
  const [timeRaiaTree, setTimeRaiaTree] = useState("-")


  function getData() {
    const event = {
      title: localStorage.getItem("event_title") || "",
      type: localStorage.getItem("event_type") || "",
      city: localStorage.getItem("event_city") || "",
      uf: localStorage.getItem("event_uf") || "",
      mainDate: localStorage.getItem("event_date") || "",
    }

    setEventName(event?.title)
    setEventDate(event?.mainDate)
    setRaiaOne(localStorage.getItem("event_raia_one"))
    setRaiaTwo(localStorage.getItem("event_raia_two"))
    setRaiaTree(localStorage.getItem("event_raia_tree"))
    setNumberRaiaOne(localStorage.getItem("raia_one_number"))
    setTimeRaiaOne(formatTime(localStorage.getItem("raia_one_time")))
    setNumberRaiaTwo(localStorage.getItem("raia_two_number"))
    setTimeRaiaTwo(formatTime(localStorage.getItem("raia_two_time")))
    setNumberRaiaTree(localStorage.getItem("raia_tree_number"))
    setTimeRaiaTree(formatTime(localStorage.getItem("raia_tree_time")))
  }

  function deleteData() {

    localStorage.setItem("raia_one_number", "-")
    localStorage.setItem("raia_two_number", "-")
    localStorage.setItem("raia_tree_number", "-")
    localStorage.setItem("raia_one_time", 0)
    localStorage.setItem("raia_two_time", 0)
    localStorage.setItem("raia_tree_time", 0)

    setRaiaOne()
    setRaiaTwo()
    setRaiaTree()

    setNumberRaiaOne("-")
    setNumberRaiaTwo("-")
    setNumberRaiaTree("-")

    setTimeRaiaOne(0)
    setTimeRaiaTwo(0)
    setTimeRaiaTree(0)

    setDeleteModal(false)
  }

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
    getData();
  }, [path])

  return (
    <main className="fullContainer">
      <Header title={"Visualizar Resultado"}></Header>
      {deleteModal == true && <ConfirmModal confirm={() => deleteData()} cancel={() => setDeleteModal(false)} question={"Apagar os Dados"}></ConfirmModal>}
      <div className="mainContainer" style={{ width: "100%", justifyContent: "flex-start" }}>
        <div className="mainView">
          <div className="viewButtonsDiv">
            <button className="btnBlue viewBtn">Baixar CSV</button>
            <button
              onClick={() => setDeleteModal(true)}
              className="btnRed viewBtn">Apagar Tudo</button>
          </div>
          <div className="viewInfoDiv">
            <ul className="viewList">
              <li className="viewListTitle"><h6>Raia</h6><h6>Número de peito</h6><h6>Tempo</h6></li>
              {raiaOne == "true" && <li className="viewListItem"><h6>1</h6><h6>{numberRaiaOne}</h6><h6>{timeRaiaOne}</h6></li>}
              {raiaTwo == "true" && <li className="viewListItem"><h6>2</h6><h6>{numberRaiaTwo}</h6><h6>{timeRaiaTwo}</h6></li>}
              {raiaTree == "true" && <li className="viewListItem"><h6>3</h6><h6>{numberRaiaTree}</h6><h6>{timeRaiaTree}</h6></li>}

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

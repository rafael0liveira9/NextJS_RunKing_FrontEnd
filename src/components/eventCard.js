'use client'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from "next/navigation";


export default function EventCard({ event, y }) {
    const router = useRouter()
    const index = y || 1
    const image = event?.logo || "/images/king-crow.png"
    const title = event?.name || `Event #${index}`
    const locale = event?.city || ``
    const type = event?.eventType.replaceAll("_", " ").replaceAll("-", " ") || ``
    const date = event?.mainDate ? format(new Date(event.mainDate), 'dd/MM/yyyy', { locale: ptBR, timeZone: 'America/Sao_Paulo' }) : ``;

    function selectevent(event) {

        if (!!event?.id) {
            localStorage.setItem("event_id", event.id);
            localStorage.setItem("event_title", event.name);
            localStorage.setItem("event_type", event.eventType);
            localStorage.setItem("event_slug", event.slug);
            localStorage.setItem("event_logo", event.logo);
            localStorage.setItem("event_cep", event.cep);
            localStorage.setItem("event_address", event.address);
            localStorage.setItem("event_neighborhood", event.neighborhood);
            localStorage.setItem("event_city", event.city);
            localStorage.setItem("event_uf", event.uf);
            localStorage.setItem("event_country", event.country);
            localStorage.setItem("event_date", event.mainDate);
            localStorage.setItem("event_raia_one", true);
            localStorage.setItem("event_raia_two", true);
            localStorage.setItem("event_raia_tree", true);

            router.push("/home")
        }
    }

    return (
        <div className="cardEvent"
            onClick={() => {
                selectevent(event)
            }}
        >
            <div className="cardEventLogo">
                <img src={image}></img>
            </div>
            <div className="cardEventDesc">
                <h6>{title}</h6>
                <p><img src="/icons/marker.svg"></img>{locale}</p>
                <p><img src="/icons/calendar-lines.svg"></img>{date}</p>
                <p><span>{type}</span></p>
            </div>
        </div>
    )
}

'use client'



export default function RaiaCard({ status, title, number }) {
    if (status === true) {
        return (
            <div className="raiaCard">
                <div className="raiaTitle" style={title === "RAIA 1" ? { backgroundColor: "#bbd0ff" } : title === "RAIA 2" ? { backgroundColor: "#edffb0" } : { backgroundColor: "#c3f8eb" }}>
                    <h5>{title}</h5>
                </div>
                <div className="raiaInfo">
                    <p>Número: {number}</p>
                    <p>Tempo: 00:00:00</p>
                </div>
            </div>
        )
    } else {
        return ""
    }

}

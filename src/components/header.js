'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"

export default function Header({ title, user }) {

    const router = useRouter();
    const [modalSingOut, setModalSignOut] = useState(false)

    function singOut() {
        localStorage.clear("user_id");
        localStorage.clear("user_name");
        localStorage.clear("user_email");
        localStorage.clear("user_jwt");

        router.push("/");
    }

    return (
        <div className="greyBackground" style={{ height: "13vh" }}>
            <p style={{ color: "#FFFFFF" }}>{title}</p>
        </div>
    )
}

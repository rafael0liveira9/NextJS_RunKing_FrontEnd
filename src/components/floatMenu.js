'use client'
import { useRouter, usePathname } from "next/navigation";


export default function FloatMenu() {
    const path = usePathname()
    const router = useRouter()

    return (
        <div className="menuContainer">
            <div className={path == '/home' ? "menuItemSelected" : "menuItem"}
                onClick={() => router.push('/home')}
            >
                {path == '/home' ?
                    <h6>Evento</h6>
                    :
                    <img src="/icons/home.svg"></img>
                }
            </div>
            <div className={path == '/view' ? "menuItemSelected" : "menuItem"}
                onClick={() => router.push('/view')}
            >
                {path == '/view' ?
                    <h6>Visualizar</h6>
                    :
                    <img src="/icons/eye.svg"></img>
                }
            </div>
            <div className={path == '/settings' ? "menuItemSelected" : "menuItem"}
                onClick={() => router.push('/settings')}
            >
                {path == '/settings' ?
                    <h6>Configurações</h6>
                    :
                    <img src="/icons/process.svg"></img>
                }
            </div>
            <div className={path == '/profile' ? "menuItemSelected" : "menuItem"}
                onClick={() => router.push('/profile')}
            >
                {path == '/profile' ?
                    <h6>Perfil</h6>
                    :
                    <img src="/icons/user-white.svg"></img>
                }
            </div>
        </div>
    )
}

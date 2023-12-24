'use client'



export default function ConfirmModal({ confirm, cancel }) {

    return (
        <div class="confirm-modal">

            <p>Tem certeza que deseja Deslogar?</p>
            <div className="btnModalConfirm">
                <button className="btnRed"
                    onClick={confirm}
                >Sim</button>
                <button className="btnGreen"
                    onClick={cancel}
                >Não</button>

            </div>
        </div>

    )
}

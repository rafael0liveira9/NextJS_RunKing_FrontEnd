'use client'



export default function ConfirmModal({ confirm, cancel, question }) {

    return (
        <div class="confirm-modal">

            <p>Tem certeza que deseja {question}?</p>
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

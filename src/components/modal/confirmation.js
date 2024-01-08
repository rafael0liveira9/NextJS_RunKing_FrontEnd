'use client'



export default function ConfirmModal({ confirm, cancel, question }) {

    return (
        <form
            class="confirm-modal"
            onSubmit={(e) => { e.preventDefault(), confirm }}
        >
            <p>{question}?</p>
            <div className="btnModalConfirm">
                <button
                    autoFocus
                    className="btnRed"
                    type="submit"
                    onClick={confirm}
                >Sim</button>
                <button className="btnGreen"
                    onClick={cancel}
                >Não</button>

            </div>
        </form>

    )
}

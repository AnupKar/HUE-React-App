import styles from "./SuccessPrompt.module.css"
export const SuccessPrompt=()=>{
    return (
        <div className={styles.model_wrapper} data-testid='success'>
                <div className={styles.heading}>
                    Success
                    <div className={styles.cancel_btn} data-testid='cancel' onClick={() => {window.location.reload()}}>X</div>
                </div>
                <div className={styles.content}>
                    VM(s) Created with provided configurations successfully!
                </div>
            </div>
    )
}
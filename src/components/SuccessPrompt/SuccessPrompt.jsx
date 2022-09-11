import styles from './SuccessPrompt.module.css';
export const SuccessPrompt = ({ onClose }) => {
  return (
      <div className={styles.model_wrapper} data-testid="success">
        <div className={styles.heading}>
          Success
          <div className={styles.cancel_btn} data-testid="cancel" onClick={onClose}>
            X
          </div>
        </div>
        <div className={styles.content}>VM(s) Created with provided configurations successfully!</div>
      </div>
  );
};

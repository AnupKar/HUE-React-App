import { useState, useEffect, useContext } from 'react';
import styles from './Storage.module.css';
import { Dropdown } from '../Dropdown/Dropdown';
import { HvcContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { storageData } from './data';

const Card = ({ isBackup = false, isExt = false, card_id }) => {
  const { handleStorage } = useContext(HvcContext);
  const [IOPS, setIOPS] = useState(100);
  const [capacity, setCapacity] = useState({
    min: 0,
    max: 0,
    value: '',
  });
  const [encryption, setEncryption] = useState(true);
  const [backup, setBackup] = useState(isBackup || false);
  const [storageType, setStorageType] = useState(null);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (capacity.value < 100) {
      setIOPS(100);
    } else if (capacity.value >= 100 && capacity.value <= 500) {
      setIOPS(600);
    } else {
      setIOPS(1000);
    }
  }, [capacity.value]);

  const handleStroageSelect = (id) => {
    setStorageType(storageData[id]);

    if (capacity.value) {
      handleStorage(storageData[id], capacity, card_id, isExt, encryption, backup, IOPS, remarks);
    }

    // ID 0 means SSD
    if (id === 0) {
      setCapacity({ ...capacity, min: 20, max: 512 });
      return;
    }
    // ID 1 means Mag Disk
    if (id === 1) {
      setCapacity({ ...capacity, min: 40, max: 2048 });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p>Type</p>
        <div className={styles.type}>
          <Dropdown
            placeholder="Stroage"
            data={storageData}
            onSelect={handleStroageSelect}
            width="140px"
            height="30px"
          />
        </div>
      </div>

      <div className={styles.volume}>
        <p>Volume</p>
        <div>
          <p>{!isExt ? 'Root' : 'Ext'}</p>
        </div>
      </div>

      <div className={styles.capacity}>
        <p>Capacity (GB)</p>
        <div>
          <input
            type="text"
            value={capacity.value}
            onChange={(e) => {
              const val = e.target.value;
              if (val.trim().length) setCapacity({ ...capacity, value: parseInt(e.target.value, 10) });
              else setCapacity({...capacity, value: ''});
            }}
            disabled={capacity.min === 0 && capacity.max === 0}
            onBlur={() => {
              if (capacity.value < capacity.min || capacity.value > capacity.max) {
                alert(`Min storage is ${capacity.min}, and maximum storage is ${capacity.max}.`);
                setCapacity({ ...capacity, value: '' });
                return;
              }
              // add this to cart item
              handleStorage(storageType, capacity, card_id, isExt, encryption, backup, IOPS, remarks);
            }}
          />
        </div>
      </div>

      <div className={styles.encryption}>
        <p>Encryption</p>
        <div>
          <input type="checkbox" checked={encryption} onChange={(e) => setEncryption(e.currentTarget.checked)} />
        </div>
      </div>

      <div className={styles.iops}>
        <p>IOPS</p>
        <div>
          <p>{IOPS}</p>
        </div>
      </div>

      <div className={styles.encryption}>
        <p>Backup Required</p>
        <div>
          <input type="checkbox" checked={backup} onChange={(e) => setBackup(e.currentTarget.checked)} />
        </div>
      </div>

      <div className={styles.capacity}>
        <p>Remarks</p>
        <div>
          <input
            type="text"
            value={remarks}
            onChange={(e) => {
              const newRemark = e.target.value;
              handleStorage(storageType, capacity, card_id, isExt, encryption, backup, IOPS, newRemark);
              setRemarks(newRemark);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Storage = () => {
  const [addStorage, setStorage] = useState([]);
  const [count, setCount] = useState(1);
  const { handleNavChange } = useContext(HvcContext);
  const navigate = useNavigate();
  const handleAddStroage = () => {
    setStorage((prev) => [...prev, count]);
    setCount((prev) => prev + 1);
  };

  const removeStroage = (count) => {
    const stor = [...addStorage];
    stor.splice(count, 1);
    setStorage(stor);
  };
  const handleNext = () => {
    handleNavChange(4);
    navigate('/security');
  };
  const handleBack = () => {
    handleNavChange(2);
    navigate('/instance');
  };

  return (
    <>
      <div className={styles.card_main}>
        <Card isBackup={true} isExt={false} card_id={0} />

        {addStorage !== null &&
          addStorage.map((each, index) => {
            return (
              <div className={styles.otherStroages} key={each}>
                <Card isExt={true} card_id={each} />
                <button onClick={() => removeStroage(index)} className={styles.btn_cancel}>
                  X
                </button>
              </div>
            );
          })}
      </div>
      <button onClick={handleAddStroage} className={styles.btn_add}>
        Add
      </button>
      <div className={styles.Button_main}>
        <div className={styles.btn_back} onClick={handleBack}>
          <p>Back</p>
        </div>
        <div className={styles.btn} onClick={handleNext}>
          <p>Proceed</p>
        </div>
      </div>
    </>
  );
};

// cap < 100 - 100
// cap >= 100 && <=500 = 600
// cap >=500 1000

import { useState, useEffect } from 'react';
import styles from './Storage.module.css';
import { Dropdown } from '../Dropdown/Dropdown';

import { storageData } from './data';

const Card = ({isBackup = false}) => {
  const [IOPS, setIOPS] = useState(100);
  const [capacity, setCapacity] = useState({
    min: 0,
    max: 0,
    value: '',
  });
  const [encryption, setEncryption] = useState(true);
  const [backup, setBackup] = useState(isBackup || false);

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
    if (id === 0) {
      setCapacity({ ...capacity, min: 20, max: 512 });
      return;
    }
    if (id === 1) {
      setCapacity({ ...capacity, min: 40, max: 2048 });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p>Type</p>
        <div className={styles.type}>
          <Dropdown placeholder="Stroage" data={storageData} onSelect={handleStroageSelect} />
        </div>
      </div>

      <div className={styles.volume}>
        <p>Volume</p>
        <div>
          <p>Root</p>
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
              if (val) setCapacity({ ...capacity, value: parseInt(e.target.value, 10) });
              else setCapacity('');
            }}
            disabled={capacity.min == 0 && capacity.max == 0}
            onBlur={() => {
              if (capacity.value < capacity.min || capacity.value > capacity.max) {
                alert(`Min storage is ${capacity.min}, and maximum storage is ${capacity.max}.`);
                setCapacity({ ...capacity, value: '' });
              }
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
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export const Storage = () => {
  const [addStorage, setStorage] = useState([]);
  const [count, setCount] = useState(0);

  const handleAddStroage = () => {
    setStorage((prev) => [...prev, count]);
    setCount((prev) => prev + 1);
  };

  const removeStroage = (count) => {
    const stor = [...addStorage];
    stor.splice(count, 1);
    setStorage(stor);
  };

  return (
    <div>
      <Card isBackup={true} />

      {addStorage !== null &&
        addStorage.map((each, index) => {
          return (
            <div className={styles.otherStroages} key={each}>
              <Card />
              <button onClick={() => removeStroage(index)}>Cancel</button>
            </div>
          );
        })}

      <button onClick={handleAddStroage}>Add</button>
    </div>
  );
};

// cap < 100 - 100
// cap >= 100 && <=500 = 600
// cap >=500 1000

import { useState, useContext } from 'react';
import { HvcContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import styles from './Instance.module.css';
import { dropdownList } from './dropdownData';
import { Dropdown } from '../Dropdown/Dropdown';

export const Instance = () => {
  const [selectionId, setSelectionId] = useState(null);
  const { handleSetInstance, handleNavChange } = useContext(HvcContext);
  const navigate=useNavigate()
  const instanceSelection = (index) => {
    setSelectionId(index);
  };

  const handleChooseCPU = (cpuId) => {
    handleSetInstance(dropdownList[selectionId].cpu[cpuId], 'cpu');
  };

  const handleChooseMemory = (memoryId) => {
    handleSetInstance(dropdownList[selectionId].memory[memoryId], 'memory');
  };

  const handleNext = () => {
    handleNavChange(3);
    navigate('/storage');
  }

  return (
    <div className={styles.main}>
      <div className={styles.Instance_type}>
        {dropdownList.map((option, index) => {
          return (
            <div
              key={option.id}
              onClick={() => instanceSelection(index)}
              className={index === selectionId ? styles.instance_selected : styles.not_selected}
            >
              <p>
                {option.id}. {option.name}
              </p>
            </div>
          );
        })}
      </div>

      {selectionId !== null && (
        <>
          <div>
            <p className={styles.text_style}>{dropdownList[selectionId].name}</p>
          </div>
          <div className={`${styles.Instance_type} ${styles.instance_dropdown}`}>
            <Dropdown placeholder="Cpu Cores" data={dropdownList[selectionId].cpu} onSelect={handleChooseCPU} />
            <Dropdown placeholder="Memory" data={dropdownList[selectionId].memory} onSelect={handleChooseMemory} />
          </div>
          <div className={styles.Button_main}>
            <div className={styles.btn_back}>
              <p>Back</p>
            </div>
            <div className={styles.btn} onClick={handleNext}>
              <p>Proceed</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

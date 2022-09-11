import { useState, useContext } from 'react';
import { HvcContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import styles from './Instance.module.css';
import { dropdownList } from './dropdownData';
import { Dropdown } from '../Dropdown/Dropdown';

export const Instance = () => {
  const [selectionId, setSelectionId] = useState(null);
  const { handleSetInstance, handleNavChange, setInstance } = useContext(HvcContext);
  const [currentinstance, setCurrentInstance] = useState([]);
  const navigate = useNavigate();

  const instanceSelection = (index) => {
    setInstance(dropdownList[index].name);
    setSelectionId(index);
  };

  const handleChoose = (data, type) => {
    const item = currentinstance.filter((each) => each.name.toLowerCase() === type.toLowerCase());

    if (item.length > 0) {
      const dataIndx = currentinstance.findIndex((each) => each.id === item[0].id);
      const newData = [...currentinstance]; 
      if (dataIndx > -1) {
        newData.splice(dataIndx, 1);
        newData.push({
          type: 'instance',
          id: data.id,
          name: type === 'cpu' ? 'Cpu' : 'Memory',
          bit: {
            name: data.name,
            price: data.price,
          },
        });
        setCurrentInstance(newData);
      }
    } else {
      const newData = {
        type: 'instance',
        id: data.id,
        name: type === 'cpu' ? 'Cpu' : 'Memory',
        bit: {
          name: data.name,
          price: data.price,
        },
      };
      setCurrentInstance((prev) => [...prev, newData]);
    }
  };

  const handleNext = () => {
    if(!currentinstance.length) {
      alert("please select proper instance !!");
      return;
    }
    handleSetInstance(currentinstance);
    handleNavChange(3);
    navigate('/storage');
  };

  const handleBack = () => {
    handleNavChange(1);
    navigate('/card');
  };

  return (
    <div className={styles.main}>
      <div className={styles.Instance_type}>
        {dropdownList.map((option, index) => {
          return (
            <div
              data-testid="instance-element"
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
      <div className={styles.Instance_card}>
        {selectionId !== null  && (
          <>
            <div>
              <p className={styles.text_style}>{dropdownList[selectionId].name}</p>
            </div>
            <div className={`${styles.Instance_type} ${styles.instance_dropdown}`}>
              <Dropdown
                placeholder="Cpu Cores"
                data={dropdownList[selectionId].cpu}
                onSelect={(index) => handleChoose(dropdownList[selectionId].cpu[index], 'cpu')}
                width="140px"
                height="35px"
              />
              <Dropdown
                placeholder="Memory"
                data={dropdownList[selectionId].memory}
                onSelect={(index) => handleChoose(dropdownList[selectionId].memory[index], 'memory')}
                width="140px"
                height="35px"
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.Button_main}>
        <div className={styles.btn_back} onClick={handleBack}>
          <p>Back</p>
        </div>
        <div className={styles.btn} onClick={handleNext}>
          <p>Proceed</p>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';

import { Dropdown } from '../Dropdown/Dropdown';
import { selectOperation, securityData, networksType } from './data';

import styles from './Security.module.css';

const Card = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <p>Type</p>
        <div className={styles.type}>
          <Dropdown
            width="140px"
            height="30px"
            data={data}
            onSelect={() => {}}
            placeholder="Type"
            isDefault={data.type}
          />
        </div>
      </div>
      <div className={styles.capacity}>
        <p>Protocol</p>
        <div>
          <input type="text" value={data.protocol} disabled/>
        </div>
      </div>
      <div className={styles.capacity}>
        <p>Port Range</p>
        <div>
          <input type="text" value={data.port} disabled/>
        </div>
      </div>
      <div className={styles.capacity}>
        <p>Source</p>
        <div>
          <input type="text" value={data.source} disabled/>
        </div>
      </div>
      <div className={styles.capacity}>
        <p>Description</p>
        <div>
          <p> {data.remarks}</p>
        </div>
      </div>
    </div>
  );
};

export const Security = () => {
  const [securityState, setSsecurityState] = useState('');
  const [exSecurities, setAddSecurity] = useState([]);

  const handleAddExistingSecurity = (index) => {
    const rule = securityData[index];
    
    const ruleExits = exSecurities.filter((each) => each.id === rule.id);
    if(ruleExits.length > 0) {
        alert(`${rule.name} already added !!`);
        return;
    } 

    setAddSecurity((prev) => [...prev, rule]);
  };

  return (
    <>
      <div className={styles.typeSelect}>
        {selectOperation.map((val, index) => {
          return (
            <div key={val.id}>
              <input type="radio" value={val.value} name="securitySelect" onChange={(_) => setSsecurityState(index)} />
              <label>{val.value}</label>
            </div>
          );
        })}
      </div>

      {securityState === 0 && <p className={styles.text_style}>New Security Group</p>}
      {securityState === 1 && <p className={styles.text_style}>Select Exiting SecurityGroup</p>}

      <div className={styles.dropdown}>
        {securityState === 0 && (
          <input type="text" placeholder={selectOperation[securityState].value} className={styles.type_field} />
        )}
        {securityState === 1 && (
          <Dropdown
            width="300px"
            height="30px"
            data={securityData}
            placeholder="Security Group"
            onSelect={handleAddExistingSecurity}
          />
        )}
      </div>

      <div className={styles.cards}>
        {exSecurities.length > 0 &&
          exSecurities.map((each) => {
            return each.rules.map((rule, index) => {
                return <Card key={index} data={rule} />
            })
          })}
      </div>

      <div className={styles.btn_container}>
        <button className={styles.btn_add}>Back</button>
        <button className={styles.btn_add}>Proceed</button>
      </div>
    </>
  );
};

import { useState, useContext, useEffect } from 'react';

import { Dropdown } from '../Dropdown/Dropdown';
import { selectOperation, securityData, networksType } from './data';
import { HvcContext } from '../../context';
import { useNavigate } from 'react-router-dom';

import styles from './Security.module.css';

export const Card = ({ data, isDefault = true, id = null, isShow = false }) => {
  const { addSecurity } = useContext(HvcContext);
  const [state, setState] = useState({
    type: '',
    protocol: '',
    port: '',
    source: '',
    remarks: '',
  });

  const handleChooseType = (index) => {
    if (isDefault) return;
    setState((prev) => ({ ...prev, port: data[index].port, protocol: data[index].protocol, type: data[index].name }));
  };

  useEffect(() => {
    const security = {
      id,
      type: isDefault ? data.type : state.type,
      protocol: isDefault ? data.protocol : state.protocol,
      port: isDefault ? data.port : state.port,
      source: isDefault ? data.source : state.source,
      remarks: isDefault ? data.remarks : state.remarks,
    };
    if (!isShow) addSecurity(security);
  }, [data, state, id, isDefault]);

  return (
    <div className={styles.wrapper}>
      <div>
        <p>Type</p>
        <div className={styles.type}>
          <Dropdown
            width="140px"
            height="30px"
            data={data}
            onSelect={handleChooseType}
            placeholder="Type"
            isDefault={data?.type}
          />
        </div>
      </div>
      <div className={styles.capacity}>
        <p>Protocol</p>
        <div>
          <input type="text" value={isDefault ? data?.protocol : state.protocol} disabled />
        </div>
      </div>
      <div className={styles.capacity}>
        <p>Port Range</p>
        <div>
          <input type="text" value={isDefault ? data?.port : state.port} disabled />
        </div>
      </div>
      <div className={styles.capacity}>
        <p>Source</p>
        <div>
          <input
            type="text"
            value={isDefault ? data?.source : state.source}
            onChange={(e) => setState({ ...state, source: e.target.value })}
            disabled={isDefault}
          />
        </div>
      </div>
      <div className={styles?.capacity}>
        <p>Description</p>
        <div>
          {isDefault ? (
            <p> {data?.remarks}</p>
          ) : (
            <input value={state.remarks} onChange={(e) => setState({ ...state, remarks: e.target.value })} />
          )}
        </div>
      </div>
    </div>
  );
};

export const Security = () => {
  const [securityState, setSsecurityState] = useState('');
  const [exSecurities, setAddSecurity] = useState([]);
  const [newSecurities, setNewSecurities] = useState([]);
  const [count, setCount] = useState(1);
  const { resetSecurity } = useContext(HvcContext);
  const navigate = useNavigate();

  const handleAddExistingSecurity = (index) => {
    const rule = securityData[index];

    const ruleExits = exSecurities.filter((each) => each.id === rule.id);
    if (ruleExits.length > 0) {
      alert(`${rule.name} already added !!`);
      return;
    }

    setAddSecurity((prev) => [...prev, rule]);
  };

  const handleAddNewSecurities = () => {
    setNewSecurities((prev) => [...prev, count]);
    setCount((count) => count + 1);
  };

  return (
    <>
      <div className={styles.wrapper_main}>
        <div className={styles.typeSelect}>
          {selectOperation.map((val, index) => {
            return (
              <div key={val.id}>
                <input
                  type="radio"
                  value={val.value}
                  name="securitySelect"
                  onChange={(_) => {
                    resetSecurity();
                    setSsecurityState(index);
                  }}
                />
                <label>{val.value}</label>
              </div>
            );
          })}
        </div>

        {securityState === 0 && <p className={styles.text_style}>New Security Group</p>}
        {securityState === 1 && <p className={styles.text_style}>Select Exiting SecurityGroup</p>}

        <div className={styles.dropdown}>
          {securityState === 0 && (
            <>
              <input type="text" placeholder={selectOperation[securityState].value} className={styles.type_field} />
              <Card data={networksType} isDefault={false} id={0} />

              {newSecurities.length
                ? newSecurities.map((each) => {
                    return <Card key={each} data={networksType} isDefault={false} id={count} />;
                  })
                : null}

              <button onClick={handleAddNewSecurities} className={styles.btn_addRule}>Add Rule</button>
            </>
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

        {securityState === 1 && (
          <div className={styles.cards}>
            {exSecurities.length > 0 &&
              exSecurities.map((each) => {
                return each.rules.map((rule, index) => {
                  return <Card key={index} data={rule} id={rule.id} />;
                });
              })}
          </div>
        )}

      </div>
      <div className={styles.btn_container}>
        <button className={styles.btn_back} onClick={() => navigate('/storage')}>Back</button>
        <button className={styles.btn_add} style={{background: "#007EFF",border: "2px solid #007EFF"}} onClick={() => navigate('/review')}>
          Proceed
        </button>
      </div>
    </>
  );
};

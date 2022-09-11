import styles from '../Storage/Storage.module.css';

import { Dropdown } from '../Dropdown/Dropdown';

export const StorageCard = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <p>Type</p>
        <div className={styles.type}>
          <Dropdown
            placeholder="Stroage"
            data={[]}
            onSelect={() => {}}
            width="140px"
            height="30px"
            isDefault={data.name}
          />
        </div>
      </div>

      <div className={styles.volume}>
        <p>Volume</p>
        <div>
          <p>{!data.isExt ? 'Root' : 'Ext'}</p>
        </div>
      </div>

      <div className={styles.capacity}>
        <p>Capacity (GB)</p>
        <div>
          <p> {data.bit.name.split(' ')[0]} </p>
        </div>
      </div>

      <div className={styles.encryption}>
        <p>Encryption</p>
        <div>
          <input type="checkbox" checked={data.encryption} onChange={() => {}} />
        </div>
      </div>

      <div className={styles.iops}>
        <p>IOPS</p>
        <div>
          <p>{data.IOPS}</p>
        </div>
      </div>

      <div className={styles.encryption}>
        <p>Backup Required</p>
        <div>
          <input type="checkbox" checked={data.backup} onChange={() => {}} />
        </div>
      </div>

      <div className={styles.capacity}>
        <p>Remarks</p>
        <div>
          <input type="text" value={data.remarks} onChange={() => {}}  disabled/>
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useEffect } from 'react';
import { HvcContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { StorageCard } from './StroageCard';
import { Card as SecurityCard } from '../Security/Security';
import styles from '../Content/Card.module.css';
import style from './Review.module.css';
import { SuccessPrompt } from '../SuccessPrompt/SuccessPrompt';
import { useState } from 'react';
export const Review = () => {
  const [success,setSuccess]=useState(false)
  const { images, instenceType, securities, handleNavChange } = useContext(HvcContext);
  const navigate = useNavigate();

  console.log("image", images);

  const IMAGE = images[0];

  useEffect(() => {
    if (!images.length) {
      handleNavChange(1);
      navigate('/card');
    }
  }, [images]);

  if (!images.length) {
    return null;
  }
  const generateJSON = () => {
    let obj = {
      image: IMAGE,
      'instance type': instenceType,
      'cpu type': images[1].bit.name,
      'cpu price': images[1].bit.price,
      'memory capacity': images[2].name,
      'memory price': images[2].bit.price,
      security: securities,
    };
    console.log('IMAGE', obj);
    const fileName = 'HVC_VM_config';
    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    // create "a" HTLM element with href to file
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();
    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };
  return (
    <>
      {success && <SuccessPrompt/>}
       
        <div style={{pointerEvents: success ? 'none':'auto',opacity: success ? 0.2:1}}>
          <div className={style.review_main_container}>
            <button onClick={generateJSON} className={style.generate_btn}>
              Generate JSON
            </button>
            <div style={{ width: '95%' }}>
              <div className={style.heading}>
                <p className={style.Image_heading}>Image</p>
                <span className={style.edit_span}>EDIT</span>
              </div>
              <div>
                <div className={styles.card}>
                  <div className={styles.leftSide}>
                    {/* image */}
                    <div className={styles.image} />

                    {/* title and description */}
                    <div className={styles.details}>
                      <p>{IMAGE.name}</p>
                      <p>{IMAGE.description}</p>
                    </div>
                  </div>
                  <div className={styles.selection}>
                    <p>{IMAGE.bit.name}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className={style.Image_heading}>Instance</p>
              </div>
              <div>
                <div className={style.card}>
                  <div className={styles.leftSide}>
                    {/* image */}

                    {/* title and description */}
                    <div className={styles.details}>
                      <p>{instenceType}</p>
                      <p>
                        {images[1].name} - {images[1].bit.name}
                      </p>
                      <p>
                        {images[2].name} - {images[2].bit.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p className={style.Image_heading}>Storage</p>
              </div>
              <div>
                {images.slice(3).map((each) => {
                  return <StorageCard key={each.id} data={each} />;
                })}
              </div>
            </div>
            <div>
              <div>
                <p className={style.Image_heading}>Security Groups</p>
              </div>
              <div>
                {securities.map((each) => {
                  return <SecurityCard key={each.id} data={each} isDefault={true} id={each.id} isShow={true} />;
                })}
              </div>
            </div>
          </div>
          <div className={style.Button_main}>
            <div className={style.btn_cancel}>
              <p>Cancel</p>
            </div>
            <div className={style.btn_back}>
              <p>Back</p>
            </div>
            <div className={style.btn} onClick={()=>setSuccess(true)}>
              <p>Launch</p>
            </div>
          </div>
        </div>
      
      
    </>
  );
};

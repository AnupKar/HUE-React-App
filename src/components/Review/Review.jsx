import React, { useContext, useEffect } from 'react';
import { HvcContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { StorageCard } from './StroageCard';
import { Card as SecurityCard } from '../Security/Security';

export const Review = () => {
  const { images, instenceType, securities, handleNavChange } = useContext(HvcContext);
  const navigate = useNavigate();

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

  console.log('securities', securities);

  return (
    <div>
      <div>
        <div>
          <h3> IMAGE </h3> <p>Edit</p>{' '}
        </div>
        <div>
          <h4>{IMAGE.name}</h4>
          <p>{IMAGE.description}</p>
          <p>{IMAGE.bit.name}</p>
        </div>
      </div>
      <div>
        <div>
          <h3> Instance </h3> <p>Edit</p>{' '}
        </div>
        <div>
          {instenceType}
          {images[1].name} - {images[1].bit.name}
          {images[2].name} - {images[2].bit.name}
        </div>
      </div>
      <div>
        <div>
          <h3> Storage </h3> <p>Edit</p>{' '}
        </div>
        <div>
          {images.slice(3).map((each) => {
            return <StorageCard key={each.id} data={each} />;
          })}
        </div>
      </div>
      <div>
        <div>
          <h3> Security Groups </h3> <p>Edit</p>{' '}
        </div>
        <div>
          {securities.map((each) => {
            return <SecurityCard key={each.id} data={each} isDefault={true} id={each.id} isShow={true} />;
          })}
        </div>
      </div>
    </div>
  );
};

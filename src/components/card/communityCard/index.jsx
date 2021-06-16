import React from 'react';
import Button from '../../button';
import * as styles from './index.module.less';

const CommunityCard = ({
  icon,
  title,
  desc,
  link = "",
  label = "",
  className = ""
}) => {
  return (
    <div className={`${styles.communityCard} ${className}`}>
      <img src={icon} alt="icon" className={styles.img} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>

      {
        link ? (
          <Button
            className={styles.button}
            link={link}
            isExternal={true}
            variant="text"
            children={
              <>
                <span>{label}</span>
                <i class="fas fa-arrow-right"></i>
              </>
            } />
        ) : null
      }
    </div>
  );

};

export default CommunityCard;
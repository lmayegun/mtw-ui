import React from 'react';

const CardImg = ({imgData}) => {
  const {imgUrl, profileImg, altDescr} = imgData;
  return (
    <>
      <div className={'wrap'}>
        <img src={imgUrl} alt={altDescr} className={'card_img'}/>
        <img src={profileImg} alt={altDescr} className={'profile_img'}/>
      </div>
    </>
  );
}

export default CardImg;

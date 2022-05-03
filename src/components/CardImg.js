import React, {useState} from 'react';
import { Lightbox } from "react-modal-image";

const CardImg = ({imgData}) => {
  const [toggleModal, setToggleModal] = useState(false);
  const {imgUrl, profileImg, altDescr} = imgData;
  return (
    <>
      <div className={'wrap'} onClick={()=>{setToggleModal(true)}}>
        <img src={imgUrl} alt={altDescr} className={'card_img'}/>
        <img src={profileImg} alt={altDescr} className={'profile_img'}/>
      </div>

      {toggleModal && (
        <Lightbox
          medium={imgUrl}
          large={imgUrl}
          onClose={(prev)=>{
            setToggleModal(false)
          }}
        />
        )
      }

    </>
  );
}

export default CardImg;

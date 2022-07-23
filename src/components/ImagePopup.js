import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_picture ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-picture-box">
        <button 
        type="button" 
        className="action-button popup__close-button popup-picture-box__button"
        aria-label="Close button"
        onClick={props.onClose}></button>
        <img 
        src={props.card.link} 
        alt="" 
        className="popup-picture-box__image" />
        <p className="popup-picture-box__caption">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
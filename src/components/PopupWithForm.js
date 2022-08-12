import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__box">
        <button 
        type="button" 
        className="action-button popup__close-button"
        aria-label="Close"
        onClick={props.onClose}></button>

        <form 
        action="#" 
        className={`form form_type_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
        noValidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}

          <button 
          type="submit" 
          className="form__submit-button">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;


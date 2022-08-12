import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen,onClose,onAddPlaceSubmit}) {
  const cardNameRef = React.createRef('');
  const cardLinkRef = React.createRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value
    });

    cardNameRef.current.value = '';
    cardLinkRef.current.value = '';
  }

  return (
    <PopupWithForm
    name='add-card'
    title='New place'
    buttonText='Create'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input 
      name="name"
      type="text"
      minLength="1"
      maxLength="30"
      className="form__input form__input_type_title form__input_position_first"
      id="add-form-title-input"
      placeholder="Title"
      ref={cardNameRef} 
      required/>
      <span className="form__error add-form-title-input-error" />

      <input 
      name="link"
      type="url" 
      className="form__input form__input_type_link form__input_position_next"
      id="add-form-link-input"
      placeholder="Image link"
      ref={cardLinkRef}
      required />
      <span className="form__error add-form-link-input-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
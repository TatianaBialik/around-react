import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarInput = React.createRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });

    avatarInput.current.value = '';
  }

  return (
    <PopupWithForm
    name='edit-avatar'
    title='Change profile picture'
    buttonText='Save'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>

      <input 
      name="avatar"
      type="url" 
      className="form__input form__input_type_link form__input_position_first"
      id="edit-avatar-form-link-input"
      placeholder="Profile photo link"
      ref={avatarInput}
      required />
      <span className="form__error edit-avatar-form-link-input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
    name='edit-profile'
    title='Edit profile'
    buttonText='Save'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>

      <input 
      name="name"
      type="text"
      minLength="2"
      maxLength="40"
      className="form__input form__input_type_name form__input_position_first"
      id="edit-form-name-input"
      placeholder="Enter your name"
      onChange={handleChangeName}
      defaultValue={currentUser.name}
      required />
      <span className="form__error edit-form-name-input-error" />

      <input 
      name="about"
      type="text"
      minLength="2"
      maxLength="200"
      className="form__input form__input_type_info form__input_position_next"
      id="edit-form-info-input"
      placeholder="Enter your info"
      onChange={handleChangeDescription}
      defaultValue={currentUser.about}
      required />
      <span className="form__error edit-form-info-input-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
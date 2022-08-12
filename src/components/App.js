import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect(() => {
    api.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(err => console.log(err));
  }, [])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsCardPopupOpen(true);
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setSelectedCard({});
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick} 
        onCardClick={handleCardClick} />
        <Footer />

        <PopupWithForm
        name='edit-profile'
        title='Edit profile'
        buttonText='Save'
        isOpen={isEditProfileOpen}
        onClose={closeAllPopups}>
          <input 
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          className="form__input form__input_type_name form__input_position_first"
          id="edit-form-name-input"
          placeholder="Enter your name"
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
          required />
          <span className="form__error edit-form-info-input-error" />
        </PopupWithForm>

        <PopupWithForm
        name='add-card'
        title='New place'
        buttonText='Create'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
          <input 
          name="name"
          type="text"
          minLength="1"
          maxLength="30"
          className="form__input form__input_type_title form__input_position_first"
          id="add-form-title-input"
          placeholder="Title" 
          required/>
          <span className="form__error add-form-title-input-error" />

          <input 
          name="link"
          type="url" 
          className="form__input form__input_type_link form__input_position_next"
          id="add-form-link-input"
          placeholder="Image link"
          required />
          <span className="form__error add-form-link-input-error" />
        </PopupWithForm>

        <PopupWithForm
        name='edit-avatar'
        title='Change profile picture'
        buttonText='Save'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>

          <input 
          name="avatar"
          type="url" 
          className="form__input form__input_type_link form__input_position_first"
          id="edit-avatar-form-link-input"
          placeholder="Profile photo link"
          required />
          <span className="form__error edit-avatar-form-link-input-error" />
        </PopupWithForm>

        <PopupWithForm
        name='delete-card'
        title='Are you sure?'
        buttonText='Yes'
        onClose={closeAllPopups} />

        <ImagePopup 
        card={selectedCard}
        isOpen={isCardPopupOpen}
        onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;

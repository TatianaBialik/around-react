import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState('');

  React.useEffect(() => {
    api.getUserInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(err => console.log(err));
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
    .then(res => {
      setCards(res);
    })
    .catch(err => console.log(err));
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        setCards(state => 
          state.map(currentCard => 
            currentCard._id === card._id ? newCard : currentCard))
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  const handleDeleteCardSubmission = () => {
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards(state => 
          state.filter(currentCard => 
            currentCard._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleAddPlaceSubmit = ({name,link}) => {
    api.addCard({name,link})
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

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
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  const handleUpdateUser = ({name, about}) => {
    api.editProfileInfo({name, about})
      .then(newUser => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (({avatar}) => {
    api.editProfilePhoto(avatar)
      .then(newUser => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick} 
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} />
        <Footer />

        <EditProfilePopup 
        isOpen={isEditProfileOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit} />
        <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCardSubmission={handleDeleteCardSubmission} />
        
        <ImagePopup 
        card={selectedCard}
        isOpen={isCardPopupOpen}
        onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

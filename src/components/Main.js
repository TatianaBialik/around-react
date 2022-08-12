import React from 'react';
import api from '../utils/api';
import editAvatar from '../images/edit_avatar.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

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
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => 
          state.filter(currentCard => 
            currentCard._id !== card._id))
      })
      .catch(err => console.log(err));
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar-wrapper">
            <img 
            src={currentUser.avatar}
            className="profile__avatar" 
            onClick={props.onEditAvatarClick} />
            <img 
            src={editAvatar} 
            alt="A pencil icon" 
            className="profile__edit-avatar-icon" />
          </div>
            
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
            <button 
            type="button" 
            className="action-button profile__edit-button"
            aria-label="Edit profile information button"
            onClick={props.onEditProfileClick} />
          </div>
        </div>
        <button 
        type="button" 
        className="action-button profile__add-button"
        aria-label="Add a card button"
        onClick={props.onAddPlaceClick} />
      </section>
  
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map(card => (
            <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
          ))}
        </ul>        
      </section>
    </main>
  )
}

export default Main;
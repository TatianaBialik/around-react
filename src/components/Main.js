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
            onCardClick={props.onCardClick} />
          ))}
        </ul>        
      </section>
    </main>
  )
}

export default Main;
import React from 'react';
import api from '../utils/api';
import editAvatar from '../images/edit_avatar.svg';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  // api.getUserInfo()
  //   .then(res => {
  //     setUserName(res.name);
  //     setUserDescription(res.about);
  //     setUserAvatar(res.avatar);
  //   })

  //  api.getInitialCards()
  //    .then(res => {
  //      setCards(res);
  //    })

  React.useEffect(() => {
    api.getUserInfo()
    .then(res => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });

    api.getInitialCards()
    .then(res => {
      setCards(res);
    })
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar-wrapper">
            <img 
            src={userAvatar}
            className="profile__avatar" 
            onClick={props.onEditAvatarClick} />
            <img 
            src={editAvatar} 
            alt="A pencil icon" 
            className="profile__edit-avatar-icon" />
          </div>
            
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__about">{userDescription}</p>
            <button 
            type="button" 
            className="action-button profile__edit-button"
            aria-label="Edit profile information button"
            onClick={props.onEditProfileClick}>
            </button>
          </div>
        </div>
        <button 
        type="button" 
        className="action-button profile__add-button"
        aria-label="Add a card button"
        onClick={props.onAddPlaceClick}>
        </button>
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
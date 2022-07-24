import React from 'react';

function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card">
      <button 
      className="action-button card__delete-button" 
      type="button"
      aria-label="Delete card button" />
      <img 
      onClick={handleClick}
      src={card.link} 
      alt=" " 
      className="card__picture" />
      <div className="card__caption">
        <h2 className="card__description">{card.name}</h2>
        <div className="card__like-wrapper">
          <button 
          type="button" 
          className="card__like"
          aria-label="Like button" />
  
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
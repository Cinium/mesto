export default class Api {
    constructor({baseUrl, token}) {
      this._baseUrl = baseUrl;
      this._token = token;
    }
    
    // получить карточки
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`${res.status}`);
            })
            
    }

    // опубликовать карточку
    postCard({name : newCardName, link : newCardLink}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newCardName,
                link: newCardLink
            })
        });
    }

    // удалить карточку
    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        });
    }

    // получить данные о пользователе
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            
            return Promise.reject(`${res.status}`);
        })
    }

    // изменить данные пользователя
    patchUserInfo({name : newName, about: newAbout}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                about: newAbout
            })
        });
    }

    // исправить аватарку
    patchUserPic(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        });
    }

    // поставить лайк
    putLikeOnCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            },
        });
    }

    // удалить лайк
    deleteLikeFromCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        });
    }
  }
  
  
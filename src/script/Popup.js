export default class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this.closeButton = this.popup.querySelector('.popup__close-button');
        this.overlay = this.popup.querySelector('.overlay');
    }

    open() {
        this.popup.classList.add('popup_opened');
        this.popup.querySelector('.overlay').classList.add('overlay_opened');

        document.body.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close = () => {
        this.popup.classList.remove('popup_opened');
        this.popup.querySelector('.overlay').classList.remove('overlay_opened');

        document.body.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          }
    }

    setEventListeners() {
        this.closeButton.addEventListener('click', this.close);
        this.overlay.addEventListener('click', this.close);
    }
}
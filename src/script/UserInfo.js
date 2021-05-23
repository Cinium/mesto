export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    // получить информацию о пользователя со страницы
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            about: this._about.textContent
        };
        return userInfo;
    }
    
    // вствить информацию о пользователе в разметку
    setUserInfo({name, about, id}) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = id 
    }

    // установить аватар
    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
    
    // получить АйДи пользователя
    getUserId() {
        const userId = this._id;
        return userId
    }
}
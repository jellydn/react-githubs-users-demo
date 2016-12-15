class UserService {
  constructor() {
    if(!UserService.instance) {
      this.data = [];
      UserService.instance = this;
    }
    return UserService.instance;
  }

 findUser(keyword) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.github.com/search/users?q=${keyword}`)
        .then(response => response.json())
        .then(response => resolve(response)).catch(err => reject(err));
    });
  }

  addUser(item) {
    this.data.push(item);
  }

  getUser(id) {
    return this.data.find(item => Number(item.id) === Number(id));
  }

  getUserRepo(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(response => resolve(response)).catch(err => reject(err));
    });
  }

}

const instance = new UserService();
Object.freeze(instance);
export default instance;

import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import Users from './Users';
import userService from './UserService';

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { keyword: '', users: [] };
    this.handleChange = this.handleChange.bind(this);
    this.findUser = this.findUser.bind(this);
    this.searchOnServer = _.debounce((value) => {
      console.log('fire request', value);
      this.findUser(value);
    }, 300);
  }

  findUser() {
    const keyword = this.state.keyword;
    if (keyword && keyword.length) {
      userService.findUser(keyword)
        .then((users) => {
          console.log(users);
          if (users.items && users.items.length) {
            users.items.forEach(item => {
              userService.addUser(item);
            });
          }

          this.setState({
            users: users.items,
          });
        })
        .catch((err) => {
          console.warn(err);
          this.setState({
            users: [],
          });
        });
    } else {
      this.setState({
        users: [],
      });
    }
  }

  handleChange(event) {
    console.log('handleChange', event);
    const keyword = event.target.value;
    this.setState({ keyword, users: [] });
    this.searchOnServer(keyword);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React User</h2>
        </div>
        <p className="App-intro">
          Find github user by keyword: {this.state.keyword} <br />
          <input type="text" value={this.state.keyword} onChange={this.handleChange} />
        </p>
        <hr />
        <Users items={this.state.users} />
      </div>
    );
  }
}

export default App;

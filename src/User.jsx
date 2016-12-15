import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import userService from './UserService';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: 'Guest',
      },
      repos: [],
    };
    console.log('this.props', this.props);
  }

  componentWillMount() {
    const user = userService.getUser(this.props.params.userId);
    console.log('user', user);
    if (user && user.repos_url) {
      userService.getUserRepo(user.repos_url)
        .then(repos => this.setState({ repos }))
        .catch(err => console.warn(err));
    } else {
      browserHistory.push('/');
      return ;
    }
    this.setState({
      user,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Github User: {this.state.user.login}</h2>
        </div>
        <p> Avatar <img alt="avatar" src={this.state.user.avatar_url} /> </p>
        <p> URL
          <a href={this.state.user.url}> {this.state.user.url} </a>
        </p>
        <p> Organizations URL
          <a href={this.state.user.organizations_url}> {this.state.user.organizations_url} </a>
        </p>
        <p> Events URL
          <a href={this.state.user.events_url}> {this.state.user.events_url} </a>
        </p>
        <p> Received Events URL
          <a href={this.state.user.received_events_url}> {this.state.user.received_events_url} </a>
        </p>
        <p> Follower URL
          <a href={this.state.user.followers_url}> {this.state.user.followers_url} </a>
        </p>
        <p> Following URL
          <a href={this.state.user.following_url}> {this.state.user.following_url} </a>
        </p>
        <p> Gists URL
          <a href={this.state.user.gists_url}> {this.state.user.gists_url} </a>
        </p>
        <p> Started URL
          <a href={this.state.user.starred_url}> {this.state.user.starred_url} </a>
        </p>
        <p> Subscriptions URL
          <a href={this.state.user.subscriptions_url}> {this.state.user.subscriptions_url} </a>
        </p>
        <p> gravatar ID: {this.state.user.gravatar_id}</p>
        <p> Score: {this.state.user.score}</p>
        <p> Type: {this.state.user.type}</p>
        <p> Site admin: {this.state.user.site_admin}</p>
        <hr />
        <p> Repo URL
          <a href={this.state.user.repos_url}> {this.state.user.repos_url} </a>
        </p>
        <ul>
          {this.state.repos.map(repo => (
            <li key={repo.id}>
              <span> <a href={repo.html_url}>{repo.name} </a></span>
              <p> {repo.description} </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

User.propTypes = {
  params: PropTypes.object.isRequired,
};

export default User;

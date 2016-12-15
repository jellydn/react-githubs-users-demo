import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Users extends Component {
  render() {
    return (
      <ul>
        {this.props.items.map((user) => (
          <li key={user.id}>
            <img width="40" height="40" src={user.avatar_url} alt={user.login} />
            <Link to={`/user/${user.id}`}>{user.login}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

Users.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Users;

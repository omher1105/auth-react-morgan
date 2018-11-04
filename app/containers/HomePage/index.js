/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import messages from './messages';
import { userActions } from '../../actions/user.actions';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }

  render() {
    return (
      <h1>
        <FormattedMessage {...messages.header} />
        <Button onClick={this.logout} color="primary">Cerrar sesión</Button>{' '}
      </h1>
    );
  }
}

function mapStateToProps(state) {
  const { logout } = state;
  return {
    logout,
  };
}

const connectedLoginPage = connect(mapStateToProps)(HomePage);
export { connectedLoginPage as HomePage };

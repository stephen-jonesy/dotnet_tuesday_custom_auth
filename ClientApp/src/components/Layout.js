import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import {Response} from '../components/response-message/Response'

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Response />
        <div className="main">
        <Container>
          {this.props.children}
        </Container>
        </div>

      </div>
    );
  }
}

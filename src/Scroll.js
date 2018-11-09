import React, { Component } from 'react';
import { Provider } from './context';

export class Scroll extends Component {
  state = {
    domElement: undefined,
  };

  handleRef = domElement => {
    this.setState(state => {
      if (state.domElement !== domElement) {
        return { domElement };
      }
      return;
    });
  };

  renderChildren = () => {
    const { children } = this.props;
    const { handleRef } = this;
    const renderProps = { handleRef };

    if (typeof children === 'function') {
      return children(renderProps);
    }
    if (typeof render === 'function') {
      return this.render(renderProps);
    }

    console.warn(
      'react-smart-sections: You need to provide children function or render function to the Scroll element'
    );
    return;
  };

  render() {
    const { domElement } = this.state;
    return <Provider value={domElement}>{this.renderChildren()}</Provider>;
  }
}

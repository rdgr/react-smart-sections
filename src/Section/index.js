import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { spy } from 'smart-sections';

export class Section extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    render: PropTypes.func,
    component: PropTypes.func,
    children: PropTypes.node
  };

  componentDidMount() {
    this.unregister = spy.registerSection(this.props.name, this.domElement);
  }

  componentWillUnmount() {
    this.unregister();
  }

  handleRef = domElement => (this.domElement = domElement);

  render() {
    const { handleRef } = this;
    const { render, component, children, ...restProps } = this.props;
    if (typeof component === 'string') {
      return React.createElement(component, { children, ...restProps });
    }
    if (component) {
      return React.createElement(component, { children, render, ...restProps });
    }
    if (typeof render === 'function') {
      return render({ children, handleRef });
    }
    return (
      <div {...restProps} ref={handleRef}>
        {children}
      </div>
    );
  }
}

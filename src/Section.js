import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { spy } from 'smart-sections';
import { Consumer } from './context';

export class Section extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    render: PropTypes.func,
    component: PropTypes.func,
    children: PropTypes.node,
  };

  static contextType = Consumer;

  componentDidMount() {
    // this.unregister = spy.registerSection(this.props.name, this.domElement);
    const { name } = this.props;
    const { domElement: sectionEl, context: containerEl } = this;
    this.unregister = spy.registerSection({ name, sectionEl, containerEl });
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

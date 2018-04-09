import { Component } from 'react';
import PropTypes from 'prop-types';
import { spy } from 'smart-sections';

export class SectionsSpy extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = {
    sections: []
  };

  componentDidMount() {
    this.unregister = spy.registerScrollSpy(this.handleScrollStateChange);
  }

  componentWillUnmount() {
    this.unregister();
  }

  handleScrollStateChange = newState => {
    this.setState({ sections: newState });
  };

  render() {
    return this.props.render(this.state.sections);
  }
}

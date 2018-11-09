import { Component } from 'react';
import PropTypes from 'prop-types';
import { spy } from 'smart-sections';
import { Consumer } from './context';

export class SectionsSpy extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  };

  static contextType = Consumer;

  state = {
    sections: [],
  };

  componentDidMount() {
    // this.unregister = spy.registerScrollSpy(this.handleScrollStateChange);
    const { handleSectionStateChange: callback, context: containerEl } = this;
    this.unregister = spy.registerScrollSpy({ callback, containerEl });
  }

  componentWillUnmount() {
    this.unregister();
  }

  handleScrollStateChange = newState => {
    this.setState({ sections: newState });
  };

  render() {
    const { render } = this.props;
    const { sections } = this.state;
    return render(sections);
  }
}

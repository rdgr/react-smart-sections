import { Component } from 'react';
import PropTypes from 'prop-types';
import { spy } from 'smart-sections';

export class SectionSpy extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };

  state = {
    section: {}
  };

  componentWillReceiveProps(newProps) {
    if (this.props.name !== newProps.name) {
      spy.removeSectionSpy(this.props.name, this.handleSectionStateChange);
      spy.addSectionSpy(newProps.name, this.handleSectionStateChange);
    }
  }

  componentDidMount() {
    this.unregister = spy.registerSectionSpy(
      this.props.name,
      this.handleSectionStateChange
    );
  }

  componentWillUnmount() {
    this.unregister();
  }

  handleSectionStateChange = newState => {
    this.setState({ section: newState });
  };

  render() {
    return this.props.render(this.state.section);
  }
}

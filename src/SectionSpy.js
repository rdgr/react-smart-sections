import { Component } from 'react';
import PropTypes from 'prop-types';
import { spy } from 'smart-sections';
import { Consumer } from './context';

export class SectionSpy extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  };

  static contextType = Consumer;

  state = {
    section: {},
  };

  componentWillReceiveProps(newProps) {
    // if (this.props.name !== newProps.name) {
    //   spy.removeSectionSpy(this.props.name, this.handleSectionStateChange);
    //   spy.addSectionSpy(newProps.name, this.handleSectionStateChange);
    // }
    const { name } = this.props;
    const { handleSectionStateChange: callback } = this;
    if (name !== newProps.name) {
      spy.removeSectionSpy({ name, callback });
      spy.addSectionSpy(newProps.name, this.handleSectionStateChange);
    }
  }

  componentDidMount() {
    // this.unregister = spy.registerSectionSpy(
    //   this.props.name,
    //   this.handleSectionStateChange
    // );
    const { name } = this.props;
    const { handleSectionStateChange: callback, context: containerEl } = this;
    this.unregister = spy.registerSectionSpy({ name, callback, containerEl });
  }

  componentWillUnmount() {
    this.unregister();
  }

  handleSectionStateChange = newState => {
    this.setState({ section: newState });
  };

  render() {
    const { render } = this.props;
    const { section } = this.state;
    return render(section);
  }
}

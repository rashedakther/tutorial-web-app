import React from 'react';
import PropTypes from 'prop-types';
import Asciidoctor from 'asciidoctor.js';
import { translate } from 'react-i18next';

class AsciiDocTemplate extends React.Component {
  state = { loaded: false, html: null };

  constructor(props) {
    super(props);
    this.isUnmounted = false;
  }

  componentDidMount() {
    const { i18n, template, adoc, attributes } = this.props;
    if (adoc) {
      fetch(`${process.env.REACT_APP_STEELTHREAD_ASCIIDOC_PATH}/${i18n.language}/${adoc}`)
        .then(res => res.text())
        .then(html => {
          const asciidoctor = Asciidoctor();
          const asciihtml = asciidoctor.convert(html, { attributes });
          !this.isUnmounted && this.setState({ loaded: true, html: asciihtml });
        });
    } else if (template) {
      fetch(`${process.env.REACT_APP_STEELTHREAD_ASCIIDOC_PATH}/${i18n.language}/${template}`)
        .then(res => res.text())
        .then(html => {
          !this.isUnmounted && this.setState({ loaded: true, html });
        });
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const { loaded, html } = this.state;
    if (loaded) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return null;
  }
}

AsciiDocTemplate.propTypes = {
  i18n: PropTypes.object.isRequired,
  template: PropTypes.string,
  adoc: PropTypes.string,
  attributes: PropTypes.object
};

AsciiDocTemplate.defaultProps = {
  template: '',
  adoc: '',
  attributes: {}
};

const ConnectedAsciiDocTemplate = translate()(AsciiDocTemplate);

export { ConnectedAsciiDocTemplate as default, AsciiDocTemplate };
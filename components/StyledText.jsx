import * as React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export function MonoText(props) {
  const { style } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text {...props} style={[style, { fontFamily: 'space-mono' }]} />;
}

MonoText.propTypes = {
  color: PropTypes.string,
};

MonoText.defaultProps = {
  color: '',
};

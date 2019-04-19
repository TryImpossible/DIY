'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class BaseScreen extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  };

  static defaultProps = {};

  render() {
    const { children, style = {}, ...otherProps } = this.props;
    return (
      <SafeAreaView style={[styles.container, StyleSheet.flatten(style)]} {...otherProps}>
        {children}
      </SafeAreaView>
    );
  }
}

export default BaseScreen;

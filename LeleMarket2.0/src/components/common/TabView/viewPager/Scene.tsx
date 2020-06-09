'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

interface SceneProps {
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  getRef?: (ref: any) => void;
  placeholder?: React.ReactNode;
}

interface SceneState {
  visible?: boolean;
}

class Scene extends Component<SceneProps, SceneState> {
  static defaultProps = {
    visible: false,
    placeholder: null,
  };

  private viewRef: React.RefObject<View>;

  constructor(props: SceneProps) {
    super(props);
    this.viewRef = React.createRef<View>();
    const { visible, getRef } = props;
    this.state = {
      visible,
    };
    getRef && getRef(this);
  }

  public onVisibilityLoad() {
    const { visible } = this.state;
    !visible &&
      this.setState({
        visible: true,
      });
  }

  public setNativeProps(nativeProps: object) {
    if (this.viewRef.current) {
      this.viewRef.current.setNativeProps(nativeProps);
    }
  }

  render() {
    const { style, children, placeholder } = this.props;
    const { visible } = this.state;
    return (
      <View ref={this.viewRef} style={[styles.scene, style]}>
        {visible ? children : placeholder}
      </View>
    );
  }
}

export default Scene;

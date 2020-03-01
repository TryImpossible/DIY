
import React from 'react';

import { View, requireNativeComponent, WebView } from "react-native";

import Svg, { Line, LinearGradient, Defs, Stop, Rect, Ellipse, Circle } from "react-native-svg";

import BasePage from '../BasePage';

import PropTypes from "prop-types";

import KeyboardSpacer from "../../widgets/KeyboardSpacer";

import EnhanceStatusBar from "../../widgets/EnhanceStatusBar";

export default class SvgPage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ marginTop: getSize(30) }}>
        <Svg
          height="150"
          width="300"
        >
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
              <Stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="0" />
              <Stop offset="1" stopColor="red" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          {/* <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" /> */}
          <Rect
            x="25"
            y="5"
            width="150"
            height={100}
            fill="url(#grad)"
            strokeWidth="3"
            stroke="rgb(0,0,0)"
          />
          {/* <Line
            x1="0"
            y1="0"
            x2="100"
            y2="0"
            stroke="red"
            strokeWidth="2"
          /> */}
        </Svg>
      </View>
    )
  }
}

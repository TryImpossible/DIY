/**
 * DIY React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent, Component } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import PAGES from '../constants/PageRouter';

import Toast from '../widgets/Toast';

import NetInfoListenerHOC from '../widgets/HOC/NetInfoListenerHOC';

const RootStackNavigator = null;

const ForcePage = [];

const InitPage = ['MainPage', 'UEWidgetPage', 'GoodsDetailPage'];

class App extends (PureComponent || Component) {

  constructor(props) {
    super(props);
    this.path = new Animated.Value(0); //网络提示栏动画
    this.initNavigator(InitPage[0]);
  }

  initNavigator(initPageName) {
    let router = {};
    PAGES.map(item => {
      router[item.name] = {
        screen: ({ screenProps, navigation }) => {
          return <item.page
            showToast={this.showToast}
            // getCurrentRoutes={this.getCurrentRoutes.bind(this)}
            navigation={navigation} />
        },
        path: item.name === 'SearchPage' ? 'searchPage/:param' : item.name,
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
          gesturesEnabled: ForcePage.indexOf(item.name) == -1 ? true : false,
          gestureResponseDistance: { horizontal: 100 },
          header: null,
        },
      }
    });
    RootStackNavigator = StackNavigator(router, {
      initialRouteName: initPageName, // 默认显示界面
      initialRouteParams: {},
      navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        header: null,
      },
      // headerMode: 'none',
      // mode: 'modal',
      // onTransitionStart: this.onPageChange.bind(this),
      // transitionConfig: () => ({
      //     transitionSpec: {
      //         duration: 300,
      //         easing: Easing.out(Easing.poly(4)),
      //         timing: Animated.timing,
      //     },
      //     screenInterpolator: sceneProps => {
      //         const { layout, position, scene } = sceneProps;
      //         const { index } = scene; 

      //         const height = layout.initHeight;
      //         const width = layout.initWidth;
      //         const translateY = position.interpolate({
      //             inputRange: [index - 1, index, index + 1],
      //             outputRange: [height, 0, 0],
      //         });
      //         const translateX = position.interpolate({
      //             inputRange: [index - 1, index, index + 1],
      //             outputRange: [width, 0, 0],
      //         });

      //         const opacity = position.interpolate({
      //             inputRange: [index - 1, index - 0.99, index],
      //             outputRange: [0, 1, 1],
      //         });
      //         return { opacity, transform: [{ translateX }] };
      //     },
      // })
    });
  }

  showToast = (message, duration, position) => {
    this.toast && this.toast.show(message, duration, position);
  }

  componentWillReceiveProps(nextProps) {
    const { isConnected } = nextProps;
    // console.warn(isConnected);
    if (!isConnected) {
      Animated.spring(this.path, {
        toValue: 1,
        easing: Easing.linear,
        duration: 200,
        // velocity: 100,
        // tension: 100,
        // friction: 100
      }).start(() => {
        this.timer = setTimeout(() => {
          Animated.timing(this.path, {
            toValue: 0,
            easing: Easing.linear,
            duration: 200
          }).start(() => this.timer && clearTimeout(this.timer));
        }, 2000);
      });
    }
  }

  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getCurrentRouteName(route);
    }
    return route.routeName;
  }

  render() {
    // this.initNavigator(InitPage[0]);
    return (
      <View style={styles.container}>
        <RootStackNavigator
          ref={ref => this.rootStatckNavigator = ref}
          uriPrefix={__ANDROID__ ? 'diy://diy/' : 'diy://'} //配置Web访问App的URL Schema
          onNavigationStateChange={(prevState, currentState, action) => {
            // console.log(prevState);
            // console.log(currentState);
            // const currentScreen = getCurrentRouteName(currentState);
            // const prevScreen = getCurrentRouteName(prevState);

            // if (prevScreen !== currentScreen) {
              // the line below uses the Google Analytics tracker
              // change the tracker here to use other Mobile analytics SDK.
            //   tracker.trackScreenView(currentScreen);
            // }
          }} />
        <Toast ref={ref => this.toast = ref} />
        <NetWorkTipView path={this.path} />
      </View>
    )
  }
}

const NetWorkTipView = (props) => {
  let { path } = props;
  let height = path.interpolate({
    inputRange: [0, 1],
    outputRange: [0, getSize(30)],
  });
  return (
    <Animated.View style={{ position: 'absolute', top: Const.STATUSBAR_HEIGHT, width: Const.SCREEN_WIDTH, height, backgroundColor: '#dad9d7', justifyContent: 'center', alignItems: 'center', opacity: path }}>
      <Text style={{ fontSize: getSize(12), color: '#b65434' }}>{`您的网络断开了。。。`}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Const.SCREEN_WIDTH,
    height: Const.SCREEN_HEIGHT,
    backgroundColor: Const.MAIN_COLOR,
  }
});

export default NetInfoListenerHOC(App);
import { toDP, toSP } from './ScreenAdapter';
import { IS_ANDROID, IS_IOS, IOS_IS_IPHONE_X, IS_WEB, SCREEN_WIDTH, SCREEN_HEIGHT, ONE_PX } from './Constants';

global._toDP = toDP;
global._toSP = toSP;
global.__ANDROID__ = IS_ANDROID;
global.__IOS__ = IS_IOS;
global.__IPHONEX__ = IOS_IS_IPHONE_X;
global.__WEB__ = IS_WEB;
global.__WIDTH__ = SCREEN_WIDTH;
global.__HEIGHT__ = SCREEN_HEIGHT;
global.__ONEPX__ = ONE_PX;
global._c = () => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  if (color.length !== 7) return global._c();
  return color;
};
window.__DEV__ = true;

if (!__DEV__) {
  global.console = {
    ...global.console,
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}

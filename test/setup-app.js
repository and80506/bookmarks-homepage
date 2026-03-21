import { jsdom } from 'jsdom';
import hook from 'css-modules-require-hook';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

const navigatorValue = global.window.navigator;
try {
  global.navigator = navigatorValue;
} catch (error) {
  Object.defineProperty(global, 'navigator', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: navigatorValue
  });
}

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

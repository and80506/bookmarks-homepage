import { expect } from 'chai';
import { getUserLanguage, isChineseUser, t } from '../../app/i18n';

describe('i18n English user experience', () => {
  let navigatorDescriptors;

  const overrideNavigatorLang = (target, value) => {
    if (!target) return;
    ['language', 'userLanguage'].forEach(prop => {
      navigatorDescriptors.push({
        target,
        prop,
        descriptor: Object.getOwnPropertyDescriptor(target, prop)
      });

      Object.defineProperty(target, prop, {
        configurable: true,
        enumerable: true,
        writable: true,
        value
      });
    });
  };

  beforeEach(() => {
    navigatorDescriptors = [];
    overrideNavigatorLang(global.navigator, 'en-US');
    overrideNavigatorLang(global.window && global.window.navigator, 'en-US');
  });

  afterEach(() => {
    while (navigatorDescriptors.length) {
      const { target, prop, descriptor } = navigatorDescriptors.pop();
      if (!target) continue;
      if (descriptor) {
        Object.defineProperty(target, prop, descriptor);
      } else {
        delete target[prop];
      }
    }
  });

  it('falls back to English copy for toggle label', () => {
    expect(getUserLanguage()).to.equal('en');
    expect(isChineseUser()).to.equal(false);
    expect(t('toggleLabel')).to.equal('Toggle Bookmarks As New Tab:');
  });
});

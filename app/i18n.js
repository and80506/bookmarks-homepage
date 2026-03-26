// 国际化模块
const i18nMessages = {
  zh: {
  },
  en: {
  }
};

// 获取用户语言
export function getUserLanguage() {
  const lang = navigator.language || navigator.userLanguage || 'en';
  return lang.startsWith('zh') ? 'zh' : 'en';
}

// 判断是否为中文用户
export function isChineseUser() {
  const lang = navigator.language || navigator.userLanguage || '';
  return lang.startsWith('zh');
}

// 获取翻译文本
export function t(key) {
  const lang = getUserLanguage();
  return i18nMessages[lang][key] || i18nMessages['en'][key] || key;
}

// 导出所有消息
export default i18nMessages;
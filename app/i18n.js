// 国际化模块
const i18nMessages = {
  zh: {
    // 主界面
    searchPlaceholder: '请输入要搜索的内容',
    searchButton: '搜索',
    
    // Popup 界面
    toggleLabel: '切换书签主页:',
    extensionName: '书签主页'
  },
  en: {
    // Main interface
    searchPlaceholder: 'Google',
    searchButton: 'Search',
    
    // Popup interface
    toggleLabel: 'Toggle Bookmarks As New Tab:',
    extensionName: 'Bookmarks As New Tab'
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
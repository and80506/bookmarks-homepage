// 国际化模块
const i18nMessages = {
  zh: {
    // 主界面
    searchPlaceholder: '请输入要搜索的内容',
    searchButton: '搜索',
    bookmarksBar: '书签栏',
    
    // Popup 界面
    toggleLabel: '切换书签主页:',
    extensionName: '书签主页',
    
    // 扩展页面提示
    loading: '正在打开新标签页...',
    extensionDisabled: '书签主页已关闭',
    closeTab: '您可以关闭此标签页'
  },
  en: {
    // Main interface
    searchPlaceholder: 'Search after auto-translation',
    searchButton: 'Search',
    bookmarksBar: 'Bookmarks Bar',
    
    // Popup interface
    toggleLabel: 'Toggle Bookmarks Homepage:',
    extensionName: 'Bookmarks Homepage',
    
    // Extension page prompts
    loading: 'Opening new tab...',
    extensionDisabled: 'Bookmarks Homepage is disabled',
    closeTab: 'You can close this tab'
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
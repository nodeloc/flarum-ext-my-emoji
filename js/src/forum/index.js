import { extend } from 'flarum/common/extend';
import app from 'flarum/common/app';
import TextEditorButton from './components/TextEditorButton';
import TextEditor from 'flarum/common/components/TextEditor';
import urlChecker from '../common/utils/urlChecker';
import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

// 全局缓存，用于存储表情数据，避免多个编辑器实例重复加载
const globalEmojiCache = {
  data: null,
  categories: [],
  loading: false,
  lastLoadTime: 0,
  // 缓存过期时间（20分钟）
  expirationTime: 20 * 60 * 1000,

  isValid() {
    return this.data && Date.now() - this.lastLoadTime < this.expirationTime;
  },

  reset() {
    this.data = null;
    this.categories = [];
    this.loading = false;
    this.lastLoadTime = 0;
  },

  setData(data, categories) {
    this.data = data;
    this.categories = categories;
    this.lastLoadTime = Date.now();
    this.loading = false;
  }
};

/**
 * MyEmoji Picker Component
 * 将表情选择器拆分为独立组件，方便管理
 */
class MyEmojiPicker extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = !globalEmojiCache.isValid();
    this.emojiData = globalEmojiCache.data || {};
    this.categories = globalEmojiCache.categories || [];
    this.currentCategory = this.categories.length > 0 ? this.categories[0].id : null;

    // 滚动加载功能
    this.itemsPerPage = 30;
    this.currentPage = 1;
    this.hasMoreItems = true;

    // 如果缓存无效，加载数据
    if (!globalEmojiCache.isValid() && !globalEmojiCache.loading) {
      this.loadEmojiData();
    }
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    // 添加文档事件监听器，用于处理点击外部关闭
    this.boundHandleOutsideClick = this.handleOutsideClick.bind(this);
    document.addEventListener('mousedown', this.boundHandleOutsideClick);

    // 添加键盘导航
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.boundHandleKeyDown);
  }

  onremove(vnode) {
    super.onremove(vnode);

    // 清理事件监听器
    document.removeEventListener('mousedown', this.boundHandleOutsideClick);
    document.removeEventListener('keydown', this.boundHandleKeyDown);

    // 清理Intersection Observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  handleOutsideClick(e) {
    // 检查点击是否在选择器外部
    if (this.element && !this.element.contains(e.target) &&
        !document.querySelector('.Button-MyEmoji')?.contains(e.target)) {
      this.attrs.onClose();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.attrs.onClose();
    }
  }

  loadEmojiData() {
    // 设置全局加载状态
    globalEmojiCache.loading = true;

    app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/nodeloc/myemoji',
      })
      .then((response) => {
        const baseUrl = app.forum.attribute('baseUrl');
        const customEmojis = [];

        response['data'].forEach((customEmoji) => {
          const path = customEmoji['attributes']['path'];

          customEmojis.push({
            id: customEmoji['id'],
            name: customEmoji['attributes']['title'],
            textToReplace: customEmoji['attributes']['text_to_replace'],
            emoji: urlChecker(path) ? path : baseUrl + path,
            category: customEmoji['attributes']['category'],
            category_name: customEmoji['attributes']['category_name'],
            // 添加懒加载标志
            loaded: false
          });
        });

        // 按分类分组表情
        const emojiData = customEmojis.reduce((result, emoji) => {
          (result[emoji.category] = result[emoji.category] || []).push(emoji);
          return result;
        }, {});

        // 提取分类
        const categories = Object.keys(emojiData).map(categoryId => {
          return {
            id: categoryId,
            name: emojiData[categoryId][0].category_name
          };
        });

        // 更新全局缓存
        globalEmojiCache.setData(emojiData, categories);

        // 更新组件状态
        this.emojiData = emojiData;
        this.categories = categories;
        this.loading = false;

        // 设置默认分类
        if (categories.length > 0) {
          this.selectCategory(categories[0].id);
        }

        m.redraw();
      })
      .catch(error => {
        console.error('Error loading emoji data:', error);
        this.loading = false;
        globalEmojiCache.loading = false;
        m.redraw();
      });
  }

  selectCategory(categoryId) {
    this.currentCategory = categoryId;
    this.currentPage = 1;
    this.hasMoreItems = true;

    // 重置滚动位置
    if (this.emojiListElement) {
      this.emojiListElement.scrollTop = 0;
    }

    m.redraw();
  }

  getCurrentEmojis() {
    if (!this.currentCategory) return [];
    if (!this.emojiData[this.currentCategory]) return [];

    return this.emojiData[this.currentCategory].slice(0, this.currentPage * this.itemsPerPage);
  }

  handleScroll(e) {
    const el = e.target;

    // 检查是否滚动到底部
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 50) {
      this.loadMoreItems();
    }
  }

  loadMoreItems() {
    if (!this.hasMoreItems || !this.currentCategory || !this.emojiData[this.currentCategory]) return;

    const totalItems = this.emojiData[this.currentCategory].length;

    if (this.currentPage * this.itemsPerPage < totalItems) {
      this.currentPage++;
      m.redraw();
    } else {
      this.hasMoreItems = false;
    }
  }

  handleEmojiSelect(emoji) {
    // 将表情插入编辑器
    this.attrs.insertEmoji(emoji.textToReplace);

    // 关闭选择器
    this.attrs.onClose();
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const emojiId = entry.target.dataset.emojiId;
            const categoryId = entry.target.dataset.categoryId;

            // 标记表情已加载
            if (this.emojiData[categoryId]) {
              const emoji = this.emojiData[categoryId].find(e => e.id === emojiId);
              if (emoji) {
                emoji.loaded = true;
                m.redraw();
              }
            }

            // 取消观察此元素
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: this.emojiListElement,
        rootMargin: '100px',
        threshold: 0.1
      }
    );
  }

  view() {
    return m('div', {
      className: 'MyEmoji-picker',
      onclick: (e) => e.stopPropagation()
    }, [
      // 分类标签栏
      m('div', { className: 'MyEmoji-tab-bar' },
        this.categories.map(category =>
          m('button', {
            className: this.currentCategory === category.id ? 'active' : '',
            onclick: () => this.selectCategory(category.id)
          }, category.name)
        )
      ),

      // 表情显示区域
      m('div', {
        className: 'emoji-picker',
        oncreate: (vnode) => {
          this.emojiListElement = vnode.dom;
          this.setupIntersectionObserver();
        },
        onscroll: (e) => this.handleScroll(e)
      },
        this.loading ?
          m('div', { className: 'MyEmoji-loading' }, m(LoadingIndicator)) :
          m('div', { className: 'MyEmoji-grid' }, [
            // 表情列表
            ...this.getCurrentEmojis().map(emoji =>
              m('span', {
                className: 'MyEmoji',
                onclick: () => this.handleEmojiSelect(emoji),
                title: emoji.name
              },
                emoji.loaded ?
                  m('img', { src: emoji.emoji, alt: emoji.name }) :
                  m('div', {
                    className: 'emoji-lazyload',
                    'data-emoji-id': emoji.id,
                    'data-category-id': emoji.category,
                    oncreate: (vnode) => {
                      if (this.intersectionObserver) {
                        this.intersectionObserver.observe(vnode.dom);
                      } else {
                        emoji.loaded = true;
                      }
                    }
                  }, m(LoadingIndicator, { size: 'small' }))
              )
            ),

            // 加载更多指示器
            this.hasMoreItems && this.getCurrentEmojis().length > 0 ?
              m('div', { className: 'MyEmoji-load-more' }, m(LoadingIndicator, { size: 'small' })) :
              null
          ])
      )
    ]);
  }
}

app.initializers.add(
  'nodeloc-flarum-ext-my-emoji',
  () => {
    extend(TextEditor.prototype, 'oninit', function () {
      this.isMyEmojiPickerVisible = false;
      this.myEmojiPosition = { top: 0, left: 0 };
    });

    extend(TextEditor.prototype, 'toolbarItems', function (items) {
      items.remove('emoji'); // 移除默认的emoji按钮
      items.add(
        'MyEmoji',
        TextEditorButton.component({
          onclick: (event) => {
            event.preventDefault();

            // 切换选择器可见性
            this.isMyEmojiPickerVisible = !this.isMyEmojiPickerVisible;

            if (this.isMyEmojiPickerVisible) {
              this.calculateMyEmojiPosition(event);
            }

            m.redraw();
          },
          icon: 'far fa-smile-wink',
          title: app.translator.trans('nodeloc-emoji.forum.composer.emoji_tooltip'),
        })
      );
    });

    extend(TextEditor.prototype, 'oncreate', function () {
      // 处理窗口大小变化时重新定位
      this.boundRepositionMyEmoji = () => {
        if (this.isMyEmojiPickerVisible) {
          this.calculateMyEmojiPosition();
          m.redraw();
        }
      };
      window.addEventListener('resize', this.boundRepositionMyEmoji);
    });

    extend(TextEditor.prototype, 'onremove', function () {
      // 清理事件监听器
      window.removeEventListener('resize', this.boundRepositionMyEmoji);
    });

    extend(TextEditor.prototype, 'calculateMyEmojiPosition', function (event) {
      const MyEmojiButton = document.querySelector('.Button-MyEmoji');
      if (!MyEmojiButton) return;

      const buttonRect = MyEmojiButton.getBoundingClientRect();
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // 移动端定位：屏幕居中
        this.myEmojiPosition = {
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '90vw',
          height: 'auto',
          maxHeight: '80vh'
        };
      } else {
        // 桌面端定位：固定高度，确保标签栏高度不会变小
        const pickerHeight = 320; // 选择器高度
        const pickerWidth = 520;  // 选择器宽度
        const minTabHeight = 40;  // 标签栏最小高度

        // 计算选择器左侧位置，使其与按钮居中对齐
        const leftPosition = buttonRect.left + (buttonRect.width / 2) - (pickerWidth / 2);

        // 确保不会超出屏幕左侧
        const adjustedLeft = Math.max(10, leftPosition);

        // 确保选择器不会超出屏幕顶部
        const availableHeight = Math.min(pickerHeight, buttonRect.top - 10);
        const useFixedHeight = availableHeight >= 200; // 只有当有足够空间时才使用固定高度

        this.myEmojiPosition = {
          position: 'fixed',
          bottom: (window.innerHeight - buttonRect.top + 10) + 'px',
          left: adjustedLeft + 'px',
          width: pickerWidth + 'px',
          height: useFixedHeight ? pickerHeight + 'px' : 'auto', // 使用固定高度
          minHeight: (minTabHeight + 100) + 'px', // 确保标签栏加内容区域有最小高度
          maxHeight: availableHeight + 'px',
        };
      }
    });

    extend(TextEditor.prototype, 'view', function (vdom) {
      // 如果可见，将表情选择器附加到视图
      if (this.isMyEmojiPickerVisible) {
        vdom.children.push(
          m('div', {
            className: 'ComposerBody-MyEmojiContainer',
            style: this.myEmojiPosition
          }, m(MyEmojiPicker, {
            insertEmoji: (text) => {
              this.attrs.composer.editor.insertAtCursor(text);
            },
            onClose: () => {
              this.isMyEmojiPickerVisible = false;
              m.redraw();
            }
          }))
        );
      }

      return vdom;
    });
  },
  -150 // 优先级：在 flarum/emoji 之前初始化
);

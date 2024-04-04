import { extend } from 'flarum/common/extend';
import app from 'flarum/common/app';
import TextEditorButton from './components/TextEditorButton';
import TextEditor from 'flarum/common/components/TextEditor';
import urlChecker from '../common/utils/urlChecker';

app.initializers.add(
  'nodeloc-flarum-ext-my-emoji',
  () => {
    extend(TextEditor.prototype, 'oninit', function () {
      this.isPickerLoaded = false;
      this.MyEmojiContainer = null;
      this.$MyEmojiContainer = null;
    });

    extend(TextEditor.prototype, 'toolbarItems', function (items) {
      items.remove('emoji');
      items.add(
        'MyEmoji',
        TextEditorButton.component({
          onclick: (event) => {
            event.preventDefault();

            // 检查 MyEmojiContainer 是否已经创建
            if (!this.MyEmojiContainer) {
              this.createMyEmojiContainer();
              this.loadMyEmojiData();  // 仅在第一次创建容器时加载 MyEmoji 数据
            }

            if (!this.isPickerLoaded) {
                this.showMyEmojiContainer();
                this.isPickerLoaded = true;
                m.redraw();
            } else {
              this.isPickerLoaded = false;
              this.hideMyEmojiContainer();
              m.redraw();
            }
          },
          icon: 'far fa-smile-wink',
          title: app.translator.trans('nodeloc-emoji.forum.composer.emoji_tooltip'),
        })
      );
    });

    extend(TextEditor.prototype, 'onremove', function () {
      if (this.MyEmojiContainer) {
        this.MyEmojiContainer.remove();
      }
    });

    extend(TextEditor.prototype, 'createMyEmojiContainer', function () {
      this.MyEmojiContainer = document.createElement('div');
      this.MyEmojiContainer.classList.add('ComposerBody-MyEmojiContainer');
      this.$MyEmojiContainer = $(this.MyEmojiContainer);
      document.body.appendChild(this.MyEmojiContainer);
    });

    extend(TextEditor.prototype, 'loadMyEmojiData', function () {
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
              name: customEmoji['attributes']['title'],
              textToReplace: customEmoji['attributes']['text_to_replace'],
              emoji: urlChecker(path) ? path : baseUrl + path,
              category: customEmoji['attributes']['category'],
              category_name: customEmoji['attributes']['category_name'],
            });
          });

          const myemojiByCategory = customEmojis.reduce((result, emoji) => {
            (result[emoji.category] = result[emoji.category] || []).push(emoji);
            return result;
          }, {});

          const emojiContainer = document.createElement('div');
          emojiContainer.classList.add('emoji-picker__wrapper');
          this.MyEmojiContainer.appendChild(emojiContainer);

          const tabBarContainer = document.createElement('div');
          emojiContainer.appendChild(tabBarContainer);

          const emojiPickerWrapper = document.createElement('div');
          emojiPickerWrapper.classList.add('emoji-picker');
          emojiPickerWrapper.style.maxHeight = '300px'; // 适当调整高度
          emojiPickerWrapper.style.overflowY = 'auto'; // 启用垂直滚动条
          emojiContainer.appendChild(emojiPickerWrapper);

          const tabBar = document.createElement('div');
          tabBar.classList.add('MyEmoji-tab-bar');
          tabBarContainer.appendChild(tabBar);
          Object.keys(myemojiByCategory).forEach((category,index) => {
            const tabButton = document.createElement('button');
            const category_name = myemojiByCategory[category][0].category_name; // 获取第一个 emoji 的 category_name
            tabButton.textContent = category_name; // 使用 category_name
            tabButton.dataset.categoryId = category; // 存储分类 ID
            // 如果是第一个按钮，添加 active 类
            if (index === 0) {
              tabButton.classList.add('active');
            }

            tabButton.addEventListener('click', () => {
              // 先移除所有按钮的 active 类
              tabBar.querySelectorAll('button').forEach((button) => {
                button.classList.remove('active');
              });
              // 添加 active 类到当前点击的按钮
              tabButton.classList.add('active');
              showEmojis(myemojiByCategory[category]);
            });
            tabBar.appendChild(tabButton);
          });

          const showEmojis = (myemoji) => {
            emojiPickerWrapper.innerHTML = '';
            myemoji.forEach((emoji) => {
              const emojiContainer = document.createElement('span');
              emojiContainer.className = 'MyEmoji'; // 在 span 中添加 MyEmoji 类

              const emojiElement = document.createElement('img');
              emojiElement.src = emoji.emoji;
              emojiElement.title = emoji.name;
              emojiElement.alt = emoji.name;
              emojiElement.style.cursor = 'pointer';

              emojiElement.addEventListener('click', () => {
                this.attrs.composer.editor.insertAtCursor(emoji.textToReplace);
                this.isPickerLoaded = false;
                this.hideMyEmojiContainer();
              });

              emojiContainer.appendChild(emojiElement);
              emojiPickerWrapper.appendChild(emojiContainer);
            });
          };
          const defaultCategory = Object.keys(myemojiByCategory)[0];
          showEmojis(myemojiByCategory[defaultCategory]);

          // const desiredPosition = 'translate(-50%, -50%)';  // 将 picker 居中
          // this.$MyEmojiContainer.css({
          //   position: 'fixed',  // 使用 fixed 定位以进行居中
          //   top: '50%',
          //   left: '50%',
          //   transform: desiredPosition,
          // });
          // 获取 MyEmoji 按钮的位置信息
          // 获取 MyEmojiButton 元素
          const MyEmojiButton = document.querySelector('.Button-MyEmoji');

          // 确保 MyEmojiButton 存在
          if (MyEmojiButton) {
            // 获取 MyEmojiButton 的位置信息
            const MyEmojiButtonRect = MyEmojiButton.getBoundingClientRect();
            // 添加媒体查询，适应移动端
            const isMobile = window.innerWidth <= 768; // 根据您的需要调整移动端的宽度阈值
            // 计算 MyEmojiContainer 的位置
            const MyEmojiContainerTop = isMobile ? '50%' : `${MyEmojiButtonRect.top - this.MyEmojiContainer.offsetHeight}px`;
            const MyEmojiContainerLeft = isMobile ? '50%' : `${MyEmojiButtonRect.left + (MyEmojiButtonRect.width - this.MyEmojiContainer.offsetWidth) / 2}px`;
            this.$MyEmojiContainer.css({
              position: 'fixed',
              top: `${MyEmojiContainerTop}`,
              left: `${MyEmojiContainerLeft}`,
              transform: isMobile ? 'translate(-50%, -50%)' : '', // 在移动端使其居中
              width: isMobile ? '90%' : '', // 在移动端设置宽度为 90%
              margin: isMobile ? 'auto' : '', // 在移动端上中左右居中
            });
          }



          // 在点击外部时关闭 picker
          this.$MyEmojiContainer.on('mousedown', (e) => {
            e.stopPropagation();
          });

          $(document).on('mousedown', (e) => {
            console.log("test", this.isPickerLoaded);
            if (
              !this.$MyEmojiContainer.is(e.target) &&
              this.isPickerLoaded
            ) {
              this.isPickerLoaded = false;
              this.hideMyEmojiContainer();
              m.redraw();
            }
          });
        });
    });

    extend(TextEditor.prototype, 'showMyEmojiContainer', function () {
      // 显示 MyEmoji 容器的逻辑
      // 例如：
      this.$MyEmojiContainer.css({
        visibility: 'visible',
      });
    });

    extend(TextEditor.prototype, 'hideMyEmojiContainer', function () {
      // 隐藏 MyEmoji 容器的逻辑
      // 例如：
      this.$MyEmojiContainer.css({
        visibility: 'hidden',
      });
    });
  },
  -150 // 在 flarum/emoji 之前初始化
);

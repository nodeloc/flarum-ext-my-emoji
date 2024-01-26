import { extend, override } from 'flarum/common/extend';

import app from 'flarum/common/app';
import AdminPage from 'flarum/admin/components/AdminPage';
import CustomEmojiListState from './states/CustomEmojiListState';
import CustomEmojiSection from './components/CustomEmojiSection';
import Emoji from '../common/models/Emoji';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Stream from 'flarum/common/utils/Stream';

app.initializers.add('nodeloc-flarum-ext-my-emoji', (app) => {
  app.store.models.myemoji = Emoji;
  app.customEmojiListState = new CustomEmojiListState();

  extend(ExtensionPage.prototype, 'sections', function (items) {
    console.log('this.extension.id',this.extension.id );
    if (this.extension.id != 'nodeloc-my-emoji') return;
    items.has('permissions') ? items.remove('permissions') : '';

    items.add('customMyEmoji', <CustomEmojiSection />);
  });
});

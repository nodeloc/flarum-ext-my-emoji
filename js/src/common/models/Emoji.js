import Model from 'flarum/common/Model';
import mixin from 'flarum/common/utils/mixin';
import app from 'flarum/common/app';
import urlChecker from '../../common/utils/urlChecker';

export default class Emoji extends mixin(Model, {
  category: Model.attribute('category'),
  category_name: Model.attribute('category_name'),
  title: Model.attribute('title'),
  textToReplace: Model.attribute('text_to_replace'),
  path: Model.attribute('path'),
}) {
  apiEndpoint() {
    return '/nodeloc/myemoji' + (this.exists ? '/' + this.data.id : '');
  }

  /**
   * 获取完整表情URL
   */
  url() {
    const baseUrl = app.forum.attribute('baseUrl');
    const path = this.path();

    return urlChecker(path) ? path : baseUrl + path;
  }

  /**
   * 获取表情缩略图URL（如果需要的话）
   */
  thumbnailUrl() {
    // 如果将来想实现缩略图功能，可以在这里处理
    return this.url();
  }
}

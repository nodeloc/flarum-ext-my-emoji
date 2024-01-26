import Model from 'flarum/common/Model';
import mixin from 'flarum/common/utils/mixin';

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
}

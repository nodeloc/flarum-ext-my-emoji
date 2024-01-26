import { saveAs } from 'file-saver';
import Button from 'flarum/common/components/Button';
import Component from 'flarum/common/Component';
import CustomEmojiList from './CustomEmojiList';
import EditEmojiModal from './EditEmojiModal';
import listItems from 'flarum/common/helpers/listItems';
import ItemList from 'flarum/common/utils/ItemList';

export default class CustomEmojiSection extends Component {
  oninit(vnode) {
    super.oninit(vnode);
  }

  exportEmojiList() {
    var customEmojiList = {};

    app.store.find('nodeloc/myemoji').then((results) => {
      results.payload.data.map((emoji, i) => {
        const attr = emoji.attributes;

        customEmojiList[i] = {
          category: attr.category,
          category_name: attr.category_name,
          title: attr.title,
          text_to_replace: attr.text_to_replace,
          path: attr.path,
        };
      });

      var blob = new Blob([JSON.stringify(customEmojiList)], { type: 'application/json;charset=utf-8' });
      saveAs(blob, 'MyEmoji.json');
    });
  }

  importEmojiList() {
    if (!confirm(app.translator.trans('nodeloc-emoji.admin.my_emoji_section.import_myemoji_message'))) return;

    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
      app.customEmojiListState.loading = true;

      // getting a hold of the file reference
      var file = e.target.files[0];

      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');

      // here we tell the reader what to do when it's done reading...
      reader.onload = (readerEvent) => {
        app
          .request({
            method: 'POST',
            url: `${app.forum.attribute('apiUrl')}/nodeloc/import-myemoji`,
            body: { data: JSON.parse(readerEvent.target.result) },
          })
          .then(() => {
            EditEmojiModal.prototype.clearCache().then(() => window.location.reload());
          });
      };
    };

    input.click();
  }

  MyEmojiTopItems() {
    const items = new ItemList();

    items.add(
      'import',
      <Button icon="fas fa-sign-in-alt" onclick={() => this.importEmojiList()}>
        {app.translator.trans('nodeloc-emoji.admin.my_emoji_section.import_json_button')}
      </Button>
    );

    items.add(
      'export',
      <Button icon="fas fa-share" onclick={() => this.exportEmojiList()}>
        {app.translator.trans('nodeloc-emoji.admin.my_emoji_section.export_json_button')}
      </Button>
    );

    return items;
  }

  view() {
    return (
      <div className="ExtensionPage-customMyEmoji">
        <div className="ExtensionPage-customMyEmoji-header">
          <div className="container">
            <div className="ExtensionTitle">
              <div className="ExtensionName">
                <h2>{app.translator.trans('nodeloc-emoji.admin.my_emoji_section.heading_title')}</h2>
              </div>
              <div class="ExtensionPage-headerTopItems">
                <ul>{listItems(this.MyEmojiTopItems().toArray())}</ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <CustomEmojiList />
        </div>
      </div>
    );
  }
}

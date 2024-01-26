import app from 'flarum/common/app';

export default class CustomEmojiListState {
  constructor() {
    this.myemoji = [];

    this.moreResults = false;

    this.loading = false;
  }

  /**
   * Load more custom myemoji
   *
   * @param offset The index to start the page at.
   */
  loadResults(offset = 0) {
    this.loading = true;
    return app.store.find('nodeloc/myemoji', { page: { limit: 23, offset } }).then(this.parseResults.bind(this));
  }

  /**
   * Load the next page of emoji results.
   */
  loadMore() {
    this.loading = true;

    this.loadResults(this.myemoji.length);
  }

  /**
   * Parse results and append them to the emoji list.
   */
  parseResults(results) {
    this.myemoji.push(...results);

    this.loading = false;
    this.moreResults = !!results.payload.links && !!results.payload.links.next;

    m.redraw();

    return results;
  }

  /**
   * Add an emoji to the beginning of the list
   */
  addToList(emoji) {
    this.loading = true;

    this.myemoji.unshift(emoji);

    this.loading = false;
  }

  /**
   * Remove an emoji from the list
   */
  removeFromList(emojiId) {
    this.loading = true;

    const index = this.myemoji.findIndex((emoji) => emojiId === emoji.id());
    this.myemoji.splice(index, 1);

    this.loading = false;
  }

  /**
   * Are there any myemoji in the list?
   */
  hasEmojis() {
    return this.myemoji.length > 0;
  }

  /**
   * Is the emoji list loading?
   */
  isLoading() {
    return this.loading;
  }

  /**
   * Does this list has more myemoji?
   */
  hasMoreResults() {
    return this.moreResults;
  }

  /**
   * Does this list have any myemoji?
   */
  empty() {
    return !this.hasEmojis() && !this.isLoading();
  }
}

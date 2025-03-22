// TextEditorButton.js - 改进的按钮组件
import Button from 'flarum/common/components/Button';
import Tooltip from 'flarum/common/components/Tooltip';

/**
 * 改进的TextEditorButton组件，添加了更好的工具提示和样式
 */
export default class TextEditorButton extends Button {
  view(vnode) {
    const originalView = super.view(vnode);

    // 从属性中获取工具提示文本
    const tooltipText = this.attrs.tooltipText || originalView.attrs.title;
    delete originalView.attrs.title;

    return (
      <Tooltip text={tooltipText} position="top" showOnFocus={false}>
        {originalView}
      </Tooltip>
    );
  }

  static initAttrs(attrs) {
    super.initAttrs(attrs);

    attrs.className = `Button Button--icon Button--link Button-MyEmoji ${attrs.active ? 'active' : ''}`;
    attrs.tooltipText = attrs.title;
  }
}

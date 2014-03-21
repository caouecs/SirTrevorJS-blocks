/*
  Markdown Block
*/
SirTrevor.Blocks.Markdown = SirTrevor.Block.extend({

  type: "markdown",

  title: "Markdown",

  editorHTML: '<div class="st-text-block st-markdown st-required" contenteditable="true"></div>',

  icon_name: 'text',

  loadData: function(data) {
    this.getTextBlock().html(SirTrevor.toHTML(data.text, this.type));
  },

  toMarkdown: function(markdown) {
    return markdown.replace(/\\\*/g,"*")
      .replace(/\\\[/g,"[")
      .replace(/\\\]/g,"]")
      .replace(/\\\_/g,"_")
      .replace(/\\\(/g,"(")
      .replace(/\\\)/g,")")
      .replace(/\\\-/g,"-");
  },

  toHTML: function(html) {
    return html;
  }
});

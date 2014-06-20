SirTrevor.Blocks.Issuu = (function(){

  return SirTrevor.Block.extend({

    provider: {
      regex: /issuu.com\/(?:.+)e=(.+)/,
      html: "<div data-configid=\"{{remote_id}}\" style=\"width: 525px; height: 353px;\" class=\"issuuembed\"></div><script type=\"text/javascript\" src=\"//e.issuu.com/embed.js\" async=\"true\"></script>"
    },

    type: 'issuu',
    title: 'Issuu',

    pastable: true,

    paste_options: {
      html: "<div style=\"text-align:center; padding:20px;\">Enter <b>Issuu</b> link for embed code<br /><input type=\"text\" class=\"st-paste-block\" style=\"width: 100%\"></div>"
    },

    icon_name: 'image',

    loadData: function(data) {

      var embed_string = this.provider.html
        .replace('{{remote_id}}', data.remote_id);

      this.$editor.html(embed_string);
    },

    onContentPasted: function(event){
      this.handleDropPaste($(event.target).val());
    },

    handleDropPaste: function(url){
      var match, data;

      match = this.provider.regex.exec(url);

      if (match !== null && !_.isUndefined(match[1])) {
        data = {
          remote_id: match[1]
        };

        this.setAndLoadData(data);
      }
    },

    onDrop: function(transferData){
      var url = transferData.getData('text/plain');
      this.handleDropPaste(url);
    }
  });

})();

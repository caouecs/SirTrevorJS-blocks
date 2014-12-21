SirTrevor.Blocks.Sketchfab = (function(){

  return SirTrevor.Block.extend({

    provider: {
      regex: /sketchfab.com\/models\/(.+)\/embed/,
      html: "<div style=\"text-align:center;\"><iframe  allowFullScreen webkitallowfullscreen mozallowfullscreen src=\"https://sketchfab.com/models/{{remote_id}}/embed\" width=\"640\" height=\"480\" frameborder=\"0\" scrolling=\"no\"></iframe></div>"
    },

    type: "sketchfab",
    title: "Sketchfab",

    pastable: true,

    paste_options: {
      html: "<div style=\"text-align:center; padding:20px;\">Enter <b>Sketchfab</b> embed code<br /><input type=\"text\" class=\"st-paste-block\" style=\"width: 100%\"></div>"
    },

    icon_name: "image",

    loadData: function(data) {

      var embed_string = this.provider.html
        .replace("{{remote_id}}", data.remote_id);

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
      var url = transferData.getData("text/plain");
      this.handleDropPaste(url);
    }
  });

})();

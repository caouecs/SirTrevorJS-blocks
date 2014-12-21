SirTrevor.Blocks.Soundcloud = (function(){

 return SirTrevor.Block.extend({

    provider: {
      regex: /soundcloud.com\/tracks\/(\d+)&/,
      html: "<iframe width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{{remote_id}}&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false\"></iframe>"
    },

    type: "soundcloud",
    title: "SoundCloud",

    pastable: true,

    paste_options: {
      html: "<div style=\"text-align:center; padding:20px;\">Enter <b>SoundCloud</b> embed code<br /><input type=\"text\" class=\"st-paste-block\" style=\"width: 100%\" placeholder=\"Enter embed code\"></div>"
    },

    icon_name: "iframe",

    loadData: function(data) {

      this.$editor.addClass("st-block__editor--with-square-media");

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

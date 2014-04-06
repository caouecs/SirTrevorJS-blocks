SirTrevor.Blocks.Spotify = (function(){

  return SirTrevor.Block.extend({

    provider: {
      regex: /play.spotify.com\/track\/([[:alnum:]]*)/,
      html: "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:{{remote_id}}\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>"
    },

    type: 'spotify',
    title: 'Spotify',

    pastable: true,

    paste_options: {
      html: "<div style=\"text-align:center; padding:20px;\">Enter <b>Spotify</b> link of track<br /><input type=\"text\" class=\"st-paste-block\" style=\"width: 90%\"></div>"
    },

    icon_name: 'image',

    loadData: function(data) {

      this.$editor.addClass('st-block__editor--with-square-media');

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

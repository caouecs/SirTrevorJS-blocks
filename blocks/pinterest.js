SirTrevor.Blocks.Pinterest = (function(){

  return SirTrevor.Block.extend({

    providers: {
      pin: {
        regex: /pinterest.com\/pin\/(.+)\//,
        html: "<div style=\"text-align:center\"><a data-pin-do=\"embedPin\" href=\"http://pinterest.com/pin/{{remote_id}}/\">Pin on Pinterest</a> <script type=\"text/javascript\" async src=\"//assets.pinterest.com/js/pinit.js\"></script></div>"
      }
    },

    type: 'pinterest',
    title: 'Pinterest',

    pastable: true,

    paste_options: {
      html: "<div style=\"text-align:center; padding:20px;\"><b>Pinterest</b><input type=\"text\" class=\"st-paste-block\" style=\"width: 100%\" placeholder=\"Enter code for Wordpress\"></div>"
    },

    icon_name: 'image',

    loadData: function(data) {

      if (!this.providers.hasOwnProperty(data.source)) { return; }

      var embed_string = this.providers[data.source].html
        .replace('{{remote_id}}', data.remote_id);

      this.$editor.html(embed_string);
    },

    onContentPasted: function(event){
      this.handleDropPaste($(event.target).val());
    },

    handleDropPaste: function(url){
      if(!_.isURI(url)) {
        return;
      }

      var match, data;

      _.each(this.providers, function(provider, index) {
        match = provider.regex.exec(url);

        if(match !== null && !_.isUndefined(match[1])) {
          data = {
            source: index,
            remote_id: match[1]
          };

          this.setAndLoadData(data);
        }
      }, this);
    },

    onDrop: function(transferData){
      var url = transferData.getData('text/plain');
      this.handleDropPaste(url);
    }
  });

})();

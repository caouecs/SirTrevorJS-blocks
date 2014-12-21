SirTrevor.Blocks.Slideshare = (function(){

  return SirTrevor.Block.extend({

    provider: {
      regex: /slideshare id=(.+)&doc/,
      html: "<iframe src=\"http://www.slideshare.net/slideshow/embed_code/{{remote_id}}?rel=0\" width=\"425\" height=\"355\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" style=\"border:1px solid #CCC; border-width:1px 1px 0; margin-bottom:5px; max-width: 100%;\" allowfullscreen> </iframe>"
    },

    type: "slideshare",
    title: "SlideShare",

    pastable: true,

    paste_options: {
      html: "<div style=\"text-align:center; padding:20px;\">Enter <b>Slideshare</b> code for Wordpress.com blogs (ex: [slideshare id=...)<br /><input type=\"text\" class=\"st-paste-block\" style=\"width: 100%\" placeholder=\"Enter code for Wordpress\"></div>"
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

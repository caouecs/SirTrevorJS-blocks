SirTrevor.Blocks.Facebook = (function(){

  return SirTrevor.Block.extend({

    provider: {
      regex: /https:\/\/www.facebook.com\/(.+)\/posts\/(.+)" /,
      html: "<div style=\"text-align: center\"><div id=\"fb-root\"></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id=id; js.src=\"//connect.facebook.net/en_GB/all.js#xfbml=1\"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script><div class=\"fb-post\" data-href=\"https://www.facebook.com/{{author}}/posts/{{remote_id}}\" data-width=\"466\" style=\"overflow-x: hidden;overflow-y:hidden; max-width: 100%;\"><div class=\"fb-xfbml-parse-ignore\"><a href=\"https://www.facebook.com/{{author}}/posts/{{remote_id}}\">Post</a> by <a href=\"https://www.facebook.com/{{author}}\">{{author}}</a>.</div></div></div>"
    },

    type: "facebook",
    title: "Facebook",

    pastable: true,

    paste_options: {
      html: "<div style=\"text-align:center; padding:20px;\">Enter <b>Facebook</b> embed code<br /><input type=\"text\" class=\"st-paste-block\" style=\"width: 100%\"></div>"
    },

    icon_name: "image",

    loadData: function(data) {

      var embedString = this.provider.html
        .replace("{{author}}", data.author)
        .replace("{{remote_id}}", data.remote_id);

      this.$editor.html(embedString);
    },

    onContentPasted: function(event){
      this.handleDropPaste($(event.target).val());
    },

    handleDropPaste: function(url){

      var match = this.provider.regex.exec(url);

      if (match !== null && !_.isUndefined(match[1])) {
        var data = {
          author: match[1],
          remote_id: match[2]
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

SirTrevor.Blocks.Video = (function(){

  return SirTrevor.Block.extend({

    // Based on https://gist.github.com/jeffling/a9629ae28e076785a14f
    providers: {
      vimeo: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?vimeo.com\/(.+)/,
        html: "<iframe src=\"{{protocol}}//player.vimeo.com/video/{{remote_id}}?title=0&byline=0\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>"
      },
      youtube: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?(?:(?:youtube.com\/watch\?(?:.*)(?:v=))|(?:youtu.be\/))([^&].+)/,
        html: "<iframe src=\"{{protocol}}//www.youtube.com/embed/{{remote_id}}\" width=\"580\" height=\"320\" frameborder=\"0\" allowfullscreen></iframe>"
      },
      vine: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?vine.co\/v\/([^\W]*)/,
        html: "<iframe class=\"vine-embed\" src=\"{{protocol}}//vine.co/v/{{remote_id}}/embed/simple\" width=\"{{width}}\" height=\"{{width}}\" frameborder=\"0\"></iframe><script async src=\"http://platform.vine.co/static/scripts/embed.js\" charset=\"utf-8\"></script>",
        square: true
      },
      dailymotion: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?dai(?:.ly|lymotion.com\/video)\/([^\W_]*)/,
        html: "<iframe src=\"{{protocol}}//www.dailymotion.com/embed/video/{{remote_id}}\" width=\"580\" height=\"320\" frameborder=\"0\"></iframe>"
      },
      metacafe: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?metacafe.com\/watch\/(.+)/,
        html: "<iframe src=\"{{protocol}}//www.metacafe.com/embed/{{remote_id}}/\" width=\"540\" height=\"304\" allowFullScreen frameborder=0></iframe>"
      },
      yahoo: {
        regex: /(?:http[s]?:\/\/)screen.yahoo.com\/(.+).html/,
        html: "<iframe width=\"640\" height=\"360\" scrolling=\"no\" frameborder=\"0\" src=\"{{protocol}}//screen.yahoo.com/embed/{{remote_id}}.html\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" allowtransparency=\"true\"></iframe>"
      },
      ustream: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?ustream.tv\/channel\/(.+)/,
        html: "<iframe width=\"640\" height=\"392\" src=\"{{protocol}}//www.ustream.tv/embed/{{remote_id}}?v=3&amp;wmode=direct\" scrolling=\"no\" frameborder=\"0\" style=\"border: 0px none transparent;\"></iframe>"
      },
      ustreamrecord: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?ustream.tv\/recorded\/(.+)/,
        html: "<iframe width=\"640\" height=\"392\" src=\"{{protocol}}//www.ustream.tv/embed/recorded/{{remote_id}}?v=3&amp;wmode=direct\" scrolling=\"no\" frameborder=\"0\" style=\"border: 0px none transparent;\"></iframe>"
      },
      veoh: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?veoh.com\/watch\/([[:alnum:]]*)/,
        html: "<object width=\"640\" height=\"532\" id=\"veohFlashPlayer\" name=\"veohFlashPlayer\"><param name=\"movie\" value=\"http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1444&amp;permalinkId={{remote_id}}&amp;player=videodetailsembedded&amp;videoAutoPlay=0&amp;id=anonymous\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1444&amp;permalinkId={{remote_id}}&amp;player=videodetailsembedded&amp;videoAutoPlay=0&amp;id=anonymous\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"640\" height=\"532\" id=\"veohFlashPlayerEmbed\" name=\"veohFlashPlayerEmbed\"></embed></object>"
      },
      vevo: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?vevo.com\/watch(?:.*)\/(.+)/,
        html: "<iframe width=\"575\" height=\"324\" src=\"http://cache.vevo.com/m/html/embed.html?video={{remote_id}}\" frameborder=\"0\" allowfullscreen></iframe>"
      },
      aol: {
        regex: /(?:http[s]?:\/\/)on.aol.com\/video(?:.*)-(.+)(?:\?.*)*/,
        html: "<script type=\"text/javascript\" src=\"http://pshared.5min.com/Scripts/PlayerSeed.js?sid=281&amp;width=560&amp;height=345&amp;playList={{remote_id}}\"></script>"
      },
      metatube: {
        regex: /(?:http[s]?:\/\/)?(?:www.)?metatube.com\/(?:.+)\/videos\/(.+)\//,
        html: "<iframe width=\"640\" height=\"480\" src=\"http://www.metatube.com/en/videos/{{remote_id}}/embed/\" frameborder=\"0\" allowfullscreen></iframe>"
      },
      wat: {
        regex: /www.wat.tv\/embedframe\/([[:alnum:]]*)/,
        html: "<iframe src=\"http://www.wat.tv/embedframe/{{remote_id}}\" frameborder=\"0\" style=\"width: 640px; height: 360px;\"></iframe>"
      },
      dailymailuk: {
        regex: /dailymail.co.uk\/video\/tvshowbiz\/video-(.+)\/(?:.+).html/,
        html: "<iframe frameborder=\"0\" width=\"698\" height=\"503\" scrolling=\"no\" id=\"molvideoplayer\" title=\"MailOnline Embed Player\" src=\"http://www.dailymail.co.uk/embed/video/{{remote_id}}.html\"></iframe>"
      },
      cplus: {
        regex: /canalplus.fr\/embed\/\?param=cplus&vid=(.+)"><\/iframe/,
        html: "<iframe width=\"640\" height=\"360\" frameborder=\"0\" scrolling=\"no\" src=\"http://player.canalplus.fr/embed/?param=cplus&amp;vid={{remote_id}}\"></iframe>"
      }
    },

    type: 'video',
    title: function() { return i18n.t('blocks:video:title'); },

    droppable: true,
    pastable: true,

    icon_name: 'video',

    loadData: function(data){
      if (!this.providers.hasOwnProperty(data.source)) { return; }

      if (this.providers[data.source].square) {
        this.$editor.addClass('st-block__editor--with-square-media');
      } else {
        this.$editor.addClass('st-block__editor--with-sixteen-by-nine-media');
      }

      var embed_string = this.providers[data.source].html
        .replace('{{protocol}}', window.location.protocol)
        .replace('{{remote_id}}', data.remote_id)
        .replace('{{width}}', this.$editor.width()); // for videos that can't resize automatically like vine

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

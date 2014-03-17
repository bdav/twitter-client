(function(){
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  $(function() {
    // debugger
    $(document).on('click', '.expCol', function(e) {
      e.preventDefault();
      if ($(this).hasClass("expanded")){
        $(this).html('Expand');
      }
      else {
        $(this).html('Collapse');
      }
      $(this).toggleClass("expanded");
      $(this).closest('.tweets').find('.expansion').slideToggle("fast");
      $(this).parents('.tweets').toggleClass('expandedTweet');
      $(this).parents('.tweets').prev().toggleClass('aboveExpanded');
      $(this).parents('.tweets').next().toggleClass('belowExpanded');
    });

    $(document).on('click', '.sortButton', function(e) {
      e.preventDefault();
      $('.tweets').removeClass('expandedTweet aboveExpanded belowExpanded');
      $('.expansion').css("display", "none");
      $('.expCol').html('Expand');
    });

    function scrollInfinito(){
      if($(window).scrollTop() + $(window).height() > $(document).height() - 700 && window.tweetsCollection.pageNumber < 7 ) {
        window.tweetsCollection.pageNumber++;
        window.tweetsCollection.fetch({data:{page:window.tweetsCollection.pageNumber}, reset: false}) 
      }
    }

    $(window).scroll(_.throttle(scrollInfinito, 1000));

    $('#postTweet').click(function() {
      var userName = $('#userName').val();
      var message = $('#message').val(); 
      postTweet(userName, message);
    })
  });

  // function loadMore(){
  //   if (!$('body').hasClass('processing')){ 
  //     $('body').addClass("processing");
  //     $.ajax({
  //       url: "/api/retrieveTweets/abcd",
  //       type: "GET",
  //       data: {
  //         page: pageNumber
  //       },
  //        success: function(response) {
  //         var template = window.JST['templates/tweet'];
  //         for (var i=0;i<response.statuses.length;i++){
  //           var month = months[new Date(response.statuses[i].created_at).getMonth()];
  //           var day = new Date(response.statuses[i].created_at).getDate()+1;
  //           $('#tweetsContainer').append(template({status: response.statuses[i], idNum: i, month: month, day: day}));
  //           var retweets = response.statuses[i].retweet_count;
  //           var userName = response.statuses[i].user.name;
  //           var userPic = response.statuses[i].user.profile_image_url;
  //           var followers = response.statuses[i].user.followers_count;
  //           // debugger
  //           var place = response.statuses[i].user.location;
  //           var hashtags = response.statuses[i].entities.hashtags;
  //           trackRetweets(retweets, userName, userPic, followers, place, hashtags);
  //           trackFollowers(retweets, userName, userPic, followers, place, hashtags);
  //           trackPlaces(place);
  //           // trackTrends(hashtags);
  //         }
  //         pageNumber++
  //         $("body").removeClass("processing");
  //         var options = {
  //          valueNames: [ 'timeStamp', 'retweets', 'favorites', 'followers', 'totalTweets' ]
  //         };
  //         var tweetsList = new List('appContainer', options);
  //         revealTopRetweeters();
  //         revealTopFollowed();
  //         revealTopPlaces();
  //         // revealTopTrends();
  //        } 
  //     })
  //   }
  //  }  
  // function postTweet(userName, message) {
  //   $.ajax({
  //     type: "post",
  //     url:"/api/posttweet",
  //     data: {
  //       username: userName,
  //       message: message
  //     },
  //     dataType: "json",
  //     success: function(data){
  //       debugger;
  //     }, 
  //     error: function(xhr, status, error){
  //       debugger;
  //     }
  //   })
  // }
  // var topRetweeters = [];
  // var topFollowed = [];
  // var topPlaces = [];
  // var topTrends = [];
  // function tweeter(retweets, userName, userPic, followers, place, hashtags) {
  //   this.retweets = retweets;
  //   this.userName = userName;
  //   this.userPic = userPic;
  //   this.followers = followers;
  //   this.place = place;
  //   this.hashtags = hashtags;
  // }
  // function trackRetweets(retweets, userName, userPic, followers, place, hashtags){
  //   for (var i=0;i<topRetweeters.length;i++){
  //     if (userName == topRetweeters[i].userName){
  //       topRetweeters[i].retweets += retweets;
  //       return
  //     }
  //   }
  //   topRetweeters.push(new tweeter(retweets, userName, userPic));
  // }
  // function revealTopRetweeters(){
  //   topRetweeters.sort(compareRetweets);
  //   $('#topRetweeterImg').html("<img src='"+topRetweeters[0].userPic+"'/>");
  //   $('#topRetweeterName').html(topRetweeters[0].userName);
  //   $('#topRetweeterNum').html(topRetweeters[0].retweets);
  //   $('#secondRetweeterImg').html("<img src='"+topRetweeters[1].userPic+"'/>");
  //   $('#secondRetweeterName').html(topRetweeters[1].userName);
  //   $('#secondRetweeterNum').html(topRetweeters[1].retweets);
  //   $('#thirdRetweeterImg').html("<img src='"+topRetweeters[2].userPic+"'/>");
  //   $('#thirdRetweeterName').html(topRetweeters[2].userName);
  //   $('#thirdRetweeterNum').html(topRetweeters[2].retweets);
  // }
  // function compareRetweets(a,b){
  //   if (a.retweets > b.retweets){
  //     return -1;
  //   }
  //   else if (a.retweets < b.retweets){
  //     return 1;
  //   }
  //   else {
  //     return 0;
  //   }
  // }
  // function trackFollowers(retweets, userName, userPic, followers, place, hashtags){
  //   for (var i=0;i<topFollowed.length;i++){
  //     if (userName == topFollowed[i].userName){
  //       return
  //     }
  //   }
  //   topFollowed.push(new tweeter(retweets, userName, userPic, followers, place, hashtags));
  // }
  // function revealTopFollowed(){
  //   topFollowed.sort(compareFollowers);
  //   $('#topFollowedImg').html("<img src='"+topFollowed[0].userPic+"'/>");
  //   $('#topFollowedName').html(topFollowed[0].userName);
  //   $('#topFollowedNum').html(topFollowed[0].followers);
  //   $('#secondFollowedImg').html("<img src='"+topFollowed[1].userPic+"'/>");
  //   $('#secondFollowedName').html(topFollowed[1].userName);
  //   $('#secondFollowedNum').html(topFollowed[1].followers);
  //   $('#thirdFollowedImg').html("<img src='"+topFollowed[2].userPic+"'/>");
  //   $('#thirdFollowedName').html(topFollowed[2].userName);
  //   $('#thirdFollowedNum').html(topFollowed[2].followers);
  // }
  // function compareFollowers(a,b){
  //   if (a.followers > b.followers){
  //     return -1;
  //   }
  //   else if (a.followers < b.followers){
  //     return 1;
  //   }
  //   else {
  //     return 0;
  //   }
  // }
  // function places(place){
  //   this.place = place;
  //   this.mentions = 1;
  // }
  // function trackPlaces(place){
  //    if (place != ""){
  //     for (var i=0;i<topPlaces.length;i++) {
  //       if (place == topPlaces[i].place){
  //         topPlaces[i].mentions++
  //         return;
  //       }   
  //     }
  //     topPlaces.push(new places(place));
  //   }      
  // }
  // function revealTopPlaces(){
  //   topPlaces.sort(comparePlaces);
  //   $('#topPlaceName').html(topPlaces[0].place);
  //   $('#topPlaceNum').html(topPlaces[0].mentions);
  //   $('#secondPlaceName').html(topPlaces[1].place);
  //   $('#secondPlaceNum').html(topPlaces[1].mentions);
  //   $('#thirdPlaceName').html(topPlaces[2].place);
  //   $('#thirdPlaceNum').html(topPlaces[2].mentions);
  // }
  // function comparePlaces(a,b){
  //   if (a.mentions > b.mentions){
  //     return -1;
  //   }
  //   else if (a.mentions < b.mentions){
  //     return 1;
  //   }
  //   else {
  //     return 0;
  //   }
  // }
  // function trends(hashtags){
  //   this.trend = hashtags;
  //   this.mentions = 1;
  // }
  // function trackTrends(hashtags){
  //    if (hashtags != ""){
  //     for (var i=0;i<topTrends.length;i++) {
  //       if (hashtags == topTrends[i].trend){
  //         topTrends[i].mentions++
  //         return;
  //       }   
  //     }
  //     topTrends.push(new trends(hashtags));
  //   }      
  // }
  // function revealTopTrends(){
  //   topTrends.sort(compareTrends);
  //   $('#topTrendName').html(topTrends[0].trend);
  //   $('#topTrendNum').html(topTrends[0].trend);
  //   $('#secondTrendName').html(topTrends[1].trend);
  //   $('#secondTrendNum').html(topTrends[1].trend);
  //   $('#thirdTrendName').html(topTrends[2].trend);
  //   $('#thirdTrendNum').html(topTrends[2].trend);
  // }
  // function compareTrends(a,b){
  //   if (a.mentions > b.mentions){
  //     return -1;
  //   }
  //   else if (a.mentions < b.mentions){
  //     return 1;
  //   }
  //   else {
  //     return 0;
  //   }
  // }
})();

$(document).ready(function(){
  window.tweetsCollection = new statusCollection();  
  new tweetsView({collection: tweetsCollection});
  new widgetsColumn({collection: tweetsCollection});
});


var tweetsView = Backbone.View.extend({
  el: "#tweetsContainer",
  template: window.JST['templates/tweet'], 
  render: function(){
    var renderedTest = this.collection.where({rendered: false})
    for (var i =0;i<renderedTest.length;i++){
      this.$el.append(this.template({status: renderedTest [i].toJSON()}))
      renderedTest[i].set({rendered: true})

    }
  },
  initialize: function(){
    this.collection.on("all", function(event){console.log(event)})
    this.collection.on("sync", this.render, this)
  }
});

var widgetView = Backbone.View.extend({
  className: 'row',
  template: window.JST['templates/widget'],
  initialize: function(options){
    this.array = options.array;
    this.title = options.title;
    this.render();
  },
  render: function(){
    this.$el.append(this.template({title: this.title}));
    for (var i=0;i<3;i++) {
      this.$('.winnersContainer').append(new widgetRowView({winner: this.array[i]}).$el)
    } 
  }
});

var widgetRowView = Backbone.View.extend({
  className: 'widgetRow row',
  initialize: function(options){
    this.winner = options.winner;
    this.render();
  },
  render: function(){
    if (this.winner.hasOwnProperty("profilePic")){
      this.template = window.JST['templates/widgetrow']
    }
    else{
      this.template = window.JST['template/widget_row_no_pic']
    }
    this.$el.append(this.template(this.winner))
    $("img").error(function() { 
      $(this).attr('src', 'assets/default.png'); 
    });
  }
});

var widgetsColumn = Backbone.View.extend({
  el:"#widgetsColumn",
  render: function(){
    var topRetweeters = this.collection.topRetweeters();
    var displayWidgetView = new widgetView({array: topRetweeters, title: "Most Retweeted"});
    this.$el.append(displayWidgetView.$el);
    var mostFollowed = this.collection.mostFollowed();
    var display2ndWidgetView = new widgetView({array: mostFollowed, title: "Most Followers"});
    this.$el.append(display2ndWidgetView.$el);
  },
  initialize: function(){
    this.collection.on ("sync", this.render, this)
  }
});


var statusModel = Backbone.Model.extend({
  defaults:{
    rendered: false
  }
});


var statusCollection = Backbone.Collection.extend({
  url: "/api/retrieveTweets/abcd",
  model: statusModel,
  pageNumber: 1,
  parse: function(response){
    return response.statuses;
  },
  initialize: function(){
    this.fetch({data:{page:this.pageNumber}})
  },
  compareNumbers: function (a,b){
    if (a.number > b.number){
      return -1;
    }
    else if (a.number < b.number){
      return 1;
    }
    else {
      return 0;
    }
  },
  topRetweeters: function(){
    var topRetweeters = {};
    for (var i=0;i<this.length;i++){
      var retweetCount = 0;
      if (topRetweeters[this.at(i).get("user").screen_name]){
        retweetCount = topRetweeters[this.at(i).get("user").screen_name].retweets
      }
      topRetweeters[this.at(i).get("user").screen_name] = {
        name: this.at(i).get("user").screen_name,
        number: retweetCount + this.at(i).get("retweet_count"),
        profilePic: this.at(i).get("user").profile_image_url
      }
    }
    var retweetersArray = [];
    _.each(topRetweeters, function(retweeter){
      retweetersArray.push(retweeter);
    })
    retweetersArray.sort(this.compareNumbers);
    return retweetersArray;
  },
  mostFollowed: function(){
    var mostFollowed = {};
    for (var i=0;i<this.length;i++){
      mostFollowed[this.at(i).get("user").screen_name] = {
        name: this.at(i).get("user").screen_name,
        number: this.at(i).get("user").followers_count,
        profilePic: this.at(i).get("user").profile_image_url
      }
    }
    var mostFollowedArray = [];
    _.each(mostFollowed, function(tweeter){
      mostFollowedArray.push(tweeter);
    })
    mostFollowedArray.sort(this.compareNumbers);
    return mostFollowedArray;
  } 
});
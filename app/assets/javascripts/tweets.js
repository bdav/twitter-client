(function(){
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  var pageNumber = 1;

  $(function() {
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

    $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() > $(document).height() - 250 && pageNumber < 7) {
           loadMore();
       }
    }); 

    loadMore();
    $('#postTweet').click(function() {
      var userName = $('#userName').val();
      var message = $('#message').val(); 
      postTweet(userName, message);
    })
  });

  function loadMore(){
    if (!$('body').hasClass('processing')){ 
      $('body').addClass("processing");
      $.ajax({
        url: "/api/retrieveTweets/abcd",
        type: "GET",
        data: {
          page: pageNumber
        },
         success: function(response) {
          var template = window.JST['templates/tweet'];
          for (var i=0;i<response.statuses.length;i++){
            var month = months[new Date(response.statuses[i].created_at).getMonth()];
            var day = new Date(response.statuses[i].created_at).getDate()+1;
            $('#tweetsContainer').append(template({status: response.statuses[i], idNum: i, month: month, day: day}));
            var retweets = response.statuses[i].retweet_count;
            var userName = response.statuses[i].user.name;
            var userPic = response.statuses[i].user.profile_image_url;
            var followers = response.statuses[i].user.followers_count;
            // debugger
            var place = response.statuses[i].user.location;
            var hashtags = response.statuses[i].entities.hashtags;
            trackRetweets(retweets, userName, userPic, followers, place, hashtags);
            trackFollowers(retweets, userName, userPic, followers, place, hashtags);
            trackPlaces(place);
            // trackTrends(hashtags);
          }
          pageNumber++
          $("body").removeClass("processing");
          var options = {
           valueNames: [ 'timeStamp', 'retweets', 'favorites', 'followers', 'totalTweets' ]
          };
          var tweetsList = new List('appContainer', options);
          revealTopRetweeters();
          revealTopFollowed();
          revealTopPlaces();
          // revealTopTrends();
         } 
      })
    }
   }  
  function postTweet(userName, message) {
    $.ajax({
      type: "post",
      url:"/api/posttweet",
      data: {
        username: userName,
        message: message
      },
      dataType: "json",
      success: function(data){
        debugger;
      }, 
      error: function(xhr, status, error){
        debugger;
      }
    })
  }
  var topRetweeters = [];
  var topFollowed = [];
  var topPlaces = [];
  var topTrends = [];
  function tweeter(retweets, userName, userPic, followers, place, hashtags) {
    this.retweets = retweets;
    this.userName = userName;
    this.userPic = userPic;
    this.followers = followers;
    this.place = place;
    this.hashtags = hashtags;
  }
  function trackRetweets(retweets, userName, userPic, followers, place, hashtags){
    for (var i=0;i<topRetweeters.length;i++){
      if (userName == topRetweeters[i].userName){
        topRetweeters[i].retweets += retweets;
        return
      }
    }
    topRetweeters.push(new tweeter(retweets, userName, userPic));
  }
  function revealTopRetweeters(){
    topRetweeters.sort(compareRetweets);
    $('#topRetweeterImg').html("<img src='"+topRetweeters[0].userPic+"'/>");
    $('#topRetweeterName').html(topRetweeters[0].userName);
    $('#topRetweeterNum').html(topRetweeters[0].retweets);
    $('#secondRetweeterImg').html("<img src='"+topRetweeters[1].userPic+"'/>");
    $('#secondRetweeterName').html(topRetweeters[1].userName);
    $('#secondRetweeterNum').html(topRetweeters[1].retweets);
    $('#thirdRetweeterImg').html("<img src='"+topRetweeters[2].userPic+"'/>");
    $('#thirdRetweeterName').html(topRetweeters[2].userName);
    $('#thirdRetweeterNum').html(topRetweeters[2].retweets);
  }
  function compareRetweets(a,b){
    if (a.retweets > b.retweets){
      return -1;
    }
    else if (a.retweets < b.retweets){
      return 1;
    }
    else {
      return 0;
    }
  }
  function trackFollowers(retweets, userName, userPic, followers, place, hashtags){
    for (var i=0;i<topFollowed.length;i++){
      if (userName == topFollowed[i].userName){
        return
      }
    }
    topFollowed.push(new tweeter(retweets, userName, userPic, followers, place, hashtags));
  }
  function revealTopFollowed(){
    topFollowed.sort(compareFollowers);
    $('#topFollowedImg').html("<img src='"+topFollowed[0].userPic+"'/>");
    $('#topFollowedName').html(topFollowed[0].userName);
    $('#topFollowedNum').html(topFollowed[0].followers);
    $('#secondFollowedImg').html("<img src='"+topFollowed[1].userPic+"'/>");
    $('#secondFollowedName').html(topFollowed[1].userName);
    $('#secondFollowedNum').html(topFollowed[1].followers);
    $('#thirdFollowedImg').html("<img src='"+topFollowed[2].userPic+"'/>");
    $('#thirdFollowedName').html(topFollowed[2].userName);
    $('#thirdFollowedNum').html(topFollowed[2].followers);
  }
  function compareFollowers(a,b){
    if (a.followers > b.followers){
      return -1;
    }
    else if (a.followers < b.followers){
      return 1;
    }
    else {
      return 0;
    }
  }
  function places(place){
    this.place = place;
    this.mentions = 1;
  }
  function trackPlaces(place){
     if (place != ""){
      for (var i=0;i<topPlaces.length;i++) {
        if (place == topPlaces[i].place){
          topPlaces[i].mentions++
          return;
        }   
      }
      topPlaces.push(new places(place));
    }      
  }
  function revealTopPlaces(){
    topPlaces.sort(comparePlaces);
    $('#topPlaceName').html(topPlaces[0].place);
    $('#topPlaceNum').html(topPlaces[0].mentions);
    $('#secondPlaceName').html(topPlaces[1].place);
    $('#secondPlaceNum').html(topPlaces[1].mentions);
    $('#thirdPlaceName').html(topPlaces[2].place);
    $('#thirdPlaceNum').html(topPlaces[2].mentions);
  }
  function comparePlaces(a,b){
    if (a.mentions > b.mentions){
      return -1;
    }
    else if (a.mentions < b.mentions){
      return 1;
    }
    else {
      return 0;
    }
  }
  function trends(hashtags){
    this.trend = hashtags;
    this.mentions = 1;
  }
  function trackTrends(hashtags){
     if (hashtags != ""){
      for (var i=0;i<topTrends.length;i++) {
        if (hashtags == topTrends[i].trend){
          topTrends[i].mentions++
          return;
        }   
      }
      topTrends.push(new trends(hashtags));
    }      
  }
  function revealTopTrends(){
    topTrends.sort(compareTrends);
    $('#topTrendName').html(topTrends[0].trend);
    $('#topTrendNum').html(topTrends[0].trend);
    $('#secondTrendName').html(topTrends[1].trend);
    $('#secondTrendNum').html(topTrends[1].trend);
    $('#thirdTrendName').html(topTrends[2].trend);
    $('#thirdTrendNum').html(topTrends[2].trend);
  }
  function compareTrends(a,b){
    if (a.mentions > b.mentions){
      return -1;
    }
    else if (a.mentions < b.mentions){
      return 1;
    }
    else {
      return 0;
    }
  }
})();

var testView = Backbone.View.extend({
  el: "#testContainer", 
  events: {
    "click": "someFunction"
  },
  someFunction: function(){
    alert("sucess");
  },
  render: function(){
    this.$el.html(this.model.get("age"));
  },
  initialize: function(){
    this.render();
    this.model.on("change", this.render, this)
    this.collection.on("all", function(eventName){console.log(eventName)})
  }
})
$(document).ready(function(){
  window.model = new testModel();
  window.collection = new testCollection();  
  window.view = new testView({model: window.model, height:"tall", collection: window.collection});
});
var testModel = Backbone.Model.extend({
  defaults: {
    name: "firstModel",
    age: 1, 
    degreeOfAwesomeness: 100 
  }
})
var testCollection = Backbone.Collection.extend({
  url: "/api/retrieveTweets/abcd",
  model: testModel,
  parse: function(response){
    return response.statuses;
  },
  initialize: function(){
    this.fetch({data:{page:1}})
  }
})
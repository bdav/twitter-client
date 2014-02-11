var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var pageNumber = 1;
loadMore();
function loadMore(){
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
        $('#container').append(template({status: response.statuses[i], idNum: i, month: month, day: day}));
      }
     } 
  })
}
$(document).on('click', '.expCol', function test() {
  // if ($(this).hasClass('expanded')){
  //   debugger
  //   $(this).parents('.tweetBody').find('.expansion').css('display', 'none');
  // }
  // else {
  //    $(this).parents('.tweetBody').find('.expansion').css('display', 'visible');
  // }
  $(this).parent('.tweetBody').find('.expansion').toggle();
  $(this).toggleClass('expanded')
 });
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && pageNumber < 7) {
       // $(window).unbind('scroll');
       pageNumber++
       loadMore();
   }
});
function postTweet() {
  $.ajax({
    type: "post",
    url:"/api/posttweet",
    data: {
      // username: "first last",
      message: "hello"
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
// 1 expand/collapse button
// 2 explore list.js 
// 3 create 2 inputs & a button: username & message
//   -click function should call postTweet() and pass in username & message
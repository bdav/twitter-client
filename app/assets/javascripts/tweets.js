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
$(document).on('click', '.expCol', function(e) {
  e.preventDefault();
  if ($(this).hasClass("expanded")){
    $(this).html('Expand');
  }
  else {
    $(this).html('Collapse');
  }
  $(this).toggleClass("expanded");
  $(this).closest('.tweets').find('.expansion').toggle();
  $(this).parents('.tweets').toggleClass('expandedTweet');
  $(this).parents('.tweets').prev().toggleClass('aboveExpanded');
  $(this).parents('.tweets').next().toggleClass('belowExpanded');
 });
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && pageNumber < 7) {
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
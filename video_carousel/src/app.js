$1(window).ready(function() {

  var one = $1();

  // Reset
  document.body.style.margin = 0;
  document.body.style.padding = 0;

  // Hide info bar
  one.Platform.BeOn.hideInfoBar();
  one.Platform.BeOn.hidePoster();
  one.Platform.BeOn.hideControlBar();

  // Layout
  one.Platform.BeOn.layout({
    height : '100%',
    paddingTop : '16%',
    paddingBottom : '16%',
  });

  // Create video carousel
  new VideoCarousel();

});

// Constructor
var VideoCarousel = function() {
  
  var self = this;

  // this.options = this.options();

  console.log(window.views);
  
};
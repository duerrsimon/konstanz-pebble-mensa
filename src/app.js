var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');


var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    // Always upper case the description string
    var title = data.item[i].title;
    title = title.charAt(0).toUpperCase() + title.substring(1);
 var cat = data.item[i].category;
    cat= cat.charAt(0).toUpperCase() + cat.substring(1);
    // Add to menu items array
    items.push({
      title:cat,
      subtitle:title
    });
  }
  // Finally return whole array
  return items;
};

// extract day for menu bar from JSON
var weekDay = function(data) {
     var title = data.timestamp;
  return title;
};
// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text alternative to SPLASH icon
/* var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 84),
  text:'Wärme kaltes Essen auf...',
  font:'GOTHIC_28_BOLD',
  color:'black',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'white'
}); */
var image =new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: 'images/splash_bw.png'
});
// Add to splashWindow and show
//splashWindow.add(text);
splashWindow.add(image);
splashWindow.show();

// Make request to server with JSON
ajax(
  {
    url:'INSERT URL HERE',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
    var menuItems = parseFeed(data, 11);

    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: weekDay(data),
        items: menuItems
      }]
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    // Add an action for SELECT
    resultsMenu.on('select', function(e) {
     

  // Assemble Essen String
  var content = data.item[e.itemIndex].title;

  // Capitalize first letter
  content = content.charAt(0).toUpperCase() + content.substring(1);
       
    
  // Create the Card for detailed view
var detailCard = new UI.Card({
  subtitle: data.item[e.itemIndex].category,
  body: content
});
detailCard.show();
 });
    
    splashWindow.hide();
  },
  // throw error if json is not available
  function(error) {
    console.log('Download failed: ' + error);
  }
);

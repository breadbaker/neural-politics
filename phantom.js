// var fs = require('fs');
// var page = require('webpage').create();
// var url = 'https://afontz.com';

// // Открываем страницу
// page.open(url, function (status) {
//   if (status === 'success') {
//       console.log('Page has been loaded');

//       // Getting html content
//       html = page.evaluate(function() {
//           return $('html').html();
//       });

//       console.log(html);
//       var file = fs.open('page.html', 'w+');
//     file.write(html + '\n');
//     file.close();
//     phantom.exit();
//   }
// });

var phantom = require('phantom');
 
phantom.create(function (ph) {
    console.log('ph', ph)

  ph.createPage(function (page) {
    console.log('page', page)
    page.open("http://localhost:5000#!states/AL", function (status) {
      console.log("opened google? ", status);
      page.evaluate(function () { return document.getElementById("content").innerHTML; }, function (result) {
        console.log('Page title is ' + result);
        ph.exit();
      });
    });
  });
});
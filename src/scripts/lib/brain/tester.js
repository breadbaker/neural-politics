window.tester = {
  show : function(net) {
    $("#progress-box").hide();
    runNetwork = net.toFunction();
    runNetwork.name = "runNetwork"; // for view code later
    this.testRandom();
    $("#testing-box").show();
  },

  testRandom : function() {
    this.testColor(utils.randomColor());
  },

  testColor : function(color) {
    var rgb = utils.toRgb(color);
    $(".swatch").css("backgroundColor", rgb);

    var color = utils.normalize(color);
    $("#nn-swatch .swatch-text").html(nnColor(color));
  },

  viewCode : function(type) {
    if(type == 'nn' && !$("#nn-swatch-box").hasClass("selected")) {
      $("#code-header").text("neural network code:");
      var code = "var textColor = " + nnColor.toString()
                  + "\n\nvar runNetwork = " + runNetwork.toString();
      $("#code").text(code);
      $(".swatch-box").removeClass("selected");
      $("#nn-swatch-box").addClass("selected");
      $("#code-box").show();
    }
    else if(type == 'wcag' && !$("#wcag-swatch-box").hasClass("selected")) {
      $("#code-header").text("luminosity algorithm code:");
      var code = "var textColor = " + wcagColor.toString()
                  + "\n\nvar contrast = " + contrast.toString()
                  + "\n\nvar luminosity = " + luminosity.toString();
      $("#code").text(code);
      $(".swatch-box").removeClass("selected");
      $("#wcag-swatch-box").addClass("selected");
      $("#code-box").show();
    }
    else if(type == 'yiq' && !$("#yiq-swatch-box").hasClass("selected")) {
      $("#code-header").text("YIQ formula code:");
      var code = "var textColor = " + yiqColor.toString();

      $("#code").text(code);
      $(".swatch-box").removeClass("selected");
      $("#yiq-swatch-box").addClass("selected");
      $("#code-box").show();
    }
    else {
      $("#code-box").hide();
      $(".swatch-box").removeClass("selected");
    }
  }
}

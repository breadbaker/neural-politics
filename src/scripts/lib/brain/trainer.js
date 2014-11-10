window.trainer = {
  currentColor : utils.randomColor(),

  data : [],

  pickSwatch : function(color) {
    var result = { input: utils.normalize(this.currentColor),
                   output: { black : color == 'black' ? 1 : 0}};
    this.data.push(result);

    this.changeColor();

    // show the "Train network" button after we've selected a few entries
    if (this.data.length == 5) {
      $("#test-box").show();
    }
  },

  chooseColor: function (color, colors) {
    var result = {
      input: utils.normalize(this.currentColor),
      output: {
      }
    }

    _.each(colors, function (c) {
      result.output[c] = c === color ? 1 : 0
    });

    this.data.push(result);

    this.changeColor();
  },

  changeColor : function() {
    this.currentColor = utils.randomColor();
    var rgb = utils.toRgb(this.currentColor);
    $(".swatch").css("backgroundColor", rgb);
  },

  trainNetwork : function() {
    $("#training-box").hide();
    $("#progress-box").show();

    // if(window.Worker) {
    //   var worker = new Worker("training-worker.js");
    //   worker.onmessage = this.onMessage;
    //   worker.onerror = this.onError;
    //   worker.postMessage(JSON.stringify(this.data));
    // }
    // else {
      var net = new NeuralNetwork();
      net.train(this.data, {
        iterations: 9000
      });
      tester.show(net);
    // }
  },

  onMessage : function(event) {
    var data = JSON.parse(event.data);
    if(data.type == 'progress') {
      trainer.showProgress(data);
    }
    else if(data.type == 'result') {
      var net = new brain.NeuralNetwork().fromJSON(data.net);
      tester.show(net);
    }
  },

  onError : function(event) {
    $("#training-message").text("error training network: " + event.message);
  },

  showProgress : function(progress) {
    var completed = progress.iterations / trainer.iterations * 100;
    $("#progress-completed").css("width", completed + "%");
  }
}
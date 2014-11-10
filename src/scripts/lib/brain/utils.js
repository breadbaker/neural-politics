window.utils = {
  randomColor : function() {
    return { r: Math.round(Math.random() * 255),
             g: Math.round(Math.random() * 255),
             b: Math.round(Math.random() * 255) };
  },

  toRgb : function(color) {
    return "rgb(" + color.r + "," + color.g + "," + color.b + ")";
  },

  normalize : function(color) {
    return { r: color.r / 255, g: color.g / 255, b: color.b / 255 };
  }
}
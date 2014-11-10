/* these functions are outside so we can just call toString() for 'view code'*/
window.nnColor = function(bgColor) {
  var output = runNetwork(bgColor);

  var maxVal = 0;
  var maxVar;

  _.each(output, function (val, variable) {
    if (maxVal < val) {
      maxVar = variable;
      maxVal = val;
    }
  });

  return maxVar ? maxVar : 'other';
}

window.wcagColor = function(bgColor) {
  if(contrast(bgColor, {r: 1, g: 1, b: 1})
      > contrast(bgColor, {r: 0, g: 0, b: 0}))
    return 'white';
  return 'black';
}

window.luminosity = function(color) {
  var r = color.r, g = color.g, b = color.b;
  var red = (r <= 0.03928) ? r / 12.92 : Math.pow(((r + 0.055)/1.055), 2.4);
  var green = (g <= 0.03928) ? g / 12.92 : Math.pow(((g + 0.055)/1.055), 2.4);
  var blue = (b <= 0.03928) ? b / 12.92 : Math.pow(((b + 0.055)/1.055), 2.4);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

window.contrast = function(color1, color2) {
  var lum1 = luminosity(color1);
  var lum2 = luminosity(color2);
  if (lum1 > lum2) {
    return (lum1 + 0.05) / (lum2 + 0.05);
  }
  return (lum2 + 0.05) / (lum1 + 0.05);
}

window.yiqColor = function(bgColor) {
  var r = bgColor.r * 255,
      g = bgColor.g * 255,
      b = bgColor.b * 255;
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}
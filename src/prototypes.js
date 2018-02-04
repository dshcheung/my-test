Number.prototype.currency = function(){
  var unmod = this.toString().split("").reverse();
  var comma = Math.floor(unmod.length / 3);
  var leftOver = unmod.length % 3;
  for (var i = 1; i <= comma; i++) {
    if (i === comma && leftOver === 0) break;
    unmod.splice(i * 4 - 1, 0, ",");
  }
  return unmod.reverse().join("");
};

String.prototype.currency = function(){
  var splitted = this.split(".");
  var decimals = splitted[1];
  var unmod = splitted[0].split("").reverse();
  var comma = Math.floor(unmod.length / 3);
  var leftOver = unmod.length % 3;
  for (var i = 1; i <= comma; i++) {
    if (i === comma && leftOver === 0) break;
    unmod.splice(i * 4 - 1, 0, ",");
  }
  var final = unmod.reverse().join("");
  if (decimals) {
    final = final + "." + decimals;
  }
  return final;
};

String.prototype.decode = function(){
  var e = document.createElement('div');
  e.innerHTML = this;
  return e.innerHTML;
};

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.capitalizeAll = function(){
  return this.map(function(word){ return word.capitalize();  });
};

String.prototype.splitCap = function(split, join){
  return this.split(split).capitalizeAll().join(join || " ");
};

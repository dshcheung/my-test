Number.prototype.currency = function(){
  var unmod = this.toString().split("").reverse();
  var comma = Math.floor(unmod.length / 3);
  for (var i = 1; i <= comma; i++) {
    unmod.splice(i * 4 - 1, 0, ",");
  }
  return unmod.reverse().join("");
};

String.prototype.decode = function(){
  var e = document.createElement('div');
  e.innerHTML = this;
  return e.innerHTML;
};

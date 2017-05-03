function ImageLoader(){
  this.images = {};
}

ImageLoader.prototype.getImg = function(key){
	return this.images[key];
}

ImageLoader.prototype.load = function (key, imgURL) {
  var img = new Image();
  img.src = imgURL;
  this.images[key] = img;
};
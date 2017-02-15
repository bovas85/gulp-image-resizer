# Install

Install with npm

`npm install --save-dev gulp-image-resize`

GraphicsMagick and ImageMagick

Make sure GraphicsMagick and ImageMagick are installed on your system and properly set up in your PATH.

Windows & others:

http://www.imagemagick.org/script/binary-releases.php
http://www.graphicsmagick.org/download.html

Confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.  
Confirm that Gm is properly set up by executing `gm -help` in a terminal.

Example  
```
var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
 
gulp.task('default', function () {
  gulp.src('test.png')
    .pipe(imageResize({
      width : 100,
      height : 100,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist'));
});
```

# API

imageResize(options)
```
options.width
Type: Number
Default value: 0 (only if height is defined)

A number value that is passed as pixel or percentage value to imagemagick.

options.height
Type: Number
Default value: 0 (only if width is defined)

A number value that is passed as pixel or percentage value to imagemagick.

options.upscale
Type: Boolean
Default value: false

Determines whether images will be upscaled. If set to false (default), image will be copied instead of resized if it would be upscaled by resizing.

options.crop
Type: Boolean
Default value: false

Determines whether images will be cropped after resizing to exactly match options.width and options.height.

options.gravity
Type: String
Default value: Center
Possible values: NorthWest, North, NorthEast, West, Center, East, SouthWest, South, SouthEast

When cropping images this sets the image gravity. Doesn't have any effect, if options.crop is false.

options.quality
Type: Number
Default value: 1

Determines the output quality of the resized image. Ranges from 0 (really bad) to 1 (almost lossless). Only applies to jpg images.

options.format
Type: String
Default value: Format of the input file
Possible values: gif, png, jpeg etc.

Override the output format of the processed file.

options.filter
Type: String
Possible values: Point, Box, Triangle, Hermite, Hanning, Hamming, Blackman, Gaussian, Quadratic, Cubic, Catrom, Mitchell, Lanczos, Bessel, Sinc

Set the filter to use when resizing (e.g. Catrom is very good for reduction, while hermite is good for enlargement).

options.sharpen
Type: Boolean | String
Default value: false

Set to true to apply a slight unsharp mask after resizing. Or set a string to setup the unsharp. See gm unsharp documentation. (e.g. '0.5x0.5+0.5+0.008')

options.samplingFactor
Type: Array[Cr, Cb]
Possible values: [2, 2] for 4:2:2, [1, 1] for 4:1:1

Define chroma subsampling

options.noProfile
Type: Boolean
Default value: false

Set to true to enforce removal of all embedded profile data like icc, exif, iptc, xmp and so on. If source files represent e.g. untouched camera data or images optimized for print this may decrease image size drastically. Therefore this is probably wanted in cases where thumbnails are generated for web preview purposes. For details look for parameter +profile "*" in the gm profile documentation.

options.interlace
Type: Boolean
Default value: false

Set to true to create interlaced images (scanline interlacing) from PNG, GIF or JPEG files (also known as "progressive" JPEG). For details look for parameter -interlace <type> with the type value set to "Line" in the gm profile documentation.

options.imageMagick
Type: Boolean
Default value: false

Set to true when using ImageMagick instead of GraphicsMagick.

options.background
Type: String
Possible values: none to keep transparency, beige to set beige background, #888 for gray.

Define background color (default is white), for example when converting SVG images to PNGs. See gm background documentation

options.flatten
Type: Boolean
Default value: false

Combines image layers into one. Can be used for layered formats such as PNG. See gm flatten documentation.

options.percentage
Type: Number
Default value: null

The value that you want the image to be scaled to.
```

# More Examples

```
// Converting from png to jpeg. No resizing. 
gulp.task('convert_png', function () {
  return gulp.src('test.png')
    .pipe(imageResize({ format : 'jpeg' }))
    .pipe(gulp.dest('dist'));
});
 
// Only specify one dimension. Output image won't exceed this value. 
gulp.task('width', function () {
  gulp.src('test.png')
    .pipe(imageResize({
      width : 100
    }))
    .pipe(gulp.dest('dist'));
});
 
// Convert with percentage value. 
gulp.task('percentage', function() {
  gulp.src('test.png')
    .pipe(imageResize({
      percentage: 50
    }))
    .pipe(gulp.dest('dist'));
});
```

# Recommended modules
concurrent-transform: parallelize image resizing
```
var parallel = require("concurrent-transform");
var os = require("os");
 
gulp.task("parallel", function () {
  gulp.src("src/**/*.{jpg,png}")
    .pipe(parallel(
      imageResize({ width : 100 }),
      os.cpus().length
    ))
    .pipe(gulp.dest("dist"));
});
gulp-changed: only resize changed images
var changed = require("gulp-changed");
 
gulp.task("changed", function () {
  gulp.src("src/**/*.{jpg,png}")
    .pipe(changed("dist"))
    .pipe(imageResize({ width : 100 }))
    .pipe(gulp.dest("dist"));
});
gulp-rename: add a suffix or prefix
var rename = require("gulp-rename");
 
gulp.task("suffix", function () {
  gulp.src("src/**/*.{jpg,png}")
    .pipe(imageResize({ width : 100 }))
    .pipe(rename(function (path) { path.basename += "-thumbnail"; }))
    .pipe(gulp.dest("dist"));
});
```

# Tests
You need both ImageMagick and GraphicsMagick installed on your system to run the tests.  
Install all npm dev dependencies `npm install`  
Install gulp globally `npm install -g gulp`  
Run `gulp test`

# Errors 
http://stackoverflow.com/questions/41071318/error-eof-when-trying-to-resize-images-using-gulp-on-windows

# License
MIT © scalable minds
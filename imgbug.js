/*
imgbug.js 	version 0.1

The MIT License (MIT)

Copyright (c) 2014 Daniel Jackson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var imgbug = require("casper").create();
// argument to enter page url in the command line.
var url = imgbug.cli.args[0];
// array to store viewport width and heights.
var viewportSizes = [
	[1224,1],
	[1024,1],
	[768,1],
	[320,1]
];
// file directory variable
var saveDir = url.replace(/[^a-zA-Z0-9]/gi, '-').replace(/^https?-+/, '');

imgbug.start();

imgbug.each(viewportSizes, function(self, viewportSizes, i){
	// loop through viewport array elements and store width and height in variables.
	var width = viewportSizes[0];
	var height = viewportSizes[1];

	// wait time for the webpage to load.
	imgbug.wait(5000, function(){
		// set the viewport to the required height and width.
		this.viewport(width, height);

		imgbug.thenOpen(url, function(){
			this.echo('S')
			// set the file path, folder and file type where the screenshots will be saved.
            var fullPage = saveDir + '/viewport-' + width + ".jpeg";
            // capture the page on selected element.
            this.captureSelector(fullPage, 'html');
		});
	});
});

// run function with exit method.
imgbug.run(function(){
	this.echo('Capture has finished: ' + url).exit();
});
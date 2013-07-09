var PORT = 900;
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('./mime').types;

var server = http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	var realPath = "assets" + pathname;
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : "unknow";
	var contentType = mime[ext] || "text/plain";

	path.exists(realPath, function(exists){
		if(!exists){
			res.writeHead(404, {"Content-Type:": "text/plain"});
			res.write("This request URL " + pathname + " was not found on this server.");
			res.end();
		}else{
		
			fs.readFile(realPath, "binary", function(err, file){
				if(err){
					res.writeHead(500, {"Content-Type:": "text/plain"});
					res.end(err);
				}else{
					res.writeHead(404, {"Content-Type:": contentType});
					res.write(file, "binary");
					res.end();
				}
			});
		}
	})
	
	//res.write(pathname);

	/*
	res.writeHead(200, {"Content-Type:", "text/plain"});
	res.write("Hello World");
	res.end();
	*/
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
var PORT = 900;
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('./mime').types;
var config = require('./config');
var zlib = require('zlib');

var server = http.createServer(function(req, res){
	var pathname = url.parse(req.url).pathname;
	if(pathname.slice(-1) === '/'){
		pathname = pathname + config.Welcome.file;
	}
	console.log('pt', pathname);
	//var realPath = "assets" + pathname;
	var realPath = path.join("assets", path.normalize(pathname.replace(/../g, "")));
	console.log('realPath', realPath);
	var pathHandle = function(realPath){
		console.log('haha', realPath);
		fs.stat(realPath, function(err, stat){

			if(err){
				res.writeHead(404, {"Content-Type:": "text/plain"});
				res.write("This request URL " + pathname + " was not found on this server.");
				res.end();
			}else{
				if(stat.isDirectory()){
					realPath = path.join(realPath, "/", config.Welcome.file);
					pathHandle(realPath);
				}else{

					var ext = path.extname(realPath);
					ext = ext ? ext.slice(1) : "unknow";
					var contentType = mime[ext] || "text/plain";


					var lastModified = stat.mtime.toUTCString();
					res.setHeader("Last-Modified", lastModified);

					
					if(ext.match(config.Expires.fileMatch)){
						var expires = new Date();
						expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
						res.setHeader("Expires", expires.toUTCString());
						res.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
					}
					if(req.headers["if-modified-since"] && lastModified == req.headers["if-modified-since"]){
						res.writeHead(304, "Not Modified");
						res.end();
					}else{
						/*
						fs.readFile(realPath, "binary", function(err, file){
							if(err){
								res.writeHead(500, {"Content-Type:": "text/plain"});
								res.end(err);
							}else{
								res.writeHead(200, {"Content-Type:": contentType});
								res.write(file, "binary");
								res.end();
							}
						});
						*/

						var raw = fs.createReadStream(realPath);
						var accetpEncoding = req.headers['accept-encoding'] || "";
						var matched = ext.match(config.Compress.match);
						if(matched && accetpEncoding.match(/\bgzip\b/)){
							res.writeHead(200, "OK", {"Content-Encoding": "gzip"});
							raw.pipe(zlib.createGzip()).pipe(res);
						}else if(matched && accetpEncoding.match(/\bdeflate\b/)){
							res.writeHead(200, "OK", {'Content-Encoding': 'deflate'});
							raw.pipe(zlib.createDeflate()).pipe(res);
						}else{
							res.writeHead(200, "OK");
							raw.pipe(res);
						}
					}
				}
			}
		});
	}

	pathHandle(realPath);
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
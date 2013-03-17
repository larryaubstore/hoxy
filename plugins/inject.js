/*
Written by Laurence Morin-Daoust
Copyright (c) 2013
*/

/**
Inject javascript file into the page.
usage: @inject('javascriptFile.js')
*/

var fs = require('fs');

exports.run = function(api){
	var respInf = api.getResponseInfo();
	var ct = respInf.headers['content-type'];
	if (ct && ct.indexOf('html')>-1 && api.arg.length > 0) {

		var filename = api.arg(0);

		try {
			// file located in ./plugins/inject
			fs.readFile("./plugins/inject/" + filename, function (err, data) {
				if (!err) { 

					var html = api.getResponseBody();
					data = "<script type=\"text/javascript\">" + data + "</script>";
					var host = api.getRequestInfo().headers.host;
					if (typeof(html) !== "undefined" && html.length > 0) {
						html=html.replace(/<body([^>]*)>/, '<body$1>'+ data);
						api.setResponseBody(html);
					}
				}
				else {
					console.log("File not found ! Must be located in ./plugins/inject !");
				}
				api.notify();
			});
		} catch(err) {
			console.log(err);
			api.notify();
		}



	} else {
		api.notify();	
	}
};

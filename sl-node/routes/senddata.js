/**
 * getdata/get
 * @param request
 * @param response
 */
function select(request, response) {
    var pg = require('pg'); //链接postgresql数据库
    var conString = "tcp://postgres:0017@localhost/postgres";
    var client = new pg.Client(conString);  //构造一个数据库对象  
    client.connect(function (error, results) {
        if (error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }


        client.query("select * from company;", function (error, results) {
            console.log("in callback function.\n");
            if (error) {
                console.log("error");
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            if (results.rowCount > 0) {
                //callback(results);   
                //指定为json格式输出   
                response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});

                //先将results 字符串内容转化成json格式，然后响应到浏览器上   

                response.write(JSON.stringify(results.rows));
                response.end();
            }
        })

    });
}
/**
 * getdata/post
 * @param request
 * @param response
 */
function post(request, response) {
    var pg = require('pg'); //链接postgresql数据库
    var conString = "tcp://postgres:0017@localhost/postgres";
    var client = new pg.Client(conString);  //构造一个数据库对象  
    client.connect(function (error, results) {
        if (error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }


        client.query("select * from ur;", function (error, results) {
            console.log("in callback function.\n");
            if (error) {
                console.log("error");
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            if (results.rowCount > 0) {
                for (var i = 0; i < results.rowCount; i++) {
                    if (request.query.username == results.rows[i].name && request.query.password == results.rows[i].password) {
                        response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});

                        //先将results 字符串内容转化成json格式，然后响应到浏览器上

                        response.write(JSON.stringify(request.query.username));
                        response.end();
                    }
                }
                ;

            }
        })

    });
}
/**
 * register/post
 * @param request
 * @param response
 */
function register(request, response) {
    var pg = require('pg'); //链接postgresql数据库
    var conString = "tcp://postgres:0017@localhost/postgres";
    var client = new pg.Client(conString);  //构造一个数据库对象
	var insert;
    client.connect(function (error, results) {
        if (error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }
        insert = "insert into ur values(" + "'" + request.body.Username + "','" + request.body.Password + "');";
		 console.log(insert);
        client.query(insert, function (error, results) {
            console.log("in callback function.\n");
            if (error) {
                console.log("error");
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }

            response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});

            //先将results 字符串内容转化成json格式，然后响应到浏览器上

            response.write(JSON.stringify((results.rowCount) + 1));
            response.end();

        })

    });
}

function bbsdata(request, response) {
    var pg = require('pg'); //链接postgresql数据库
    var conString = "tcp://postgres:0017@localhost/sl";//数据库为sl
    var client = new pg.Client(conString);  //构造一个数据库对象  
    client.connect(function (error, results) {
        if (error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }


        client.query("select * from bbs;", function (error, results) {
            console.log("in callback function.\n");
            if (error) {
                console.log("error");
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            if (results.rowCount > 0) {
                //callback(results);   
                //指定为json格式输出   
                response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});

                //先将results 字符串内容转化成json格式，然后响应到浏览器上   

                response.write(JSON.stringify(results.rows));
                response.end();
            }
        })

    });
}

function postbbsdata(request, response) {
    var pg = require('pg'); //链接postgresql数据库
    var conString = "tcp://postgres:0017@localhost/sl";//数据库为sl
    var client = new pg.Client(conString);  //构造一个数据库对象  
    client.connect(function (error, results) {
        if (error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }

	var insert = "INSERT INTO bbs VALUES ('" + request.query.context + "','" + request.query.topic + "','" + request.query.nameg +  "','2016-8-8');";
	//var insert="INSERT INTO bbs VALUES ('Cheese','hdfjhsd','hfhsdfh','2010-12-10');"
        client.query(insert, function (error, results) {
            console.log("in callback function.\n");
            if (error) {
                console.log("error");
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            
        })
		client.query("select * from bbs;", function (error, results) {
            console.log("in callback function.\n");
            if (error) {
                console.log("error");
                console.log('GetData Error: ' + error.message);
                client.end();
                return;
            }
            if (results.rowCount > 0) {
                //callback(results);   
                //指定为json格式输出   
                response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});

                //先将results 字符串内容转化成json格式，然后响应到浏览器上   

                response.write(JSON.stringify(results.rows));
                response.end();
            }
        })

    });
}

exports.post = post;
exports.register = register;
exports.select = select;  
exports.bbsdata = bbsdata; 
exports.postbbsdata = postbbsdata; 

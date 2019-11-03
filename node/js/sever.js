const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

let fname;
var server = http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    var realpath=pathname.split('/');
    switch(realpath[1]){
        case '':
        case 'list':
            fname = 'chapterList';
            break;
        case 'login':
            fname = 'login';
            break;
        case 'listmanager':
            fname = 'list';
            break;
        case 'addChapter':
            fname = 'addChapter';
            break;
        case 'detail':
            fname = 'chapter';
            break;
        default :
            console.log('');
            break;
    }
    // console.log(realpath);
    switch(realpath[1]){
        case '':
        case 'list':
        case 'login':
        case 'listmanager':
        case 'addChapter':
        case 'detail':
            let content=fs.readFileSync(path.join(__dirname,'../'+fname+'.html'));
            res.writeHead(200,{'Content-Type' : 'text/html'});
            res.write(content);
            break;
        case 'css':
            let content1=fs.readFileSync(path.join(__dirname,'../css/'+realpath[2]));
            res.writeHead(200,{'Content-Type' : 'text/css'});
            res.write(content1);
            break;
        case 'js':
            let content2=fs.readFileSync(path.join(__dirname,'../js/'+realpath[2]));
            res.writeHead(200,{'Content-Type' : 'text/javascript'});
            res.write(content2);
            break;
        case 'images':
            if(realpath[2] === 'img'){
                let content3=fs.readFileSync(path.join(__dirname,'../images/img/'+realpath[3]));
                res.write(content3);
            }else{
                let content3=fs.readFileSync(path.join(__dirname,'../images/'+realpath[2]));
                res.write(content3);
            }
            let imgtype = realpath[2].split('.');
            switch(imgtype){
                case 'jpg' :
                    res.writeHead(200,{'Content-Type' : 'image/jpg'});
                    break;
                case 'jpeg' :
                    res.writeHead(200,{'Content-Type' : 'image/jpeg'});
                    break;
                case 'png' :
                    res.writeHead(200,{'Content-Type' : 'image/png'});
                    break;
                default :
                    console.log('');
                    break;
            }
            break;
        case 'json':
            let content4=fs.readFileSync(path.join(__dirname,'../json/'+realpath[2]));
            res.writeHead(200,{'Content-Type' : 'text/json'});
            res.write(content4);
            break;
        case 'list.json':
            // console.log(req.url);
            let title;
            if(req.url != '/list.json'){
                title = req.url.split('?')[1].split('=')[1];
                console.log(title);
            }
            fs.readFile('../json/list.json','utf-8',function(err,data){
                if(err){
                    console.error(err);
                }else{
                    var addFile = JSON.parse(data);
                    addFile.push(title);
                    var str = JSON.stringify(addFile);
                    fs.writeFile('../json/list.json',str,function(err){
                        if(err){
                            console.error(err);
                        }
                    })
                }
            })
            res.end();
        default :
            console.log('');
            break;
    }
    res.end();
});

server.listen(8083);
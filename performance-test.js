const requst = require('request')
//build a 100 links array
url_list = []
url_list.push(...Array(100).fill("https://www.google.com"))

const batch_num = 10;     // send 10 Http requests at one time
let batch_index = batch_num;
let resolvehandler = null;
function download_link(url){
    requst({
        url: url,
        timeout:1000
    },function(error,response,body){
        if (body){
            console.log(body.length)
        }
        batch_index = batch_index -1
        if(batch_index==0){
            batch_index = batch_num
            resolvehandler()
        }
    });
}

function download_batch(url_list){
    for(j = 0;j<batch_num;j++){
        download_link(url_list[j])
    }
}

async function download_all(url_list){
    let loop_count = url_list.length/batch_num;
    console.time('test')
    for(var i =0;i<loop_count;i++){
        await new Promise(function(resolve,reject){
            download_batch(url_list.slice(i*10,i*10+10))
            resolvehandler = resolve
        })
    }
    console.timeEnd('test')
}

download_all(url_list)

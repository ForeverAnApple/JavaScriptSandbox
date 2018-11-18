const fetch = require('node-fetch');
const request = require('request');
const file = require('fs');

async function fetchImageUrls(url, imgNum){
    let imgList = [];
    const res = await fetch(url);
    const data = await res.json();

    let imgCount = 0;
    for(let imgData of data){
        imgList.push(imgData['url']);
        imgCount++;
        if(imgCount >= imgNum){
            break;
        }
    }

    return imgList;
}

async function downloadImg(url, imgName, ){
    request.head(url, function(err, res, body){
        console.log('Downloading '+imgName+'...')

        request(url).pipe(file.createWriteStream('./Images/'+imgName).on('close', function(){
            console.log('Downloaded '+imgName+'!')
        }));
    });
}

async function appendImgs(url, imgNum){
    imgList = await fetchImageUrls(url, imgNum);
    console.log(imgList);

    let imgCount = 0;
    for(let imgUrl of imgList){
        downloadImg(imgUrl, 'image'+imgCount+'.png')
        imgCount++;
        if(imgCount > imgNum){
            break;
        }
    }
}

let photosUrl = 'https://jsonplaceholder.typicode.com/photos';

appendImgs(photosUrl, 5000);

console.log(fetch('https://via.placeholder.com/600/92c952'));
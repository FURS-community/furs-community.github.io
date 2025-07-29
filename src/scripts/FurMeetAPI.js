// 我知道我代码写的一坨，但是能跑所以先用着吧（目移）
let meetData = null;

fetch('https://api.furrycons.cn/event/recent') // 替换为你要请求的 API 地址
    .then(response => {
    if (!response.ok) {
        throw new Error('网络响应错误');
    }
    return response.json();
    })
    .then(json => {
    meetData = json;
    // console.log(meetData.total)
    // total = meetData.total
    // total = Number(total)
    // // console.log(meetData.total)
    // if(total <6){

    // }
    // else{

    
    const FurMeet1Name = document.getElementById('FurMeet1Name');
        FurMeet1Name.textContent = meetData.data[0].name;
    const FurMeet1Cover = document.getElementById('FurMeet1Cover');
        FurMeet1Cover.src = meetData.data[0].coverUrl;
    const FurMeet1City = document.getElementById('FurMeet1City');
        FurMeet1City.textContent = meetData.data[0].city;
    const FurMeet1Detail = document.getElementById('FurMeet1Detail');
        FurMeet1Detail.textContent = meetData.data[0].detail;
        FurMeet1data = meetData.data[0].startDate;
    const FurMeet1StartDate = document.getElementById('FurMeet1StartDate');
        FurMeet1StartDate.textContent = FurMeet1data.substring(0, 10);
    const FurMeet1GlobalUrl = document.getElementById('FurMeet1GlobalUrl');
        FurMeet1GlobalUrl.href = meetData.data[0].globalUrl;
        FurMeet1GlobalUrl.target = "_blank";

    const FurMeet2Name = document.getElementById('FurMeet2Name');
        FurMeet2Name.textContent = meetData.data[1].name;
    const FurMeet2Cover = document.getElementById('FurMeet2Cover');
        FurMeet2Cover.src = meetData.data[1].coverUrl;
    const FurMeet2City = document.getElementById('FurMeet2City');
        FurMeet2City.textContent = meetData.data[1].city;
    const FurMeet2Detail = document.getElementById('FurMeet2Detail');
        FurMeet2Detail.textContent = meetData.data[1].detail;
        FurMeet2data = meetData.data[1].startDate;
    const FurMeet2StartDate = document.getElementById('FurMeet2StartDate');
        FurMeet2StartDate.textContent = FurMeet2data.substring(0, 10);
    const FurMeet2GlobalUrl = document.getElementById('FurMeet2GlobalUrl');
        FurMeet2GlobalUrl.href = meetData.data[1].globalUrl;
        FurMeet2GlobalUrl.target = "_blank";
        // }
    const FurMeet3Name = document.getElementById('FurMeet3Name');
        FurMeet3Name.textContent = meetData.data[2].name;
    const FurMeet3Cover = document.getElementById('FurMeet3Cover');
        FurMeet3Cover.src = meetData.data[2].coverUrl;
    const FurMeet3City = document.getElementById('FurMeet3City');
        FurMeet3City.textContent = meetData.data[2].city;
    const FurMeet3Detail = document.getElementById('FurMeet3Detail');
        FurMeet3Detail.textContent = meetData.data[2].detail;
        FurMeet3data = meetData.data[2].startDate;
    const FurMeet3StartDate = document.getElementById('FurMeet3StartDate');
        FurMeet3StartDate.textContent = FurMeet3data.substring(0, 10);
    const FurMeet3GlobalUrl = document.getElementById('FurMeet3GlobalUrl');
        FurMeet3GlobalUrl.href = meetData.data[2].globalUrl;
        FurMeet3GlobalUrl.target = "_blank";   
        
    const FurMeet4Name = document.getElementById('FurMeet4Name');
        FurMeet4Name.textContent = meetData.data[3].name;
    const FurMeet4Cover = document.getElementById('FurMeet4Cover');
        FurMeet4Cover.src = meetData.data[3].coverUrl;
    const FurMeet4City = document.getElementById('FurMeet4City');
        FurMeet4City.textContent = meetData.data[3].city;
    const FurMeet4Detail = document.getElementById('FurMeet4Detail');
        FurMeet4Detail.textContent = meetData.data[3].detail;
        FurMeet4data = meetData.data[3].startDate;
    const FurMeet4StartDate = document.getElementById('FurMeet4StartDate');
        FurMeet4StartDate.textContent = FurMeet4data.substring(0, 10);
    const FurMeet4GlobalUrl = document.getElementById('FurMeet4GlobalUrl');
        FurMeet4GlobalUrl.href = meetData.data[3].globalUrl;
        FurMeet4GlobalUrl.target = "_blank";
        
    
    const FurMeet5Name = document.getElementById('FurMeet5Name');
        FurMeet5Name.textContent = meetData.data[4].name;
    const FurMeet5Cover = document.getElementById('FurMeet5Cover');
        FurMeet5Cover.src = meetData.data[4].coverUrl;
    const FurMeet5City = document.getElementById('FurMeet5City');
        FurMeet5City.textContent = meetData.data[4].city;
    const FurMeet5Detail = document.getElementById('FurMeet5Detail');
        FurMeet5Detail.textContent = meetData.data[4].detail;
        FurMeet5data = meetData.data[4].startDate;
    const FurMeet5StartDate = document.getElementById('FurMeet5StartDate');
        FurMeet5StartDate.textContent = FurMeet5data.substring(0, 10);
    const FurMeet5GlobalUrl = document.getElementById('FurMeet5GlobalUrl');
        FurMeet5GlobalUrl.href = meetData.data[4].globalUrl;
        FurMeet5GlobalUrl.target = "_blank";

    
    const FurMeet6Name = document.getElementById('FurMeet6Name');
        FurMeet6Name.textContent = meetData.data[5].name;
    const FurMeet6Cover = document.getElementById('FurMeet6Cover');
        FurMeet6Cover.src = meetData.data[5].coverUrl;
    const FurMeet6City = document.getElementById('FurMeet6City');
        FurMeet6City.textContent = meetData.data[5].city;
    const FurMeet6Detail = document.getElementById('FurMeet6Detail');
        FurMeet6Detail.textContent = meetData.data[5].detail;
        FurMeet6data = meetData.data[5].startDate;
    const FurMeet6StartDate = document.getElementById('FurMeet6StartDate');
        FurMeet6StartDate.textContent = FurMeet6data.substring(0, 10);
    const FurMeet6GlobalUrl = document.getElementById('FurMeet6GlobalUrl');
        FurMeet6GlobalUrl.href = meetData.data[5].globalUrl;
        FurMeet6GlobalUrl.target = "_blank";


    })
    .catch(error => {
    console.error('获取数据时发生错误:', error);
    });
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
    // console.log(meetData.data[0].city)
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
        
    })
    .catch(error => {
    console.error('获取数据时发生错误:', error);
    });
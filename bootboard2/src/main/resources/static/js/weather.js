
const date = new Date();

let year = date.getFullYear();

let month = '0' + date.getMonth() + 1;

month = month.substring(1);

let day = '0' + date.getDate();

day = day.substring(1);

let today = year + month + day;

$.ajax({

type: "GET",

url: 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'

+ '?serviceKey=pZIPx6rGWghV%2FnfyNbIb%2F%2BdtiOcNqfETtzb11gxLE1FYTMqF76zPptT2EFFcaFWMJOOPPUz2C1v9a8SUQ04c5g%3D%3D'

+ '&pageNo=1&numOfRows=1000&dataType=json'

+ '&base_date=' + today + '&base_time=0600&nx=55&ny=127',

success: function(data){

let item = data.response.body.items.item[3];

let content = "날짜: " + item.baseDate +

', ' +

"발표시각: " + item.baseTime +

', ' +

"기온: " + item.obsrValue;

$('.result').text(content);

},

error: function(error){

console.log(error);

}

});
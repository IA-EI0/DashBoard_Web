// Clock Function
function set2fig(num) {
   var rtn;
   if(num < 10){
     rtn = "0" + num;
   }
   else{
     rtn = num;
   }
   return rtn;
}
function Clock() {
   var nowTime = new Date();
	 var year = set2fig( nowTime.getFullYear() );
	 var month = set2fig( nowTime.getMonth()+1 );
	 var date = set2fig( nowTime.getDate() );
   var hour = set2fig( nowTime.getHours() );
   var minute  = set2fig( nowTime.getMinutes() );
   var second  = set2fig( nowTime.getSeconds() );
   var dayOfWeek = nowTime.getDay()
   var dayOfWeekStr = [ '<span>(</span><span style="color:red">Sun</span><span>)</span>', '<span>(Mon)</span>', "<span>(Tue)</span>", "<span>(Wed)</span>", "<span>(Thu)</span>", "<span>(Fri)</span>", '<span>(</span><span style="color:cyan">Sta</span><span>)</span>' ][dayOfWeek];
   var clock = year + "/" + month + "/" + date + "&nbsp;" + dayOfWeekStr + "<br>" +hour + ":" + minute + "." + second;
   document.getElementById("ClockOutput").innerHTML = clock;
}

// Time Check
function Time_Check() {
  fetch('./json/Weather.json',{cache: "no-store"})
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonW) {
    var nowTime = new Date();
    var year = nowTime.getFullYear();
    var month = nowTime.getMonth()+1;
    var date = nowTime.getDate();
    var check_oldTime = jsonW["TimeCheck"];
    var check_nowTime = year * 10000 + month * 100 + date;
    if(check_oldTime != check_nowTime){
      document.getElementById("TimeWarning").style.display ="block";
      document.getElementById("TimeWarning_br").style.display ="block";
      document.getElementById("TimeWarning_txt1").style.display ="block";
      document.getElementById("TimeWarning_txt2").style.display ="block";
    }
    else {
      document.getElementById("TimeWarning").style.display ="none";
      document.getElementById("TimeWarning_br").style.display ="none";
      document.getElementById("TimeWarning_txt1").style.display ="none";
      document.getElementById("TimeWarning_txt2").style.display ="none";
    }
  });
}

// Setup Function
// Weather
window.onload = function(){
  fetch('./json/Weather.json',{cache: "no-store"})
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonW) {
    document.getElementById("WeatherArea").innerHTML = "今日・明日の天気(青森)";
    var ts = jsonW["TimeStamp"];
    var t_telop = jsonW["Today"]["Aomori"].Telop;
    var t_max = jsonW["Today"]["Aomori"].Max;
    var t_now = jsonW["Today"]["Aomori"].Now;
    var t_rain1 = jsonW["Today"]["Aomori"].Rain.A1;
    var t_rain2 = jsonW["Today"]["Aomori"].Rain.A2;
    var t_rain3 = jsonW["Today"]["Aomori"].Rain.P1;
    var t_rain4 = jsonW["Today"]["Aomori"].Rain.P2;
    var t_icon = jsonW["Today"]["Aomori"].Icon;
    var f_telop = jsonW["Future"]["Aomori"].Telop;
    var f_max = jsonW["Future"]["Aomori"].Max;
    var f_min = jsonW["Future"]["Aomori"].Min;
    var f_rain1 = jsonW["Future"]["Aomori"].Rain.A1;
    var f_rain2 = jsonW["Future"]["Aomori"].Rain.A2;
    var f_rain3 = jsonW["Future"]["Aomori"].Rain.P1;
    var f_rain4 = jsonW["Future"]["Aomori"].Rain.P2;
    var f_icon = jsonW["Future"]["Aomori"].Icon;
    var w_text = jsonW["Text"];
    document.getElementById("LastUpdate").innerHTML = ts;
    document.getElementById("today_telop").innerHTML = t_telop;
    document.getElementById("today_max").innerHTML =  "Max&nbsp;" + t_max + "[℃]";
    document.getElementById("today_now").innerHTML = "Now&nbsp;" + t_now + "[℃]";
    document.getElementById("today_rain1").innerHTML = t_rain1;
    document.getElementById("today_rain2").innerHTML = t_rain2;
    document.getElementById("today_rain3").innerHTML = t_rain3;
    document.getElementById("today_rain4").innerHTML = t_rain4;
    const todayIcon = document.getElementById('today_icon');
    todayIcon.src = t_icon;
    document.getElementById("future_telop").innerHTML = f_telop;
    document.getElementById("future_max").innerHTML =  "Max&nbsp;" + f_max + "[℃]";
    document.getElementById("future_min").innerHTML = "Min&nbsp;" + f_min + "[℃]";
    document.getElementById("future_rain1").innerHTML = f_rain1;
    document.getElementById("future_rain2").innerHTML = f_rain2;
    document.getElementById("future_rain3").innerHTML = f_rain3;
    document.getElementById("future_rain4").innerHTML = f_rain4;
    const futureIcon = document.getElementById('future_icon');
    futureIcon.src =f_icon;
    document.getElementById("weather_text").innerHTML = w_text;
  });
  // Table
  fetch('./json/Tables.json',{cache: "no-store"})
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonT) {
    document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(L1)";
    var day1 = jsonT["L1"].Day.D1;
    var day2 = jsonT["L1"].Day.D2;
    var day3 = jsonT["L1"].Day.D3;
    var day4 = jsonT["L1"].Day.D4;
    var day5 = jsonT["L1"].Day.D5;
    var day6 = jsonT["L1"].Day.D6;
    var day7 = jsonT["L1"].Day.D7;
    var day8 = jsonT["L1"].Day.D8;
    var day9 = jsonT["L1"].Day.D9;
    var day10 = jsonT["L1"].Day.D10;
    var time1 = jsonT["L1"].Time.T1;
    var time2 = jsonT["L1"].Time.T2;
    var time3 = jsonT["L1"].Time.T3;
    var time4 = jsonT["L1"].Time.T4;
    var time5 = jsonT["L1"].Time.T5;
    var time6 = jsonT["L1"].Time.T6;
    var time7 = jsonT["L1"].Time.T7;
    var time8 = jsonT["L1"].Time.T8;
    var time9 = jsonT["L1"].Time.T9;
    var time10 = jsonT["L1"].Time.T10;
    var b1 = jsonT["L1"].B.B1;
    var b2 = jsonT["L1"].B.B2;
    var b3 = jsonT["L1"].B.B3;
    var b4 = jsonT["L1"].B.B4;
    var b5 = jsonT["L1"].B.B5;
    var b6 = jsonT["L1"].B.B6;
    var b7 = jsonT["L1"].B.B7;
    var b8 = jsonT["L1"].B.B8;
    var b9 = jsonT["L1"].B.B9;
    var b10 = jsonT["L1"].B.B10;
    var a1 = jsonT["L1"].A.A1;
    var a2 = jsonT["L1"].A.A2;
    var a3 = jsonT["L1"].A.A3;
    var a4 = jsonT["L1"].A.A4;
    var a5 = jsonT["L1"].A.A5;
    var a6 = jsonT["L1"].A.A6;
    var a7 = jsonT["L1"].A.A7;
    var a8 = jsonT["L1"].A.A8;
    var a9 = jsonT["L1"].A.A9;
    var a10 = jsonT["L1"].A.A10;
    TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
  });
  // Fortune
  fetch('./json/Fortune.json',{cache: "no-store"})
  .then(function (data) {
    return data.json();
  })
  .then(function (jsonF) {
    var jF1 = jsonF["Aries"];
    const signPic = document.getElementById('Show_Sign');
    signPic.src = './img/Fortune/1.png';
    const rankPic = document.getElementById('Show_Rank');
    rankPic.src = './img/Rank/' + jF1 +'.png';
    var f_day = jsonF["day"]
    document.getElementById("FortuneArea").innerHTML = "今日の占い(" + f_day + ")";
  });
}

// Weather Function (OUTPUT)
function WeatherOutput(ts,t_telop,t_max,t_now,t_rain1,t_rain2,t_rain3,t_rain4,t_icon,f_telop,f_max,f_min,f_rain1,f_rain2,f_rain3,f_rain4,f_icon,w_text){
  document.getElementById("LastUpdate").innerHTML = ts;
  document.getElementById("today_telop").innerHTML = t_telop;
  document.getElementById("today_max").innerHTML =  "Max&nbsp;" + t_max + "[℃]";
  document.getElementById("today_now").innerHTML = "Now&nbsp;" + t_now + "[℃]";
  document.getElementById("today_rain1").innerHTML = t_rain1;
  document.getElementById("today_rain2").innerHTML = t_rain2;
  document.getElementById("today_rain3").innerHTML = t_rain3;
  document.getElementById("today_rain4").innerHTML = t_rain4;
  const todayIcon = document.getElementById('today_icon');
  todayIcon.src = t_icon;
  document.getElementById("future_telop").innerHTML = f_telop;
  document.getElementById("future_max").innerHTML =  "Max&nbsp;" + f_max + "[℃]";
  document.getElementById("future_min").innerHTML = "Min&nbsp;" + f_min + "[℃]";
  document.getElementById("future_rain1").innerHTML = f_rain1;
  document.getElementById("future_rain2").innerHTML = f_rain2;
  document.getElementById("future_rain3").innerHTML = f_rain3;
  document.getElementById("future_rain4").innerHTML = f_rain4;
  const futureIcon = document.getElementById('future_icon');
  futureIcon.src =f_icon;
  document.getElementById("weather_text").innerHTML = w_text;
}

// Weather Function (INPUT)
function WeatherChange(){
    if(document.getElementById('Area')){
        id = document.getElementById('Area').value;
          fetch('./json/Weather.json',{cache: "no-store"})
          .then(function (data) {
            return data.json();
          })
          .then(function (jsonW) {
        // Aomori
        if(id == 'W1'){
          document.getElementById("WeatherArea").innerHTML = "今日・明日の天気(青森)";
          var ts = jsonW["TimeStamp"];
          var t_telop = jsonW["Today"]["Aomori"].Telop;
          var t_max = jsonW["Today"]["Aomori"].Max;
          var t_now = jsonW["Today"]["Aomori"].Now;
          var t_rain1 = jsonW["Today"]["Aomori"].Rain.A1;
          var t_rain2 = jsonW["Today"]["Aomori"].Rain.A2;
          var t_rain3 = jsonW["Today"]["Aomori"].Rain.P1;
          var t_rain4 = jsonW["Today"]["Aomori"].Rain.P2;
          var t_icon = jsonW["Today"]["Aomori"].Icon;
          var f_telop = jsonW["Future"]["Aomori"].Telop;
          var f_max = jsonW["Future"]["Aomori"].Max;
          var f_min = jsonW["Future"]["Aomori"].Min;
          var f_rain1 = jsonW["Future"]["Aomori"].Rain.A1;
          var f_rain2 = jsonW["Future"]["Aomori"].Rain.A2;
          var f_rain3 = jsonW["Future"]["Aomori"].Rain.P1;
          var f_rain4 = jsonW["Future"]["Aomori"].Rain.P2;
          var f_icon = jsonW["Future"]["Aomori"].Icon;
          var w_text = jsonW["Text"];
          WeatherOutput(ts,t_telop,t_max,t_now,t_rain1,t_rain2,t_rain3,t_rain4,t_icon,f_telop,f_max,f_min,f_rain1,f_rain2,f_rain3,f_rain4,f_icon,w_text)
        }
        // Hachinohe
        else if(id == 'W2'){
          document.getElementById("WeatherArea").innerHTML = "今日・明日の天気(八戸)";
          var ts = jsonW["TimeStamp"];
          var t_telop = jsonW["Today"]["Hachinohe"].Telop;
          var t_max = jsonW["Today"]["Hachinohe"].Max;
          var t_now = jsonW["Today"]["Hachinohe"].Now;
          var t_rain1 = jsonW["Today"]["Hachinohe"].Rain.A1;
          var t_rain2 = jsonW["Today"]["Hachinohe"].Rain.A2;
          var t_rain3 = jsonW["Today"]["Hachinohe"].Rain.P1;
          var t_rain4 = jsonW["Today"]["Hachinohe"].Rain.P2;
          var t_icon = jsonW["Today"]["Hachinohe"].Icon;
          var f_telop = jsonW["Future"]["Hachinohe"].Telop;
          var f_max = jsonW["Future"]["Hachinohe"].Max;
          var f_min = jsonW["Future"]["Hachinohe"].Min;
          var f_rain1 = jsonW["Future"]["Hachinohe"].Rain.A1;
          var f_rain2 = jsonW["Future"]["Hachinohe"].Rain.A2;
          var f_rain3 = jsonW["Future"]["Hachinohe"].Rain.P1;
          var f_rain4 = jsonW["Future"]["Hachinohe"].Rain.P2;
          var f_icon = jsonW["Future"]["Hachinohe"].Icon;
          var w_text = jsonW["Text"];
          WeatherOutput(ts,t_telop,t_max,t_now,t_rain1,t_rain2,t_rain3,t_rain4,t_icon,f_telop,f_max,f_min,f_rain1,f_rain2,f_rain3,f_rain4,f_icon,w_text)
        }
        // Mutsu
        else{
          document.getElementById("WeatherArea").innerHTML = "今日・明日の天気(むつ)";
          var ts = jsonW["TimeStamp"];
          var t_telop = jsonW["Today"]["Mutsu"].Telop;
          var t_max = jsonW["Today"]["Mutsu"].Max;
          var t_now = jsonW["Today"]["Mutsu"].Now;
          var t_rain1 = jsonW["Today"]["Mutsu"].Rain.A1;
          var t_rain2 = jsonW["Today"]["Mutsu"].Rain.A2;
          var t_rain3 = jsonW["Today"]["Mutsu"].Rain.P1;
          var t_rain4 = jsonW["Today"]["Mutsu"].Rain.P2;
          var t_icon = jsonW["Today"]["Mutsu"].Icon;
          var f_telop = jsonW["Future"]["Mutsu"].Telop;
          var f_max = jsonW["Future"]["Mutsu"].Max;
          var f_min = jsonW["Future"]["Mutsu"].Min;
          var f_rain1 = jsonW["Future"]["Mutsu"].Rain.A1;
          var f_rain2 = jsonW["Future"]["Mutsu"].Rain.A2;
          var f_rain3 = jsonW["Future"]["Mutsu"].Rain.P1;
          var f_rain4 = jsonW["Future"]["Mutsu"].Rain.P2;
          var f_icon = jsonW["Future"]["Mutsu"].Icon;
          var w_text = jsonW["Text"];
          WeatherOutput(ts,t_telop,t_max,t_now,t_rain1,t_rain2,t_rain3,t_rain4,t_icon,f_telop,f_max,f_min,f_rain1,f_rain2,f_rain3,f_rain4,f_icon,w_text)
        }
        });
    }
}

// Weather More Text
/* PC */
$(function(){
  $(".more").on("click", function() {
    $(this).toggleClass("on-click");
    $(".txt-hide").slideToggle(1000);
  });
});
/* SP */
$(function(){
  $(".moreSP").on("click", function() {
    $(this).toggleClass("on-click");
    $(".txt-hide").slideToggle(1000);
  });
});

//Table Function (OUTPUT)
function TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10){
  count = 0
  if(day1 == "") {
    count += 1
    document.getElementById("Table1").style.display ="none";
  }
  else {
    document.getElementById("Table1").style.display ="table-row";
    document.getElementById("Day1").innerHTML = day1;
    document.getElementById("Time1").innerHTML = time1;
    document.getElementById("B1").innerHTML = b1;
    document.getElementById("A1").innerHTML = a1;
  }
  if(day2 == "") {
    count += 1
    document.getElementById("Table2").style.display ="none";
  }
  else {
    document.getElementById("Table2").style.display ="table-row";
    document.getElementById("Day2").innerHTML = day2;
    document.getElementById("Time2").innerHTML = time2;
    document.getElementById("B2").innerHTML = b2;
    document.getElementById("A2").innerHTML = a2;
  }
  if(day3 == "") {
    count += 1
    document.getElementById("Table3").style.display ="none";
  }
  else {
    document.getElementById("Table3").style.display ="table-row";
    document.getElementById("Day3").innerHTML = day3;
    document.getElementById("Time3").innerHTML = time3;
    document.getElementById("B3").innerHTML = b3;
    document.getElementById("A3").innerHTML = a3;
  }
  if(day4 == "") {
    count += 1
    document.getElementById("Table4").style.display ="none";
  }
  else {
    document.getElementById("Table4").style.display ="table-row";
    document.getElementById("Day4").innerHTML = day4;
    document.getElementById("Time4").innerHTML = time4;
    document.getElementById("B4").innerHTML = b4;
    document.getElementById("A4").innerHTML = a4;
  }
  if(day5 == "") {
    count += 1
    document.getElementById("Table5").style.display ="none";
  }
  else {
    document.getElementById("Table5").style.display ="table-row";
    document.getElementById("Day5").innerHTML = day5;
    document.getElementById("Time5").innerHTML = time5;
    document.getElementById("B5").innerHTML = b5;
    document.getElementById("A5").innerHTML = a5;
  }
  if(day6 == "") {
    count += 1
    document.getElementById("Table6").style.display ="none";
  }
  else {
    document.getElementById("Table6").style.display ="table-row";
    document.getElementById("Day6").innerHTML = day6;
    document.getElementById("Time6").innerHTML = time6;
    document.getElementById("B6").innerHTML = b6;
    document.getElementById("A6").innerHTML = a6;
  }
  if(day7 == "") {
    count += 1
    document.getElementById("Table7").style.display ="none";
  }
  else {
    document.getElementById("Table7").style.display ="table-row";
    document.getElementById("Day7").innerHTML = day7;
    document.getElementById("Time7").innerHTML = time7;
    document.getElementById("B7").innerHTML = b7;
    document.getElementById("A7").innerHTML = a7;
  }
  if(day8 == "") {
    count += 1
    document.getElementById("Table8").style.display ="none";
  }
  else {
    document.getElementById("Table8").style.display ="table-row";
    document.getElementById("Day8").innerHTML = day8;
    document.getElementById("Time8").innerHTML = time8;
    document.getElementById("B8").innerHTML = b8;
    document.getElementById("A8").innerHTML = a8;
  }
  if(day9 == "") {
    count += 1
    document.getElementById("Table9").style.display ="none";
  }
  else {
    document.getElementById("Table9").style.display ="table-row";
    document.getElementById("Day9").innerHTML = day9;
    document.getElementById("Time9").innerHTML = time9;
    document.getElementById("B9").innerHTML = b9;
    document.getElementById("A9").innerHTML = a9;
  }
  if(day10 == "") {
    count += 1
    document.getElementById("Table10").style.display ="none";
  }
  else {
    document.getElementById("Table10").style.display ="table-row";
    document.getElementById("Day10").innerHTML = day10;
    document.getElementById("Time10").innerHTML = time10;
    document.getElementById("B10").innerHTML = b10;
    document.getElementById("A10").innerHTML = a10;
  }
  if(count==10) {
    document.getElementById("NotTable").style.display ="block";
    document.getElementById("TableTop").style.display ="none";
  }
  else {
    document.getElementById("NotTable").style.display ="none";
    document.getElementById("TableTop").style.display ="table-row";
  }
}

// Table Function (INPUT)
function TableChange(){
    if(document.getElementById('Class')){
        id = document.getElementById('Class').value;
          fetch('./json/Tables.json',{cache: "no-store"})
          .then(function (data) {
            return data.json();
          })
          .then(function (jsonT) {
        if(id == 'L1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(L1)";
          var day1 = jsonT["L1"].Day.D1;
          var day2 = jsonT["L1"].Day.D2;
          var day3 = jsonT["L1"].Day.D3;
          var day4 = jsonT["L1"].Day.D4;
          var day5 = jsonT["L1"].Day.D5;
          var day6 = jsonT["L1"].Day.D6;
          var day7 = jsonT["L1"].Day.D7;
          var day8 = jsonT["L1"].Day.D8;
          var day9 = jsonT["L1"].Day.D9;
          var day10 = jsonT["L1"].Day.D10;
          var time1 = jsonT["L1"].Time.T1;
          var time2 = jsonT["L1"].Time.T2;
          var time3 = jsonT["L1"].Time.T3;
          var time4 = jsonT["L1"].Time.T4;
          var time5 = jsonT["L1"].Time.T5;
          var time6 = jsonT["L1"].Time.T6;
          var time7 = jsonT["L1"].Time.T7;
          var time8 = jsonT["L1"].Time.T8;
          var time9 = jsonT["L1"].Time.T9;
          var time10 = jsonT["L1"].Time.T10;
          var b1 = jsonT["L1"].B.B1;
          var b2 = jsonT["L1"].B.B2;
          var b3 = jsonT["L1"].B.B3;
          var b4 = jsonT["L1"].B.B4;
          var b5 = jsonT["L1"].B.B5;
          var b6 = jsonT["L1"].B.B6;
          var b7 = jsonT["L1"].B.B7;
          var b8 = jsonT["L1"].B.B8;
          var b9 = jsonT["L1"].B.B9;
          var b10 = jsonT["L1"].B.B10;
          var a1 = jsonT["L1"].A.A1;
          var a2 = jsonT["L1"].A.A2;
          var a3 = jsonT["L1"].A.A3;
          var a4 = jsonT["L1"].A.A4;
          var a5 = jsonT["L1"].A.A5;
          var a6 = jsonT["L1"].A.A6;
          var a7 = jsonT["L1"].A.A7;
          var a8 = jsonT["L1"].A.A8;
          var a9 = jsonT["L1"].A.A9;
          var a10 = jsonT["L1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'L2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(L2)";
          var day1 = jsonT["L2"].Day.D1;
          var day2 = jsonT["L2"].Day.D2;
          var day3 = jsonT["L2"].Day.D3;
          var day4 = jsonT["L2"].Day.D4;
          var day5 = jsonT["L2"].Day.D5;
          var day6 = jsonT["L2"].Day.D6;
          var day7 = jsonT["L2"].Day.D7;
          var day8 = jsonT["L2"].Day.D8;
          var day9 = jsonT["L2"].Day.D9;
          var day10 = jsonT["L2"].Day.D10;
          var time1 = jsonT["L2"].Time.T1;
          var time2 = jsonT["L2"].Time.T2;
          var time3 = jsonT["L2"].Time.T3;
          var time4 = jsonT["L2"].Time.T4;
          var time5 = jsonT["L2"].Time.T5;
          var time6 = jsonT["L2"].Time.T6;
          var time7 = jsonT["L2"].Time.T7;
          var time8 = jsonT["L2"].Time.T8;
          var time9 = jsonT["L2"].Time.T9;
          var time10 = jsonT["L2"].Time.T10;
          var b1 = jsonT["L2"].B.B1;
          var b2 = jsonT["L2"].B.B2;
          var b3 = jsonT["L2"].B.B3;
          var b4 = jsonT["L2"].B.B4;
          var b5 = jsonT["L2"].B.B5;
          var b6 = jsonT["L2"].B.B6;
          var b7 = jsonT["L2"].B.B7;
          var b8 = jsonT["L2"].B.B8;
          var b9 = jsonT["L2"].B.B9;
          var b10 = jsonT["L2"].B.B10;
          var a1 = jsonT["L2"].A.A1;
          var a2 = jsonT["L2"].A.A2;
          var a3 = jsonT["L2"].A.A3;
          var a4 = jsonT["L2"].A.A4;
          var a5 = jsonT["L2"].A.A5;
          var a6 = jsonT["L2"].A.A6;
          var a7 = jsonT["L2"].A.A7;
          var a8 = jsonT["L2"].A.A8;
          var a9 = jsonT["L2"].A.A9;
          var a10 = jsonT["L2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'L3'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(L3)";
          var day1 = jsonT["L3"].Day.D1;
          var day2 = jsonT["L3"].Day.D2;
          var day3 = jsonT["L3"].Day.D3;
          var day4 = jsonT["L3"].Day.D4;
          var day5 = jsonT["L3"].Day.D5;
          var day6 = jsonT["L3"].Day.D6;
          var day7 = jsonT["L3"].Day.D7;
          var day8 = jsonT["L3"].Day.D8;
          var day9 = jsonT["L3"].Day.D9;
          var day10 = jsonT["L3"].Day.D10;
          var time1 = jsonT["L3"].Time.T1;
          var time2 = jsonT["L3"].Time.T2;
          var time3 = jsonT["L3"].Time.T3;
          var time4 = jsonT["L3"].Time.T4;
          var time5 = jsonT["L3"].Time.T5;
          var time6 = jsonT["L3"].Time.T6;
          var time7 = jsonT["L3"].Time.T7;
          var time8 = jsonT["L3"].Time.T8;
          var time9 = jsonT["L3"].Time.T9;
          var time10 = jsonT["L3"].Time.T10;
          var b1 = jsonT["L3"].B.B1;
          var b2 = jsonT["L3"].B.B2;
          var b3 = jsonT["L3"].B.B3;
          var b4 = jsonT["L3"].B.B4;
          var b5 = jsonT["L3"].B.B5;
          var b6 = jsonT["L3"].B.B6;
          var b7 = jsonT["L3"].B.B7;
          var b8 = jsonT["L3"].B.B8;
          var b9 = jsonT["L3"].B.B9;
          var b10 = jsonT["L3"].B.B10;
          var a1 = jsonT["L3"].A.A1;
          var a2 = jsonT["L3"].A.A2;
          var a3 = jsonT["L3"].A.A3;
          var a4 = jsonT["L3"].A.A4;
          var a5 = jsonT["L3"].A.A5;
          var a6 = jsonT["L3"].A.A6;
          var a7 = jsonT["L3"].A.A7;
          var a8 = jsonT["L3"].A.A8;
          var a9 = jsonT["L3"].A.A9;
          var a10 = jsonT["L3"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'L4'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(L4)";
          var day1 = jsonT["L4"].Day.D1;
          var day2 = jsonT["L4"].Day.D2;
          var day3 = jsonT["L4"].Day.D3;
          var day4 = jsonT["L4"].Day.D4;
          var day5 = jsonT["L4"].Day.D5;
          var day6 = jsonT["L4"].Day.D6;
          var day7 = jsonT["L4"].Day.D7;
          var day8 = jsonT["L4"].Day.D8;
          var day9 = jsonT["L4"].Day.D9;
          var day10 = jsonT["L4"].Day.D10;
          var time1 = jsonT["L4"].Time.T1;
          var time2 = jsonT["L4"].Time.T2;
          var time3 = jsonT["L4"].Time.T3;
          var time4 = jsonT["L4"].Time.T4;
          var time5 = jsonT["L4"].Time.T5;
          var time6 = jsonT["L4"].Time.T6;
          var time7 = jsonT["L4"].Time.T7;
          var time8 = jsonT["L4"].Time.T8;
          var time9 = jsonT["L4"].Time.T9;
          var time10 = jsonT["L4"].Time.T10;
          var b1 = jsonT["L4"].B.B1;
          var b2 = jsonT["L4"].B.B2;
          var b3 = jsonT["L4"].B.B3;
          var b4 = jsonT["L4"].B.B4;
          var b5 = jsonT["L4"].B.B5;
          var b6 = jsonT["L4"].B.B6;
          var b7 = jsonT["L4"].B.B7;
          var b8 = jsonT["L4"].B.B8;
          var b9 = jsonT["L4"].B.B9;
          var b10 = jsonT["L4"].B.B10;
          var a1 = jsonT["L4"].A.A1;
          var a2 = jsonT["L4"].A.A2;
          var a3 = jsonT["L4"].A.A3;
          var a4 = jsonT["L4"].A.A4;
          var a5 = jsonT["L4"].A.A5;
          var a6 = jsonT["L4"].A.A6;
          var a7 = jsonT["L4"].A.A7;
          var a8 = jsonT["L4"].A.A8;
          var a9 = jsonT["L4"].A.A9;
          var a10 = jsonT["L4"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'M1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(M1)";
          var day1 = jsonT["M1"].Day.D1;
          var day2 = jsonT["M1"].Day.D2;
          var day3 = jsonT["M1"].Day.D3;
          var day4 = jsonT["M1"].Day.D4;
          var day5 = jsonT["M1"].Day.D5;
          var day6 = jsonT["M1"].Day.D6;
          var day7 = jsonT["M1"].Day.D7;
          var day8 = jsonT["M1"].Day.D8;
          var day9 = jsonT["M1"].Day.D9;
          var day10 = jsonT["M1"].Day.D10;
          var time1 = jsonT["M1"].Time.T1;
          var time2 = jsonT["M1"].Time.T2;
          var time3 = jsonT["M1"].Time.T3;
          var time4 = jsonT["M1"].Time.T4;
          var time5 = jsonT["M1"].Time.T5;
          var time6 = jsonT["M1"].Time.T6;
          var time7 = jsonT["M1"].Time.T7;
          var time8 = jsonT["M1"].Time.T8;
          var time9 = jsonT["M1"].Time.T9;
          var time10 = jsonT["M1"].Time.T10;
          var b1 = jsonT["M1"].B.B1;
          var b2 = jsonT["M1"].B.B2;
          var b3 = jsonT["M1"].B.B3;
          var b4 = jsonT["M1"].B.B4;
          var b5 = jsonT["M1"].B.B5;
          var b6 = jsonT["M1"].B.B6;
          var b7 = jsonT["M1"].B.B7;
          var b8 = jsonT["M1"].B.B8;
          var b9 = jsonT["M1"].B.B9;
          var b10 = jsonT["M1"].B.B10;
          var a1 = jsonT["M1"].A.A1;
          var a2 = jsonT["M1"].A.A2;
          var a3 = jsonT["M1"].A.A3;
          var a4 = jsonT["M1"].A.A4;
          var a5 = jsonT["M1"].A.A5;
          var a6 = jsonT["M1"].A.A6;
          var a7 = jsonT["M1"].A.A7;
          var a8 = jsonT["M1"].A.A8;
          var a9 = jsonT["M1"].A.A9;
          var a10 = jsonT["M1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'E1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(E1)";
          var day1 = jsonT["E1"].Day.D1;
          var day2 = jsonT["E1"].Day.D2;
          var day3 = jsonT["E1"].Day.D3;
          var day4 = jsonT["E1"].Day.D4;
          var day5 = jsonT["E1"].Day.D5;
          var day6 = jsonT["E1"].Day.D6;
          var day7 = jsonT["E1"].Day.D7;
          var day8 = jsonT["E1"].Day.D8;
          var day9 = jsonT["E1"].Day.D9;
          var day10 = jsonT["E1"].Day.D10;
          var time1 = jsonT["E1"].Time.T1;
          var time2 = jsonT["E1"].Time.T2;
          var time3 = jsonT["E1"].Time.T3;
          var time4 = jsonT["E1"].Time.T4;
          var time5 = jsonT["E1"].Time.T5;
          var time6 = jsonT["E1"].Time.T6;
          var time7 = jsonT["E1"].Time.T7;
          var time8 = jsonT["E1"].Time.T8;
          var time9 = jsonT["E1"].Time.T9;
          var time10 = jsonT["E1"].Time.T10;
          var b1 = jsonT["E1"].B.B1;
          var b2 = jsonT["E1"].B.B2;
          var b3 = jsonT["E1"].B.B3;
          var b4 = jsonT["E1"].B.B4;
          var b5 = jsonT["E1"].B.B5;
          var b6 = jsonT["E1"].B.B6;
          var b7 = jsonT["E1"].B.B7;
          var b8 = jsonT["E1"].B.B8;
          var b9 = jsonT["E1"].B.B9;
          var b10 = jsonT["E1"].B.B10;
          var a1 = jsonT["E1"].A.A1;
          var a2 = jsonT["E1"].A.A2;
          var a3 = jsonT["E1"].A.A3;
          var a4 = jsonT["E1"].A.A4;
          var a5 = jsonT["E1"].A.A5;
          var a6 = jsonT["E1"].A.A6;
          var a7 = jsonT["E1"].A.A7;
          var a8 = jsonT["E1"].A.A8;
          var a9 = jsonT["E1"].A.A9;
          var a10 = jsonT["E1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'C1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(C1)";
          var day1 = jsonT["C1"].Day.D1;
          var day2 = jsonT["C1"].Day.D2;
          var day3 = jsonT["C1"].Day.D3;
          var day4 = jsonT["C1"].Day.D4;
          var day5 = jsonT["C1"].Day.D5;
          var day6 = jsonT["C1"].Day.D6;
          var day7 = jsonT["C1"].Day.D7;
          var day8 = jsonT["C1"].Day.D8;
          var day9 = jsonT["C1"].Day.D9;
          var day10 = jsonT["C1"].Day.D10;
          var time1 = jsonT["C1"].Time.T1;
          var time2 = jsonT["C1"].Time.T2;
          var time3 = jsonT["C1"].Time.T3;
          var time4 = jsonT["C1"].Time.T4;
          var time5 = jsonT["C1"].Time.T5;
          var time6 = jsonT["C1"].Time.T6;
          var time7 = jsonT["C1"].Time.T7;
          var time8 = jsonT["C1"].Time.T8;
          var time9 = jsonT["C1"].Time.T9;
          var time10 = jsonT["C1"].Time.T10;
          var b1 = jsonT["C1"].B.B1;
          var b2 = jsonT["C1"].B.B2;
          var b3 = jsonT["C1"].B.B3;
          var b4 = jsonT["C1"].B.B4;
          var b5 = jsonT["C1"].B.B5;
          var b6 = jsonT["C1"].B.B6;
          var b7 = jsonT["C1"].B.B7;
          var b8 = jsonT["C1"].B.B8;
          var b9 = jsonT["C1"].B.B9;
          var b10 = jsonT["C1"].B.B10;
          var a1 = jsonT["C1"].A.A1;
          var a2 = jsonT["C1"].A.A2;
          var a3 = jsonT["C1"].A.A3;
          var a4 = jsonT["C1"].A.A4;
          var a5 = jsonT["C1"].A.A5;
          var a6 = jsonT["C1"].A.A6;
          var a7 = jsonT["C1"].A.A7;
          var a8 = jsonT["C1"].A.A8;
          var a9 = jsonT["C1"].A.A9;
          var a10 = jsonT["C1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'Z1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(Z1)";
          var day1 = jsonT["Z1"].Day.D1;
          var day2 = jsonT["Z1"].Day.D2;
          var day3 = jsonT["Z1"].Day.D3;
          var day4 = jsonT["Z1"].Day.D4;
          var day5 = jsonT["Z1"].Day.D5;
          var day6 = jsonT["Z1"].Day.D6;
          var day7 = jsonT["Z1"].Day.D7;
          var day8 = jsonT["Z1"].Day.D8;
          var day9 = jsonT["Z1"].Day.D9;
          var day10 = jsonT["Z1"].Day.D10;
          var time1 = jsonT["Z1"].Time.T1;
          var time2 = jsonT["Z1"].Time.T2;
          var time3 = jsonT["Z1"].Time.T3;
          var time4 = jsonT["Z1"].Time.T4;
          var time5 = jsonT["Z1"].Time.T5;
          var time6 = jsonT["Z1"].Time.T6;
          var time7 = jsonT["Z1"].Time.T7;
          var time8 = jsonT["Z1"].Time.T8;
          var time9 = jsonT["Z1"].Time.T9;
          var time10 = jsonT["Z1"].Time.T10;
          var b1 = jsonT["Z1"].B.B1;
          var b2 = jsonT["Z1"].B.B2;
          var b3 = jsonT["Z1"].B.B3;
          var b4 = jsonT["Z1"].B.B4;
          var b5 = jsonT["Z1"].B.B5;
          var b6 = jsonT["Z1"].B.B6;
          var b7 = jsonT["Z1"].B.B7;
          var b8 = jsonT["Z1"].B.B8;
          var b9 = jsonT["Z1"].B.B9;
          var b10 = jsonT["Z1"].B.B10;
          var a1 = jsonT["Z1"].A.A1;
          var a2 = jsonT["Z1"].A.A2;
          var a3 = jsonT["Z1"].A.A3;
          var a4 = jsonT["Z1"].A.A4;
          var a5 = jsonT["Z1"].A.A5;
          var a6 = jsonT["Z1"].A.A6;
          var a7 = jsonT["Z1"].A.A7;
          var a8 = jsonT["Z1"].A.A8;
          var a9 = jsonT["Z1"].A.A9;
          var a10 = jsonT["Z1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'M2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(M2)";
          var day1 = jsonT["M2"].Day.D1;
          var day2 = jsonT["M2"].Day.D2;
          var day3 = jsonT["M2"].Day.D3;
          var day4 = jsonT["M2"].Day.D4;
          var day5 = jsonT["M2"].Day.D5;
          var day6 = jsonT["M2"].Day.D6;
          var day7 = jsonT["M2"].Day.D7;
          var day8 = jsonT["M2"].Day.D8;
          var day9 = jsonT["M2"].Day.D9;
          var day10 = jsonT["M2"].Day.D10;
          var time1 = jsonT["M2"].Time.T1;
          var time2 = jsonT["M2"].Time.T2;
          var time3 = jsonT["M2"].Time.T3;
          var time4 = jsonT["M2"].Time.T4;
          var time5 = jsonT["M2"].Time.T5;
          var time6 = jsonT["M2"].Time.T6;
          var time7 = jsonT["M2"].Time.T7;
          var time8 = jsonT["M2"].Time.T8;
          var time9 = jsonT["M2"].Time.T9;
          var time10 = jsonT["M2"].Time.T10;
          var b1 = jsonT["M2"].B.B1;
          var b2 = jsonT["M2"].B.B2;
          var b3 = jsonT["M2"].B.B3;
          var b4 = jsonT["M2"].B.B4;
          var b5 = jsonT["M2"].B.B5;
          var b6 = jsonT["M2"].B.B6;
          var b7 = jsonT["M2"].B.B7;
          var b8 = jsonT["M2"].B.B8;
          var b9 = jsonT["M2"].B.B9;
          var b10 = jsonT["M2"].B.B10;
          var a1 = jsonT["M2"].A.A1;
          var a2 = jsonT["M2"].A.A2;
          var a3 = jsonT["M2"].A.A3;
          var a4 = jsonT["M2"].A.A4;
          var a5 = jsonT["M2"].A.A5;
          var a6 = jsonT["M2"].A.A6;
          var a7 = jsonT["M2"].A.A7;
          var a8 = jsonT["M2"].A.A8;
          var a9 = jsonT["M2"].A.A9;
          var a10 = jsonT["M2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'E2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(E2)";
          var day1 = jsonT["E2"].Day.D1;
          var day2 = jsonT["E2"].Day.D2;
          var day3 = jsonT["E2"].Day.D3;
          var day4 = jsonT["E2"].Day.D4;
          var day5 = jsonT["E2"].Day.D5;
          var day6 = jsonT["E2"].Day.D6;
          var day7 = jsonT["E2"].Day.D7;
          var day8 = jsonT["E2"].Day.D8;
          var day9 = jsonT["E2"].Day.D9;
          var day10 = jsonT["E2"].Day.D10;
          var time1 = jsonT["E2"].Time.T1;
          var time2 = jsonT["E2"].Time.T2;
          var time3 = jsonT["E2"].Time.T3;
          var time4 = jsonT["E2"].Time.T4;
          var time5 = jsonT["E2"].Time.T5;
          var time6 = jsonT["E2"].Time.T6;
          var time7 = jsonT["E2"].Time.T7;
          var time8 = jsonT["E2"].Time.T8;
          var time9 = jsonT["E2"].Time.T9;
          var time10 = jsonT["E2"].Time.T10;
          var b1 = jsonT["E2"].B.B1;
          var b2 = jsonT["E2"].B.B2;
          var b3 = jsonT["E2"].B.B3;
          var b4 = jsonT["E2"].B.B4;
          var b5 = jsonT["E2"].B.B5;
          var b6 = jsonT["E2"].B.B6;
          var b7 = jsonT["E2"].B.B7;
          var b8 = jsonT["E2"].B.B8;
          var b9 = jsonT["E2"].B.B9;
          var b10 = jsonT["E2"].B.B10;
          var a1 = jsonT["E2"].A.A1;
          var a2 = jsonT["E2"].A.A2;
          var a3 = jsonT["E2"].A.A3;
          var a4 = jsonT["E2"].A.A4;
          var a5 = jsonT["E2"].A.A5;
          var a6 = jsonT["E2"].A.A6;
          var a7 = jsonT["E2"].A.A7;
          var a8 = jsonT["E2"].A.A8;
          var a9 = jsonT["E2"].A.A9;
          var a10 = jsonT["E2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'C2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(C2)";
          var day1 = jsonT["C2"].Day.D1;
          var day2 = jsonT["C2"].Day.D2;
          var day3 = jsonT["C2"].Day.D3;
          var day4 = jsonT["C2"].Day.D4;
          var day5 = jsonT["C2"].Day.D5;
          var day6 = jsonT["C2"].Day.D6;
          var day7 = jsonT["C2"].Day.D7;
          var day8 = jsonT["C2"].Day.D8;
          var day9 = jsonT["C2"].Day.D9;
          var day10 = jsonT["C2"].Day.D10;
          var time1 = jsonT["C2"].Time.T1;
          var time2 = jsonT["C2"].Time.T2;
          var time3 = jsonT["C2"].Time.T3;
          var time4 = jsonT["C2"].Time.T4;
          var time5 = jsonT["C2"].Time.T5;
          var time6 = jsonT["C2"].Time.T6;
          var time7 = jsonT["C2"].Time.T7;
          var time8 = jsonT["C2"].Time.T8;
          var time9 = jsonT["C2"].Time.T9;
          var time10 = jsonT["C2"].Time.T10;
          var b1 = jsonT["C2"].B.B1;
          var b3 = jsonT["C2"].B.B3;
          var b2 = jsonT["C2"].B.B2;
          var b4 = jsonT["C2"].B.B4;
          var b5 = jsonT["C2"].B.B5;
          var b6 = jsonT["C2"].B.B6;
          var b7 = jsonT["C2"].B.B7;
          var b8 = jsonT["C2"].B.B8;
          var b9 = jsonT["C2"].B.B9;
          var b10 = jsonT["C2"].B.B10;
          var a1 = jsonT["C2"].A.A1;
          var a2 = jsonT["C2"].A.A2;
          var a3 = jsonT["C2"].A.A3;
          var a4 = jsonT["C2"].A.A4;
          var a5 = jsonT["C2"].A.A5;
          var a6 = jsonT["C2"].A.A6;
          var a7 = jsonT["C2"].A.A7;
          var a8 = jsonT["C2"].A.A8;
          var a9 = jsonT["C2"].A.A9;
          var a10 = jsonT["C2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'Z2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(Z2)";
          var day1 = jsonT["Z2"].Day.D1;
          var day2 = jsonT["Z2"].Day.D2;
          var day3 = jsonT["Z2"].Day.D3;
          var day4 = jsonT["Z2"].Day.D4;
          var day5 = jsonT["Z2"].Day.D5;
          var day6 = jsonT["Z2"].Day.D6;
          var day7 = jsonT["Z2"].Day.D7;
          var day8 = jsonT["Z2"].Day.D8;
          var day9 = jsonT["Z2"].Day.D9;
          var day10 = jsonT["Z2"].Day.D10;
          var time1 = jsonT["Z2"].Time.T1;
          var time2 = jsonT["Z2"].Time.T2;
          var time3 = jsonT["Z2"].Time.T3;
          var time4 = jsonT["Z2"].Time.T4;
          var time5 = jsonT["Z2"].Time.T5;
          var time6 = jsonT["Z2"].Time.T6;
          var time8 = jsonT["Z2"].Time.T8;
          var time7 = jsonT["Z2"].Time.T7;
          var time9 = jsonT["Z2"].Time.T9;
          var time10 = jsonT["Z2"].Time.T10;
          var b1 = jsonT["Z2"].B.B1;
          var b2 = jsonT["Z2"].B.B2;
          var b3 = jsonT["Z2"].B.B3;
          var b4 = jsonT["Z2"].B.B4;
          var b5 = jsonT["Z2"].B.B5;
          var b6 = jsonT["Z2"].B.B6;
          var b7 = jsonT["Z2"].B.B7;
          var b8 = jsonT["Z2"].B.B8;
          var b9 = jsonT["Z2"].B.B9;
          var b10 = jsonT["Z2"].B.B10;
          var a1 = jsonT["Z2"].A.A1;
          var a2 = jsonT["Z2"].A.A2;
          var a3 = jsonT["Z2"].A.A3;
          var a4 = jsonT["Z2"].A.A4;
          var a5 = jsonT["Z2"].A.A5;
          var a6 = jsonT["Z2"].A.A6;
          var a7 = jsonT["Z2"].A.A7;
          var a8 = jsonT["Z2"].A.A8;
          var a9 = jsonT["Z2"].A.A9;
          var a10 = jsonT["Z2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'M3'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(M3)";
          var day1 = jsonT["M3"].Day.D1;
          var day2 = jsonT["M3"].Day.D2;
          var day3 = jsonT["M3"].Day.D3;
          var day4 = jsonT["M3"].Day.D4;
          var day5 = jsonT["M3"].Day.D5;
          var day6 = jsonT["M3"].Day.D6;
          var day7 = jsonT["M3"].Day.D7;
          var day8 = jsonT["M3"].Day.D8;
          var day9 = jsonT["M3"].Day.D9;
          var day10 = jsonT["M3"].Day.D10;
          var time1 = jsonT["M3"].Time.T1;
          var time2 = jsonT["M3"].Time.T2;
          var time3 = jsonT["M3"].Time.T3;
          var time4 = jsonT["M3"].Time.T4;
          var time5 = jsonT["M3"].Time.T5;
          var time6 = jsonT["M3"].Time.T6;
          var time7 = jsonT["M3"].Time.T7;
          var time8 = jsonT["M3"].Time.T8;
          var time9 = jsonT["M3"].Time.T9;
          var time10 = jsonT["M3"].Time.T10;
          var b1 = jsonT["M3"].B.B1;
          var b2 = jsonT["M3"].B.B2;
          var b3 = jsonT["M3"].B.B3;
          var b4 = jsonT["M3"].B.B4;
          var b5 = jsonT["M3"].B.B5;
          var b6 = jsonT["M3"].B.B6;
          var b7 = jsonT["M3"].B.B7;
          var b8 = jsonT["M3"].B.B8;
          var b9 = jsonT["M3"].B.B9;
          var b10 = jsonT["M3"].B.B10;
          var a1 = jsonT["M3"].A.A1;
          var a2 = jsonT["M3"].A.A2;
          var a3 = jsonT["M3"].A.A3;
          var a4 = jsonT["M3"].A.A4;
          var a5 = jsonT["M3"].A.A5;
          var a7 = jsonT["M3"].A.A7;
          var a6 = jsonT["M3"].A.A6;
          var a8 = jsonT["M3"].A.A8;
          var a9 = jsonT["M3"].A.A9;
          var a10 = jsonT["M3"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'E3'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(E3)";
          var day1 = jsonT["E3"].Day.D1;
          var day2 = jsonT["E3"].Day.D2;
          var day3 = jsonT["E3"].Day.D3;
          var day4 = jsonT["E3"].Day.D4;
          var day5 = jsonT["E3"].Day.D5;
          var day6 = jsonT["E3"].Day.D6;
          var day7 = jsonT["E3"].Day.D7;
          var day8 = jsonT["E3"].Day.D8;
          var day9 = jsonT["E3"].Day.D9;
          var day10 = jsonT["E3"].Day.D10;
          var time1 = jsonT["E3"].Time.T1;
          var time2 = jsonT["E3"].Time.T2;
          var time3 = jsonT["E3"].Time.T3;
          var time4 = jsonT["E3"].Time.T4;
          var time5 = jsonT["E3"].Time.T5;
          var time6 = jsonT["E3"].Time.T6;
          var time7 = jsonT["E3"].Time.T7;
          var time8 = jsonT["E3"].Time.T8;
          var time9 = jsonT["E3"].Time.T9;
          var time10 = jsonT["E3"].Time.T10;
          var b1 = jsonT["E3"].B.B1;
          var b2 = jsonT["E3"].B.B2;
          var b3 = jsonT["E3"].B.B3;
          var b4 = jsonT["E3"].B.B4;
          var b5 = jsonT["E3"].B.B5;
          var b6 = jsonT["E3"].B.B6;
          var b7 = jsonT["E3"].B.B7;
          var b8 = jsonT["E3"].B.B8;
          var b9 = jsonT["E3"].B.B9;
          var b10 = jsonT["E3"].B.B10;
          var a1 = jsonT["E3"].A.A1;
          var a2 = jsonT["E3"].A.A2;
          var a3 = jsonT["E3"].A.A3;
          var a4 = jsonT["E3"].A.A4;
          var a5 = jsonT["E3"].A.A5;
          var a6 = jsonT["E3"].A.A6;
          var a7 = jsonT["E3"].A.A7;
          var a8 = jsonT["E3"].A.A8;
          var a9 = jsonT["E3"].A.A9;
          var a10 = jsonT["E3"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'C3'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(C3)";
          var day1 = jsonT["C3"].Day.D1;
          var day2 = jsonT["C3"].Day.D2;
          var day3 = jsonT["C3"].Day.D3;
          var day4 = jsonT["C3"].Day.D4;
          var day5 = jsonT["C3"].Day.D5;
          var day6 = jsonT["C3"].Day.D6;
          var day7 = jsonT["C3"].Day.D7;
          var day8 = jsonT["C3"].Day.D8;
          var day9 = jsonT["C3"].Day.D9;
          var day10 = jsonT["C3"].Day.D10;
          var time1 = jsonT["C3"].Time.T1;
          var time2 = jsonT["C3"].Time.T2;
          var time3 = jsonT["C3"].Time.T3;
          var time4 = jsonT["C3"].Time.T4;
          var time5 = jsonT["C3"].Time.T5;
          var time6 = jsonT["C3"].Time.T6;
          var time7 = jsonT["C3"].Time.T7;
          var time8 = jsonT["C3"].Time.T8;
          var time9 = jsonT["C3"].Time.T9;
          var time10 = jsonT["C3"].Time.T10;
          var b1 = jsonT["C3"].B.B1;
          var b2 = jsonT["C3"].B.B2;
          var b3 = jsonT["C3"].B.B3;
          var b4 = jsonT["C3"].B.B4;
          var b5 = jsonT["C3"].B.B5;
          var b6 = jsonT["C3"].B.B6;
          var b7 = jsonT["C3"].B.B7;
          var b8 = jsonT["C3"].B.B8;
          var b9 = jsonT["C3"].B.B9;
          var b10 = jsonT["C3"].B.B10;
          var a1 = jsonT["C3"].A.A1;
          var a2 = jsonT["C3"].A.A2;
          var a3 = jsonT["C3"].A.A3;
          var a4 = jsonT["C3"].A.A4;
          var a5 = jsonT["C3"].A.A5;
          var a6 = jsonT["C3"].A.A6;
          var a7 = jsonT["C3"].A.A7;
          var a8 = jsonT["C3"].A.A8;
          var a9 = jsonT["C3"].A.A9;
          var a10 = jsonT["C3"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'Z3'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(Z3)";
          var day1 = jsonT["Z3"].Day.D1;
          var day2 = jsonT["Z3"].Day.D2;
          var day3 = jsonT["Z3"].Day.D3;
          var day4 = jsonT["Z3"].Day.D4;
          var day5 = jsonT["Z3"].Day.D5;
          var day6 = jsonT["Z3"].Day.D6;
          var day7 = jsonT["Z3"].Day.D7;
          var day8 = jsonT["Z3"].Day.D8;
          var day9 = jsonT["Z3"].Day.D9;
          var day10 = jsonT["Z3"].Day.D10;
          var time1 = jsonT["Z3"].Time.T1;
          var time2 = jsonT["Z3"].Time.T2;
          var time3 = jsonT["Z3"].Time.T3;
          var time4 = jsonT["Z3"].Time.T4;
          var time5 = jsonT["Z3"].Time.T5;
          var time6 = jsonT["Z3"].Time.T6;
          var time7 = jsonT["Z3"].Time.T7;
          var time8 = jsonT["Z3"].Time.T8;
          var time9 = jsonT["Z3"].Time.T9;
          var time10 = jsonT["Z3"].Time.T10;
          var b1 = jsonT["Z3"].B.B1;
          var b2 = jsonT["Z3"].B.B2;
          var b3 = jsonT["Z3"].B.B3;
          var b4 = jsonT["Z3"].B.B4;
          var b5 = jsonT["Z3"].B.B5;
          var b6 = jsonT["Z3"].B.B6;
          var b7 = jsonT["Z3"].B.B7;
          var b8 = jsonT["Z3"].B.B8;
          var b9 = jsonT["Z3"].B.B9;
          var b10 = jsonT["Z3"].B.B10;
          var a1 = jsonT["Z3"].A.A1;
          var a2 = jsonT["Z3"].A.A2;
          var a3 = jsonT["Z3"].A.A3;
          var a4 = jsonT["Z3"].A.A4;
          var a5 = jsonT["Z3"].A.A5;
          var a6 = jsonT["Z3"].A.A6;
          var a7 = jsonT["Z3"].A.A7;
          var a8 = jsonT["Z3"].A.A8;
          var a9 = jsonT["Z3"].A.A9;
          var a10 = jsonT["Z3"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'M4'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(M4)";
          var day1 = jsonT["M4"].Day.D1;
          var day2 = jsonT["M4"].Day.D2;
          var day3 = jsonT["M4"].Day.D3;
          var day4 = jsonT["M4"].Day.D4;
          var day5 = jsonT["M4"].Day.D5;
          var day6 = jsonT["M4"].Day.D6;
          var day7 = jsonT["M4"].Day.D7;
          var day8 = jsonT["M4"].Day.D8;
          var day9 = jsonT["M4"].Day.D9;
          var day10 = jsonT["M4"].Day.D10;
          var time1 = jsonT["M4"].Time.T1;
          var time2 = jsonT["M4"].Time.T2;
          var time3 = jsonT["M4"].Time.T3;
          var time4 = jsonT["M4"].Time.T4;
          var time5 = jsonT["M4"].Time.T5;
          var time6 = jsonT["M4"].Time.T6;
          var time7 = jsonT["M4"].Time.T7;
          var time8 = jsonT["M4"].Time.T8;
          var time9 = jsonT["M4"].Time.T9;
          var time10 = jsonT["M4"].Time.T10;
          var b1 = jsonT["M4"].B.B1;
          var b2 = jsonT["M4"].B.B2;
          var b3 = jsonT["M4"].B.B3;
          var b4 = jsonT["M4"].B.B4;
          var b5 = jsonT["M4"].B.B5;
          var b6 = jsonT["M4"].B.B6;
          var b7 = jsonT["M4"].B.B7;
          var b8 = jsonT["M4"].B.B8;
          var b9 = jsonT["M4"].B.B9;
          var b10 = jsonT["M4"].B.B10;
          var a1 = jsonT["M4"].A.A1;
          var a2 = jsonT["M4"].A.A2;
          var a3 = jsonT["M4"].A.A3;
          var a4 = jsonT["M4"].A.A4;
          var a5 = jsonT["M4"].A.A5;
          var a6 = jsonT["M4"].A.A6;
          var a7 = jsonT["M4"].A.A7;
          var a8 = jsonT["M4"].A.A8;
          var a9 = jsonT["M4"].A.A9;
          var a10 = jsonT["M4"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'E4'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(E4)";
          var day1 = jsonT["E4"].Day.D1;
          var day2 = jsonT["E4"].Day.D2;
          var day3 = jsonT["E4"].Day.D3;
          var day4 = jsonT["E4"].Day.D4;
          var day5 = jsonT["E4"].Day.D5;
          var day6 = jsonT["E4"].Day.D6;
          var day7 = jsonT["E4"].Day.D7;
          var day8 = jsonT["E4"].Day.D8;
          var day9 = jsonT["E4"].Day.D9;
          var day10 = jsonT["E4"].Day.D10;
          var time1 = jsonT["E4"].Time.T1;
          var time2 = jsonT["E4"].Time.T2;
          var time3 = jsonT["E4"].Time.T3;
          var time4 = jsonT["E4"].Time.T4;
          var time5 = jsonT["E4"].Time.T5;
          var time6 = jsonT["E4"].Time.T6;
          var time7 = jsonT["E4"].Time.T7;
          var time8 = jsonT["E4"].Time.T8;
          var time9 = jsonT["E4"].Time.T9;
          var time10 = jsonT["E4"].Time.T10;
          var b1 = jsonT["E4"].B.B1;
          var b2 = jsonT["E4"].B.B2;
          var b3 = jsonT["E4"].B.B3;
          var b4 = jsonT["E4"].B.B4;
          var b5 = jsonT["E4"].B.B5;
          var b6 = jsonT["E4"].B.B6;
          var b7 = jsonT["E4"].B.B7;
          var b8 = jsonT["E4"].B.B8;
          var b9 = jsonT["E4"].B.B9;
          var b10 = jsonT["E4"].B.B10;
          var a1 = jsonT["E4"].A.A1;
          var a2 = jsonT["E4"].A.A2;
          var a3 = jsonT["E4"].A.A3;
          var a4 = jsonT["E4"].A.A4;
          var a5 = jsonT["E4"].A.A5;
          var a6 = jsonT["E4"].A.A6;
          var a7 = jsonT["E4"].A.A7;
          var a8 = jsonT["E4"].A.A8;
          var a9 = jsonT["E4"].A.A9;
          var a10 = jsonT["E4"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'C4'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(C4)";
          var day1 = jsonT["C4"].Day.D1;
          var day2 = jsonT["C4"].Day.D2;
          var day3 = jsonT["C4"].Day.D3;
          var day4 = jsonT["C4"].Day.D4;
          var day5 = jsonT["C4"].Day.D5;
          var day6 = jsonT["C4"].Day.D6;
          var day7 = jsonT["C4"].Day.D7;
          var day8 = jsonT["C4"].Day.D8;
          var day9 = jsonT["C4"].Day.D9;
          var day10 = jsonT["C4"].Day.D10;
          var time1 = jsonT["C4"].Time.T1;
          var time2 = jsonT["C4"].Time.T2;
          var time3 = jsonT["C4"].Time.T3;
          var time4 = jsonT["C4"].Time.T4;
          var time5 = jsonT["C4"].Time.T5;
          var time6 = jsonT["C4"].Time.T6;
          var time7 = jsonT["C4"].Time.T7;
          var time8 = jsonT["C4"].Time.T8;
          var time9 = jsonT["C4"].Time.T9;
          var time10 = jsonT["C4"].Time.T10;
          var b2 = jsonT["C4"].B.B2;
          var b1 = jsonT["C4"].B.B1;
          var b3 = jsonT["C4"].B.B3;
          var b4 = jsonT["C4"].B.B4;
          var b5 = jsonT["C4"].B.B5;
          var b6 = jsonT["C4"].B.B6;
          var b7 = jsonT["C4"].B.B7;
          var b8 = jsonT["C4"].B.B8;
          var b9 = jsonT["C4"].B.B9;
          var b10 = jsonT["C4"].B.B10;
          var a1 = jsonT["C4"].A.A1;
          var a2 = jsonT["C4"].A.A2;
          var a3 = jsonT["C4"].A.A3;
          var a4 = jsonT["C4"].A.A4;
          var a5 = jsonT["C4"].A.A5;
          var a6 = jsonT["C4"].A.A6;
          var a7 = jsonT["C4"].A.A7;
          var a8 = jsonT["C4"].A.A8;
          var a9 = jsonT["C4"].A.A9;
          var a10 = jsonT["C4"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'Z4'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(Z4)";
          var day1 = jsonT["Z4"].Day.D1;
          var day2 = jsonT["Z4"].Day.D2;
          var day3 = jsonT["Z4"].Day.D3;
          var day4 = jsonT["Z4"].Day.D4;
          var day5 = jsonT["Z4"].Day.D5;
          var day6 = jsonT["Z4"].Day.D6;
          var day7 = jsonT["Z4"].Day.D7;
          var day8 = jsonT["Z4"].Day.D8;
          var day9 = jsonT["Z4"].Day.D9;
          var day10 = jsonT["Z4"].Day.D10;
          var time1 = jsonT["Z4"].Time.T1;
          var time2 = jsonT["Z4"].Time.T2;
          var time3 = jsonT["Z4"].Time.T3;
          var time4 = jsonT["Z4"].Time.T4;
          var time5 = jsonT["Z4"].Time.T5;
          var time6 = jsonT["Z4"].Time.T6;
          var time7 = jsonT["Z4"].Time.T7;
          var time8 = jsonT["Z4"].Time.T8;
          var time9 = jsonT["Z4"].Time.T9;
          var time10 = jsonT["Z4"].Time.T10;
          var b1 = jsonT["Z4"].B.B1;
          var b2 = jsonT["Z4"].B.B2;
          var b3 = jsonT["Z4"].B.B3;
          var b4 = jsonT["Z4"].B.B4;
          var b5 = jsonT["Z4"].B.B5;
          var b6 = jsonT["Z4"].B.B6;
          var b7 = jsonT["Z4"].B.B7;
          var b8 = jsonT["Z4"].B.B8;
          var b9 = jsonT["Z4"].B.B9;
          var b10 = jsonT["Z4"].B.B10;
          var a1 = jsonT["Z4"].A.A1;
          var a2 = jsonT["Z4"].A.A2;
          var a3 = jsonT["Z4"].A.A3;
          var a4 = jsonT["Z4"].A.A4;
          var a5 = jsonT["Z4"].A.A5;
          var a6 = jsonT["Z4"].A.A6;
          var a7 = jsonT["Z4"].A.A7;
          var a8 = jsonT["Z4"].A.A8;
          var a9 = jsonT["Z4"].A.A9;
          var a10 = jsonT["Z4"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'M5'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(M5)";
          var day1 = jsonT["M5"].Day.D1;
          var day2 = jsonT["M5"].Day.D2;
          var day3 = jsonT["M5"].Day.D3;
          var day4 = jsonT["M5"].Day.D4;
          var day5 = jsonT["M5"].Day.D5;
          var day6 = jsonT["M5"].Day.D6;
          var day7 = jsonT["M5"].Day.D7;
          var day8 = jsonT["M5"].Day.D8;
          var day9 = jsonT["M5"].Day.D9;
          var day10 = jsonT["M5"].Day.D10;
          var time1 = jsonT["M5"].Time.T1;
          var time2 = jsonT["M5"].Time.T2;
          var time3 = jsonT["M5"].Time.T3;
          var time4 = jsonT["M5"].Time.T4;
          var time5 = jsonT["M5"].Time.T5;
          var time6 = jsonT["M5"].Time.T6;
          var time7 = jsonT["M5"].Time.T7;
          var time8 = jsonT["M5"].Time.T8;
          var time9 = jsonT["M5"].Time.T9;
          var time10 = jsonT["M5"].Time.T10;
          var b1 = jsonT["M5"].B.B1;
          var b2 = jsonT["M5"].B.B2;
          var b3 = jsonT["M5"].B.B3;
          var b4 = jsonT["M5"].B.B4;
          var b5 = jsonT["M5"].B.B5;
          var b6 = jsonT["M5"].B.B6;
          var b7 = jsonT["M5"].B.B7;
          var b8 = jsonT["M5"].B.B8;
          var b9 = jsonT["M5"].B.B9;
          var b10 = jsonT["M5"].B.B10;
          var a1 = jsonT["M5"].A.A1;
          var a2 = jsonT["M5"].A.A2;
          var a3 = jsonT["M5"].A.A3;
          var a4 = jsonT["M5"].A.A4;
          var a5 = jsonT["M5"].A.A5;
          var a6 = jsonT["M5"].A.A6;
          var a7 = jsonT["M5"].A.A7;
          var a8 = jsonT["M5"].A.A8;
          var a9 = jsonT["M5"].A.A9;
          var a10 = jsonT["M5"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'E5'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(E5)";
          var day1 = jsonT["E5"].Day.D1;
          var day2 = jsonT["E5"].Day.D2;
          var day3 = jsonT["E5"].Day.D3;
          var day4 = jsonT["E5"].Day.D4;
          var day5 = jsonT["E5"].Day.D5;
          var day6 = jsonT["E5"].Day.D6;
          var day7 = jsonT["E5"].Day.D7;
          var day8 = jsonT["E5"].Day.D8;
          var day9 = jsonT["E5"].Day.D9;
          var day10 = jsonT["E5"].Day.D10;
          var time1 = jsonT["E5"].Time.T1;
          var time2 = jsonT["E5"].Time.T2;
          var time3 = jsonT["E5"].Time.T3;
          var time4 = jsonT["E5"].Time.T4;
          var time5 = jsonT["E5"].Time.T5;
          var time6 = jsonT["E5"].Time.T6;
          var time7 = jsonT["E5"].Time.T7;
          var time8 = jsonT["E5"].Time.T8;
          var time9 = jsonT["E5"].Time.T9;
          var time10 = jsonT["E5"].Time.T10;
          var b1 = jsonT["E5"].B.B1;
          var b2 = jsonT["E5"].B.B2;
          var b3 = jsonT["E5"].B.B3;
          var b4 = jsonT["E5"].B.B4;
          var b5 = jsonT["E5"].B.B5;
          var b6 = jsonT["E5"].B.B6;
          var b7 = jsonT["E5"].B.B7;
          var b8 = jsonT["E5"].B.B8;
          var b9 = jsonT["E5"].B.B9;
          var b10 = jsonT["E5"].B.B10;
          var a1 = jsonT["E5"].A.A1;
          var a2 = jsonT["E5"].A.A2;
          var a3 = jsonT["E5"].A.A3;
          var a4 = jsonT["E5"].A.A4;
          var a6 = jsonT["L1"].A.A6;
          var a5 = jsonT["E5"].A.A5;
          var a7 = jsonT["E5"].A.A7;
          var a8 = jsonT["E5"].A.A8;
          var a9 = jsonT["E5"].A.A9;
          var a10 = jsonT["E5"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'C5'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(C5)";
          var day1 = jsonT["C5"].Day.D1;
          var day2 = jsonT["C5"].Day.D2;
          var day3 = jsonT["C5"].Day.D3;
          var day4 = jsonT["C5"].Day.D4;
          var day5 = jsonT["C5"].Day.D5;
          var day6 = jsonT["C5"].Day.D6;
          var day7 = jsonT["C5"].Day.D7;
          var day8 = jsonT["C5"].Day.D8;
          var day9 = jsonT["C5"].Day.D9;
          var day10 = jsonT["C5"].Day.D10;
          var time1 = jsonT["C5"].Time.T1;
          var time2 = jsonT["C5"].Time.T2;
          var time3 = jsonT["C5"].Time.T3;
          var time4 = jsonT["C5"].Time.T4;
          var time5 = jsonT["C5"].Time.T5;
          var time6 = jsonT["C5"].Time.T6;
          var time7 = jsonT["C5"].Time.T7;
          var time8 = jsonT["C5"].Time.T8;
          var time9 = jsonT["C5"].Time.T9;
          var time10 = jsonT["C5"].Time.T10;
          var b1 = jsonT["C5"].B.B1;
          var b2 = jsonT["C5"].B.B2;
          var b3 = jsonT["C5"].B.B3;
          var b4 = jsonT["C5"].B.B4;
          var b5 = jsonT["C5"].B.B5;
          var b6 = jsonT["C5"].B.B6;
          var b7 = jsonT["C5"].B.B7;
          var b8 = jsonT["C5"].B.B8;
          var b9 = jsonT["C5"].B.B9;
          var b10 = jsonT["C5"].B.B10;
          var a1 = jsonT["C5"].A.A1;
          var a2 = jsonT["C5"].A.A2;
          var a3 = jsonT["C5"].A.A3;
          var a4 = jsonT["C5"].A.A4;
          var a5 = jsonT["C5"].A.A5;
          var a6 = jsonT["C5"].A.A6;
          var a7 = jsonT["C5"].A.A7;
          var a8 = jsonT["C5"].A.A8;
          var a9 = jsonT["C5"].A.A9;
          var a10 = jsonT["C5"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'Z5'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(Z5)";
          var day1 = jsonT["Z5"].Day.D1;
          var day2 = jsonT["Z5"].Day.D2;
          var day3 = jsonT["Z5"].Day.D3;
          var day4 = jsonT["Z5"].Day.D4;
          var day5 = jsonT["Z5"].Day.D5;
          var day6 = jsonT["Z5"].Day.D6;
          var day7 = jsonT["Z5"].Day.D7;
          var day8 = jsonT["Z5"].Day.D8;
          var day9 = jsonT["Z5"].Day.D9;
          var day10 = jsonT["Z5"].Day.D10;
          var time1 = jsonT["Z5"].Time.T1;
          var time2 = jsonT["Z5"].Time.T2;
          var time3 = jsonT["Z5"].Time.T3;
          var time4 = jsonT["Z5"].Time.T4;
          var time5 = jsonT["Z5"].Time.T5;
          var time6 = jsonT["Z5"].Time.T6;
          var time7 = jsonT["Z5"].Time.T7;
          var time8 = jsonT["Z5"].Time.T8;
          var time9 = jsonT["Z5"].Time.T9;
          var time10 = jsonT["Z5"].Time.T10;
          var b1 = jsonT["Z5"].B.B1;
          var b2 = jsonT["Z5"].B.B2;
          var b3 = jsonT["Z5"].B.B3;
          var b4 = jsonT["Z5"].B.B4;
          var b5 = jsonT["Z5"].B.B5;
          var b6 = jsonT["Z5"].B.B6;
          var b7 = jsonT["Z5"].B.B7;
          var b8 = jsonT["Z5"].B.B8;
          var b9 = jsonT["Z5"].B.B9;
          var b10 = jsonT["Z5"].B.B10;
          var a1 = jsonT["Z5"].A.A1;
          var a2 = jsonT["Z5"].A.A2;
          var a3 = jsonT["Z5"].A.A3;
          var a4 = jsonT["Z5"].A.A4;
          var a5 = jsonT["Z5"].A.A5;
          var a6 = jsonT["Z5"].A.A6;
          var a7 = jsonT["Z5"].A.A7;
          var a8 = jsonT["Z5"].A.A8;
          var a9 = jsonT["Z5"].A.A9;
          var a10 = jsonT["Z5"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AM1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AM1)";
          var day1 = jsonT["AM1"].Day.D1;
          var day2 = jsonT["AM1"].Day.D2;
          var day3 = jsonT["AM1"].Day.D3;
          var day4 = jsonT["AM1"].Day.D4;
          var day5 = jsonT["AM1"].Day.D5;
          var day6 = jsonT["AM1"].Day.D6;
          var day7 = jsonT["AM1"].Day.D7;
          var day8 = jsonT["AM1"].Day.D8;
          var day9 = jsonT["AM1"].Day.D9;
          var day10 = jsonT["AM1"].Day.D10;
          var time1 = jsonT["AM1"].Time.T1;
          var time2 = jsonT["AM1"].Time.T2;
          var time3 = jsonT["AM1"].Time.T3;
          var time4 = jsonT["AM1"].Time.T4;
          var time5 = jsonT["AM1"].Time.T5;
          var time6 = jsonT["AM1"].Time.T6;
          var time7 = jsonT["AM1"].Time.T7;
          var time8 = jsonT["AM1"].Time.T8;
          var time9 = jsonT["AM1"].Time.T9;
          var time10 = jsonT["AM1"].Time.T10;
          var b1 = jsonT["AM1"].B.B1;
          var b2 = jsonT["AM1"].B.B2;
          var b3 = jsonT["AM1"].B.B3;
          var b4 = jsonT["AM1"].B.B4;
          var b5 = jsonT["AM1"].B.B5;
          var b6 = jsonT["AM1"].B.B6;
          var b7 = jsonT["AM1"].B.B7;
          var b8 = jsonT["AM1"].B.B8;
          var b9 = jsonT["AM1"].B.B9;
          var b10 = jsonT["AM1"].B.B10;
          var a1 = jsonT["AM1"].A.A1;
          var a2 = jsonT["AM1"].A.A2;
          var a3 = jsonT["AM1"].A.A3;
          var a4 = jsonT["AM1"].A.A4;
          var a5 = jsonT["AM1"].A.A5;
          var a6 = jsonT["AM1"].A.A6;
          var a7 = jsonT["AM1"].A.A7;
          var a8 = jsonT["AM1"].A.A8;
          var a9 = jsonT["AM1"].A.A9;
          var a10 = jsonT["AM1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AE1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AE1)";
          var day1 = jsonT["AE1"].Day.D1;
          var day2 = jsonT["AE1"].Day.D2;
          var day3 = jsonT["AE1"].Day.D3;
          var day4 = jsonT["AE1"].Day.D4;
          var day5 = jsonT["AE1"].Day.D5;
          var day6 = jsonT["AE1"].Day.D6;
          var day7 = jsonT["AE1"].Day.D7;
          var day8 = jsonT["AE1"].Day.D8;
          var day9 = jsonT["AE1"].Day.D9;
          var day10 = jsonT["AE1"].Day.D10;
          var time1 = jsonT["AE1"].Time.T1;
          var time2 = jsonT["AE1"].Time.T2;
          var time3 = jsonT["AE1"].Time.T3;
          var time4 = jsonT["AE1"].Time.T4;
          var time5 = jsonT["AE1"].Time.T5;
          var time6 = jsonT["AE1"].Time.T6;
          var time7 = jsonT["AE1"].Time.T7;
          var time8 = jsonT["AE1"].Time.T8;
          var time9 = jsonT["AE1"].Time.T9;
          var time10 = jsonT["AE1"].Time.T10;
          var b1 = jsonT["AE1"].B.B1;
          var b2 = jsonT["AE1"].B.B2;
          var b3 = jsonT["AE1"].B.B3;
          var b4 = jsonT["AE1"].B.B4;
          var b5 = jsonT["AE1"].B.B5;
          var b6 = jsonT["AE1"].B.B6;
          var b7 = jsonT["AE1"].B.B7;
          var b8 = jsonT["AE1"].B.B8;
          var b9 = jsonT["AE1"].B.B9;
          var b10 = jsonT["AE1"].B.B10;
          var a1 = jsonT["AE1"].A.A1;
          var a2 = jsonT["AE1"].A.A2;
          var a3 = jsonT["AE1"].A.A3;
          var a4 = jsonT["AE1"].A.A4;
          var a5 = jsonT["AE1"].A.A5;
          var a6 = jsonT["AE1"].A.A6;
          var a7 = jsonT["AE1"].A.A7;
          var a8 = jsonT["AE1"].A.A8;
          var a9 = jsonT["AE1"].A.A9;
          var a10 = jsonT["AE1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AC1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AC1)";
          var day1 = jsonT["AC1"].Day.D1;
          var day2 = jsonT["AC1"].Day.D2;
          var day3 = jsonT["AC1"].Day.D3;
          var day4 = jsonT["AC1"].Day.D4;
          var day5 = jsonT["AC1"].Day.D5;
          var day6 = jsonT["AC1"].Day.D6;
          var day7 = jsonT["AC1"].Day.D7;
          var day8 = jsonT["AC1"].Day.D8;
          var day9 = jsonT["AC1"].Day.D9;
          var day10 = jsonT["AC1"].Day.D10;
          var time1 = jsonT["AC1"].Time.T1;
          var time2 = jsonT["AC1"].Time.T2;
          var time3 = jsonT["AC1"].Time.T3;
          var time4 = jsonT["AC1"].Time.T4;
          var time5 = jsonT["AC1"].Time.T5;
          var time6 = jsonT["AC1"].Time.T6;
          var time7 = jsonT["AC1"].Time.T7;
          var time8 = jsonT["AC1"].Time.T8;
          var time9 = jsonT["AC1"].Time.T9;
          var time10 = jsonT["AC1"].Time.T10;
          var b1 = jsonT["AC1"].B.B1;
          var b2 = jsonT["AC1"].B.B2;
          var b3 = jsonT["AC1"].B.B3;
          var b4 = jsonT["AC1"].B.B4;
          var b5 = jsonT["AC1"].B.B5;
          var b6 = jsonT["AC1"].B.B6;
          var b7 = jsonT["AC1"].B.B7;
          var b8 = jsonT["AC1"].B.B8;
          var b9 = jsonT["AC1"].B.B9;
          var b10 = jsonT["AC1"].B.B10;
          var a1 = jsonT["AC1"].A.A1;
          var a2 = jsonT["AC1"].A.A2;
          var a3 = jsonT["AC1"].A.A3;
          var a4 = jsonT["AC1"].A.A4;
          var a5 = jsonT["AC1"].A.A5;
          var a6 = jsonT["AC1"].A.A6;
          var a7 = jsonT["AC1"].A.A7;
          var a8 = jsonT["AC1"].A.A8;
          var a9 = jsonT["AC1"].A.A9;
          var a10 = jsonT["AC1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AZ1'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AZ1)";
          var day1 = jsonT["AZ1"].Day.D1;
          var day2 = jsonT["AZ1"].Day.D2;
          var day3 = jsonT["AZ1"].Day.D3;
          var day4 = jsonT["AZ1"].Day.D4;
          var day5 = jsonT["AZ1"].Day.D5;
          var day6 = jsonT["AZ1"].Day.D6;
          var day7 = jsonT["AZ1"].Day.D7;
          var day8 = jsonT["AZ1"].Day.D8;
          var day9 = jsonT["AZ1"].Day.D9;
          var day10 = jsonT["AZ1"].Day.D10;
          var time1 = jsonT["AZ1"].Time.T1;
          var time2 = jsonT["AZ1"].Time.T2;
          var time3 = jsonT["AZ1"].Time.T3;
          var time4 = jsonT["AZ1"].Time.T4;
          var time5 = jsonT["AZ1"].Time.T5;
          var time6 = jsonT["AZ1"].Time.T6;
          var time7 = jsonT["AZ1"].Time.T7;
          var time8 = jsonT["AZ1"].Time.T8;
          var time9 = jsonT["AZ1"].Time.T9;
          var time10 = jsonT["AZ1"].Time.T10;
          var b1 = jsonT["AZ1"].B.B1;
          var b2 = jsonT["AZ1"].B.B2;
          var b3 = jsonT["AZ1"].B.B3;
          var b4 = jsonT["AZ1"].B.B4;
          var b5 = jsonT["AZ1"].B.B5;
          var b6 = jsonT["AZ1"].B.B6;
          var b7 = jsonT["AZ1"].B.B7;
          var b8 = jsonT["AZ1"].B.B8;
          var b9 = jsonT["AZ1"].B.B9;
          var b10 = jsonT["AZ1"].B.B10;
          var a1 = jsonT["AZ1"].A.A1;
          var a2 = jsonT["AZ1"].A.A2;
          var a3 = jsonT["AZ1"].A.A3;
          var a4 = jsonT["AZ1"].A.A4;
          var a5 = jsonT["AZ1"].A.A5;
          var a6 = jsonT["AZ1"].A.A6;
          var a7 = jsonT["AZ1"].A.A7;
          var a8 = jsonT["AZ1"].A.A8;
          var a9 = jsonT["AZ1"].A.A9;
          var a10 = jsonT["AZ1"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AM2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AM2)";
          var day1 = jsonT["AM2"].Day.D1;
          var day2 = jsonT["AM2"].Day.D2;
          var day3 = jsonT["AM2"].Day.D3;
          var day4 = jsonT["AM2"].Day.D4;
          var day5 = jsonT["AM2"].Day.D5;
          var day6 = jsonT["AM2"].Day.D6;
          var day7 = jsonT["AM2"].Day.D7;
          var day8 = jsonT["AM2"].Day.D8;
          var day9 = jsonT["AM2"].Day.D9;
          var day10 = jsonT["AM2"].Day.D10;
          var time1 = jsonT["AM2"].Time.T1;
          var time2 = jsonT["AM2"].Time.T2;
          var time3 = jsonT["AM2"].Time.T3;
          var time4 = jsonT["AM2"].Time.T4;
          var time5 = jsonT["AM2"].Time.T5;
          var time6 = jsonT["AM2"].Time.T6;
          var time7 = jsonT["AM2"].Time.T7;
          var time8 = jsonT["AM2"].Time.T8;
          var time9 = jsonT["AM2"].Time.T9;
          var time10 = jsonT["AM2"].Time.T10;
          var b1 = jsonT["AM2"].B.B1;
          var b2 = jsonT["AM2"].B.B2;
          var b3 = jsonT["AM2"].B.B3;
          var b4 = jsonT["AM2"].B.B4;
          var b5 = jsonT["AM2"].B.B5;
          var b6 = jsonT["AM2"].B.B6;
          var b7 = jsonT["AM2"].B.B7;
          var b8 = jsonT["AM2"].B.B8;
          var b9 = jsonT["AM2"].B.B9;
          var b10 = jsonT["AM2"].B.B10;
          var a1 = jsonT["AM2"].A.A1;
          var a2 = jsonT["AM2"].A.A2;
          var a3 = jsonT["AM2"].A.A3;
          var a4 = jsonT["AM2"].A.A4;
          var a5 = jsonT["AM2"].A.A5;
          var a6 = jsonT["AM2"].A.A6;
          var a7 = jsonT["AM2"].A.A7;
          var a8 = jsonT["AM2"].A.A8;
          var a9 = jsonT["AM2"].A.A9;
          var a10 = jsonT["AM2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AE2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AE2)";
          var day1 = jsonT["AE2"].Day.D1;
          var day2 = jsonT["AE2"].Day.D2;
          var day3 = jsonT["AE2"].Day.D3;
          var day4 = jsonT["AE2"].Day.D4;
          var day5 = jsonT["AE2"].Day.D5;
          var day6 = jsonT["AE2"].Day.D6;
          var day7 = jsonT["AE2"].Day.D7;
          var day8 = jsonT["AE2"].Day.D8;
          var day9 = jsonT["AE2"].Day.D9;
          var day10 = jsonT["AE2"].Day.D10;
          var time1 = jsonT["AE2"].Time.T1;
          var time2 = jsonT["AE2"].Time.T2;
          var time3 = jsonT["AE2"].Time.T3;
          var time4 = jsonT["AE2"].Time.T4;
          var time5 = jsonT["AE2"].Time.T5;
          var time6 = jsonT["AE2"].Time.T6;
          var time7 = jsonT["AE2"].Time.T7;
          var time8 = jsonT["AE2"].Time.T8;
          var time9 = jsonT["AE2"].Time.T9;
          var time10 = jsonT["AE2"].Time.T10;
          var b1 = jsonT["AE2"].B.B1;
          var b2 = jsonT["AE2"].B.B2;
          var b3 = jsonT["AE2"].B.B3;
          var b4 = jsonT["AE2"].B.B4;
          var b5 = jsonT["AE2"].B.B5;
          var b6 = jsonT["AE2"].B.B6;
          var b7 = jsonT["AE2"].B.B7;
          var b8 = jsonT["AE2"].B.B8;
          var b9 = jsonT["AE2"].B.B9;
          var b10 = jsonT["AE2"].B.B10;
          var a1 = jsonT["AE2"].A.A1;
          var a2 = jsonT["AE2"].A.A2;
          var a3 = jsonT["AE2"].A.A3;
          var a4 = jsonT["AE2"].A.A4;
          var a5 = jsonT["AE2"].A.A5;
          var a6 = jsonT["AE2"].A.A6;
          var a7 = jsonT["AE2"].A.A7;
          var a8 = jsonT["AE2"].A.A8;
          var a9 = jsonT["AE2"].A.A9;
          var a10 = jsonT["AE2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AC2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AC2)";
          var day1 = jsonT["AC2"].Day.D1;
          var day2 = jsonT["AC2"].Day.D2;
          var day3 = jsonT["AC2"].Day.D3;
          var day4 = jsonT["AC2"].Day.D4;
          var day5 = jsonT["AC2"].Day.D5;
          var day6 = jsonT["AC2"].Day.D6;
          var day7 = jsonT["AC2"].Day.D7;
          var day8 = jsonT["AC2"].Day.D8;
          var day9 = jsonT["AC2"].Day.D9;
          var day10 = jsonT["AC2"].Day.D10;
          var time1 = jsonT["AC2"].Time.T1;
          var time2 = jsonT["AC2"].Time.T2;
          var time3 = jsonT["AC2"].Time.T3;
          var time4 = jsonT["AC2"].Time.T4;
          var time5 = jsonT["AC2"].Time.T5;
          var time6 = jsonT["AC2"].Time.T6;
          var time7 = jsonT["AC2"].Time.T7;
          var time8 = jsonT["AC2"].Time.T8;
          var time9 = jsonT["AC2"].Time.T9;
          var time10 = jsonT["AC2"].Time.T10;
          var b1 = jsonT["AC2"].B.B1;
          var b2 = jsonT["AC2"].B.B2;
          var b3 = jsonT["AC2"].B.B3;
          var b4 = jsonT["AC2"].B.B4;
          var b5 = jsonT["AC2"].B.B5;
          var b6 = jsonT["AC2"].B.B6;
          var b7 = jsonT["AC2"].B.B7;
          var b8 = jsonT["AC2"].B.B8;
          var b9 = jsonT["AC2"].B.B9;
          var b10 = jsonT["AC2"].B.B10;
          var a1 = jsonT["AC2"].A.A1;
          var a2 = jsonT["AC2"].A.A2;
          var a3 = jsonT["AC2"].A.A3;
          var a4 = jsonT["AC2"].A.A4;
          var a5 = jsonT["AC2"].A.A5;
          var a7 = jsonT["AC2"].A.A7;
          var a6 = jsonT["AC2"].A.A6;
          var a8 = jsonT["AC2"].A.A8;
          var a9 = jsonT["AC2"].A.A9;
          var a10 = jsonT["AC2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        else if(id == 'AZ2'){
          document.getElementById("TableTitle").innerHTML = "授業変更・休講情報(AZ2)";
          var day1 = jsonT["AZ2"].Day.D1;
          var day2 = jsonT["AZ2"].Day.D2;
          var day3 = jsonT["AZ2"].Day.D3;
          var day4 = jsonT["AZ2"].Day.D4;
          var day5 = jsonT["AZ2"].Day.D5;
          var day6 = jsonT["AZ2"].Day.D6;
          var day7 = jsonT["AZ2"].Day.D7;
          var day8 = jsonT["AZ2"].Day.D8;
          var day9 = jsonT["AZ2"].Day.D9;
          var day10 = jsonT["AZ2"].Day.D10;
          var time1 = jsonT["AZ2"].Time.T1;
          var time2 = jsonT["AZ2"].Time.T2;
          var time3 = jsonT["AZ2"].Time.T3;
          var time4 = jsonT["AZ2"].Time.T4;
          var time5 = jsonT["AZ2"].Time.T5;
          var time6 = jsonT["AZ2"].Time.T6;
          var time7 = jsonT["AZ2"].Time.T7;
          var time8 = jsonT["AZ2"].Time.T8;
          var time9 = jsonT["AZ2"].Time.T9;
          var time10 = jsonT["AZ2"].Time.T10;
          var b1 = jsonT["AZ2"].B.B1;
          var b2 = jsonT["AZ2"].B.B2;
          var b3 = jsonT["AZ2"].B.B3;
          var b4 = jsonT["AZ2"].B.B4;
          var b5 = jsonT["AZ2"].B.B5;
          var b6 = jsonT["AZ2"].B.B6;
          var b7 = jsonT["AZ2"].B.B7;
          var b8 = jsonT["AZ2"].B.B8;
          var b9 = jsonT["AZ2"].B.B9;
          var b10 = jsonT["AZ2"].B.B10;
          var a1 = jsonT["AZ2"].A.A1;
          var a2 = jsonT["AZ2"].A.A2;
          var a3 = jsonT["AZ2"].A.A3;
          var a4 = jsonT["AZ2"].A.A4;
          var a5 = jsonT["AZ2"].A.A5;
          var a6 = jsonT["AZ2"].A.A6;
          var a7 = jsonT["AZ2"].A.A7;
          var a8 = jsonT["AZ2"].A.A8;
          var a9 = jsonT["AZ2"].A.A9;
          var a10 = jsonT["AZ2"].A.A10;
          TableOutput(day1,day2,day3,day4,day5,day6,day7,day8,day9,day10,time1,time2,time3,time4,time5,time6,time7,time8,time9,time10,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10)
        }
        });
    }
}

// Fortune Function
function FortuneChange(){
    if(document.getElementById('Sign')){
        id = document.getElementById('Sign').value;
          fetch('./json/Fortune.json',{cache: "no-store"})
          .then(function (data) {
            return data.json();
          })
          .then(function (jsonF) {
            var f_day = jsonF["day"]
            document.getElementById("FortuneArea").innerHTML = "今日の占い(" + f_day + ")";
            var jF1 = jsonF["Aries"];
            var jF2 = jsonF["Taurus"];
            var jF3 = jsonF["Gemini"];
            var jF4 = jsonF["Cancer"];
            var jF5 = jsonF["Leo"];
            var jF6 = jsonF["Virgo"];
            var jF7 = jsonF["Libra"];
            var jF8 = jsonF["Scorpio"];
            var jF9 = jsonF["Sagittarius"];
            var jF10 = jsonF["Capricorn"];
            var jF11 = jsonF["Aquarius"];
            var jF12 = jsonF["Pisces"];
            const signPic = document.getElementById('Show_Sign');
            signPic.src = './img/Fortune/1.png';
            const rankPic = document.getElementById('Show_Rank');
            rankPic.src = './img/Rank/' + jF1 +'.png';
        if(id == 'F1'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/1.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF1 +'.png';
        }else if(id == 'F2'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/2.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF2 +'.png';
        }
        else if(id == 'F3'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/3.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF3 +'.png';
        }
        else if(id == 'F4'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/4.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF4 +'.png';
        }
        else if(id == 'F5'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/5.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF5 +'.png';
        }
        else if(id == 'F6'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/6.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF6 +'.png';
        }
        else if(id == 'F7'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/7.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF7 +'.png';
        }
        else if(id == 'F8'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/8.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF8 +'.png';
        }
        else if(id == 'F9'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/9.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF9 +'.png';
        }
        else if(id == 'F10'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/10.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF10 +'.png';
        }
        else if(id == 'F11'){
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/11.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF11 +'.png';
        }
        else{
          const signPic = document.getElementById('Show_Sign');
          signPic.src = './img/Fortune/12.png';
          const rankPic = document.getElementById('Show_Rank');
          rankPic.src = './img/Rank/' + jF12 +'.png';
        }
        });
    }
}

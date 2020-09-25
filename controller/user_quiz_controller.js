
function getQuestions() {
    //alert("getQuestions");

    $.ajax({
        type:"POST",
        url:"model/user_quiz_model.php",
        data:{action:"get_questions"},
        error: function() { alert("Jquery Ajax request error!!!"); },
        success:function(data){
            // alert(data);
            //console.log(data);
            questions_arr = JSON.parse(data);
            num_qestions = questions_arr.length;
            for (let i = 0; i < num_qestions; i++) {
                answers.push("o");
            }
            initView();
            getNext();
            startTime = new Date();
            intIntervalID = window.setInterval('showTime()',1000);
        }
    }); 
}


function saveScore(strScore){
    var curDate = new Date();
    var endDateTime = curDate.getFullYear();
    endDateTime += "-" + (curDate.getMonth()+1);
    endDateTime += "-" + curDate.getDate();
    endDateTime += " " + curDate.getHours();
    endDateTime += ":" + curDate.getMinutes();
    endDateTime += ":" + curDate.getSeconds();
    
    var startDateTime = curDate.getFullYear();
    startDateTime += "-" + (curDate.getMonth()+1);
    startDateTime += "-" + curDate.getDate();
    var curHours;
    if ((curDate.getHours()-1) < 0){
        curHours = 23;
    }else{
        curHours = curDate.getHours() - 1;
    }
    
    startDateTime += " " + curHours;
    startDateTime += ":" + curDate.getMinutes();
    startDateTime += ":" + curDate.getSeconds();
    
    var storage=window.localStorage;
    var user_name = sessionStorage.getItem("user_name");
    var score = '{"user_name":"' + user_name +
            //'","start_time":"' + "2017-10-11 13:17:17" +
            '","start_time":"' + startDateTime +
            '","end_time":"' + endDateTime +
            '","score":"' + strScore + '"}';
    //alert(endDateTime + startDateTime);
            
    $.ajax({
        type:"POST",
        url:"model/user_quiz_model.php",
        data:{data:score,action:"save_score"},
        error: function() {
            alert("Jquery Ajax request error!!!");
        },
        success:function(){

        }
    });
}

var questions_arr=[];     // the questions table fetch from database
var index = -1;        // index of questions array
var num_qestions = 0;  // total num of questions return from database
var answers = [];
var startTime = new Date();
var showHint = false;
var intIntervalID = 0;


function onload(){
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level !== "TESTER") {
        logoutQuiz();
    }
}


function logoutQuiz(){
    window.location.href="index.html";
}

function startTest(){
    //console.log("start testing");
    //$("#loading").attr({display: "block"});
    document.querySelector("#loading").setAttribute("style","display:block");

    getQuestions();
}

function initView(){
    $("#block_start").remove();
    //$("#block_quiz").attr("display", "block");
    //console.log($("#block_quiz").attr("display"));
    document.querySelector("#block_quiz").setAttribute("style","display:block");
    document.querySelector("#action_header_btn").setAttribute("style","display:block");
}

function getNext(){

    if(index < (num_qestions -1 )) {
        index++;
    }
    else {
        index = 0;
    }
    //console.log(index);

    setQuestionDetail();
}

function getPrevious(){

    if(index >0 ) {
        index--;
    }
    else {
        index = num_qestions;
    }
    //console.log(index);

    setQuestionDetail();
}

function setQuestionDetail(){
    $("#question_title").text("Question " + (index + 1) +" ");

    if (questions_arr[index].image) {
        //console.log("has image");
        $("#question_photo").attr("src", "data:image/jpeg;base64," + questions_arr[index].image);
        document.querySelector("#question_photo").setAttribute("style","visibility:visible");
    }
    else {
        $("#question_photo").attr("src", "");
        document.querySelector("#question_photo").setAttribute("style","visibility:hidden");
    }

    //$("#question").text(questions_arr[index].question + "(Difficulty:" + questions_arr[index].quest_type + ")");
    $("#question").text(questions_arr[index].question);
    $("#answers_a").text(questions_arr[index].answer1);
    $("#answers_b").text(questions_arr[index].answer2);
    $("#answers_c").text(questions_arr[index].answer3);
    $("#answers_d").text(questions_arr[index].answer4);

    //set radio button
    //ACSII code of answers[index]:  answers[index].charCodeAt()
    //"a" 61  "b" 62  "c"  63  "d" 64
    //
    let obj = document.getElementsByName("answers");
    for (let i = 0; i < obj.length; i++) {
        obj[i].checked = ((answers[index].charCodeAt() - 97 - i) === 0);
    }
}


function clearCheckStatus (Name) {
    let obj = document.getElementsByName(Name);
    if (obj != null) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                obj[i].checked = false;
            }
        }
    }
}

function getAnswer(Name) {
    let obj = document.getElementsByName(Name);
    if (obj != null) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                return obj[i].value;
            }
        }
    }
}

function answersClick (that) {
    //alert("click");
    answers[index] = that.value;

}

function submit_quiz(){
    let returnValue = window.confirm("Submit will be final! Are you sure?");
    if (!returnValue) {
        return;
    }

    let score = 0;
    let i = 0;
    for (i=0; i < num_qestions; i++){
        if (answers[i] === 'o') {
            break;
        }
        else {
            if (answers[i] === questions_arr[i].correct_answer) {
                score++;
            }
        }
    }

    if (i < num_qestions) {
        alert('Please answer all questions!');
    }
    else {
        showTestResult(score);
    }
}

function showTestResult (score) {
    clearInterval(intIntervalID);

    let intScore = Math.round((score * 100)/num_qestions);
    //let score_aria_value = 100 - intScore;
    document.querySelector("#block_score").setAttribute("style","display:block");
    $("#score_hint").text("Your Test Result: " + intScore +"%");
    document.getElementById('pg').value = intScore;
    //let styleScore = 'width:' +  intScore + '%; aria-valuenow : "' + score_aria_value + '";' + 'aria-valuemin: "0"; aria-valuemax: "100"';
    //document.querySelector("#score_progress_bar").setAttribute("style", styleScore);
    //document.querySelector("#score_progress_bar").setAttribute('style','aria-valuenow: "' + score_aria_value + '"');
    //document.querySelector("#score_progress_bar").setAttribute("style","width: 60%");
    $("#submit_btn1").attr('disabled',true);
    $("#submit_btn1").removeAttr("onclick");
    //$("#submit_btn2").attr('disabled',true);
    //$("#submit_btn2").removeAttr("onclick");

    document.querySelector("#block_quiz").setAttribute("style","display:none");

    //saveScore(strScore);
}

function showTime(){
    let now=new Date(); //get current time
    let milisecPass = now.getTime() - startTime.getTime(); //miliseconds passed since start test
    //let remain1 = milisecPass%(24*3600*1000); //计算天数后剩余的毫秒数
    //let hours = Math.floor(leave1/(3600*1000));
    //let remain2 = remain1%(3600*1000);        //计算小时数后剩余的毫秒数
    let remain2 = (milisecPass%(24*3600*1000)) % (3600*1000);        //计算小时数后剩余的毫秒数
    let minPass=Math.floor(remain2/(60*1000)); //计算相差秒数
    let remain3=remain2%(60*1000) ;     //计算分钟数后剩余的毫秒数
    let secondPass=Math.round(remain3/1000);

    //format display time
    minPassStr = minPass < 10 ? ('0' + minPass) : ("" + minPass);
    secondPassStr = secondPass < 10 ? ('0' + secondPass) : ("" + secondPass);

    //console.log(minPassStr);
    //console.log(secondPassStr);
    $("#timing_btn").text(minPassStr + ":" + secondPassStr);

    if ((!showHint) && (minPassStr >= 25)) {
        showHint = true;
        alert("You have less than 5 minutes. Please make sure to submit your test before deadline!");
    }

    if (minPassStr >= 30) {
        clearInterval(intIntervalID);
        let score = 0;
        for (let i=0; i < num_qestions; i++){
            if (answers[i] === questions_arr[i].correct_answer) {
                score++;
            }
        }
        showTestResult(score);
    }
}


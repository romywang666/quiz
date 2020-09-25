function onload() {
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level !== "ADMIN") {
        window.location.href = "index.html";
    }
}

function choosePhoto() {
    $("#photoFile").click();
}

function showPreview(source) {
    //console.log(source.files[0]);
    let fileURL = URL.createObjectURL(source.files[0]);

    $("#preview_photo").attr('src',fileURL);

    img = document.getElementById("preview_photo");

    console.log("width:"+img.width + "  height:" + img.height);
}

function verifyInput(){
    //console.log('enter verifyInput');
    let question = $("#question").val();
    let quest_type = $("#quest_type").val();
    let answer1 = $("#answer1").val();
    let answer2 = $("#answer2").val();
    let answer3 = $("#answer3").val();
    let answer4 = $("#answer4").val();
    let correct_answer = $("#correct_answer").val();

    if(question.trim()===""){
        alert("Please input a question!!!");
        return;
    }
    
    if(quest_type.trim()===""){
        alert("Please input a question type!!!");
        return;
    }
    
    if(answer1.trim()===""){
        alert("Please input option1!!!");
        return;
    }
    
    if(answer2.trim()===""){
        alert("Please input option2!!!");
        return;
    }
    
    if(answer3.trim()===""){
        alert("Please input option3!!!");
        return;
    }
    
    if(answer4.trim()===""){
        alert("Please input option4!!!");
        return;
    }

    if(correct_answer.trim()===""){
        alert("Please input a correct answer!!!");
        return;
    }

    //question = addslashes(question);
    //answer1  = addslashes(answer1);
    //answer2  = addslashes(answer2);
    //answer3  = addslashes(answer3);
    //answer4  = addslashes(answer4);

    let formData = new FormData();

    if ($("#photoFile").val()) {
        //console.log("File selected.");
        formData.append("FileSelected","TRUE");
        //let file = document.getElementById("photoFile").files[0];
        let file = $("#photoFile")[0].files[0];
        formData.append("photo", file);
        //console.log('FileSize: '+ file.size);
        formData.append("FileSize", file.size);
    } else {
        //console.log("File not selected.");
        formData.append("FileSelected","FALSE");
    }

    formData.append("question", question);
    formData.append("quest_type", quest_type);
    formData.append("answer1", answer1);
    formData.append("answer2", answer2);
    formData.append("answer3", answer3);
    formData.append("answer4", answer4);
    formData.append("correct_answer", correct_answer);
    formData.append("action", "add_question");

    //call controller
    insertQuestion(formData)
}

function insertCancel(){
    window.location.href="admin.html";
}
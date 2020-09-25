function onload(){
    let auth_level = window.sessionStorage.getItem("auth_level");
    if (auth_level !== "ADMIN") {
        window.location.href="index.html";
    }

    let id =$.query.get("id");
    let question = $.query.get("question");
    let quest_type = $.query.get("quest_type");
    let answer1 = $.query.get("answer1");
    let answer2 = $.query.get("answer2");
    let answer3 = $.query.get("answer3");
    let answer4 = $.query.get("answer4");
    let correct_answer = $.query.get("correct_answer");

    $("#id").val(id);
    $("#question").text(question);
    $("#quest_type").val(quest_type);
    $("#answer1").text(answer1);
    $("#answer2").text(answer2);
    $("#answer3").text(answer3);
    $("#answer4").text(answer4);
    $("#correct_answer").val(correct_answer);

    //console.log("parameter question: "+question);
    //call controler to get image
    getQuestionImage(id);
}

function choosePhoto() {
    $("#photoFile").click();
}

function showPreview(source) {
    //console.log(source.files[0]);
    let fileURL = URL.createObjectURL(source.files[0]);

    $("#preview_photo").attr('src',fileURL);
}

function displayImage(data) {
    if (data == "CONNECTION_ERROR") {
        console.log("000 Database Error!");
        return;
    }

    if ((data == "NO_IMAGE")|| (data == null)) {
        console.log("001 No image return.");
        return;
    }

    if (data.length == 0) {
        console.log("002 No image return.");
        return;
    }

    //let container = document.getElementById("preview_photo");
    //let canvas = document.createElement('canvas');
    //let canvas = document.getElementById("preview_photo");

    //let img = new Image();
    //img.src = 'data:image/jpeg;base64,' + data;
    //console.log(img.src);
    //img.onload = function () {
    //    canvas.getContext("2d").drawImage(img, 0, 0);
        //container.append(img);
        //$scope.image = canvas.toDataURL();
        //if (!$scope.$$phase) $scope.$apply();
    //}



    $("#preview_photo").attr("src", "data:image/jpeg;base64," + data);

    // ********comment out the following debug codes ***********

    //console.log('return image data size: ' + data.length);
    //let binaryData = [];
    //binaryData.push(data);
    //let blob = new Blob(binaryData,{type: "image/jpeg"});
    //let blob = new Blob([data], {type: "image/jpeg"});
    //let blob = new Blob(data, {type: "application/octet-stream"});
    //let img_url = URL.createObjectURL(blob,{type: "image/jpeg"});
    //console.log(data.size);
    //console.log(img_url);

    //document.getElementById("preview_photo").onload = function() {
    //    window.URL.revokeObjectURL(img_url);
    //}
    //let img_url = URL.createObjectURL(data);
    //alert(img_url);
    //$("#preview_photo").attr("src", img_url);

    // ********debuge code end ********
}

function updateCancel(){
    window.location.href = "admin.html";
}

function verifyInput(){
    let id = $("#id").val();
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
        console.log("File selected.");
        formData.append("FileSelected","TRUE");
        let file = document.getElementById("photoFile").files[0];
        //let file = $("#photoFile")[0].files[0];
        formData.append("photo", file);
        console.log('FileSize: '+ file.size);
        formData.append("FileSize", file.size);
    } else {
        console.log("File not selected.");
        formData.append("FileSelected","FALSE");
    }

    formData.append("id", id);
    formData.append("question", question);
    formData.append("quest_type", quest_type);
    formData.append("answer1", answer1);
    formData.append("answer2", answer2);
    formData.append("answer3", answer3);
    formData.append("answer4", answer4);
    formData.append("correct_answer", correct_answer);
    formData.append("action", "update_question");

    //call controller
    updateQuestion(formData)
}
<?php
    //$con = mysqli_connect("localhost","id14264364_hamster","mdg%-0=89jj)X>n5","id14264364_rocket");
    //echo "enter    ";
    //header('Content-Type: application/json');
    try{
        $con = mysqli_connect("localhost","apps","Someday21#","trisolaris");
        //    echo "trying    ";
        if (!$con){
            //die('Could not connect to Database:' . mysqli_connect_error());
            die('CONNECTION_ERROR');
        }
    }catch (Exception $e){        //捕获异常
        //echo $e->getMessage();
        die('CONNECTION_ERROR' . $e->getMessage());//打印异常信息
    }


    //echo "database connected    ";
    //mysqli_select_db($con,"comp4711");


    $action= $_POST['action'];

    if (strcmp($action,'get_all_questions') == 0){
        get_all_questions();
    } elseif (strcmp($action,'get_questionImage') == 0) {
        get_questionImage();
    } elseif (strcmp($action,'update_question') == 0) {
        update_question();
    } elseif (strcmp($action,'add_question') == 0) {
        add_question();
    } elseif (strcmp($action,'delete_question') == 0) {
        delete_question();
    }


    function get_all_questions(){
        $sql="SELECT id, question, quest_type, answer1, answer2, answer3, answer4, correct_answer FROM quiz_questions ORDER BY id;";

        global $con;
        $result = mysqli_query($con,$sql);

        // SQL statement execution error. maybe syntax incorrect.
        if (!$result) {
            echo "QUERY_ERROR";
            return;
        }

        //echo $sql;


        if (mysqli_num_rows($result) > 0) {
            $rows = array();

            while ($row = mysqli_fetch_assoc($result)){

                //$rows[] = $row;
                //$rows[] = json_encode($row);
                array_push($rows, $row);
            }


            try {
                $rows = json_encode($rows);
                echo $rows;
            } catch (JsonException $e) {
                throw new EncryptException('Could not encrypt the data.', 0, $e);
            }
        }
        else {
            echo "NO_DATA";
        }
    }

    function get_questionImage(){
        $id =  $_POST['id'];
        //echo $id;

        $sql="SELECT image FROM quiz_questions where id=".$id.";";
        //echo $sql;
        global $con;
        $result = mysqli_query($con,$sql);
        $row = mysqli_fetch_assoc($result);

        //Header("Content-type: image/jpg");
        if ($row['image'] == '' || is_null($row['image'])) {
            echo "NO_IMAGE";
        } else {
            echo base64_encode($row["image"]);
        }
    }

    function delete_question() {
        $id =  $_POST['id'];
        //echo $id;
        $sql = "DELETE FROM quiz_questions WHERE id=".$id.";";
        //echo $sql;
        global $con;
        mysqli_query($con,$sql);
    }

    function add_question(){
        //if (!isset($_POST['data'])) {
        //    die('no data to save!');
        //}
        //echo "received data!    ";

        $file_selected  = $_POST['FileSelected'];
        if (strcmp($file_selected,'TRUE') == 0) {
            $image_file     = $_FILES['photo']['tmp_name'];//图片上传上来临时文件的路径
            $image_size     = $_POST['FileSize'];
            //echo "File Selected.";

            //判断上传文件是否为空，判断文件是不是通过 HTTP POST 上传,确保恶意的用户无法欺骗脚本去访问本不能访问的文件
            if($image_file and is_uploaded_file($image_file)) {
                $file = fopen($image_file, "rb");
                $image = bin2hex(fread($file,$image_size));//bin2hex()将二进制数据转换成十六进制表示
                fclose($file);
            } else {
                die('Read Image File Error!');
            }
        }


        $question       = $_POST['question'];
        $quest_type     = $_POST['quest_type'];
        $answer1        = $_POST['answer1'];
        $answer2        = $_POST['answer2'];
        $answer3        = $_POST['answer3'];
        $answer4        = $_POST['answer4'];
        $correct_answer = $_POST['correct_answer'];

        $question = addslashes($question);
        $answer1  = addslashes($answer1);
        $answer2  = addslashes($answer2);
        $answer3  = addslashes($answer3);
        $answer4  = addslashes($answer4);

        //echo $image_file;

        //$image = addslashes(fread(fopen($image_file, "r"), $image_size));
        //$image = addslashes($image_file);
        //echo 'read file size: ' . strlen($image);
        //echo 'Add image size: ' . $image_size;

        //echo $question.$quest_type.$answer1.$answer2.$answer3.$answer4.$correct_answer ;

        if (strcmp($file_selected,'TRUE') == 0) {
            $sql="INSERT INTO quiz_questions (question, quest_type, answer1, answer2, answer3, answer4, correct_answer, image)
                  VALUES('".$question."','".$quest_type."','".$answer1."','".$answer2."','".$answer3."','".$answer4."','".$correct_answer."', 0x".$image.")";
        } else {
            $sql="INSERT INTO quiz_questions (question, quest_type, answer1, answer2, answer3, answer4, correct_answer)
                  VALUES('".$question."','".$quest_type."','".$answer1."','".$answer2."','".$answer3."','".$answer4."','".$correct_answer."' )";
        }

        //$sql="INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer)
        //VALUES('".$question."','".$quest_type."','".$answer1."','".$answer2."','".$answer3."','".$answer4."','".$correct_answer."')";
        //echo $sql;
        //global $con;
        //$stmt = $con->prepare("INSERT INTO quiz (question, quest_type, answer1, answer2, answer3, answer4, correct_answer, image)
        //                       VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
        //$stmt->bind_param("sssssssb", $question, $quest_type, $answer1, $answer2, $answer3, $answer4, $correct_answer, $image);
        //$stmt->bind_param("s", $quest_type);
        //$stmt->bind_param("s", $answer1);
        //$stmt->bind_param("s", $answer2);
        //$stmt->bind_param("s", $answer3);
        //$stmt->bind_param("s", $answer4);
        //$stmt->bind_param("s", $correct_answer);
        //$stmt->bind_param("b", $image);
        //$stmt->execute();

        global $con;
        mysqli_query($con,$sql);
    }

    function update_question(){
        //if (!isset($_POST['data'])) {
        //    die('no data to save!');
        //}

        $file_selected  = $_POST['FileSelected'];
        if (strcmp($file_selected,'TRUE') == 0) {
            $image_file     = $_FILES['photo']['tmp_name'];//图片上传上来临时文件的路径
            $image_size     = $_POST['FileSize'];
            //echo "File Selected.";

            //判断上传文件是否为空，判断文件是不是通过 HTTP POST 上传,确保恶意的用户无法欺骗脚本去访问本不能访问的文件
            if($image_file and is_uploaded_file($image_file)) {
                $file = fopen($image_file, "rb");
                $image = bin2hex(fread($file,$image_size));//bin2hex()将二进制数据转换成十六进制表示
                fclose($file);
            } else {
                die('Read Image File Error!');
            }
        }


        $id             = $_POST['id'];
        $question       = $_POST['question'];
        $quest_type     = $_POST['quest_type'];
        $answer1        = $_POST['answer1'];
        $answer2        = $_POST['answer2'];
        $answer3        = $_POST['answer3'];
        $answer4        = $_POST['answer4'];
        $correct_answer = $_POST['correct_answer'];

        //$question = addslashes($question);
        //$answer1  = addslashes($answer1);
        //$answer2  = addslashes($answer2);
        //$answer3  = addslashes($answer3);
        //$answer4  = addslashes($answer4);

        //echo $id.$question.$quest_type.$answer1.$answer2.$answer3.$answer4.$correct_answer ;

        if (strcmp($file_selected,'TRUE') == 0) {
            $sql="UPDATE quiz_questions SET question      ='$question',
                              quest_type    ='$quest_type',
                              answer1       ='$answer1',
                              answer2       ='$answer2',
                              answer3       ='$answer3',
                              answer4       ='$answer4',
                              correct_answer='$correct_answer',
                              image         =0x".$image."
                          WHERE id=".$id."; ";
        } else {
            $sql="UPDATE quiz_questions SET question      ='$question',
                              quest_type    ='$quest_type',
                              answer1       ='$answer1',
                              answer2       ='$answer2',
                              answer3       ='$answer3',
                              answer4       ='$answer4',
                              correct_answer='$correct_answer'
                          WHERE id=".$id."; ";
        }

        //echo $sql;

        //var_dump($sql);

        global $con;
        mysqli_query($con,$sql);
    }

    mysqli_close($con);

?>
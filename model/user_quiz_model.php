<?php
    //require "dbconfig.php";
    //$con = mysqli_connect("localhost","id14264364_hamster","mdg%-0=89jj)X>n5","id14264364_rocket");

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
    
    $action= $_POST['action'];
    if ($action == 'save_score'){
        //echo "save_score";
        save_score();
    }elseif ($action == 'get_questions'){
        get_questions();
    }
    
    function save_score(){
        if (!isset($_POST['data'])) {
            die('no data to save!');
        }
        //echo "received data!    "; 
        $score_arr = json_decode($_POST['data'], true);  

        $user_name = $score_arr['user_name'];
        $start_time = $score_arr['start_time'];
        $end_time = $score_arr['end_time'];
        $score = $score_arr['score'];

        //echo $user_name.$password.$user_level.$first_name.$last_name.$email.$phone_no ;
        $sql="INSERT INTO users_scores (user_name, start_time, end_time,score) " .
          "VALUES('".$user_name."','".$start_time."','".$end_time."',".$score.");";
        //echo $sql;
      
        global $con;
        mysqli_query($con,$sql);
    }
  
    function get_questions(){
      $sql="SELECT id, image, question, quest_type, answer1, answer2, answer3, answer4, correct_answer FROM quiz_questions ORDER BY quest_type;";
      //echo $sql;
      global $con;
      $result = mysqli_query($con,$sql);
      
      $questions = array();

      while ($row = mysqli_fetch_assoc($result)){
          if ($row['image'] == '' || is_null($row['image'])) {
              //echo "NO_IMAGE";
          } else {
              $row["image"] = base64_encode($row["image"]);
          }
          array_push($questions, $row);
      }

      if ($questions){
          echo json_encode($questions);
      } else {
          echo mysqli_error();
      }
  }
?>

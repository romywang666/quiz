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
    //mysqli_select_db($con,"DBNAME");
    
    $action= $_POST['action'];
    if ($action == 'get_all_scores'){
        //echo "add";
        get_all_scores();  
    }
    
    
    function get_all_scores(){
        $sql="SELECT u.user_name, u.first_name, u.last_name, s.start_time, s.end_time, s.score FROM quiz_scores s, users u WHERE u.user_name=s.user_name ORDER BY s.score DESC;";

        global $con;
        $result = mysqli_query($con,$sql);
        //if (!$result) {
        //    die("false");
        //}
      
        $rows = array();
      
        while ($row = mysqli_fetch_assoc($result)){
           $rows[] = $row; 
        }
        if ($rows){
            echo json_encode($rows);
        } else {
            echo mysqli_error();
        }
    }
    
?>

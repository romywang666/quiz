<?php
    try{
        $con = mysqli_connect("localhost","apps","Someday21#","trisolaris");
        if (!$con){
            die('CONNECTION_ERROR');
        }
    }catch (Exception $e){        //捕获异常
        die('CONNECTION_ERROR' . $e->getMessage());//打印异常信息
    }
    
    
    $action= $_POST['action'];
    if (strcmp($action,'get_a_user') == 0) {
        get_a_user();
    }
    
    function get_a_user(){
        if (!isset($_POST['user_name'])) {
            die('no user name!');
        }
        if (!isset($_POST['password'])) {
            die('password can not be null!');
        }
    
        $user_name=$_POST['user_name'];
        $password=$_POST['password'];
    
        $sql="SELECT user_level FROM quiz_users WHERE user_name='{$user_name}' ".
            " AND password='{$password}';";
        //echo $sql;
        global $con;
        $results = mysqli_query($con,$sql);
    
        if (!$results) {
            echo "ERROR";
        } else {
            $result = mysqli_fetch_assoc($results);
            echo $result["user_level"];
        }
    mysqli_close($con);
    }
    
?>
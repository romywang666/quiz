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


    //mysqli_select_db($con,"DBNAME");
    
    $action= $_POST['action'];
    if ($action == 'add_user'){
        //echo "add";
        add_user();
        
    } elseif ($action == 'get_all_users') {
        //echo "get";
        get_all_users();
        
    } elseif ($action == 'delete_users') {
        
        delete_user();
        
    } elseif ($action == 'update_user') {
        
        update_user();
    }
    
    function get_all_users(){
        $sql="SELECT * FROM users ORDER BY user_name;";

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
    
    function add_user(){
        if (!isset($_POST['data'])) {
            die('no data to save!');
        }
        //echo "received data!    "; 
        $user_arr = json_decode($_POST['data'], true);  

        $user_name = $user_arr['user_name'];
        $password = $user_arr['password'];
        $user_level = $user_arr['user_level'];
        $first_name = $user_arr['first_name'];
        $last_name = $user_arr['last_name'];
        $email = $user_arr['email'];
        $phone_no = $user_arr['phone_no'];

        //echo $user_name.$password.$user_level.$first_name.$last_name.$email.$phone_no ;
        $sql="INSERT INTO users (user_name, password, user_level, first_name, last_name, email, phone_no) " .
          "VALUES('".$user_name."','".$password."',$user_level,'".$first_name."','".$last_name."','" .$email."','".$phone_no."')";
        //echo $sql;
      
        global $con;
        mysqli_query($con,$sql);
    }
  
    function update_user(){
        if (!isset($_POST['data'])) {
            die('no data to save!');
        }
        //echo "received data!    "; 
        $user_arr = json_decode($_POST['data'], true);  

        $user_name = $user_arr['user_name'];
        $password = $user_arr['password'];
        $user_level = $user_arr['user_level'];
        $first_name = $user_arr['first_name'];
        $last_name = $user_arr['last_name'];
        $email = $user_arr['email'];
        $phone_no = $user_arr['phone_no'];
        $old_user_name = $user_arr['old_user_name'];
        
        //echo $user_name.$password.$user_level.$first_name.$last_name.$email.$phone_no.$old_user_name ;
        $sql="UPDATE users SET user_name='{$user_name}', password='{$password}'," .
                "user_level={$user_level}, first_name='{$first_name}',".
                "last_name='{$last_name}', email='{$email}', phone_no='{$phone_no}' " .
              "WHERE user_name='{$old_user_name}';";
        
        //echo $sql;
        $sql2="UPDATE users_scores SET user_name='{$user_name}' ".
                "WHERE user_name='{$old_user_name}';";
        global $con;
        mysqli_query($con,$sql);
        mysqli_query($con,$sql2);
    }
    
    function delete_user(){
        $user_name =  $_POST['user_name'];
        //echo $user_name;
        $sql = "DELETE FROM users WHERE user_name='{$user_name}'";
        echo $sql;
        global $con;
        mysqli_query($con,$sql);
    }
?>
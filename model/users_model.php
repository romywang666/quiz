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
        $sql="SELECT id, user_name, user_level, first_name, last_name, sex, " .
                     "DATE_FORMAT(birth_date, '%Y/%m/%d') AS 'birth_date', email, phone_no, address ".
             "FROM quiz_users ORDER BY user_name;";

        global $con;
        $result = mysqli_query($con,$sql);

        // SQL statement execution error. maybe syntax incorrect.
        if (!$result) {
            echo "QUERY_ERROR";
            return;
        }

        if (mysqli_num_rows($result) > 0) {
            $rows = array();

            while ($row = mysqli_fetch_assoc($result)){
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

    function add_user(){
        //if (!isset($_POST['data'])) {
        //    die('no data to save!');
        //}
        //echo "received data!    ";

        $user_name  = $_POST['user_name'];
        $password   = $_POST['password'];
        $user_level = $_POST['user_level'];
        $first_name = $_POST['first_name'];
        $last_name  = $_POST['last_name'];
        $sex        = $_POST['sex'];
        $birth_date = $_POST['birth_date'];
        $email      = $_POST['email'];
        $phone_no   = $_POST['phone_no'];
        $address    = $_POST['address'];

        //echo $user_name.$password.$user_level.$first_name.$last_name.$email.$phone_no ;
        $sql="INSERT INTO quiz_users (user_name, password, user_level, first_name, last_name, sex, birth_date, email, phone_no, address) " .
          "VALUES('".$user_name."','".$password."','".$user_level."','".$first_name."','".$last_name."','".$sex."','".$birth_date."','".$email."','".$phone_no."','".$address."')";
        //echo $sql;

        global $con;
        mysqli_query($con,$sql);
    }

    function update_user(){

        $user_arr = json_decode($_POST['data'], true);

        $user_id    = $_POST['user_id'];
        $user_name  = $_POST['user_name'];

        $user_level = $_POST['user_level'];
        $first_name = $_POST['first_name'];
        $last_name  = $_POST['last_name'];
        $sex        = $_POST['sex'];
        $birth_date = $_POST['birth_date'];
        $email      = $_POST['email'];
        $phone_no   = $_POST['phone_no'];
        $address    = $_POST['address'];

        //echo $user_name.$password.$user_level.$first_name.$last_name.$email.$phone_no.$old_user_name ;
        $sql="UPDATE quiz_users SET ".
                    "user_name   ='{$user_name}',".
                    "user_level  ='{$user_level}',".
                    "first_name  ='{$first_name}',".
                    "last_name   ='{$last_name}',".
                    "sex         ='{$sex}',".
                    "birth_date  ='{$birth_date}',".
                    "email       ='{$email}',".
                    "phone_no    ='{$phone_no}'," .
                    "address     ='{$address}' ".
              "WHERE id={$user_id};";

        //echo $sql;

        global $con;
        mysqli_query($con,$sql);

    }

    function delete_user(){
        $user_id =  $_POST['user_id'];
        //echo $user_id;
        $sql = "DELETE FROM quiz_users WHERE id = " .$user_id.";";
        echo $sql;
        global $con;
        mysqli_query($con,$sql);
    }
?>
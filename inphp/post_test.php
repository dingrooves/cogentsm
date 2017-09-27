<?php
    try{
        
        $json = $_POST['json'];
        //$array = json_decode($json, true); // decode json  
        //echo $array['nameowner'];
        $array = json_decode('{"id":1,"name":"foo","email":"foo@test.com"}', true);
        echo $array['name'];
        
        //echo $json;
    }catch (PDOException $e){
        // report error message
        echo $e->getMessage();
    }
?>

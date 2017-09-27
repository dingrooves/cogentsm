<?php
	require_once 'dbconfig.php';
	$json = $_POST['json'];
    $array = json_decode($json, true); // decode json    
        
    $name = $array['nameowner'];
    $business = $array['namebusiness'];
    $cell = $array['cellphone'];

    try{
    // create a PostgreSQL database connection
    $conn = new PDO("pgsql:dbname=$db;host=$host", $username, $password );
        
    $sql = "INSERT INTO cmaster  
        (nameowner, namebusiness, cellphone)
        VALUES 
        (:dname,:dbusiness,:dcell)";
	
	
    $query = $conn->prepare($sql);
    $query->execute(array(
        ':dname'     => $name,
        ':dbusiness'   => $business,
        ':dcell'     => $cell
    ));
    
	    if( $query )
        {
             echo "done";
        }
        else
        {
             echo "Row insertion failed.\n";
             die( print_r( sqlsrv_errors(), true));
        }
    
    // close the database connection
    $conn = NULL;

    }catch (PDOException $e){
        // report error message
        echo $e->getMessage();
    }

?>

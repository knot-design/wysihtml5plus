<?php

function outputJSON($message = '')
{
    header('Content-Type: application/json');
    die(json_encode(array(
        'message' => $message
    )));
}


if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    
    $data = isset($_POST['data']) && $_POST['data'] != '' ? $_POST['data'] : '';
    usleep(1.2 * 1000000);
    outputJSON($data ? 'successfully sent' : '');
    outputJSON($data ? $str : '');
    
} else {
    
    echo '<h2>Posting data</h2>';
    var_dump($_POST);
    echo '<p><a href="../form.html">Back</a></p>';
    
}
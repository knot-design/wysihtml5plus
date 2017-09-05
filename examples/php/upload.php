<?php
error_reporting(E_ALL & ~E_NOTICE);
$dir = '../img/'; // files storage folder
$permitRequestUri = 'http://localhost/wysihtml5plus/'; //allowed uri
$securityKey = 'fodidpso'; // security key option
define('PERMIT_ORIGIN', 'http://localhost'); // CORS option

include __DIR__ . '/ImageResize.php';
use \Eventviva\ImageResize;

function outputJSON($data, $status = 'error') {
    if(defined('PERMIT_ORIGIN') && PERMIT_ORIGIN != '') {
        $host = isValidRequest('HTTP_ORIGIN', PERMIT_ORIGIN);
        header('Access-Control-Allow-Origin: ' . $host);
    }
    header('Content-Type: application/json');
    die(json_encode(array(
        'data' => $data,
        'status' => $status
    )));
}

function createThumbs($filename, $dir) {
    
    $preview = new ImageResize($dir . $filename);
    $preview->crop(200, 200);
    $preview->save($dir . 'preview/' . $filename);
    
    $thumbs = new ImageResize($dir . $filename);
    $thumbs->resizeToWidth(640);
    $thumbs->save($dir . 'thumbs/' . $filename);
    
}

function isValidRequest($request, $str) {
    if(is_array($str)) {
        foreach($str as $_str) {
            $result = $this->isValidRequest($request, $_str);
            if($result) {
                return $_str;
            }
        }
    } else {
        return isset($_SERVER[$request]) && $_SERVER[$request] == $str ? $str : false;
    }
}
try {
    
    if (!isValidRequest('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest'))
        throw new RuntimeException('Bad Request.');

    if (defined('PERMIT_ORIGIN') && !isValidRequest('HTTP_ORIGIN', PERMIT_ORIGIN))
        throw new RuntimeException('Invalid Hostname.' . $_SERVER['HTTP_ORIGIN']);
    
    // Default security    
    if (isset($securityKey) && !isValidRequest('HTTP_X_SECURITY_KEY', $securityKey))
        throw new RuntimeException('Invalid Authorization Key.');
    
    if (!isValidRequest('REQUEST_METHOD', 'POST'))
        throw new RuntimeException('Method Not Allowed.');
    
    $image = $_FILES['image'];
    if (!isset($image['error']))
        throw new RuntimeException('Invalid parameters.');

    switch ($image['error']) {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException('No file sent.');
        case UPLOAD_ERR_INI_SIZE: // from php.ini
        case UPLOAD_ERR_FORM_SIZE: // from form
            throw new RuntimeException('Exceeded filesize limit.');
        default:
            throw new RuntimeException('Sorry. Unknown errors.');
    }
    if (!getimagesize($image['tmp_name']))
        throw new RuntimeException ('Please ensure you are uploading an image.');

    if ($image['size'] > ini_get('upload_max_filesize') * 1000 * 1000)
        throw new RuntimeException('File uploaded exceeds maximum upload size.');
    

    $ext = pathinfo($image['name'], PATHINFO_EXTENSION);
    
    $filename = sha1_file($image['tmp_name']) . '.' . mb_strtolower($ext);
    if (file_exists($dir . $filename))
        throw new RuntimeException('File with that name already exists.');

    if (!move_uploaded_file($image['tmp_name'], $dir . $filename))
        throw new RuntimeException('Error uploading file - check destination is writeable.');
    
    createThumbs($filename, $dir);
    
    list($width, $height) = getimagesize($dir . $filename);
    outputJSON(
        array('url' => str_replace('../', '', $dir) . $filename, 'width' => $width, 'height' => $height),
        'success'
    );
} catch (RuntimeException $e) {
    outputJSON($e->getMessage());
}

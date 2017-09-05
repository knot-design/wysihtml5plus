<?php
$dirName = '../img';
$previewWidth = $previewheight = 200;
$images = array();

function outputJSON($data, $status = 'error') {
    header('Content-Type: application/json');
    die(json_encode(array(
        'data' => $data,
        'status' => $status
    )));
}

$dir = dir($dirName);
while(FALSE !== ($fileName = $dir->read())) {
    $path = $dir->path. '/' .$fileName;
    $tpath = $dir->path. '/thumbs/' .$fileName;
    if(@getimagesize($path)) {
        list($width, $height, $type) = getimagesize($path);
        if($type == 2) {
            list($twidth, $theight) = getimagesize($tpath);
            $images[] = array(
                //'title' => 'image title', // alternate text specified
                'preview' => str_replace('../', '', $dir->path). '/preview/' .$fileName,
                'small' => array(
                    'url' => str_replace('../', '', $tpath),
                    'width' => $twidth,
                    'height' => $theight,
                ),
                'large' => array(
                    'url' => str_replace('../', '', $path),
                    'width' => $width,
                    'height' => $height,
                ),
                'lastmodified' => date ("Y-m-d H:i:s", filemtime($path))
            );
        }
    }
}
if(count($images) > 0) {
    outputJSON(array(
        'images' => $images,
        'sizes' => array('small', 'large'),
    ), 'success');
} else {
    outputJSON('Directory "' . $dirName . '" no such empty');
}
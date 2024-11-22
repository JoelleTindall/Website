<?php
// Handle CORS (Cross-Origin Resource Sharing)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// If the request is OPTIONS (for preflight CORS checks), just return 200 OK
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Define the base directory of your project
$baseDir = __DIR__;  // The root of your project

// Check the request URI
$requestUri = $_SERVER['REQUEST_URI'];

// Handle the mail.php request
if (strpos($requestUri, '/mail.php') !== false) {
    require $baseDir . '/mail.php';  // Adjusted path to include '/backend/'
    exit();
}

// Default response for unknown routes
http_response_code(404);
echo "Page not found: $requestUri";
?>

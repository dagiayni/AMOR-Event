<?php
// Allow any subdomain of hotelsowirad.com
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    // Allow production domain and localhost for development
    if (preg_match('/https?:\/\/(.*?\.)?hotelsowirad\.com$/', $origin) || 
        preg_match('/https?:\/\/localhost(:\d+)?$/', $origin) ||
        preg_match('/https?:\/\/127\.0\.0\.1(:\d+)?$/', $origin)) {
        header("Access-Control-Allow-Origin: $origin");
    }
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer (Assuming composer was used)
require '../vendor/autoload.php';
$mailConfig = require '../config/mail.php';

$response = ["status" => "error", "message" => "Something went wrong."];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize Inputs
    $name = isset($_POST['name']) ? htmlspecialchars(strip_tags($_POST['name']), ENT_QUOTES, 'UTF-8') : '';
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST['phone']) ? htmlspecialchars(strip_tags($_POST['phone']), ENT_QUOTES, 'UTF-8') : '';
    $package = isset($_POST['package']) ? htmlspecialchars(strip_tags($_POST['package']), ENT_QUOTES, 'UTF-8') : '';
    $message = isset($_POST['message']) ? htmlspecialchars(strip_tags($_POST['message']), ENT_QUOTES, 'UTF-8') : '';

    if (empty($name) || empty($email) || empty($package)) {
        echo json_encode(["status" => "error", "message" => "Required fields are missing."]);
        exit;
    }

    // Handle File Upload
    $attachmentPath = null;
    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] === UPLOAD_ERR_OK) {
        $fileSize = $_FILES['attachment']['size'];
        $fileType = $_FILES['attachment']['type'];
        $tmpName = $_FILES['attachment']['tmp_name'];
        $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        
        if ($fileSize > 5 * 1024 * 1024) { // 5MB limit
            echo json_encode(["status" => "error", "message" => "File too large. Max 5MB."]);
            exit;
        }
        
        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode(["status" => "error", "message" => "Invalid file type. Only JPG, PNG, and PDF allowed."]);
            exit;
        }

        $uploadDir = '../uploads/';
        if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
        
        $fileName = time() . '_' . basename($_FILES['attachment']['name']);
        $attachmentPath = $uploadDir . $fileName;
        
        if (!move_uploaded_file($tmpName, $attachmentPath)) {
            echo json_encode(["status" => "error", "message" => "Failed to save upload."]);
            exit;
        }
    }

    try {
        // --- Setup Single Mailer Instance ---
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = $mailConfig['host'];
        $mail->SMTPAuth   = $mailConfig['auth'];
        $mail->Username   = $mailConfig['username'];
        $mail->Password   = $mailConfig['password'];
        $mail->SMTPSecure = $mailConfig['secure'];
        $mail->Port       = $mailConfig['port'];
        $mail->Timeout    = 20; 
        $mail->CharSet    = 'UTF-8';

        // --- 1. Send Email to Client ---
        $mail->setFrom($mailConfig['from_email'], $mailConfig['from_name']);
        $mail->addAddress($email, $name);
        $mail->isHTML(true);
        $mail->Subject = 'Confirmation: Your AMOR Event Registration';
        
        $clientTemplate = file_get_contents('../emails/verification.html');
        $clientTemplate = str_replace(['{{name}}', '{{package}}'], [$name, $package], $clientTemplate);
        $mail->Body = $clientTemplate;
        $mail->send();

        // --- 2. Send Email to Admin (REUSING THE SAME CONNECTION) ---
        $mail->clearAddresses();
        $mail->clearAttachments();
        
        $mail->addAddress($mailConfig['admin_email'], 'Admin');
        $mail->Subject = 'New AMOR Registration: ' . $name;
        
        $adminTemplate = file_get_contents('../emails/admin_notification.html');
        $adminTemplate = str_replace(
            ['{{name}}', '{{email}}', '{{phone}}', '{{package}}', '{{message}}'],
            [$name, $email, $phone, $package, nl2br($message)],
            $adminTemplate
        );
        $mail->Body = $adminTemplate;
        
        if ($attachmentPath) {
            $mail->addAttachment($attachmentPath);
        }
        
        $mail->send();

        $response = ["status" => "success", "message" => "Registration successful! Check your email."];
    } catch (Exception $e) {
        $response = ["status" => "error", "message" => "Email failed: {$mail->ErrorInfo}"];
    }
}

echo json_encode($response);
?>

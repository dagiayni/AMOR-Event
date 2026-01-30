<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
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
        // --- 1. Send Email to Client ---
        $clientMail = new PHPMailer(true);
        $clientMail->isSMTP();
        $clientMail->Host       = $mailConfig['host'];
        $clientMail->SMTPAuth   = $mailConfig['auth'];
        $clientMail->Username   = $mailConfig['username'];
        $clientMail->Password   = $mailConfig['password'];
        $clientMail->SMTPSecure = $mailConfig['secure'];
        $clientMail->Port       = $mailConfig['port'];

        $clientMail->setFrom($mailConfig['from_email'], $mailConfig['from_name']);
        $clientMail->addAddress($email, $name);
        $clientMail->isHTML(true);
        $clientMail->Subject = 'Confirmation: Your AMOR Event Registration';
        
        $clientTemplate = file_get_contents('../emails/verification.html');
        $clientTemplate = str_replace(['{{name}}', '{{package}}'], [$name, $package], $clientTemplate);
        $clientMail->Body = $clientTemplate;
        $clientMail->send();

        // --- 2. Send Email to Admin ---
        $adminMail = new PHPMailer(true);
        $adminMail->isSMTP();
        $adminMail->Host       = $mailConfig['host'];
        $adminMail->SMTPAuth   = $mailConfig['auth'];
        $adminMail->Username   = $mailConfig['username'];
        $adminMail->Password   = $mailConfig['password'];
        $adminMail->SMTPSecure = $mailConfig['secure'];
        $adminMail->Port       = $mailConfig['port'];

        $adminMail->setFrom($mailConfig['from_email'], $mailConfig['from_name']);
        $adminMail->addAddress($mailConfig['admin_email'], 'Admin');
        $adminMail->isHTML(true);
        $adminMail->Subject = 'New AMOR Registration: ' . $name;
        
        $adminTemplate = file_get_contents('../emails/admin_notification.html');
        $adminTemplate = str_replace(
            ['{{name}}', '{{email}}', '{{phone}}', '{{package}}', '{{message}}'],
            [$name, $email, $phone, $package, nl2br($message)],
            $adminTemplate
        );
        $adminMail->Body = $adminTemplate;
        
        if ($attachmentPath) {
            $adminMail->addAttachment($attachmentPath);
        }
        
        $adminMail->send();

        $response = ["status" => "success", "message" => "Registration successful! Check your email."];
    } catch (Exception $e) {
        $response = ["status" => "error", "message" => "Email failed: {$clientMail->ErrorInfo}"];
    }
}

echo json_encode($response);
?>

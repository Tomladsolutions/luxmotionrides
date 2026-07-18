<?php
header('Content-Type: application/json');

/**
 * Remove CR/LF (and NUL) so attacker-controlled values cannot inject
 * additional email headers (e.g. Bcc:) when interpolated into headers
 * or the Subject line.
 */
function sanitize_header_value($value) {
    return trim(str_replace(["\r", "\n", "\0", "%0a", "%0d"], '', (string) $value));
}

/** Collapse a free-text field to a bounded value. */
function sanitize_field($value, $maxLength = 5000) {
    $value = (string) $value;
    if (strlen($value) > $maxLength) {
        $value = substr($value, 0, $maxLength);
    }
    return trim($value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$firstName = sanitize_field($_POST['firstName'] ?? '', 100);
$lastName = sanitize_field($_POST['lastName'] ?? '', 100);
$email = sanitize_field($_POST['email'] ?? '', 254);
$message = sanitize_field($_POST['message'] ?? '', 5000);

if ($firstName === '' || $lastName === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Validate email format (also rejects header-injection payloads)
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

$to = 'booking@luxmotionrides.com';
$subject = sanitize_header_value("New Contact Form Message - $firstName $lastName");

$emailBody = "
NEW CONTACT FORM MESSAGE

CONTACT INFORMATION:
- Name: $firstName $lastName
- Email: $email

MESSAGE:
$message

Submitted from Lux Motion Rides Website Contact Form";

$replyTo = sanitize_header_value($email);
$headers = "From: noreply@luxmotionrides.com\r\n";
$headers .= "Reply-To: $replyTo\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $emailBody, $headers)) {
    $customerSubject = "Thank You for Contacting Lux Motion Rides";
    $customerMessage = "Dear $firstName,\n\n";
    $customerMessage .= "Thank you for reaching out to Lux Motion Rides!\n\n";
    $customerMessage .= "We have received your message and our team will respond to you within 24 hours.\n\n";
    $customerMessage .= "If you need immediate assistance, please call us at +1 720-935-1912.\n\n";
    $customerMessage .= "Best regards,\n";
    $customerMessage .= "Lux Motion Rides Team\n";

    $customerHeaders = "From: Lux Motion Rides <noreply@luxmotionrides.com>\r\n";
    $customerHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, $customerSubject, $customerMessage, $customerHeaders);

    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
}

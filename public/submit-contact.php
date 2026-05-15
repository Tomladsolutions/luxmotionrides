<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required.']);
        exit;
    }

    $to = 'booking@luxmotionrides.com';
    $subject = "New Contact Form Message - $firstName $lastName";

    $emailBody = "
NEW CONTACT FORM MESSAGE

CONTACT INFORMATION:
- Name: $firstName $lastName
- Email: $email

MESSAGE:
$message

Submitted from Lux Motion Rides Website Contact Form";

    $headers = "From: noreply@luxmotionrides.com\r\n";
    $headers .= "Reply-To: $email\r\n";
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
        echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

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

/** Collapse a free-text field to a bounded, header-safe single value. */
function sanitize_field($value, $maxLength = 2000) {
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

// Get and bound form data
$firstName = sanitize_field($_POST['firstName'] ?? '', 100);
$lastName = sanitize_field($_POST['lastName'] ?? '', 100);
$email = sanitize_field($_POST['email'] ?? '', 254);
$phone = sanitize_field($_POST['phone'] ?? '', 50);
$serviceType = sanitize_field($_POST['serviceType'] ?? '', 50);
$bookingType = sanitize_field($_POST['bookingType'] ?? '', 20);
$pickupLocation = sanitize_field($_POST['pickupLocation'] ?? '', 300);
$dropoffLocation = sanitize_field($_POST['dropoffLocation'] ?? '', 300);
$pickupDate = sanitize_field($_POST['pickupDate'] ?? '', 50);
$pickupTime = sanitize_field($_POST['pickupTime'] ?? '', 50);
$passengers = sanitize_field($_POST['passengers'] ?? '', 20);
$flightNumber = sanitize_field($_POST['flightNumber'] ?? '', 50);
$luggageCount = sanitize_field($_POST['luggageCount'] ?? '', 20);
$notes = sanitize_field($_POST['notes'] ?? '', 2000);

// Validate required fields
if ($firstName === '' || $lastName === '' || $email === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

// Validate email format (also rejects header-injection payloads)
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit;
}

// Company email
$to = 'booking@luxmotionrides.com';

// Subject based on booking type
$subject = $bookingType === 'book'
    ? sanitize_header_value("New Booking Request - $firstName $lastName")
    : sanitize_header_value("New Quote Request - $firstName $lastName");

// Service type labels
$serviceTypeLabels = [
    'airport' => 'Airport Transportation',
    'city' => 'City Ride',
    'intercity' => 'Mountain Transportation',
    'corporate' => 'Corporate Travel',
    'special' => 'Special Event',
    'private' => 'Private Ride'
];
$serviceTypeLabel = $serviceTypeLabels[$serviceType] ?? $serviceType;

// Build email body
$message = "
NEW " . strtoupper($bookingType) . " REQUEST

SERVICE TYPE: $serviceTypeLabel

CONTACT INFORMATION:
- Name: $firstName $lastName
- Phone: $phone
- Email: $email

TRIP DETAILS:
- Pickup Location: $pickupLocation
- Drop-off Location: $dropoffLocation
- Date: $pickupDate
- Time: $pickupTime
- Passengers: $passengers
";

if ($serviceType === 'airport') {
    $message .= "- Flight Number: $flightNumber\n";
    $message .= "- Luggage: $luggageCount bags\n";
}

if (!empty($notes)) {
    $message .= "\nSPECIAL REQUESTS:\n$notes\n";
}

$message .= "\nSubmitted from Lux Motion Rides Website";

// Email headers (Reply-To uses the validated, CRLF-stripped email)
$replyTo = sanitize_header_value($email);
$headers = "From: noreply@luxmotionrides.com\r\n";
$headers .= "Reply-To: $replyTo\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email to company
if (mail($to, $subject, $message, $headers)) {
    // Send confirmation email to customer
    $customerSubject = $bookingType === 'book'
        ? "Booking Confirmation - Lux Motion Rides"
        : "Quote Request Received - Lux Motion Rides";

    $customerMessage = "Dear $firstName,\n\n";
    $customerMessage .= "Thank you for choosing Lux Motion Rides!\n\n";

    if ($bookingType === 'book') {
        $customerMessage .= "We have received your booking request. Our team will contact you within 2 hours to confirm availability and finalize your booking.\n\n";
    } else {
        $customerMessage .= "We have received your quote request. Our team will contact you within 2 hours with your custom quote.\n\n";
    }

    $customerMessage .= "BOOKING DETAILS:\n";
    $customerMessage .= "----------------\n";
    $customerMessage .= "Service: $serviceTypeLabel\n";
    $customerMessage .= "Pickup: $pickupLocation\n";
    $customerMessage .= "Destination: $dropoffLocation\n";
    $customerMessage .= "Date: $pickupDate at $pickupTime\n";
    $customerMessage .= "Passengers: $passengers\n\n";

    $customerMessage .= "If you have any questions, please call us at +1 720-935-1912 or email booking@luxmotionrides.com\n\n";
    $customerMessage .= "We look forward to serving you!\n\n";
    $customerMessage .= "Best regards,\n";
    $customerMessage .= "Lux Motion Rides Team\n";

    $customerHeaders = "From: Lux Motion Rides <noreply@luxmotionrides.com>\r\n";
    $customerHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, $customerSubject, $customerMessage, $customerHeaders);

    echo json_encode(['success' => true, 'message' => 'Booking submitted successfully!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
}

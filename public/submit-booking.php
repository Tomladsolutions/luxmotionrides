<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $serviceType = $_POST['serviceType'] ?? '';
    $bookingType = $_POST['bookingType'] ?? '';
    $pickupLocation = $_POST['pickupLocation'] ?? '';
    $dropoffLocation = $_POST['dropoffLocation'] ?? '';
    $pickupDate = $_POST['pickupDate'] ?? '';
    $pickupTime = $_POST['pickupTime'] ?? '';
    $passengers = $_POST['passengers'] ?? '';
    $flightNumber = $_POST['flightNumber'] ?? '';
    $luggageCount = $_POST['luggageCount'] ?? '';
    $notes = $_POST['notes'] ?? '';

    // Company email
    $to = 'booking@luxmotionrides.com';
    
    // Subject based on booking type
    $subject = $bookingType === 'book' 
        ? "New Booking Request - $firstName $lastName" 
        : "New Quote Request - $firstName $lastName";

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

    // Email headers
    $headers = "From: noreply@luxmotionrides.com\r\n";
    $headers .= "Reply-To: $email\r\n";
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
        echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

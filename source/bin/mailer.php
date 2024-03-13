<?php
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["fullname"]));
		$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $organization = strip_tags(trim($_POST["organization"]));
        $titlename = strip_tags(trim($_POST["title"]));
        $website = strip_tags(trim($_POST["website"]));
        if(!empty($_POST['check_list'])) {
            // Loop to store and display values of individual checked checkbox.
            foreach($_POST['check_list'] as $selected) {
                $interest .= "- $selected\n";
            }
        }
        $comment = strip_tags(trim($_POST["comment"]));
        

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($email) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            //echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "info@hmmaalliance.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        if ($organization) { $email_content .= "Organization: $organization\n"; }
        if ($titlename) { $email_content .= "Title: $titlename\n"; }
        if ($website) { $email_content .= "Title: $website\n"; }
        if ($interest) { 
            $email_content .= "\nInterest:\n$interest\n";
            if ($comment) { $email_content .= "Comments:\n$comment\n"; } 
        }

        // Build the email headers.
        $email_headers = "From: HMMAAlliance <no-reply@hmmaalliance.com>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>

<?php
// src/EventListener/JwtAuthenticationSuccessListener.php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\HttpFoundation\Cookie;

class JwtAuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $data = $event->getData();
        $response = $event->getResponse();

        // Extract the token from the data (adjust this based on your actual data structure)
        $token = $data['token'];

        // Set an HTTP-only cookie
        $response->headers->setCookie(
            new Cookie('token', $token, strtotime('now + 1 day'), '/', null, false, true)
        );

        // Manually update the response in the event
        $event->setData($data);
    }
}


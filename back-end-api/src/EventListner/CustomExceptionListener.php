<?php
// src/EventListener/CustomExceptionListener.php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CustomExceptionListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();

        $statusCode = $this->getStatusCode($exception);
        $message = $this->getMessage($exception);

        $response = new JsonResponse(['code' => $statusCode, 'message' => $message], $statusCode);

        $event->setResponse($response);
    }

    private function getStatusCode(\Throwable $exception): int
    {
        if ($exception instanceof HttpException) {
            return $exception->getStatusCode();
        }
        return JsonResponse::HTTP_INTERNAL_SERVER_ERROR;
    }

    private function getMessage(\Throwable $exception): string
    {
        if ($exception instanceof HttpException) {
            return $exception->getMessage();
        }

        return 'An unexpected error occurred';
    }
}

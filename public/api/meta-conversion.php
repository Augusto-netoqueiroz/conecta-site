<?php

declare(strict_types=1);

const META_PIXEL_ID = '1382311347429828';
const META_GRAPH_VERSION = 'v26.0';
const MAX_BODY_BYTES = 16384;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function accessToken(): string
{
    $token = trim((string) getenv('META_CAPI_ACCESS_TOKEN'));

    if ($token !== '') {
        return $token;
    }

    $secretFile = '/home2/timmas40/.secrets/meta-capi-token';
    if (is_readable($secretFile)) {
        return trim((string) file_get_contents($secretFile));
    }

    return '';
}

function allowedHost(?string $url): bool
{
    if (!$url) return false;

    $host = strtolower((string) parse_url($url, PHP_URL_HOST));
    return in_array($host, ['contratetv.com.br', 'www.contratetv.com.br'], true);
}

function scalarCustomData($value): array
{
    if (!is_array($value)) return [];

    $clean = [];
    foreach (array_slice($value, 0, 20, true) as $key => $item) {
        if (!is_string($key) || !preg_match('/^[a-zA-Z0-9_]{1,40}$/', $key)) continue;
        if (!is_scalar($item)) continue;

        $clean[$key] = is_string($item)
            ? substr($item, 0, 200)
            : $item;
    }

    return $clean;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? null;
if ($origin !== null && !allowedHost($origin)) {
    respond(403, ['ok' => false, 'error' => 'invalid_origin']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'error' => 'payload_too_large']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'error' => 'payload_too_large']);
}

$payload = json_decode($raw, true);
if (!is_array($payload)) {
    respond(400, ['ok' => false, 'error' => 'invalid_json']);
}

$eventName = (string) ($payload['event_name'] ?? '');
$eventId = (string) ($payload['event_id'] ?? '');
$eventSourceUrl = (string) ($payload['event_source_url'] ?? '');

if (!in_array($eventName, ['PageView', 'Contact'], true)) {
    respond(422, ['ok' => false, 'error' => 'invalid_event']);
}

if (!preg_match('/^[a-zA-Z0-9._-]{8,100}$/', $eventId)) {
    respond(422, ['ok' => false, 'error' => 'invalid_event_id']);
}

if (!allowedHost($eventSourceUrl)) {
    respond(422, ['ok' => false, 'error' => 'invalid_event_source_url']);
}

$token = accessToken();
if ($token === '') {
    respond(503, ['ok' => false, 'error' => 'meta_capi_not_configured']);
}

$userData = [
    'client_ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
    'client_user_agent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500),
];

foreach (['fbp', 'fbc'] as $key) {
    $value = (string) ($payload[$key] ?? '');
    if ($value !== '' && strlen($value) <= 255) {
        $userData[$key] = $value;
    }
}

$externalId = trim((string) ($payload['external_id'] ?? ''));
if ($externalId !== '' && strlen($externalId) <= 255) {
    $userData['external_id'] = [hash('sha256', strtolower($externalId))];
}

$event = [
    'event_name' => $eventName,
    'event_time' => time(),
    'event_id' => $eventId,
    'event_source_url' => $eventSourceUrl,
    'action_source' => 'website',
    'user_data' => $userData,
    'custom_data' => scalarCustomData($payload['custom_data'] ?? []),
];

$graphPayload = ['data' => [$event]];
$testEventCode = trim((string) getenv('META_CAPI_TEST_EVENT_CODE'));
if ($testEventCode !== '') {
    $graphPayload['test_event_code'] = $testEventCode;
}

$curl = curl_init(sprintf(
    'https://graph.facebook.com/%s/%s/events',
    META_GRAPH_VERSION,
    META_PIXEL_ID
));

curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($graphPayload, JSON_UNESCAPED_SLASHES),
]);

$response = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_error($curl);
curl_close($curl);

if ($response === false || $curlError !== '') {
    error_log('[META_CAPI] transport_error: ' . $curlError);
    respond(502, ['ok' => false, 'error' => 'meta_transport_error']);
}

$metaResponse = json_decode($response, true);
if ($status < 200 || $status >= 300) {
    $metaError = is_array($metaResponse)
        ? ($metaResponse['error']['message'] ?? 'unknown_meta_error')
        : 'invalid_meta_response';
    error_log('[META_CAPI] api_error: ' . $metaError);
    respond(502, ['ok' => false, 'error' => 'meta_api_error']);
}

respond(200, [
    'ok' => true,
    'events_received' => (int) ($metaResponse['events_received'] ?? 0),
]);

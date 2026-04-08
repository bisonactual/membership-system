<?php

namespace Tests;

use GoCardlessPro\Core\ApiResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
    }

    /**
     * Build a GoCardless ApiException subclass for testing.
     * The v5 SDK requires a real ApiResponse wrapping a PSR-7 response,
     * so we construct the minimal object needed.
     *
     * @param  string $class  Fully-qualified exception class name
     * @param  string $message
     * @param  int    $code
     * @return \GoCardlessPro\Core\Exception\ApiException
     */
    protected static function makeGoCardlessException(string $class, string $message = 'Error', int $code = 422)
    {
        $body = json_encode([
            'error' => [
                'message' => $message,
                'type'    => 'validation_failed',
                'code'    => $code,
                'errors'  => [],
                'documentation_url' => '',
                'request_id' => 'test',
            ],
        ]);

        $psrResponse = new class($body, $code) implements \Psr\Http\Message\ResponseInterface {
            public function __construct(private string $body, private int $status) {}
            public function getStatusCode(): int { return $this->status; }
            public function getHeaders(): array { return []; }
            public function getBody(): \Psr\Http\Message\StreamInterface { return \GuzzleHttp\Psr7\Utils::streamFor($this->body); }
            public function getHeader($name): array { return []; }
            public function getHeaderLine($name): string { return ''; }
            public function hasHeader($name): bool { return false; }
            public function withHeader($name, $value): static { return $this; }
            public function withAddedHeader($name, $value): static { return $this; }
            public function withoutHeader($name): static { return $this; }
            public function withBody(\Psr\Http\Message\StreamInterface $body): static { return $this; }
            public function getProtocolVersion(): string { return '1.1'; }
            public function withProtocolVersion($version): static { return $this; }
            public function withStatus($code, $reasonPhrase = ''): static { return $this; }
            public function getReasonPhrase(): string { return ''; }
        };

        return new $class(new ApiResponse($psrResponse));
    }
}

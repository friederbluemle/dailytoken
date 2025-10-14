# AI Relay API Specification

## Overview

A minimal proxy endpoint that forwards chat completion requests to OpenAI while
keeping the provider API key secure.
Used by the React Native app to generate short AI summaries and insights.

---

## Endpoint

**POST** `/api/ai`

---

## Authentication

Requests must include the shared header:

```
x-app-token: <shared-key>
```

---

## Request Body

JSON payload matching the OpenAI Chat Completions schema:

```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "system",
      "content": "You are a concise crypto analyst."
    },
    {
      "role": "user",
      "content": "Explain why this token is trending:\n{\"symbol\":\"TIBBIR\",\"pct_change_24h\":72.3}"
    }
  ],
  "max_tokens": 80,
  "temperature": 0.6
}
```

---

## Response

Returns the raw OpenAI response:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1729875600,
  "model": "gpt-4o-mini",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "RIBBITA surged 72% on Base with strong 24 h volume; social traction likely drove the move."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 72,
    "completion_tokens": 26,
    "total_tokens": 98
  }
}
```

---

## Error Responses

| Status | Example                          | Meaning                          |
| ------ | -------------------------------- | -------------------------------- |
| 401    | `{"error":"unauthorized"}`       | Invalid or missing `x-app-token` |
| 429    | `{"error":"rate_limited"}`       | Too many requests (≈120/min/IP)  |
| 405    | `{"error":"method_not_allowed"}` | Wrong HTTP method                |
| 500    | `{"error":"relay_error"}`        | Provider/network failure         |

---

## Notes

- CORS: `Access-Control-Allow-Origin: *`
- Timeout: ~10 s per request
- Memory: 128 MB (Node runtime)
- Environment variables:
  - `OPENAI_API_KEY` – provider key (secret)
  - `APP_TOKEN` – `<shared-key>`

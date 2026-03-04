# RESTful APIs Cheatsheet

> Sources: [AWS](https://aws.amazon.com/what-is/restful-api/) · [Microsoft Azure Architecture](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)

---

## What is a RESTful API?

A **RESTful API** is an interface that two computer systems use to exchange information securely over the internet. RESTful APIs follow secure, reliable, and efficient software communication standards based on the **REST** (Representational State Transfer) architectural style.

A RESTful web API should align with two core principles:

- **Platform independence** — clients call the API regardless of its internal implementation; achieved via HTTP, clear docs, and standard formats (JSON/XML)
- **Loose coupling** — the client and web service evolve independently; neither needs to know the other's internal implementation

### Key Terms

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface — rules that define how software systems communicate |
| **REST** | Representational State Transfer — a software architecture style for APIs |
| **Client** | The user or system requesting information |
| **Resource** | The data or service being accessed (images, text, JSON, etc.) |
| **Endpoint** | A specific URL that represents a resource |
| **Representation** | The format a resource is returned in (e.g. JSON, XML) |
| **URI** | Uniform Resource Identifier — uniquely identifies a resource |
| **HATEOAS** | Hypermedia as the Engine of Application State — links in responses enable navigation |

---

## REST Architectural Principles

| Principle | Description |
|-----------|-------------|
| **Uniform Interface** | Resources identified by URIs; consistent methods across the API; enables loose coupling |
| **Statelessness** | Each request is independent — the server retains no client session state; each request is atomic |
| **Layered System** | Intermediaries (load balancers, caches, gateways) sit between client and server invisibly |
| **Cacheability** | Responses declare whether they can be cached; reduces server load |
| **Client-Server Separation** | Client and server evolve independently |
| **Code on Demand** *(optional)* | Server can temporarily send executable code to extend client functionality |

---

## HTTP Methods

| Method | Use | Idempotent? | Example |
|--------|-----|-------------|---------|
| `GET` | Retrieve a resource | ✅ Yes | `GET /api/users/123` |
| `POST` | Create a new resource | ❌ No | `POST /api/orders` |
| `PUT` | Replace an entire resource | ✅ Yes | `PUT /api/users/123` |
| `PATCH` | Partially update a resource | ❌ No | `PATCH /api/users/123` |
| `DELETE` | Remove a resource | ✅ Yes | `DELETE /api/orders/456` |

> **Note:** PUT must be idempotent — sending the same request multiple times always produces the same result. POST is not idempotent; duplicate calls create duplicate resources.

### Collection vs. Item Operations

| URI | POST | GET | PUT | DELETE |
|-----|------|-----|-----|--------|
| `/customers` | Create new customer | Get all customers | Bulk update | Remove all |
| `/customers/1` | Error | Get customer 1 | Update customer 1 | Delete customer 1 |
| `/customers/1/orders` | Create order for customer 1 | Get all orders | Bulk update orders | Remove all orders |

### Status Codes per Method

| Method | Success | Common Errors |
|--------|---------|---------------|
| `GET` | `200 OK`, `204 No Content` | `404 Not Found` |
| `POST` | `201 Created`, `200 OK`, `204 No Content` | `400 Bad Request`, `405 Method Not Allowed` |
| `PUT` | `200 OK`, `201 Created`, `204 No Content` | `409 Conflict` |
| `PATCH` | `200 OK` | `400 Bad Request`, `409 Conflict`, `415 Unsupported Media Type` |
| `DELETE` | `204 No Content` | `404 Not Found` |

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200 OK` | Generic success |
| `201 Created` | Resource created; URI in `Location` header |
| `202 Accepted` | Request accepted but processing is async/incomplete |
| `204 No Content` | Success, no body returned |
| `206 Partial Content` | Partial resource returned (range request) |
| `303 See Other` | Redirect to newly created resource (async operations) |
| `400 Bad Request` | Invalid request data |
| `401 Unauthorized` | Authentication required |
| `403 Forbidden` | Authenticated but not authorised |
| `404 Not Found` | Resource does not exist |
| `405 Method Not Allowed` | HTTP method not supported on this URI |
| `406 Not Acceptable` | Server cannot match requested `Accept` media type |
| `409 Conflict` | Request conflicts with current resource state |
| `415 Unsupported Media Type` | Server can't handle the request format |
| `429 Too Many Requests` | Rate limit exceeded |
| `500 Internal Server Error` | Server-side failure |

---

## Request Structure

A RESTful API request contains:

1. **Unique Resource Identifier (URL/URI)** — identifies the resource
2. **HTTP Method** — the action to perform
3. **Headers** — metadata (e.g. `Content-Type`, `Authorization`, `Accept`)
4. **Body** *(optional)* — data sent with POST, PUT, PATCH
5. **Parameters** — additional details:
   - **Path params**: `/users/{id}`
   - **Query params**: `/products?category=books&limit=10`
   - **Cookie params**: for quick client authentication

### Example GET Request

```http
GET /api/users/12345 HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_TOKEN
Accept: application/json
```

### Example POST Request

```http
POST /api/orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "product_id": "789",
  "quantity": 2,
  "customer_id": "12345"
}
```

---

## Response Structure

A REST response contains:

1. **Status Line** — three-digit status code
2. **Headers** — metadata (e.g. `Content-Type`, `Cache-Control`, rate limit info)
3. **Body** — the resource representation (usually JSON)

### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{
  "id": "12345",
  "name": "Ida Postmanaut",
  "email": "i.postmanaut@example.com",
  "role": "Developer"
}
```

### Example Error Response

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'email' field must be a valid email address",
    "field": "email"
  }
}
```

---

## Resource MIME Types

The `Content-Type` header specifies the representation format in requests and responses. Most APIs support:

| MIME Type | Format |
|-----------|--------|
| `application/json` | JSON (most common) |
| `application/xml` | XML |
| `application/merge-patch+json` | JSON Merge Patch (PATCH) |
| `application/json-patch+json` | JSON Patch (PATCH) |

```http
# Client specifying JSON body
POST https://api.contoso.com/orders
Content-Type: application/json; charset=utf-8

{"Id":1,"Name":"Gizmo","Category":"Widgets","Price":1.99}
```

```http
# Client advertising acceptable response formats
GET https://api.contoso.com/orders/2
Accept: application/json, application/xml
```

> If the server can't match the `Accept` media type, return `406 Not Acceptable`. If it doesn't support the request `Content-Type`, return `415 Unsupported Media Type`.

---

## PATCH: JSON Merge Patch vs JSON Patch

PATCH only sends the changes, not the full resource. There are two common formats:

| Format | Media Type | Notes |
|--------|-----------|-------|
| **JSON Merge Patch** ([RFC 7396](https://tools.ietf.org/html/rfc7396)) | `application/merge-patch+json` | Simpler; set field to `null` to delete it |
| **JSON Patch** ([RFC 6902](https://tools.ietf.org/html/rfc6902)) | `application/json-patch+json` | More flexible; explicit operations (add, remove, replace, copy, test) |

### JSON Merge Patch Example

```json
// Original resource
{ "name": "gizmo", "category": "widgets", "color": "blue", "price": 10 }

// Merge patch — update price, delete color, add size
{ "price": 12, "color": null, "size": "small" }

// Result
{ "name": "gizmo", "category": "widgets", "size": "small", "price": 12 }
```

> Merge patch is unsuitable if the original resource has intentional `null` values, because `null` means "delete this field".

---

## Asynchronous Methods

When a POST, PUT, PATCH, or DELETE operation takes a long time, make it asynchronous to avoid unacceptable latency.

1. Return `202 Accepted` with a `Location` header pointing to a status endpoint:

```http
HTTP/1.1 202 Accepted
Location: /api/status/12345
```

2. Client polls the status endpoint (`GET /api/status/12345`):

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "In progress",
  "link": { "rel": "cancel", "method": "delete", "href": "/api/status/12345" }
}
```

3. On completion, if a new resource was created, return `303 See Other`:

```http
HTTP/1.1 303 See Other
Location: /api/orders/12345
```

---

## Partial Responses (Range Requests)

For large binary resources (files, images), support partial retrieval to handle unreliable connections and reduce payload sizes.

```http
# Client checks if partial GET is supported
HEAD https://api.contoso.com/products/10?fields=productImage

HTTP/1.1 200 OK
Accept-Ranges: bytes
Content-Length: 4580
```

```http
# Client requests first 2500 bytes
GET https://api.contoso.com/products/10?fields=productImage
Range: bytes=0-2499

HTTP/1.1 206 Partial Content
Content-Length: 2500
Content-Range: bytes 0-2499/4580
```

---

## HATEOAS

**Hypermedia as the Engine of Application State** — responses include links that describe available actions. Clients can navigate the API without prior knowledge of URI schemas.

```json
{
  "orderID": 3,
  "productID": 2,
  "quantity": 4,
  "orderValue": 16.60,
  "links": [
    {
      "rel": "customer",
      "href": "https://api.contoso.com/customers/3",
      "action": "GET",
      "types": ["application/json"]
    },
    {
      "rel": "customer",
      "href": "https://api.contoso.com/customers/3",
      "action": "PUT",
      "types": ["application/json"]
    },
    {
      "rel": "self",
      "href": "https://api.contoso.com/orders/3",
      "action": "DELETE",
      "types": []
    }
  ]
}
```

> The set of available links can change based on the resource's state — this is what "hypertext as the engine of application state" means.

---

## Authentication Methods

| Method | How it Works | Security Level |
|--------|-------------|----------------|
| **Basic Auth** | Base64-encoded `username:password` in header | Low (use HTTPS only) |
| **Bearer Token** | Encrypted token sent in `Authorization` header | Medium–High |
| **API Keys** | Unique key assigned by server, sent with each request | Medium (vulnerable if intercepted) |
| **OAuth 2.0** | Delegated access via password + token flow | High |

```http
# Basic
Authorization: Basic base64(username:password)

# Bearer Token
Authorization: Bearer <token>

# API Key (header)
X-API-Key: your-api-key
```

---

## URI Design Best Practices

```
✅  GET /api/products          # plural nouns for collections
✅  GET /api/products/789      # item within a collection
✅  GET /api/users/123/orders  # nested resources for relationships
✅  POST /api/orders           # verb implied by HTTP method

❌  GET /api/getProducts       # no verbs in URIs
❌  POST /api/createOrder      # no verbs in URIs
❌  GET /api/user              # use plural nouns
```

- Use **nouns**, not verbs — the HTTP method conveys the action
- Use **plural nouns** for collections (`/users`, not `/user`)
- Keep URIs **shallow** — avoid deeper than `collection/item/collection`
- Avoid exposing internal database structure via resource names
- Don't create *chatty* APIs (many small resources requiring multiple requests) — combine related data where sensible

---

## Filtering, Sorting & Pagination

```http
# Pagination — provide sensible defaults (e.g. limit=25, offset=0)
GET /api/orders?limit=25&offset=50

# Filtering
GET /api/orders?status=shipped&minCost=100

# Sorting (note: can affect caching as query strings form part of the cache key)
GET /api/users?sort=created_at&order=desc

# Field selection / projection
GET /api/products?fields=id,name,price
```

> Set an upper limit on `limit` to prevent denial-of-service attacks (e.g. reject `limit=10000`).

---

## API Versioning Strategies

| Strategy | Example | Cache-friendly? | Notes |
|----------|---------|----------------|-------|
| **URI versioning** | `/api/v1/users` | ✅ Yes | Simple; can complicate HATEOAS links |
| **Query string** | `/api/users?version=1` | ✅ Yes | Older proxies may not cache query string responses |
| **Header versioning** | `Custom-Header: api-version=1` | ❌ No | Cleaner URIs; requires L7 inspection |
| **Media type** | `Accept: application/vnd.company.v1+json` | ❌ No | Most RESTful; well-suited for HATEOAS |

### Header Versioning Example

```http
GET https://api.contoso.com/customers/3
Custom-Header: api-version=2

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"id":3,"name":"Fabrikam, Inc.","address":{"streetAddress":"1 Microsoft Way","city":"Redmond","state":"WA","zipCode":98053}}
```

---

## Multitenant APIs

A multitenant API is shared by multiple organisations (tenants), each with their own users and data. Design for multitenancy early — retrofitting is costly.

| Strategy | Example | Notes |
|----------|---------|-------|
| **Subdomain / DNS** | `adventureworks.api.contoso.com/orders/3` | Clean URIs; requires DNS config (`A`/`CNAME` records) |
| **HTTP header** | `X-Tenant-ID: adventureworks` | Cleaner REST design; complicates caching |
| **JWT claim** | `Authorization: Bearer <token with tenant-id>` | Centralised auth; most secure |
| **URI path** | `/tenants/adventureworks/orders/3` | Simple routing; compromises RESTful design |

> Header-based isolation can cause cache leakage if the cache layer doesn't differentiate on headers — always include tenant context in cache keys.

---

## Distributed Tracing

Propagate trace context through headers for end-to-end visibility across microservices.

```http
GET https://api.contoso.com/orders/3
Correlation-ID: aaaa0000-bb11-2222-33cc-444444dddddd

HTTP/1.1 200 OK
Correlation-ID: aaaa0000-bb11-2222-33cc-444444dddddd
```

Common tracing headers: `Correlation-ID`, `X-Request-ID`, `X-Trace-ID`

---

## Benefits of RESTful APIs

| Benefit | Description |
|---------|-------------|
| **Scalability** | Statelessness and caching reduce server load |
| **Flexibility** | Client and server evolve independently |
| **Independence** | Language and platform agnostic |
| **Lightweight** | JSON payloads suit mobile and IoT |

---

## REST vs. SOAP

| | REST | SOAP |
|-|------|------|
| Type | Architectural style | Protocol |
| Data format | JSON, XML, HTML, plain text | XML only |
| Transport | HTTP/HTTPS | HTTP, SMTP, TCP |
| Ease of use | Simple | Complex |
| Performance | Faster, lightweight | More overhead |
| Caching | Built-in HTTP caching | Custom required |
| Best for | Web/mobile apps, public APIs | Enterprise, high-security |

---

## Richardson Maturity Model

| Level | Description |
|-------|-------------|
| **Level 0** | One URI, all operations via POST (e.g. SOAP) |
| **Level 1** | Separate URIs per resource |
| **Level 2** | HTTP methods used correctly — most REST APIs reach this |
| **Level 3** | HATEOAS — hypermedia links in responses (truly RESTful per Fielding's definition) |

---

## OpenAPI Initiative

The [OpenAPI Initiative](https://www.openapis.org) standardises REST API descriptions (formerly Swagger, now **OpenAPI Specification / OAS**).

Key points:
- Promotes **contract-first** design — define the API interface before writing code
- Tools like Swagger UI can generate client libraries, docs, and tests from OAS files
- Advantages: interoperability, tooling support, consistent documentation

---

## Common Pitfalls

- Putting credentials in URLs (they get logged)
- No rate limiting (opens door to abuse)
- Inconsistent naming conventions across endpoints
- Returning `200 OK` for errors
- Over-fetching (returning too much data) or under-fetching (too many roundtrips)
- No API versioning strategy before going public
- Exposing internal database structure in URIs or field names
- Not designing for multitenancy upfront

---

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Validate all input on the server
- [ ] Implement rate limiting and timeouts
- [ ] Use short-lived tokens (Bearer/OAuth) rather than long-lived API keys
- [ ] Never expose internal database structure via URIs
- [ ] Return appropriate 401/403 status codes — never silently fail auth
- [ ] Scope and rotate API keys regularly
- [ ] Avoid overly permissive CORS settings

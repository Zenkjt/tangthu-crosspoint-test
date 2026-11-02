# tangthu-crosspoint-test

Worker tối giản để xác định CrossPoint có thực sự gửi `POST` tới `browse` endpoint hay không.

- `POST /` → HTTP 200 + JSON có `items`
- `GET /` → HTTP 405 + JSON báo `GET_NOT_ALLOWED`
- Không có Story API, Apps Script hay proxy logic khác.

## device.json test

```json
{
  "title": "Tàng Thư POST TEST",
  "description": "Test CrossPoint browse POST.",
  "browse": {
    "format": "json",
    "url": "https://<worker-domain>/",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "body": "{\"shelf_no\":1}",
    "items": "items",
    "page_size": 1,
    "fields": {
      "title": "title",
      "id": "id",
      "url": "url"
    }
  }
}
```

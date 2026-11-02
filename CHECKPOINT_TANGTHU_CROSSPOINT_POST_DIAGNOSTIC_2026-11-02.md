# CHECKPOINT — Tàng Thư CrossPoint POST Diagnostic Worker

**Date:** 2026-11-02

## Mục tiêu

Tách riêng vấn đề HTTP method khỏi toàn bộ Story backend.

## Quyết định

Dùng một Cloudflare Worker tối giản, deploy từ GitHub, không dùng Apps Script và không đụng Worker production.

## Quy tắc test

- `POST /` → trả JSON catalog hợp lệ với `items`.
- `GET /` → trả HTTP 405.
- POST response có header `X-TangThu-Received-Method: POST`.
- Request body được đọc để xác nhận `shelf_no`.

## Ý nghĩa

Nếu CrossPoint có `browse.method = POST` nhưng Worker nhận GET, vấn đề nằm ở đường request/plugin/firmware.

Nếu Worker nhận POST mà CrossPoint vẫn không hiện item, điều tra tiếp schema JSON/catalog hoặc cách plugin xử lý response.

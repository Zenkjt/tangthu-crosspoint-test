const STORY_WORKER_URL =
  "https://tangthu-story-worker.mienluonngon.workers.dev/story/crosspoint-next";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // CrossPoint gateway:
    // Metalio/CrossPoint -> this reachable worker
    // -> Story Worker /story/crosspoint-next
    if (url.pathname === "/" && request.method === "POST") {
      let body;

      try {
        body = await request.json();
      } catch (_) {
        return json(
          {
            ok: false,
            error: "INVALID_JSON"
          },
          400
        );
      }

      if (!Number.isInteger(body?.shelf_no) || body.shelf_no <= 0) {
        return json(
          {
            ok: false,
            error: "INVALID_SHELF_NO"
          },
          400
        );
      }

      try {
        const upstream = await fetch(STORY_WORKER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            shelf_no: body.shelf_no
          })
        });

        const responseBody = await upstream.text();

        return new Response(responseBody, {
          status: upstream.status,
          headers: {
            "Content-Type":
              upstream.headers.get("Content-Type") ||
              "application/json",
            "X-TangThu-Gateway": "crosspoint-test"
          }
        });
      } catch (error) {
        return json(
          {
            ok: false,
            error: "STORY_WORKER_FETCH_FAILED",
            message: String(error)
          },
          502
        );
      }
    }

    // Keep GET diagnostic behavior.
    if (url.pathname === "/" && request.method === "GET") {
      return json(
        {
          error: "GET_NOT_ALLOWED",
          received_method: "GET"
        },
        405,
        {
          "Allow": "POST",
          "X-TangThu-Received-Method": "GET"
        }
      );
    }

    return new Response("Not Found", {
      status: 404
    });
  }
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" && request.method === "POST") {
      let body = null;
      try { body = await request.json(); } catch (_) {}

      return new Response(JSON.stringify({
        items: [{
          title: `POST received${body?.shelf_no ? ` — shelf ${body.shelf_no}` : ""}`,
          id: "post-test-v2",
          url: "https://example.com/"
        }]
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-TangThu-Received-Method": "POST"
        }
      });
    }

    if (url.pathname === "/" && request.method === "GET") {
      return new Response(JSON.stringify({
        error: "GET_NOT_ALLOWED",
        received_method: "GET"
      }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Allow": "POST",
          "X-TangThu-Received-Method": "GET"
        }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};

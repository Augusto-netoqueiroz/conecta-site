/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (
      url.protocol === "http:" &&
      url.hostname !== "localhost" &&
      url.hostname !== "terminal.local"
    ) {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 308);
    }

    const secure = (response: Response, asset = false) => {
      const secured = new Response(response.body, response);
      if (url.hostname === "terminal.local") {
        secured.headers.set("Cache-Control", "no-store");
        return secured;
      }
      secured.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://wa.me; img-src 'self' data: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; upgrade-insecure-requests",
      );
      secured.headers.set("Cross-Origin-Opener-Policy", "same-origin");
      secured.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
      secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      secured.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
      secured.headers.set("X-Content-Type-Options", "nosniff");
      secured.headers.set("X-Frame-Options", "DENY");
      secured.headers.set("X-Permitted-Cross-Domain-Policies", "none");
      secured.headers.set(
        "Cache-Control",
        asset ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
      );
      return secured;
    };

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const optimized = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return secure(optimized, true);
    }

    const response = await handler.fetch(request, env, ctx);
    const isAsset = /\.(?:avif|css|gif|ico|jpe?g|js|png|svg|webp|woff2?)$/i.test(url.pathname);
    return secure(response, isAsset);
  },
};

export default worker;

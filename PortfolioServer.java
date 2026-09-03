/**
 * ABHISHEK SAXENA — DIGITAL MARKETING EXECUTIVE PORTFOLIO
 * Standalone Zero-Dependency Java HTTP Web Server
 * 
 * Works with any standard Java Development Kit (JDK 8+).
 * Compile & Run:
 *   javac PortfolioServer.java
 *   java PortfolioServer
 * or directly (Java 11+):
 *   java PortfolioServer.java
 */

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

public class PortfolioServer {

    private static final int PORT = 8080;
    private static final File ROOT_DIR = new File(".").getAbsoluteFile();
    private static final Map<String, String> MIME_TYPES = new HashMap<>();

    static {
        MIME_TYPES.put("html", "text/html; charset=utf-8");
        MIME_TYPES.put("htm", "text/html; charset=utf-8");
        MIME_TYPES.put("css", "text/css; charset=utf-8");
        MIME_TYPES.put("js", "application/javascript; charset=utf-8");
        MIME_TYPES.put("json", "application/json; charset=utf-8");
        MIME_TYPES.put("pdf", "application/pdf");
        MIME_TYPES.put("png", "image/png");
        MIME_TYPES.put("jpg", "image/jpeg");
        MIME_TYPES.put("jpeg", "image/jpeg");
        MIME_TYPES.put("svg", "image/svg+xml");
        MIME_TYPES.put("ico", "image/x-icon");
        MIME_TYPES.put("txt", "text/plain; charset=utf-8");
    }

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // API Endpoint for Contact Form
        server.createContext("/api/contact", new ContactApiHandler());

        // Static File Serving Handler
        server.createContext("/", new StaticFileHandler());

        server.setExecutor(null); // default multithreaded executor
        server.start();

        System.out.println("=============================================================");
        System.out.println(" ABHISHEK SAXENA — DIGITAL MARKETING EXECUTIVE PORTFOLIO");
        System.out.println(" Java Web Server Started Successfully!");
        System.out.println(" Access URL: http://localhost:" + PORT);
        System.out.println(" Resume Asset: Abhishek_Saxena_Resume.pdf");
        System.out.println(" Tagline: BUILD. OPTIMIZE. GROW.");
        System.out.println("=============================================================");
    }

    /**
     * Handler to serve static portfolio files with proper MIME types.
     */
    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            path = URLDecoder.decode(path, "UTF-8");

            if (path.equals("/") || path.isEmpty()) {
                path = "/index.html";
            }

            File targetFile = new File(ROOT_DIR, path).getCanonicalFile();

            // Prevent path traversal outside root folder
            if (!targetFile.getPath().startsWith(ROOT_DIR.getCanonicalPath()) || !targetFile.exists() || targetFile.isDirectory()) {
                byte[] notFound = "404 Not Found".getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(404, notFound.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(notFound);
                }
                return;
            }

            String ext = getFileExtension(targetFile.getName());
            String mime = MIME_TYPES.getOrDefault(ext, "application/octet-stream");

            exchange.getResponseHeaders().set("Content-Type", mime);
            exchange.getResponseHeaders().set("Cache-Control", "no-cache");

            // For PDF downloads, set appropriate header
            if (ext.equals("pdf")) {
                exchange.getResponseHeaders().set("Content-Disposition", "inline; filename=\"" + targetFile.getName() + "\"");
            }

            exchange.sendResponseHeaders(200, targetFile.length());
            try (OutputStream os = exchange.getResponseBody();
                 FileInputStream fis = new FileInputStream(targetFile)) {
                byte[] buffer = new byte[8192];
                int bytesRead;
                while ((bytesRead = fis.read(buffer)) != -1) {
                    os.write(buffer, 0, bytesRead);
                }
            }
        }
    }

    /**
     * Handler to process contact inquiries submitted via POST.
     */
    static class ContactApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                InputStream is = exchange.getRequestBody();
                String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);

                System.out.println("\n[JAVA SERVER - CONTACT RECEIVED]: " + body);

                byte[] response = "{\"success\":true,\"message\":\"Contact inquiry recorded via Java server.\"}"
                        .getBytes(StandardCharsets.UTF_8);

                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response);
                }
            } else {
                exchange.sendResponseHeaders(405, -1); // Method Not Allowed
            }
        }
    }

    private static String getFileExtension(String filename) {
        int dot = filename.lastIndexOf('.');
        if (dot > 0 && dot < filename.length() - 1) {
            return filename.substring(dot + 1).toLowerCase();
        }
        return "";
    }
}

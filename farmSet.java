import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

public class farmSet {

    static List<Farm> farms = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        loadFarms();

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/api/farms", exchange -> {
            String json = farmsToJson(farms);
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, json.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(json.getBytes());
            os.close();
        });

        server.createContext("/api/tour-request", exchange -> {
            if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {
                InputStream is = exchange.getRequestBody();
                String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                System.out.println("Received tour request: " + body);
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.sendResponseHeaders(200, 0);
                exchange.getResponseBody().close();
            }
        });

        server.setExecutor(null); // default
        server.start();
        System.out.println("Server running on http://localhost:8080");
    }

    static void loadFarms() throws IOException {
        List<String> lines = Files.readAllLines(Path.of("farms.csv"));
        for (int i = 1; i < lines.size(); i++) {
            String[] parts = lines.get(i).split(",", 5);
            farms.add(new Farm(
                Integer.parseInt(parts[0]),
                parts[1],
                Double.parseDouble(parts[2]),
                Double.parseDouble(parts[3]),
                parts[4].replace("\"", "")
            ));
        }
    }

    static String farmsToJson(List<Farm> farms) {
        StringBuilder sb = new StringBuilder("[");
        for (Farm f : farms) {
            sb.append(String.format(
                "{\"id\":%d,\"name\":\"%s\",\"lat\":%.5f,\"lng\":%.5f,\"produce\":\"%s\"},",
                f.id, f.name, f.lat, f.lng, f.produce
            ));
        }
        if (!farms.isEmpty()) sb.setLength(sb.length() - 1); // remove trailing comma
        sb.append("]");
        return sb.toString();
    }

    static class Farm {
        int id;
        String name;
        double lat, lng;
        String produce;
        Farm(int id, String name, double lat, double lng, String produce) {
            this.id = id;
            this.name = name;
            this.lat = lat;
            this.lng = lng;
            this.produce = produce;
        }
    }
}
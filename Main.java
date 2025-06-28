/*
 * Project: FarmTrip Web App
 * Language: Java with HTML for frontend
 * Note: This project does not rely on external frameworks (only HTML & Java)
 * This is a basic simulation, not fully deployed with database/email/payment services.
 */

// File: Main.java (Base class)
public class Main {
    public String renderHeader(String title) {
        return "<html><head><title>" + title + "</title></head><body>";
    }
    public String renderFooter() {
        return "</body></html>";
    }
}
public class Homepage extends Main {
    public String render() {
        return renderHeader("FarmTrip Homepage") +
            "<h1>Welcome to FarmTrip</h1>" +
            "<p>Our mission: Reducing food waste and connecting schools to farms</p>" +
            "<h3>Featured Farms:</h3><ul><li>Green Valley Farms</li><li>Sunshine Orchards</li></ul>" +
            "<a href='trip_form.html'>Request a Trip</a> | <a href='donate.html'>Donate</a>" +
            renderFooter();
    }

    private String renderHeader(String farmTrip_Homepage) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    private String renderFooter() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
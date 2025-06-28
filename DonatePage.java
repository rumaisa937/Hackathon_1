public class DonatePage extends Main {
    public String render() {
        return "<h2>Donate to FarmTrip</h2>" +
                renderHeader("Donate") +
            "<p>Total Donations: $1230</p>" +
            "<form action='process_donation' method='POST'>" +
            "$<input name='amount' type='number'><br>" +
            "<input type='submit' value='Donate (Mock)'>" +
            "</form>" +
            renderFooter();
    }

    private String renderHeader(String donate) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    private String renderFooter() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
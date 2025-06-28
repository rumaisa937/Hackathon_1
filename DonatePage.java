public class DonatePage extends Main {
    public String render() {
        return renderHeader("Donate") +
            "<h2>Donate to FarmTrip</h2>" +
            "<p>Total Donations: $1230</p>" +
            "<form action='process_donation' method='POST'>" +
            "$<input name='amount' type='number'><br>" +
            "<input type='submit' value='Donate (Mock)'>" +
            "</form>" +
            renderFooter();
    }
}
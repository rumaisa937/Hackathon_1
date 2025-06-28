public class TripForm extends Main {
    public String render() {
        return "Contact: <input name='contact'><br>" +
                renderHeader("Trip Request Form") +
                "<form action='submit_trip' method='POST'>" +
                "School Name: <input name='school'><br>" +
            "Students: <input name='students'><br>" +
            "Date: <input name='date' type='date'><br>" +
            "Farm: <select><option>Green Valley</option></select><br>" +
            "<input type='submit' value='Submit'>" +
            "</form>" +
            renderFooter();
    }

    public String renderHeader(String trip_Request_Form) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    private String renderFooter() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
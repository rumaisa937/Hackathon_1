public class TripForm extends Main {
    public String render() {
        return renderHeader("Trip Request Form") +
            "<form action='submit_trip' method='POST'>" +
            "School Name: <input name='school'><br>" +
            "Contact: <input name='contact'><br>" +
            "Students: <input name='students'><br>" +
            "Date: <input name='date' type='date'><br>" +
            "Farm: <select><option>Green Valley</option></select><br>" +
            "<input type='submit' value='Submit'>" +
            "</form>" +
            renderFooter();
    }
}
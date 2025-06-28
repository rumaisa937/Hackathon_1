public class AdminPanel extends Main {
    public String render() {
        return renderHeader("Admin Panel") +
            "<h3>Pending Trip Requests</h3>" +
            "<p>[Mocked Trip #1: School X - Approve/Reject]</p>" +
            "<h3>Add New Farm</h3>" +
            "<form><input name='farm' placeholder='Farm Name'><br><input type='submit'></form>" +
            renderFooter();
    }

    private String renderHeader(String admin_Panel) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    private String renderFooter() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
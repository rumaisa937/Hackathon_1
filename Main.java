import java.io.*;

public class Main extends HttpServlet {
    protected void renderPage(HttpServletResponse res, String htmlFilePath) throws IOException {
        res.setContentType("text/html");
        PrintWriter out = res.getWriter();
        BufferedReader reader = new BufferedReader(new FileReader(htmlFilePath));
        String line;
        while ((line = reader.readLine()) != null) {
            out.println(line);
        }
        reader.close();
    }

    private static class HttpServletResponse {

        public HttpServletResponse() {
        }

        private void setContentType(String texthtml) {
            throw new UnsupportedOperationException("Not supported yet.");
        }

        private PrintWriter getWriter() {
            throw new UnsupportedOperationException("Not supported yet.");
        }
    }
}
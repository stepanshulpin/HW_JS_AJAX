package HW;



import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.RoundingMode;
import java.text.DecimalFormat;


public class SolveServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        double a= Double.parseDouble(req.getParameter("a"));
        double b= Double.parseDouble(req.getParameter("b"));
        double c= Double.parseDouble(req.getParameter("c"));

        JSONObject json = new JSONObject();

        DecimalFormat df = new DecimalFormat("#.####");
        df.setRoundingMode(RoundingMode.CEILING);

        if(a == 0){
            if(b==0){
                if(c==0){
                    json.put("x1","любое значение");
                    json.put("x2","любое значение");
                }
                else{
                    json.put("x1","не существует");
                    json.put("x2","не существует");
                }
            }
            else{
                json.put("x1",df.format(-c/b));
                json.put("x2",df.format(-c/b));
            }
        }
        else{
            double d = b * b - 4 * a * c;
            if ( d < 0 ) {

                String x1 = "(";
                x1 += df.format(-b / ( 2 * a ));
                x1 += "; ";
                x1 += df.format(Math.sqrt( -d ) / ( 2 * a ));
                x1 += ")";
                String x2 = "(";
                x2 += df.format(-b / ( 2 * a ));
                x2 += "; ";
                x2 += df.format(-Math.sqrt( -d ) / ( 2 * a ));
                x2 += ")";
                json.put("x1",x1);
                json.put("x2",x2);

            } else {
                if ( d == 0 ) {

                    json.put( "x1",df.format(-b / ( 2 * a )));
                    json.put( "x2",df.format(-b / ( 2 * a )));

                } else {
                    String x1 = df.format(-b / ( 2 * a ) - Math.sqrt( d ) / ( 2 * a ));
                    String x2 = df.format(-b / ( 2 * a ) + Math.sqrt( d ) / ( 2 * a ));
                    json.put("x1",x1);
                    json.put("x2",x2);
                }
            }
        }

        resp.setContentType("application/json");
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("utf-8");
        resp.getWriter().write(json.toString());
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}

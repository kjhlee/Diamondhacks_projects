import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class incomeController {
    @RequestMapping("/manual")
    public String index(){
        return "index.html";
    }
}

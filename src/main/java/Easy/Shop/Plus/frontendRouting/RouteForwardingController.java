package Easy.Shop.Plus.frontendRouting;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteForwardingController {

    @RequestMapping("/")
    public String forwardRoot() {
        return "forward:/index.html";
    }
}



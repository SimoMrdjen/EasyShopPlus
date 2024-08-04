package Easy.Shop.Plus;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Arrays;

@EnableJpaRepositories(basePackages = "Easy.Shop.Plus.repository")
@ComponentScan(basePackages = "Easy.Shop.Plus")
@SpringBootApplication
public class PlusApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlusApplication.class, args);
	}
}

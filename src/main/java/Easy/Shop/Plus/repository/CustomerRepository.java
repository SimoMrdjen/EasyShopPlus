package Easy.Shop.Plus.repository;

import Easy.Shop.Plus.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByLastNameContainingIgnoreCase(String lastNameLike);
    Optional<Customer> findByJmbg(String jmbg);
}

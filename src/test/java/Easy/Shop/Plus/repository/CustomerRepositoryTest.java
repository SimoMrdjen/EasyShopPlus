package Easy.Shop.Plus.repository;

import Easy.Shop.Plus.entity.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class CustomerRepositoryTest {
    @Autowired
    private  CustomerRepository customerRepository;
    private Customer customer;

//    @BeforeEach
//    void setUp() {
//        customer = new Customer(
//                "Mrdjen",
//                "Simo",
//                "0206970850101",
//                "Yr",
//                "0205",
//                "Zrenjanin PU",
//                "dr.sizni@gmail.com",
//                "0631030260");
//        customerRepository.save(customer);
//    }

//    @Test
//    void shouldReturnListOfCustomersWhenFindByLastNameContainingIgnoreCase() {
//        customerRepository.save(customer);
//        assertThat(customerRepository.findByLastNameContainingIgnoreCase("M")).isEqualTo(List.of(customer));
//    }

//    @Test
//    void shouldReturnCustomerWhenFindByJmbgIfExists() {
//        Optional<Customer> fetchedCustomer = customerRepository.findByJmbg(customer.getJmbg());
//        assertThat(fetchedCustomer.get().getJmbg()).isEqualTo(customer.getJmbg());
//    }

}
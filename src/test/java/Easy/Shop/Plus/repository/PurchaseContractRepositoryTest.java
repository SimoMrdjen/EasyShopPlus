package Easy.Shop.Plus.repository;

import Easy.Shop.Plus.entity.Customer;
import Easy.Shop.Plus.entity.Installment;
import Easy.Shop.Plus.entity.PurchaseContract;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@DataJpaTest
class PurchaseContractRepositoryTest {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    PurchaseContractRepository repository;
    PurchaseContract purchaseContract;
    Customer customer;

    @BeforeEach
    void setUp() {
        customer = customerRepository.save(
                new Customer(
                        null,
                        "Mrdjen",
                        "Simo",
                        "0206970850101",
                        "Yr",
                        "0205",
                        "Zrenjanin PU",
                        "dr.sizni@gmail.com",
                        "0631030260"));
        purchaseContract = new PurchaseContract(
                null,
                customer,
                100.00,
                50.00,
                LocalDate.now(),
                new ArrayList<Installment>());
    }

    @Test
    void shouldReturnContractsWhenFindByCustomerId() throws Exception {
        repository.save(purchaseContract);
        assertThat(repository.findByCustomerId(customer.getId()))
                .usingRecursiveFieldByFieldElementComparatorIgnoringFields("id")
                .isEqualTo(List.of(purchaseContract));
    }
}
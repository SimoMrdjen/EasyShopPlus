package Easy.Shop.Plus.repository;

import Easy.Shop.Plus.entity.Customer;
import Easy.Shop.Plus.entity.Installment;
import Easy.Shop.Plus.entity.InstallmentOrdinal;
import Easy.Shop.Plus.entity.PurchaseContract;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class InstallmentRepositoryTest {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    PurchaseContractRepository contractRepository;
    @Autowired
    InstallmentRepository repository;

    Installment installment1;
    Installment installment2;
    Installment installment3;

    PurchaseContract purchaseContract1;
    PurchaseContract purchaseContract2;
    Customer customer1;
    Customer customer2;

//    @BeforeEach
//    void setUp() {
//        customer1 = customerRepository.save( new Customer(null, "Mrdjen", "Simo",
//                "0206970850101", "Yr",
//                "0205", "Zrenjanin PU", "dr.sizni@gmail.com", "0631030260"));
//
//        customer2 = customerRepository.save( new Customer(null, "Aaaaaa", "Marija",
//                "0206970850102", "Yr",
//                "0205", "Zrenjanin PU", "dr.sizni@gmail.com", "0631030260"));
//
//        purchaseContract1 = contractRepository.save(new PurchaseContract(null, customer1,
//                100.00, 50.00, LocalDate.now()));
//        purchaseContract2 = contractRepository.save(new PurchaseContract(null, customer2,
//                5.00, 2.00, LocalDate.now()) );
//
//        installment1 = repository.save(new Installment(purchaseContract1, InstallmentOrdinal.FIRST,
//                20.00, LocalDate.now().plusMonths(1)));
//
//        installment2 = repository.save(new Installment(purchaseContract2, InstallmentOrdinal.FIRST,
//                1.00, LocalDate.now().plusMonths(1)));
//    }

//    @Test
//    void shouldReturnListWhenFindAllByPurchaseContract_Customer_Id() {
//        assertThat(repository.findAllByPurchaseContractCustomerId(customer1.getId()))
//                .usingDefaultElementComparator()
//                .isEqualTo(List.of(installment1));
//
//    }
//    @Test
//    void shouldReturnListWhenFindAllByPurchaseContract_Id() {
//        assertThat(repository.findAllByPurchaseContract_Id(purchaseContract1.getId()))
//                .usingDefaultElementComparator()
//                .isEqualTo(List.of(installment1));
//    }

}
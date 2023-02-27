package Easy.Shop.Plus.service.implementation;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.dto.PurchaseContractDto;
import Easy.Shop.Plus.entity.*;
import Easy.Shop.Plus.mapper.InstallmentMapper;
import Easy.Shop.Plus.repository.InstallmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InstallmentServiceTest {
    @Mock
    private InstallmentMapper mapper;
    @Mock
    InstallmentRepository repository;

    InstallmentService service;
    private Installment installment;
    private InstallmentDto installmentDto;

    @BeforeEach
    void setUp() {
        service = new InstallmentService(repository,mapper);

        var customer =  new Customer(1L, "Mrdjen", "Simo",
                "0206970850101", "Yr",
                "0205", "Zrenjanin PU",
                "dr.sizni@gmail.com", "0631030260");

        var purchaseContract = new PurchaseContract(2L, customer,
                100.00, 50.00, LocalDate.now());

        installment = new Installment(1L,purchaseContract, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1), 20.00,
                LocalDate.now().plusMonths(1), PaymentMethod.CASH);

        var customerDto =  new CustomerDto(1L, "Mrdjen", "Simo",
                "0206970850101", "Yr",
                "0205", "Zrenjanin PU",
                "dr.sizni@gmail.com", "0631030260");

        var purchaseContractDto = new PurchaseContractDto(2L, customerDto,
                100.00, 50.00, LocalDate.now());

        installmentDto = new InstallmentDto(1L,purchaseContractDto, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1), 20.00,
                LocalDate.now().plusMonths(1), PaymentMethod.CASH);
    }

    @Test
    void shouldGetAll() {
        when(repository.findAll())
                .thenReturn(List.of(installment));
        when(mapper.mapGetEntityToDto(installment))
                .thenReturn(installmentDto);
        assertThat(service.getAll())
                .usingDefaultComparator()
                .isEqualTo(List.of(installmentDto));
    }

    @Test
    void shouldGetInstallmentByIdIfExist() throws Exception {
        when(repository.findById(installment.getId()))
              .thenReturn(Optional.of(installment));
        when(mapper.mapGetEntityToDto(installment))
              .thenReturn(installmentDto);
        assertThat(service.getById(installment.getId()))
              .isEqualTo(installmentDto);
    }
    @Test
    void shouldThrowExWhenGetInstallmentIfNotExist() {
        when(repository.findById(anyLong()))
               .thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.getById(anyLong()))
              .isInstanceOf(Exception.class)
                .withFailMessage("Installment not found");

    }
    @Test
    void shouldGetInstallmentsByCustomerId() {
    }

    @Test
    void shouldGetUnpaidInstallmentsByCustomerId() {
    }

    @Test
    void shouldUpdateInstallment() {
    }
}
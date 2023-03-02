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
    private Installment installmentUnpaid;
    private InstallmentDto installmentDtoUnpaid;
    private PurchaseContract purchaseContract;
    private PurchaseContractDto purchaseContractDto;

    @BeforeEach
    void setUp() {
        service = new InstallmentService(repository,mapper);

        var customer =  new Customer(1L, "Mrdjen", "Simo",
                "0206970850101", "Yr",
                "0205", "Zrenjanin PU",
                "dr.sizni@gmail.com", "0631030260");

       purchaseContract = new PurchaseContract(2L, customer,
                100.00, 40.00, LocalDate.now());

        installment = new Installment(1L,purchaseContract, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1), 20.00,
                LocalDate.now().plusMonths(1), PaymentMethod.CASH);

        installmentUnpaid = new Installment(2L,purchaseContract, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1), null,
               null, null);

        var customerDto =  new CustomerDto(1L, "Mrdjen", "Simo",
                "0206970850101", "Yr",
                "0205", "Zrenjanin PU",
                "dr.sizni@gmail.com", "0631030260");

        purchaseContractDto = new PurchaseContractDto(2L, customerDto,
                100.00, 40.00, LocalDate.now());

        installmentDto = new InstallmentDto(1L,purchaseContractDto, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1), 20.00,
                LocalDate.now().plusMonths(1), PaymentMethod.CASH);

        installmentDtoUnpaid = new InstallmentDto(2L,purchaseContractDto, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1), null,
               null, null);
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
        when(repository.findAllByPurchaseContractCustomerId(installment.getPurchaseContract().getCustomer().getId()))
              .thenReturn(List.of(installment));
        when(mapper.mapGetEntityToDto(installment))
              .thenReturn(installmentDto);
        assertThat(service.getInstallmentsByCustomerId(installment.getPurchaseContract().getCustomer().getId()))
              .isEqualTo(List.of(installmentDto));
    }

    @Test
    void shouldGetUnpaidInstallmentsByCustomerId() {
        when(repository.findAllByPurchaseContractCustomerId(1L))
             .thenReturn(List.of(installmentUnpaid,installment));
        when(mapper.mapGetEntityToDto(installmentUnpaid))
             .thenReturn(installmentDtoUnpaid);
        assertThat(service.getUnpaidInstallmentsByCustomerId(installmentUnpaid.getPurchaseContract().getCustomer().getId()))
             .isEqualTo(List.of(installmentDtoUnpaid));
    }

    @Test
    void shouldUpdateInstallmentIfExist() throws Exception {
        when(repository.existsById(installment.getId()))
                .thenReturn(true);
        when(repository.save(installment))
              .thenReturn(installment);
        when(mapper.mapGetEntityToDto(installment))
              .thenReturn(installmentDto);
        when(mapper.mapEditDtoToEntity(installmentDto))
                .thenReturn(installment);
        assertThat(service.updateInstallment(installmentDto, installmentDto.getId()))
              .isEqualTo(installmentDto);
    }

    @Test
    void shouldThrowExWhenUpdateInstallmentIfNotExist() {
        when(repository.existsById(anyLong()))
              .thenReturn(false);
        assertThatThrownBy(() -> service.updateInstallment(installmentDto, installmentDto.getId()))
             .isInstanceOf(Exception.class)
               .withFailMessage("Installment not found");

    }

    @Test
    void shouldCreateInstallments() {
          Installment installment1 =  new Installment(installmentUnpaid.getPurchaseContract(),
                        installmentUnpaid.getInstallmentOrdinal(),
                        installmentUnpaid.getInstallmentAmount(),
                        installmentUnpaid.getMaturityDate());
        Installment installment2 = new Installment(installment.getPurchaseContract(),
                        InstallmentOrdinal.SECOND,
                        installment.getInstallmentAmount(),
                        installment.getMaturityDate().plusMonths(1));
        Installment installment3 =  new Installment(installment.getPurchaseContract(),
                        InstallmentOrdinal.THIRD,
                        installment.getInstallmentAmount(),
                        installment.getMaturityDate().plusMonths(2));
         List<Installment> installments = List.of(installment1, installment2, installment3);

        Installment installmentS1 = new Installment(1L, installmentUnpaid.getPurchaseContract(),
                        installmentUnpaid.getInstallmentOrdinal(),
                        installmentUnpaid.getInstallmentAmount(),
                        installmentUnpaid.getMaturityDate(),null, null, null);
        Installment installmentS2 =  new Installment(2L,installment.getPurchaseContract(),
                        InstallmentOrdinal.SECOND,
                        installment.getInstallmentAmount(),
                        installment.getMaturityDate().plusMonths(1),null, null, null);
        Installment installmentS3 = new Installment(3L,installment.getPurchaseContract(),
                        InstallmentOrdinal.THIRD,
                        installment.getInstallmentAmount(),
                        installment.getMaturityDate().plusMonths(2),null, null, null);
        List<Installment> installmentsSaved = List.of(installmentS1, installmentS2, installmentS3);

        InstallmentDto installmentDto1 = new InstallmentDto(1L,purchaseContractDto,
                InstallmentOrdinal.FIRST,
                20.00,
                installmentUnpaid.getMaturityDate(),null, null, null);
        InstallmentDto installmentDto2 =  new InstallmentDto(2L,purchaseContractDto,
                InstallmentOrdinal.SECOND,
                installment.getInstallmentAmount(),
                installment.getMaturityDate().plusMonths(1),null, null, null);
        InstallmentDto installmentDto3 = new InstallmentDto(3L,purchaseContractDto,
                InstallmentOrdinal.THIRD,
                installment.getInstallmentAmount(),
                installment.getMaturityDate().plusMonths(2),null, null, null);
        List<InstallmentDto> installmentDtoSaved = List.of(installmentDto1, installmentDto2, installmentDto3);

        when(repository.saveAll(installments))
                .thenReturn(installmentsSaved);
        when(mapper.mapGetEntityToDto(installmentS1))
                .thenReturn(installmentDto1);
        when(mapper.mapGetEntityToDto(installmentS2))
                .thenReturn(installmentDto2);
        when(mapper.mapGetEntityToDto(installmentS3))
                .thenReturn(installmentDto3);

        assertThat(service.createInstallments(purchaseContract))
                .usingDefaultComparator()
                .isEqualTo(installmentDtoSaved);

    }
}
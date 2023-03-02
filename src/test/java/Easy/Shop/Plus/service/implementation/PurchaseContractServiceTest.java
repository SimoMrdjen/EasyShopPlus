package Easy.Shop.Plus.service.implementation;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.dto.PurchaseContractDto;
import Easy.Shop.Plus.entity.*;
import Easy.Shop.Plus.mapper.PurchaseContractMapper;
import Easy.Shop.Plus.repository.PurchaseContractRepository;
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
class PurchaseContractServiceTest {

    PurchaseContractService service;
    @Mock
    private PurchaseContractMapper mapper;
    @Mock
    private PurchaseContractRepository repository;
    private PurchaseContractDto dto;
    private PurchaseContract contract;
    private Customer customer;
    private CustomerDto customerDto;
    private final String CONTRACT_NOT_FOUND = "Contract not found";
    private PurchaseContract createContract;
    private PurchaseContractDto createDto;
    @Mock
    private InstallmentService installmentService;

    @BeforeEach
    void setUp() {
        service = new PurchaseContractService(mapper, repository, installmentService);
        customer =  new Customer(1L, "Mrdjen", "Simo",
                "0206970850101", "Yr",
                "0205", "Zrenjanin PU",
                "dr.sizni@gmail.com", "0631030260");
        contract = new PurchaseContract(1L, customer,
                100.00, 50.00, LocalDate.now());
        customerDto =  new CustomerDto(1L, "Mrdjen", "Simo",
                "0206970850101", "Yr",
                "0205", "Zrenjanin PU",
                "dr.sizni@gmail.com", "0631030260");
        dto = new PurchaseContractDto(1L, customerDto,
                100.00, 50.00, LocalDate.now());
        createContract = new PurchaseContract(null, customer,
                100.00, 50.00, LocalDate.now());
        createDto = new PurchaseContractDto(null, customerDto,
                100.00, 50.00, LocalDate.now());
    }

    @Test
    void shouldGetContractIfExist() throws Exception {
        when(mapper.mapGetEntityToDto(contract))
                .thenReturn(dto);
        when(repository.findById(contract.getId()))
                .thenReturn(Optional.ofNullable(contract));
        assertThat(service.getContract(1L))
                .isEqualTo(dto);
    }

    @Test
    void shouldThrowExWhenGetContractIfNotExist() throws Exception {
        when(repository.findById(anyLong()))
                .thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.getContract(anyLong()))
                .isExactlyInstanceOf(Exception.class)
                .withFailMessage(CONTRACT_NOT_FOUND);
    }

    @Test
    void shouldGetContracts() {
        when(repository.findAll())
                .thenReturn(List.of(contract));
        when(mapper.mapGetEntityToDto(contract))
                .thenReturn(dto);
        assertThat(service.getContracts())
                .usingDefaultComparator()
                .isEqualTo(List.of(dto));
    }

    @Test
    void shouldGetContractsByCustomerId() {
        when(mapper.mapGetEntityToDto(contract))
                .thenReturn(dto);
        when(repository.findByCustomerId(customer.getId()))
                .thenReturn(List.of(contract));
        assertThat(service.getContractsByCustomerId(customer.getId()))
                .isEqualTo(List.of(dto));
    }

    @Test
    void shouldCreateContract() {
        var installmentDto = new InstallmentDto(1L,dto, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1),
                null,null, null);
        var installment = new Installment(1L,contract, InstallmentOrdinal.FIRST,
                20.00, LocalDate.now().plusMonths(1), null,
                null, null);

        when(mapper.mapCreateDtoToEntity(createDto))
                .thenReturn(createContract);
        when(repository.save(createContract))
                .thenReturn(contract);
        when(mapper.mapGetEntityToDto(contract))
                .thenReturn(dto);
        when(installmentService.createInstallments(contract))
                .thenReturn(List.of(installmentDto));
        dto.setInstallments(List.of(installmentDto));
        assertThat(service.createContract(createDto))
                .isEqualTo(dto);
    }
}
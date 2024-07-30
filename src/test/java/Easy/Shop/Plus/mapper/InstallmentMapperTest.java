package Easy.Shop.Plus.mapper;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.dto.PurchaseContractDto;
import Easy.Shop.Plus.entity.Customer;
import Easy.Shop.Plus.entity.Installment;
import Easy.Shop.Plus.entity.InstallmentOrdinal;
import Easy.Shop.Plus.entity.PaymentMethod;
import Easy.Shop.Plus.entity.PurchaseContract;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InstallmentMapperTest {
    @Mock
    PurchaseContractMapper contractMapper;

    InstallmentMapper mapper;
    private Customer customer;
    private CustomerDto customerDto;
    private PurchaseContract contract;
    private PurchaseContractDto contractDto;
    private Installment installment;
    private InstallmentDto dto;
    private Installment editInstallment;
    private InstallmentDto editDto;


//    @BeforeEach
//    void setUp() {
//        mapper = new InstallmentMapper(contractMapper);
//        customer = new Customer(
//                1L,
//                "Mrdjen",
//                "Simo",
//                "0206970850101",
//                "Yr",
//                "0205",
//                "Zrenjanin PU",
//                "dr.sizni@gmail.com",
//                "0631030260");
//        customerDto = new CustomerDto(
//                1L,
//                "Mrdjen",
//                "Simo",
//                "0206970850101",
//                "Yr",
//                "0205",
//                "Zrenjanin PU",
//                "dr.sizni@gmail.com",
//                "0631030260");
//        contract = new PurchaseContract(
//                1l,
//                customer,
//                100.00,
//                50.00,
//                LocalDate.now());
//        contractDto = new PurchaseContractDto(
//                1l,
//                customer,
//                100.00,
//                50.00,
//                LocalDate.now());
//        installment = new Installment(null,contract, InstallmentOrdinal.FIRST,
//                20.00, LocalDate.now().plusMonths(1),
//                null, null, null);
//        dto = new InstallmentDto(null,contractDto, InstallmentOrdinal.FIRST,
//                20.00, LocalDate.now().plusMonths(1),
//                null, null, null);
//        editInstallment = new Installment(1L,contract, InstallmentOrdinal.FIRST,
//                20.00, LocalDate.now().minusMonths(1),
//                10.00, LocalDate.now(), PaymentMethod.CASH);
//        editDto = new InstallmentDto(1L,contractDto, InstallmentOrdinal.FIRST,
//                20.00, LocalDate.now().minusMonths(1),
//                10.00, LocalDate.now(), PaymentMethod.CASH);
//    }
//
//    @Test
//    void shouldReturnEntityWhenMapCreateDtoToEntity() {
//        when(contractMapper.mapDtoToEntity(contractDto))
//                .thenReturn(contract);
//        assertThat(mapper.mapCreateDtoToEntity(dto))
//                .isEqualTo(installment);
//    }
//
//    @Test
//    void shouldReturnEntityWhenMapEditDtoToEntity() {
//        when(contractMapper.mapDtoToEntity(contractDto))
//                .thenReturn(contract);
//        assertThat(mapper.mapEditDtoToEntity(editDto))
//                .isEqualTo(editInstallment);
//    }
//
//    @Test
//    void shouldReturnDtoWhenMapGetEntityToDto() {
//        when(contractMapper.mapGetEntityToDto(contract))
//                .thenReturn(contractDto);
//        assertThat(mapper.mapGetEntityToDto(editInstallment))
//                .isEqualTo(editDto);
//    }
}
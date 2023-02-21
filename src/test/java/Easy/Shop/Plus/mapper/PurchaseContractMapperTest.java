package Easy.Shop.Plus.mapper;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.dto.PurchaseContractDto;
import Easy.Shop.Plus.entity.Customer;
import Easy.Shop.Plus.entity.Installment;
import Easy.Shop.Plus.entity.PurchaseContract;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.util.ArrayList;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PurchaseContractMapperTest {

    PurchaseContractMapper mapper;
    PurchaseContract entity;
    PurchaseContractDto dto;
    Customer customer;
    CustomerDto customerDto;
    @Mock
    CustomerMapper customerMapper;

    @BeforeEach
    void setUp() {
        mapper = new PurchaseContractMapper(customerMapper);
        customer = new Customer(
                1L,
                "Mrdjen",
                "Simo",
                "0206970850101",
                "Yr",
                "0205",
                "Zrenjanin PU",
                "dr.sizni@gmail.com",
                "0631030260");
        customerDto = new CustomerDto(
                1L,
                "Mrdjen",
                "Simo",
                "0206970850101",
                "Yr",
                "0205",
                "Zrenjanin PU",
                "dr.sizni@gmail.com",
                "0631030260");
        entity = new PurchaseContract(
                1l,
                customer,
                100.00,
                50.00,
                LocalDate.now(),
                new ArrayList<Installment>());
        dto = new PurchaseContractDto(
                1l,
                customerDto,
                100.00,
                50.00,
                LocalDate.now(),
                new ArrayList<InstallmentDto>());
    }

    @Test
    void shouldReturnEntityWhenMapCreateDtoToEntity() {
        when(customerMapper.mapEditCustomerDtoToEntity(customerDto))
                .thenReturn(customer);
        entity.setId(null);
        entity.setInstallments(null);
        assertThat(mapper.mapCreateDtoToEntity(dto))
                .isEqualTo(entity);
    }
}
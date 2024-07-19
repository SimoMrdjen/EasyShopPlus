package Easy.Shop.Plus.mapper;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.entity.Customer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class CustomerMapperTest {

    CustomerMapper customerMapper;
    Customer customer;
    CustomerDto customerDto;

    @BeforeEach
    void setUp() {
        customerMapper = new CustomerMapper();
        customer = new Customer(1L,
                "Mrdjen",
                "Simo",
                "0206970850101",
                "Yr",
                "0205",
                "Zrenjanin PU",
                "dr.sizni@gmail.com",
                "0631030260");
        customerDto = new CustomerDto(1L,
                "Mrdjen",
                "Simo",
                "0206970850101",
                "Yr",
                "0205",
                "Zrenjanin PU",
                "dr.sizni@gmail.com",
                "0631030260");
    }

    @Test
    void shouldReturnEntityWhenMapEditCustomerDtoToEntity() {
        assertThat(customerMapper.mapEditCustomerDtoToEntity(customerDto))
                .isEqualTo(customer);
    }

    @Test
    void shouldReturnEntityWhenMapCreateCustomerDtoToEntity() {
        customer.setId(null);
        customerDto.setId(null);
        assertThat(customerMapper.mapCreateCustomerDtoToEntity(customerDto))
                .isEqualTo(customer);
    }

    @Test
    void shouldReturnDtoWhenMapEntityToCustomerDto() {
        assertThat(customerMapper.mapEntityToCustomerDto(customer))
                .isEqualTo(customerDto);
    }
}

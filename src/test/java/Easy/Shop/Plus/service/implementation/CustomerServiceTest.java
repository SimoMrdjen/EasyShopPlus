package Easy.Shop.Plus.service.implementation;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.entity.Customer;
import Easy.Shop.Plus.mapper.CustomerMapper;
import Easy.Shop.Plus.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class CustomerServiceTest {
    
    @Mock
    CustomerMapper mapper;
    @Mock
    CustomerRepository repository;
    private CustomerService service;
    private Customer customer;
    private CustomerDto customerDto;
    private CustomerDto customerDtoIdNull;
    private final String CUSTOMER_NOT_FOUND = "Customer not found";
    private Customer customerIdNull;

    @BeforeEach
    void setUp() {
        service = new CustomerService(repository, mapper);
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
        customerIdNull = new Customer(
                null,
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
        customerDtoIdNull =  new CustomerDto(
                "Mrdjen",
                "Simo",
                "0206970850101",
                "Yr",
                "0205",
                "Zrenjanin PU",
                "dr.sizni@gmail.com",
                "0631030260");;
    }

    @Test
    void shouldGetCustomerIfExist() throws Exception {
        when(repository.findById(1L))
                .thenReturn(Optional.ofNullable(customer));
        when(mapper.mapEntityToCustomerDto(customer))
                .thenReturn(customerDto);
        assertThat(service.getCustomer(1L))
                .isEqualTo(customerDto);
    }

    @Test
    void shouldThrowNotFoundExWhenGetCustomerIfNotExist() {
        when(repository.findById(anyLong()))
                .thenReturn(Optional.empty());
        assertThatExceptionOfType(Exception.class)
                .isThrownBy(() -> service.getCustomer(anyLong()))
                .withMessage(CUSTOMER_NOT_FOUND);
    }

    @Test
    void shouldGetCustomers() {
        when(repository.findAll())
                .thenReturn(List.of(customer));
        when(mapper.mapEntityToCustomerDto(customer))
                .thenReturn(customerDto);
        assertThat(service.getAllCustomers())
                .isEqualTo(List.of(customerDto));
    }

    @Test
    void shouldCreateCustomer() throws Exception {
        when(mapper.mapEntityToCustomerDto(customer))
                .thenReturn(customerDto);
        when(mapper.mapCreateCustomerDtoToEntity(customerDtoIdNull))
                .thenReturn(customerIdNull);
        when(repository.save(customerIdNull))
                .thenReturn(customer);
        when(repository.findByJmbg(customer.getJmbg()))
                .thenReturn(Optional.empty());
        assertThat(service.createCustomer(customerDtoIdNull))
                .isEqualTo(customerDto);    }

    @Test
    void shouldUpdateCustomerWhenExist() throws Exception {
        when(mapper.mapEditCustomerDtoToEntity(customerDto))
                .thenReturn(customer);
        when(repository.findById(anyLong()))
                .thenReturn(Optional.of(customer));
        when(repository.save(customer))
                .thenReturn( customer);
        when(mapper.mapEntityToCustomerDto(customer))
                .thenReturn(customerDto);
        assertThat(service.updateCustomer(customerDto, anyLong()))
                .isEqualTo(customerDto);
    }

    @Test
    void shouldThrowNotFoundExWhenUpdateCustomerIfNotExist() throws Exception {
        when(repository.findById(anyLong()))
                .thenReturn(Optional.empty());
        assertThatExceptionOfType(Exception.class)
                .isThrownBy(() -> {service.updateCustomer(customerDto,anyLong());})
                .withMessage(CUSTOMER_NOT_FOUND);
    }

    @Test
    void shouldThrowNotFoundExWhenDeleteCustomerIfNotExist(){
        when(repository.findById(1L))
                .thenReturn(Optional.empty());
        assertThatExceptionOfType(Exception.class)
                .isThrownBy(() -> {service.deleteCustomer(1L);})
                .withMessage(CUSTOMER_NOT_FOUND);

    }
}

package Easy.Shop.Plus.service.interfaces;

import Easy.Shop.Plus.dto.CustomerDto;

import java.util.List;

public interface ICustomerService {
    List<CustomerDto> getAllCustomers();

    CustomerDto getCustomer(Long id) throws Exception;

    List<CustomerDto> getCustomersLike(String lastNameLike);

    CustomerDto createCustomer(CustomerDto customerDto) throws Exception;

    CustomerDto updateCustomer(CustomerDto customerDto, Long id) throws Exception;

    void deleteCustomer(Long id) throws Exception;
}

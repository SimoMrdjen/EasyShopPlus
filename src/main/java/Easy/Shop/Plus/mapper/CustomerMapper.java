package Easy.Shop.Plus.mapper;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.entity.Customer;
import org.springframework.stereotype.Component;


@Component
public class CustomerMapper {
    public Customer mapEditCustomerDtoToEntity(CustomerDto customerDto) {
        return new Customer(customerDto.getId(),
                customerDto.getLastName(),
                customerDto.getFirstName(),
                customerDto.getJmbg(),
                customerDto.getAddress(),
                customerDto.getBrLK(),
                customerDto.getPu(),
                customerDto.getEmail(),
                customerDto.getPhoneNumber()
        );
    }

    public Customer mapCreateCustomerDtoToEntity(CustomerDto customerDto) {
        return new Customer(
                customerDto.getLastName(),
                customerDto.getFirstName(),
                customerDto.getJmbg(),
                customerDto.getAddress(),
                customerDto.getBrLK(),
                customerDto.getPu(),
                customerDto.getEmail(),
                customerDto.getPhoneNumber()
        );
    }
    public CustomerDto mapEntityToCustomerDto(Customer customer) {
        return new CustomerDto(customer.getId(),
                customer.getLastName(),
                customer.getFirstName(),
                customer.getJmbg(),
                customer.getAddress(),
                customer.getBrLK(),
                customer.getPu(),
                customer.getEmail(),
                customer.getPhoneNumber());
    }
}


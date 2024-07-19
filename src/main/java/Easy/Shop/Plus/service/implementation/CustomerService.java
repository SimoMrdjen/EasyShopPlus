package Easy.Shop.Plus.service.implementation;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.entity.Customer;
import Easy.Shop.Plus.mapper.CustomerMapper;
import Easy.Shop.Plus.repository.CustomerRepository;
import Easy.Shop.Plus.service.interfaces.ICustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Component
@RequiredArgsConstructor
public class CustomerService implements ICustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final String CUSTOMER_NOT_FOUND = "Customer not found";
    @Override
    public List<CustomerDto> getAllCustomers() {

        return customerRepository
                .findAll()
                .stream()
                .map(customerMapper::mapEntityToCustomerDto)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDto getCustomer(Long id) throws Exception {
        return customerMapper.mapEntityToCustomerDto(customerRepository
                .findById(id)
                .orElseThrow(() -> new Exception(CUSTOMER_NOT_FOUND)));
    }

    @Override
    public List<CustomerDto> getCustomersLike(String lastNameLike) {
        return customerRepository
                .findByLastNameContainingIgnoreCase(lastNameLike)
                .stream()
                .map(customerMapper::mapEntityToCustomerDto)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDto createCustomer(CustomerDto customerDto) throws Exception {
        if (!customerRepository.findByJmbg(customerDto.getJmbg()).isEmpty())
        {
            throw new Exception("Customer with same JMBG exists yet!!!!");
        }
        Customer customer = customerRepository
                .save(customerMapper.mapCreateCustomerDtoToEntity((customerDto)));
        return customerMapper.mapEntityToCustomerDto(customer);
    }

    @Override
    public CustomerDto updateCustomer(CustomerDto customerDto, Long id) throws Exception {
        customerRepository.findById(id).orElseThrow(
                () -> new Exception(CUSTOMER_NOT_FOUND));

        Customer customer = customerRepository.save(customerMapper.mapEditCustomerDtoToEntity(customerDto));
        return customerMapper.mapEntityToCustomerDto(customer);
    }

    @Override
    public void deleteCustomer(Long id) throws Exception {
        if (customerRepository.findById(id).isEmpty()) {
            throw new Exception(CUSTOMER_NOT_FOUND);
        }
        customerRepository.deleteById(id);

    }
}

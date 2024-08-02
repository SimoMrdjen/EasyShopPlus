package Easy.Shop.Plus.controller;

import Easy.Shop.Plus.dto.CustomerDto;
import Easy.Shop.Plus.service.implementation.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<CustomerDto> getAllCustomers(@RequestParam(required = false) String lastName) {
        if (lastName != null) {
            return customerService.getCustomersLike(lastName);
        } else {
            return customerService.getAllCustomers();
        }
    }

    @GetMapping(value = "/{id}")
    public CustomerDto getCustomer(@PathVariable(name = "id")Long id) throws Exception {
        return customerService
                .getCustomer(id);
    }

//    @GetMapping("/{lastNameLike}")
//    public List<CustomerDto> getCustomerByLastNameLike(@PathVariable(name = "lastNameLike")String lastNameLike) {
//        return customerService
//                .getCustomersLike(lastNameLike);
//    }

    @PostMapping
    public CustomerDto addCustomer(@Valid @RequestBody CustomerDto customerDto) throws Exception {
        return customerService
                .createCustomer(customerDto);
    }

    @PutMapping(value = "/{id}")
    public CustomerDto updateCustomer(@RequestBody CustomerDto customerDto,
                                      @PathVariable(name = "id") Long id) throws Exception {
        return customerService
                .updateCustomer(customerDto,id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteCustomer(@PathVariable(name = "id") Long id) throws Exception {
        customerService
                .deleteCustomer(id);
    }
}

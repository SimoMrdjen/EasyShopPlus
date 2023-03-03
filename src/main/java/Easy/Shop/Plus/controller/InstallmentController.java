package Easy.Shop.Plus.controller;

import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.service.implementation.InstallmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping(value = "/api/installments")
@RestController
public class InstallmentController {

    private final InstallmentService service;

    @GetMapping
    public List<InstallmentDto> getInstallments() {
        return service
                .getAll();
    }

    @GetMapping(value = "{id}")
    public InstallmentDto getInstallment(@PathVariable(name = "id") Long id) throws Exception {
        return service
                .getById(id);
    }

    @GetMapping(value = "/customer/{customerId}")
    public List<InstallmentDto> getAllUnpaidInstallmentsOfCustomer
            (@PathVariable(name = "customerId") Long customerId) {
        return service
                .getUnpaidInstallmentsByCustomerId(customerId);
    }

    @PutMapping(value = "/{id}")
    public InstallmentDto editInstallment(@RequestBody InstallmentDto dto,
                                          @PathVariable(value = "id") Long id) throws Exception {
        return service
                .updateInstallment(dto, id);
    }

}

package Easy.Shop.Plus.controller;

import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.service.implementation.InstallmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping(value = "/api/instalment")
@RestController
public class InstallmentController {

    private final InstallmentService service;

    @GetMapping(value = "/unpaid")
    public List<InstallmentDto> getAllUnpaidInstallmentsOfCustomer
            (@RequestParam(name = "customerId") Long customerId) {
        return service
                .getUnpaidInstallmentsByCustomerId(customerId);
    }

    @GetMapping(value = "/customer")
    public List<InstallmentDto> getAllInstallmentsOfCustomer
            (@RequestParam(name = "customerId") Long customerId) {
        return service
                .getAllInstallmentsByCustomerId(customerId);
    }

    @PutMapping(value = "/{id}")
    public InstallmentDto editInstallment(@RequestBody InstallmentDto dto,
                                          @PathVariable(name = "id") Long id) throws Exception {
        return service
                .updateInstallment(dto, id);
    }

}

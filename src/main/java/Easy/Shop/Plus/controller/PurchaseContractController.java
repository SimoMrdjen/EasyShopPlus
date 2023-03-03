package Easy.Shop.Plus.controller;

import Easy.Shop.Plus.dto.PurchaseContractDto;
import Easy.Shop.Plus.mapper.PurchaseContractMapper;
import Easy.Shop.Plus.service.implementation.PurchaseContractService;
import Easy.Shop.Plus.service.interfaces.IPurchaseContractService;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/contracts")
@RequiredArgsConstructor
public class PurchaseContractController {

    private final PurchaseContractService service;

    @GetMapping(value = "/{id}")
    public PurchaseContractDto getContract(@PathVariable(name = "id") Long id) throws Exception {
        return service
                .getContract(id);
    }

    @GetMapping
    public List<PurchaseContractDto> getContracts() {
        return service
                .getContracts();
    }

    @GetMapping("/customer/{id}")
    public List<PurchaseContractDto> getContractsByCustomerId(@PathVariable(name = "id") Long customerId) {
        return service
                .getContractsByCustomerId(customerId);
    }

    @PostMapping
    public PurchaseContractDto createContract(@Valid @RequestBody PurchaseContractDto contractDto) {
        return service
                .createContract(contractDto);
    }
}

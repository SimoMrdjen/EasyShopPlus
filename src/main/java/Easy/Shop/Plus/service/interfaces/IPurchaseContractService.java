package Easy.Shop.Plus.service.interfaces;

import Easy.Shop.Plus.dto.PurchaseContractDto;

import java.util.List;

public interface IPurchaseContractService {
    PurchaseContractDto getContract(Long id) throws Exception;

    List<PurchaseContractDto> getContracts();

    List<PurchaseContractDto> getContractsByCustomerId(Long customerId);

    PurchaseContractDto createContract(PurchaseContractDto contractDto);
}

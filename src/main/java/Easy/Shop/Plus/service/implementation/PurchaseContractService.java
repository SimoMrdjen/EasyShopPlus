package Easy.Shop.Plus.service.implementation;

import Easy.Shop.Plus.dto.PurchaseContractDto;
import Easy.Shop.Plus.entity.PurchaseContract;
import Easy.Shop.Plus.mapper.PurchaseContractMapper;
import Easy.Shop.Plus.repository.PurchaseContractRepository;
import Easy.Shop.Plus.service.interfaces.IPurchaseContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Component
public class PurchaseContractService implements IPurchaseContractService {
    private final PurchaseContractMapper mapper;
    private final PurchaseContractRepository repo;
    private final InstallmentService installmentService;
    private final String CONTRACT_NOT_FOUND = "Contract not found";

    @Override
    public PurchaseContractDto getContract(Long id) throws Exception {
        return mapper.mapGetEntityToDto(repo.findById(id)
                .orElseThrow(() -> new Exception(CONTRACT_NOT_FOUND)));
    }

    @Override
    public List<PurchaseContractDto> getContracts() {
        return repo
                .findAll()
                .stream()
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PurchaseContractDto> getContractsByCustomerId(Long customerId) {
        return repo
                .findByCustomerId(customerId)
                .stream()
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseContractDto createContract(PurchaseContractDto contractDto) {
        PurchaseContract contractCreated =
                repo.save(mapper.mapCreateDtoToEntity(contractDto));
        PurchaseContractDto dto = mapper.mapGetEntityToDto(contractCreated);

        dto.setInstallments(installmentService.createInstallments(contractCreated,
                            contractDto.getNextInstalmentDate()));
        return dto;
    }
}

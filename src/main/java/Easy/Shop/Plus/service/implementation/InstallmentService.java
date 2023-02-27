package Easy.Shop.Plus.service.implementation;

import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.mapper.InstallmentMapper;
import Easy.Shop.Plus.repository.InstallmentRepository;
import Easy.Shop.Plus.service.interfaces.IInstallmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Component
public class InstallmentService implements IInstallmentService {

    private final InstallmentRepository repository;
    private final InstallmentMapper mapper;
    private final String INSTALLMENT_NOT_FOUND = "Installment not found";

    @Override
    public List<InstallmentDto> getAll() {
        return repository
                .findAll()
                .stream()
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public InstallmentDto getById(Long id) throws Exception {
        var installment = repository
                .findById(id)
                .orElseThrow(() -> new Exception(INSTALLMENT_NOT_FOUND));
        return mapper
                .mapGetEntityToDto(installment);
    }

    @Override
    public List<InstallmentDto> getInstallmentsByCustomerId(Long customerId) {
        return null;
    }

    @Override
    public List<InstallmentDto> getUnpaidInstallmentsByCustomerId(Long customerId) {
        return repository
                .findAllByPurchaseContractCustomerId(customerId)
                .stream()
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public InstallmentDto updateInstallment(InstallmentDto dto, Long id) throws Exception {
        if (!repository.existsById(id)) {
            throw new Exception(INSTALLMENT_NOT_FOUND);
        }
        var installment = mapper.mapEditDtoToEntity(dto);
       return mapper.mapGetEntityToDto(repository.save(installment));
    }
}


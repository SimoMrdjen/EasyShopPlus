package Easy.Shop.Plus.service.implementation;

import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.entity.Installment;
import Easy.Shop.Plus.entity.InstallmentOrdinal;
import Easy.Shop.Plus.entity.PurchaseContract;
import Easy.Shop.Plus.mapper.InstallmentMapper;
import Easy.Shop.Plus.repository.InstallmentRepository;
import Easy.Shop.Plus.service.interfaces.IInstallmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

        return repository
                .findAllByPurchaseContractCustomerId(customerId)
                .stream()
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());

    }

    @Override
    public List<InstallmentDto> getUnpaidInstallmentsByCustomerId(Long customerId) {
        return repository
                .findAllByPurchaseContractCustomerId(customerId)
                .stream()
                .filter(i -> i.getPaidAmount() == null)
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public InstallmentDto updateInstallment(InstallmentDto dto, Long id) throws Exception {
        Installment installment = repository
                .findById(id)
                .orElseThrow(() -> new Exception(INSTALLMENT_NOT_FOUND));
        Installment saved = repository.save(mapper.mapPutDtoToEntity(dto, installment));
        return mapper
                .mapGetEntityToDto(saved);
    }


    @Override
    public List<InstallmentDto> createInstallments(PurchaseContract contractCreated, LocalDate nextInstalmentDate) {
        Double installmentAmount = contractCreated.getInstallmentAmount();
        List<Installment> installments =
                List.of(
                        new Installment(contractCreated, InstallmentOrdinal.FIRST, installmentAmount,
                               nextInstalmentDate ),
                        new Installment(contractCreated, InstallmentOrdinal.SECOND, installmentAmount,
                               nextInstalmentDate.plusMonths(1) ),
                        new Installment(contractCreated, InstallmentOrdinal.THIRD, installmentAmount,
                                nextInstalmentDate.plusMonths(2) )
                        );
        return repository
                .saveAll(installments)
                .stream()
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());
    }

    public List<InstallmentDto> getAllInstallmentsByCustomerId(Long customerId) {
        return repository
                .findAllByPurchaseContractCustomerId(customerId)
                .stream()
                .map(mapper::mapGetEntityToDto)
                .collect(Collectors.toList());
    }
}


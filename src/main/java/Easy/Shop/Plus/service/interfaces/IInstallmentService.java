package Easy.Shop.Plus.service.interfaces;

import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.entity.PurchaseContract;

import java.time.LocalDate;
import java.util.List;

public interface IInstallmentService {
    List<InstallmentDto> getAll();

    InstallmentDto getById(Long id) throws Exception;

    List<InstallmentDto> getInstallmentsByCustomerId(Long customerId);

    List<InstallmentDto> getUnpaidInstallmentsByCustomerId(Long customerId);

    InstallmentDto updateInstallment(InstallmentDto dto, Long id) throws Exception;

    List<InstallmentDto> createInstallments(PurchaseContract contractCreated, LocalDate nextInstalmentDate);
}

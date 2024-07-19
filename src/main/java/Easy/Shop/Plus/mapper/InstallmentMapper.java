package Easy.Shop.Plus.mapper;

import Easy.Shop.Plus.dto.InstallmentDto;
import Easy.Shop.Plus.entity.Installment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InstallmentMapper {

    private final PurchaseContractMapper mapper;

    public Installment mapCreateDtoToEntity(InstallmentDto dto) {
        return new Installment(
                mapper.mapDtoToEntity(dto.getPurchaseContractDto()),
                dto.getInstallmentOrdinal(),
                dto.getInstallmentAmount(),
                dto.getMaturityDate()
        );
    }

    public Installment mapEditDtoToEntity(InstallmentDto dto) {
        return new Installment(
                dto.getId(),
                mapper.mapDtoToEntity(dto.getPurchaseContractDto()),
                dto.getInstallmentOrdinal(),
                dto.getInstallmentAmount(),
                dto.getMaturityDate(),
                dto.getPaidAmount(),
                dto.getPaymentDate(),
                dto.getPaymentMethod()
        );
    }

    public InstallmentDto mapGetEntityToDto(Installment installment) {
        return new InstallmentDto(
                installment.getId(),
                mapper.mapGetEntityToDto(installment.getPurchaseContract()),
                installment.getInstallmentOrdinal(),
                installment.getInstallmentAmount(),
                installment.getMaturityDate(),
                installment.getPaidAmount(),
                installment.getPaymentDate(),
                installment.getPaymentMethod());
    }
}

package Easy.Shop.Plus.mapper;


import Easy.Shop.Plus.dto.PurchaseContractDto;
import Easy.Shop.Plus.entity.PurchaseContract;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

//@NoArgsConstructor
//@AllArgsConstructor
@Component
@RequiredArgsConstructor
public class PurchaseContractMapper {

    private final CustomerMapper customerMapper;

    public PurchaseContract mapCreateDtoToEntity(PurchaseContractDto dto) {
        return new PurchaseContract(
                customerMapper.mapEditCustomerDtoToEntity(dto.getCustomer()),
                dto.getContractAmount(),
                dto.getParticipation(),
                dto.getContractDate()
        );
    }

    public PurchaseContract mapDtoToEntity(PurchaseContractDto dto) {
        return new PurchaseContract(
                dto.getId(),
                customerMapper.mapEditCustomerDtoToEntity(dto.getCustomer()),
                dto.getContractAmount(),
                dto.getParticipation(),
                dto.getContractDate()
        );
    }

    public PurchaseContractDto mapGetEntityToDto(PurchaseContract contract) {
        return new PurchaseContractDto(
                contract.getId(),
                customerMapper.mapEntityToCustomerDto(contract.getCustomer()),
                contract.getContractAmount(),
                contract.getParticipation(),
                contract.getContractDate(),
                 null
//                new ArrayList<InstallmentDto>()
        );
    }
}

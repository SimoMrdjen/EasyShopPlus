package Easy.Shop.Plus.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class PurchaseContractDto {
    private Long id;
    @NotNull
    private CustomerDto customer;
    @NotNull
    private Double contractAmount;
    @NotNull
    private Double participation;
    @NotNull
    private LocalDate contractDate = LocalDate.now();

    private LocalDate nextInstalmentDate = LocalDate.now();

    private List<InstallmentDto> installments;

    public PurchaseContractDto(Long id, CustomerDto customer, Double contractAmount, Double participation, LocalDate contractDate, LocalDate nextInstalmentDate) {
        this.id = id;
        this.customer = customer;
        this.contractAmount = contractAmount;
        this.participation = participation;
        this.contractDate = contractDate;
        this.nextInstalmentDate = nextInstalmentDate;
    }
}

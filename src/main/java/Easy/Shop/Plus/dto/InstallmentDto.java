package Easy.Shop.Plus.dto;

import Easy.Shop.Plus.entity.InstallmentOrdinal;
import Easy.Shop.Plus.entity.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class InstallmentDto {

    private Long id;
    @NotNull
    private PurchaseContractDto purchaseContractDto;
    @NotNull
    private InstallmentOrdinal installmentOrdinal;
    @NotNull
    private Double installmentAmount;
    @NotNull
    private LocalDate maturityDate;
    private Double paidAmount;
    private LocalDate paymentDate;
    private PaymentMethod paymentMethod;
}

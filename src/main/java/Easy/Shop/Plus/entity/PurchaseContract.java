package Easy.Shop.Plus.entity;

import Easy.Shop.Plus.dto.CustomerDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name = "purchase_contract")
//@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
public class PurchaseContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY, cascade= MERGE)
    @JoinColumn(name="customer_id", referencedColumnName = "id")
    private Customer customer;

    @Column(name = "contract_amount", nullable = false)
    private Double contractAmount;

    @Column(name = "participation", nullable = false)
    private Double participation;

    @Column(name = "contract_date", nullable = false)
    private LocalDate contractDate;

    @JsonIgnore
    @OneToMany(mappedBy="purchaseContract", cascade= ALL)//,
            //fetch = EAGER, orphanRemoval = true)
    private List<Installment> installments;

    public PurchaseContract(Customer customer,
                            Double contractAmount,
                            Double participation,
                            LocalDate contractDate
                            // List<Installment> installments
    ) {
        this.customer = customer;
        this.contractAmount = contractAmount;
        this.participation = participation;
        this.contractDate = contractDate;
        // this.installments = installments;
    }

    public PurchaseContract(Long id, Customer customer, Double contractAmount,
                            Double participation, LocalDate contractDate) {
        this.id = id;
        this.customer = customer;
        this.contractAmount = contractAmount;
        this.participation = participation;
        this.contractDate = contractDate;
    }

    public Double getInstallmentAmount() {
        return (this.contractAmount - this.participation) / 3;
    }
}
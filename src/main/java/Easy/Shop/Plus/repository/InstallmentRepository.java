package Easy.Shop.Plus.repository;

import Easy.Shop.Plus.entity.Installment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstallmentRepository extends JpaRepository<Installment, Long> {
    List<Installment> findAllByPurchaseContract_Id(Long id);
    List<Installment> findAllByPurchaseContractCustomerId(Long id);
}

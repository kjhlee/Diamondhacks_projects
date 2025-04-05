package bapp.budget_backend.services;
import bapp.budget_backend.models.Income;
import bapp.budget_backend.models.enums.Frequency;
import bapp.budget_backend.repository.IncomeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Scheduled(cron = "0 0 0 * * ?") //runs everyday at midnight
    public void processRecurringIncomes(){
        List<Income> allIncomes = incomeRepository.findAll();

        for(Income income : allIncomes) {
            if(income.isRecurring() && !income.getNextPaymentDate().isAfter(LocalDate.now())){
                //create new income entry (non recurring) to represent today;s income

                Income transaction = new Income();

                transaction.setAmount(income.getAmount());
                transaction.setUser(income.getUser());
                transaction.setRecurring(false);
                transaction.setStartDate(LocalDate.now());

                incomeRepository.save(transaction);

                //update next payment date
                LocalDate updatedNextDate = getNextPaymentDate(income.getNextPaymentDate(), income.getFrequency());
                income.setNextPaymentDate(updatedNextDate);
                incomeRepository.save(income);
            }
        }
    }
    //sets next payment date based on frequency 
    private LocalDate getNextPaymentDate(LocalDate current, Frequency frequency){
        return switch(frequency){
            case WEEKLY -> current.plusWeeks(1);
            case BIWEEKLY -> current.plusWeeks(2);
            case MONTHLY -> current.plusMonths(1);
            case ANNUALLY -> current.plusYears(1);
        };
    }

    //to initialize new income
    public void addIncome(Income income){
        if(income.isRecurring()){
            income.setNextPaymentDate(income.getStartDate());
        }
        incomeRepository.save(income);
    }
}

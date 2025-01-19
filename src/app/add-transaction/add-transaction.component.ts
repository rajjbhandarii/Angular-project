import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-add-transaction',
  imports: [FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css',
})
export class AddTransactionComponent {
  date: any = '';
  description: string = 'example';
  amount: number = 1000;
  category: any = 'Income';

  constructor(private transactionService: TransactionService,) { }

  submit() {
    const newTransaction = {
      date: this.date,
      description: this.description,
      amount: this.amount,
      category: this.category,
    };
    this.transactionService.addTransaction(newTransaction);


    // alert('Transaction added successfully!');
    // Reset form fields
    // this.date = '';
    // this.description = '';
    // this.amount = 0;
    // this.category = '';
  }
}

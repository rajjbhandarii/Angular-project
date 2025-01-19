import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashboardComponent implements OnInit {
  totalIncome: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;
  recentTransactions: any[] = [];
  transactions: any[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.calculateTotalIncome();
    this.fetchRecentTransactions();
  }
  calculateTotalIncome() {
    const transactions = this.transactionService.getTransactions();
    this.totalIncome = transactions
      .filter((t) => t.category === 'Income') // "t" represent incoming transaction
      .reduce((sum, t) => sum + t.amount, 0);
    this.totalExpenses = transactions
      .filter((t) => t.category === 'Expenses') // "t" represent incoming transaction
      .reduce((sum, t) => sum + t.amount, 0);
    this.balance = this.totalIncome - this.totalExpenses;
  }

  fetchRecentTransactions() {
    const transactions = this.transactionService.getTransactions();
    this.recentTransactions = transactions.slice(-5).reverse();
  }
}

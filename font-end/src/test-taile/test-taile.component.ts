import { Component } from '@angular/core';

@Component({
  selector: 'app-test-taile',
  imports: [],
  templateUrl: './test-taile.component.html',
  styleUrl: './test-taile.component.scss'
})
export class TestTaileComponent {
  summaryCards = [
    {
      title: 'Total balance',
      value: '$24,500',
      change: '+12% this month',
    },
    {
      title: 'Income',
      value: '$8,200',
      change: '+8% this month',
    },
    {
      title: 'Expenses',
      value: '$3,400',
      change: '+4% this month',
    },
    {
      title: 'Transactions',
      value: '128',
      change: '+15 this month',
    },
  ];

  transactions = [
    {
      id: 1,
      description: 'Office supplies',
      date: '2026-11-15',
      amount: '$250',
      status: 'Completed',
    },
    {
      id: 2,
      description: 'Internet bill',
      date: '2026-11-14',
      amount: '$80',
      status: 'Pending',
    },
    {
      id: 3,
      description: 'Client payment',
      date: '2026-11-13',
      amount: '$1,500',
      status: 'Completed',
    },
    {
      id: 4,
      description: 'Equipment',
      date: '2026-11-12',
      amount: '$700',
      status: 'Pending',
    },
  ];
}

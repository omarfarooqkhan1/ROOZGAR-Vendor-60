import DashboardOption from '../models/DashboardOption';
import Appointment from '../models/Appointment';
import Payment from '../models/Payment';

export const APPOINTMENTS = [
  new Appointment(
    'a1',
    'c',
    'v1',
    's1',
    '14/3/2021',
    '18:30',
    'Ongoing'
  ),
  new Appointment(
    'a2',
    'c1',
    'v1',
    's1',
    '15/3/2021',
    '18:30',
    'Completed'
  )
];

export const PAYMENTS = [
  new Payment(
    'p1',
    'c1',
    'v1',
    'a1',
    '14/3/2021',
    '18:30',
    '800'
  ),
  new Payment(
    'p2',
    'c2',
    'v2',
    'a2',
    '15/3/2021',
    '22:30',
    '1500'
  )
];

export const DASHBOARDOPTIONS = [
  new DashboardOption('d1', 'My Services', "handyman"),
  new DashboardOption('d2', 'Appointments', "book-online"),
  new DashboardOption('d3', 'Payments', "payments"),
  new DashboardOption('d4', 'Help & Support', "support-agent"),
  new DashboardOption('d5', 'My Profile', "account-box"),
  new DashboardOption('d6', 'Settings', "settings"),
];
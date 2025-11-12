import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";

export const navigationLinks = [
    { id: 1, title: 'Dashboard', image: iconsImgs.home, path: '/' },
    { id: 2, title: 'Users', image: iconsImgs.user, path: '/users' },
    { id: 3, title: 'Charts', image: iconsImgs.report, path: '/charts'},
    { id: 4, title: 'AI Insights', image: iconsImgs.budget, path: '/ai-insights' },
    { id: 5, title: 'Help Center', image: iconsImgs.wealth , path: '/help'},
    { id: 6, title: 'Settings', image: iconsImgs.gears , path: '/settings' },
    { id: 7, title: 'Logout', image: iconsImgs.logout, path: '/logout',className: 'white_btn', style: { width: '70px' } } 
    
];

export const transactions = [
    {
        id: 1, 
        name: "Sarah Parker",
        image: personsImgs.person_four,
        date: "23/12/04",
        amount: 2200000
    },
    {
        id: 2, 
        name: "Krisitine Carter",
        image: personsImgs.person_three,
        date: "23/07/21",
        amount: 20000
    },
  
    
];

export const reportData = [
    {
        id: 3,
        month: "Jan",
        value1: 45,
        value2: null
    },
    {
        id: 4,
        month: "Feb",
        value1: 45,
        value2: 60
    },
    {
        id: 6,
        month: "Mar",
        value1: 45,
        value2: null
    },
    {
        id: 17,
        month: "Apr",
        value1: 45,
        value2: null
    },
    {
        id: 18,
        month: "May",
        value1: 45,
        value2: null
    }
];

export const budget = [
    {
        id: 19, 
        title: "Subscriptions",
        type: "Automated",
        amount: 22000
    },
    {
        id: 20, 
        title: "Loan Payment",
        type: "Automated",
        amount: 16000
    },
    {
        id: 21, 
        title: "Foodstuff",
        type: "Automated",
        amount: 20000
    },
    {
        id: 22, 
        title: "Subscriptions",
        type: null,
        amount: 10000
    },
    {
        id: 23, 
        title: "Subscriptions",
        type: null,
        amount: 40000
    }
];

export const subscriptions = [
    {
        id: 24,
        title: "LinkedIn",
        due_date: "23/12/04",
        amount: 20000
    },
    {
        id: 25,
        title: "Netflix",
        due_date: "23/12/10",
        amount: 5000
    },
    {
        id: 26,
        title: "DSTV",
        due_date: "23/12/22",
        amount: 2000
    }
];

export const savings = [
    {
        id: 27,
        image: personsImgs.person_one,
        saving_amount: 250000,
        title: "Pay kid bro’s fees",
        date_taken: "23/12/22",
        amount_left: 40000
    }
]
import {BarChart as BarChartIcon, ShoppingBag as ShoppingBagIcon, Users as UsersIcon} from "react-feather";

const items = [
    {
        href: '/app/dashboard',
        icon: BarChartIcon,
        title: 'navbar.dashboard'
    },
    {
        href: '/app/module1',
        icon: UsersIcon,
        title: 'navbar.module1'
    },
    {
        href: '/app/module2',
        icon: ShoppingBagIcon,
        title: 'navbar.module2'
    }
    , {
        href: '/app/group',
        icon: ShoppingBagIcon,
        title: 'navbar.group'
    },
     {
        href: '/app/todoList',
        icon: ShoppingBagIcon,
        title: 'navbar.todoList'
    }
];

export default items;
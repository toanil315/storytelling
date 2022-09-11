import UkIcon from 'src/components/icons/UkIcon';
export interface RouteItem {
    title: string;
    path: string;
    Icon: any;
}

export const Languages = [
    {
        key: 'en',
        icon: UkIcon,
        text: 'English'
    },
    {
        key: 'vi',
        icon: UkIcon,
        text: 'Vietnamese'
    }
]
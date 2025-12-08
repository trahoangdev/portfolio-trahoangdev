export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
    imageUrl?: string;
    skills: string[];
}

export const CERTIFICATES: Certificate[] = [
    {
        id: 'javascript-essentials-1',
        title: 'JavaScript Essentials 1',
        issuer: 'Cisco',
        date: '2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/6ee97492-ca75-42e1-a339-769555eccdc7',
        imageUrl: '/certificates/javascript-essentials-1.png',
        skills: ['JavaScript Basics', 'Data Types', 'Control Flow', 'Functions'],
    },
    {
        id: 'javascript-essentials-2',
        title: 'JavaScript Essentials 2',
        issuer: 'Cisco',
        date: '2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/f5c59681-9898-4590-9393-7010bf8df381',
        imageUrl: '/certificates/javascript-essentials-2.png',
        skills: ['ES6+', 'OOP', 'Asynchronous Programming', 'DOM'],
    },
    {
        id: 'networking-basics',
        title: 'Networking Basics',
        issuer: 'Cisco',
        date: '2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/33f3b395-12cd-42aa-a6f3-4d03ff4c8300',
        imageUrl: '/certificates/networking-basics.png',
        skills: ['Network Protocols', 'TCP/IP', 'OSI Model', 'Network Security'],
    },
    {
        id: 'aws-cloud-security-foundations',
        title: 'AWS Academy Graduate - Cloud Security Foundations',
        issuer: 'AWS Academy',
        date: '2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/7847003f-5dda-43ff-9de2-7f5e92f65339',
        imageUrl: '/certificates/aws-academy-graduate-cloud-security-foundations.png',
        skills: ['Cloud Security', 'AWS', 'Risk Management', 'Compliance'],
    },
];

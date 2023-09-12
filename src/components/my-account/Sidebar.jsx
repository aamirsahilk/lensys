import React, {useState, useEffect} from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Avatar
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {usePathname, useSearchParams} from 'next/navigation'

import face from '../../../public/images/face-2.jpg'
import { useSelector } from "react-redux";

export default function Sidebar({link, setLink}) {
    // const [open, setOpen] = useState(0);
    const userData = useSelector(state=>state.userData.value);
    var path = usePathname()
    const isActive = (pathname) => {
        return path === pathname ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : '';
    };

    // const handleOpen = (value) => {
    //     setOpen(open === value ? 0 : value);
    // };

    return (
        <Card className=" h-[calc(100vh-2rem)] sticky top-16 w-full p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        {/* <Avatar src={face.src} alt="avatar" /> */}
                        <div>
                            <Typography variant="h6">{userData.name}</Typography>
                            <Typography variant="small" color="gray" className="font-normal">{userData.email}</Typography>
                        </div>
                    </div>
                </div>
            </div>
            <List>
                {/* <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Dashboard
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Analytics
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Reporting
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Projects
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion> */}
            
                <Link href="/my-account">
                    <ListItem className={`${isActive('/my-account')}`}>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            My Account
                    </ListItem>
                </Link>
                <Link href="/my-account/orders">
                    <ListItem className={`${isActive('/my-account/orders')}`}>
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            My Orders
                    </ListItem>
                </Link>
                {/* <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem> */}
            </List>
        </Card>
    );
}
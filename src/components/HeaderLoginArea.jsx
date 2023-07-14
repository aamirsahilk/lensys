import React, { useState } from 'react'
import person from '../images/person.svg'
import av from '../images/person.png'
import Image from 'next/image'

import Link from 'next/link'

import LogoutIcon from '@mui/icons-material/Logout';
import RedeemIcon from '@mui/icons-material/Redeem';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import LoginImg from '@/images/login-img.png'

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import LoginSigup from './LoginSigup'

import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '@/store/features/userdata/UserDataSlice'

const HeaderLoginArea = () => {
  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value)

  const userData = useSelector((state)=> state.userData.value);
  
  const isLoggedIn = userData.loggedin || false;

  if (!isLoggedIn) {
    return (
      <>
        <button className="header-action-btn header-login-btn" onClick={() => handleOpen("lg")} >
          <Image src={person} width={"50px"} height={"50px"} alt="" />
        </button>
        <Dialog
          open={
            size === "xs" ||
            size === "sm" ||
            size === "md" ||
            size === "lg" ||
            size === "xl" ||
            size === "xxl"
          }
          size={size || "md"}
          handler={handleOpen}
        >
          {/* <DialogHeader></DialogHeader> */}
          <DialogBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <Image src={LoginImg} width={600} height={600} className='w-full h-full object-cover object-center' />
              </div>
              <div className="relative">
                <LoginSigup />
              </div>
            </div>
          </DialogBody>
        </Dialog>
      </>
    )
  } else {
    return (
      <Popover placement="bottom">
        <PopoverHandler>
          <button className="header-action-btn header-login-btn">
            <Image src={person} width={"50px"} height={"50px"} alt="" />
          </button>
        </PopoverHandler>
        <PopoverContent className="w-72 z-50">
          <div className="flex items-center gap-4 border-b border-blue-gray-50 pb-4 mb-4">
            <Avatar src={av.src} alt="candice wu" />
            <div>
              <Typography variant="h6" color="blue-gray">Taha Ratlam Wala</Typography>
              <Typography variant="small" color="gray" className="font-normal">User@1256</Typography>
            </div>
          </div>
          <List className="p-0">
            <Link href="#" className="text-initial">
              <ListItem>
                <ListItemPrefix>
                  <InsertEmoticonIcon />
                </ListItemPrefix>
                My Profile
              </ListItem>
            </Link>
            <Link href="#" className="text-initial">
              <ListItem>
                <ListItemPrefix>
                  <RedeemIcon />
                </ListItemPrefix>
                My Orders
              </ListItem>
            </Link>
            <Link href="#" className="text-initial">
              <ListItem>
                <ListItemPrefix>
                  <LogoutIcon />
                </ListItemPrefix>
                Logout
              </ListItem>
            </Link>
          </List>
        </PopoverContent>
      </Popover>
    )
  }
}

export default HeaderLoginArea
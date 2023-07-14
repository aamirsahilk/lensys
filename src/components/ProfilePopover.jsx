import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import {
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/solid";


const ProfilePopover = () => {
  return (
    <Popover placement="bottom">
    <PopoverHandler>
      <Button>Contact Us</Button>
    </PopoverHandler>
    <PopoverContent className="w-72 z-50">
      <div className="flex items-center gap-4 border-b border-blue-gray-50 pb-4 mb-4">
        <Avatar src="/img/team-4.jpg" alt="candice wu" />
        <div>
          <Typography variant="h6" color="blue-gray">Candice Wu</Typography>
          <Typography variant="small" color="gray" className="font-normal">General Manager</Typography>
        </div>
      </div>
      <List className="p-0">
        <a href="#" className="text-initial">
          <ListItem>
            <ListItemPrefix>
         
            </ListItemPrefix>
            ABC Construction
          </ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>
            <ListItemPrefix>
             
            </ListItemPrefix>
            00 123 456 789
          </ListItem>
        </a>
        <a href="#" className="text-initial">
          <ListItem>
            <ListItemPrefix>
            
            </ListItemPrefix>
            person@example.com
          </ListItem>
        </a>
      </List>
    </PopoverContent>
  </Popover>
  )
}

export default ProfilePopover
 
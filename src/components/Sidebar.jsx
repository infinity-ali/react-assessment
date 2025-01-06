import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = (props) => {
  const { onChildClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      {isMobile ? (
        <div>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              position: "fixed",
              top: 10,
              left: 10,
              zIndex: 1201,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary" // Temporary for mobile
            open={isOpen}
            onClose={toggleSidebar}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
              },
            }}
          >
            <List>
              <ListItem>
                <ListItemText primary="Favorite Projects" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => onChildClick("Project A")}>
                <ListItemText primary="Project A" />
              </ListItem>
              <ListItem button onClick={() => onChildClick("Project B")}>
                <ListItemText primary="Project B" />
              </ListItem>
            </List>
          </Drawer>
        </div>
      ) : (
        <div className="w-56 py-20 items-center border-r-2 border-r-gray-300 h-screen transition-all duration-300 flex flex-col">
          <p className="p-2 text-gray-800 font-bold">Favorite Projects</p>
          <div className="flex flex-col justify-start items-start px-4">
            <ul className="list-disc px-4">
              <li
                className="p-2 text-gray-600 hover:underline text-sm cursor-pointer"
                onClick={() => onChildClick("Project A")}
              >
                Project A
              </li>
              <li
                className="p-2 text-gray-600 hover:underline text-sm cursor-pointer"
                onClick={() => onChildClick("Project B")}
              >
                Project B
              </li>
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Sidebar;

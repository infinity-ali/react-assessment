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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const favorites = useSelector((state) => state.favorites.favorites);

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
            <ul className="list-disc px-4">
              {favorites.map((item) => (
                <li
                  key={item.id}
                  className="p-2 text-gray-600 hover:underline text-sm cursor-pointer"
                  onClick={() =>
                    navigate(`/project/${item.id}`, {
                      state: {
                        data: item,
                      },
                    })
                  }
                >
                  {item.projectName}
                </li>
              ))}
            </ul>
          </Drawer>
        </div>
      ) : (
        <div className="w-56 py-20 items-center border-r-2 border-r-gray-300 h-screen transition-all duration-300 flex flex-col">
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer p-2 text-gray-800 font-bold"
          >
            Favorite Projects
          </p>
          <div className="flex flex-col justify-start items-start px-4">
            <ul className="list-disc px-4">
              {favorites.map((item) => (
                <li
                  key={item.id}
                  className="p-2 text-gray-600 hover:underline text-sm cursor-pointer"
                  onClick={() =>
                    navigate(`/project/${item.id}`, {
                      state: {
                        data: item,
                      },
                    })
                  }
                >
                  {item.projectName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Sidebar;

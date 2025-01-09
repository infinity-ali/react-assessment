import React, { useEffect, useState } from "react";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBookmarkProjects } from "../store/features/bookmarkSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const favorites = useSelector((state) => state.favorites.favorites);
  const { bookmarkProjects, removeBookmarkProject, addBookmarkProject } =
    useSelector((state) => state.bookmark);

  useEffect(() => {
    dispatch(fetchBookmarkProjects());
  }, [removeBookmarkProject, addBookmarkProject]);

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
                    navigate(`/projects/${item.id}`, {
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
            onClick={() => navigate("/projects")}
            className="cursor-pointer p-2 text-gray-800 font-bold"
          >
            Favorite Projects
          </p>
          <div className="flex flex-col justify-start items-start px-4">
            <ul className="list-disc px-4">
              {bookmarkProjects?.data?.map((item) => (
                <li
                  key={item.id}
                  className=" text-gray-600 hover:underline text-sm cursor-pointer font-bold"
                  onClick={() =>
                    navigate(`/projects/${item.id}`, {
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

import React, { useEffect } from "react";
import AddContact from "../AddContact";
import ShowContact from "../ShowContact";
import EditContact from "../EditContact";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setContacts } from "../../redux/contacts";
import { useNavigate } from "react-router-dom";
import { ContactService } from "../../service/ContactService";
import { AuthService } from "../../service/AuthService";
import { DBService } from "../../db/DBService";
import "./style.css";

const MainContent = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getContacts = async () => {
    const userId = await AuthService.checkAuth();
    if (userId) {
      DBService.getContacts(userId).then((contacts) => {
        dispatch(setContacts(contacts));
      });
    } else {
      localStorage.removeItem("sessionToken");
      navigate("/login", { replace: true });
    }
  }

  const fetchContactsFromServer = async () => {
    console.log("fetching contacts");
    const contacts = await ContactService.getContacts();
    dispatch(setContacts(contacts)); // TODO: Use Delta Sync
  };

  useEffect(() => {
    getContacts();
    fetchContactsFromServer();
    const interval = setInterval(fetchContactsFromServer, 600000);

    return () => {
      console.log("clearing interval");
      clearInterval(interval);
    }
  }, []);

  const value = useAppSelector((state) => state.menu.value);
  const Menu = () => {
    if (value === "AddContact") return <AddContact />;
    if (value === "ShowContact") return <ShowContact />;
    if (value === "EditContact") return <EditContact />;
    return <></>;
  };

  return (
    <div>
      <Navbar />
      <div className="body-wrapper">
        <Sidebar />
        <div className="main-wrapper">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default MainContent;

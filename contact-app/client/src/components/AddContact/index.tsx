import React from "react";

import BaseContact from "../BaseContact";
import Contact from "../../model/Contact";
import { addContact } from "../../redux/contacts";
import { setMenu } from "../../redux/menu";
import { setSelectedContact } from "../../redux/selectedContact";
import { emptyContact } from "../../utils/Utils";
import { useAppDispatch } from "../../redux/hooks";
import { DBService } from "../../db/DBService";

const AddContact: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const addContactHandler = async (contact: Contact) => {
    DBService.addContact(contact)
      .then((newContact) => {
        dispatch(setSelectedContact(emptyContact));
        dispatch(addContact(newContact));
        dispatch(setMenu(""));
      });
  };
  // TODO: Do with requestId

  return (
    <BaseContact
      heading_text="Add New Contact"
      button_text="Save"
      rootStyle="contact-wrapper-add"
      ContactHandler={addContactHandler}
    />
  );
};

export default AddContact;

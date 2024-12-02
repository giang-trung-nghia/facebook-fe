import React, { useState } from "react";
import {
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
} from "@mui/material";
import { FbFormDialog } from "../../../components/composit";
import { IUser } from "../../../models/users/user.model";
import { Gender } from "../../../utils/enum/app.enum";
import FbDatetimePicker from "../../../components/composit/FbDatePicker";
import { updateUser } from "../../../services/api/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/auth/authSlice";

interface Props {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  user: IUser;
}

const FbUserInformationForm: React.FC<Props> = ({
  showDialog,
  setShowDialog,
  user,
}) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<IUser>(user);
  const [editable, setEditable] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setUserInfo((prev) => ({ ...prev, dob: date }));
  };

  const handleActionButton = (key: string) => {
    if (key === "cancel") {
      setEditable(false);
    } else if (key === "save") {
      updateUserRequest();
    } else if (key === "edit") {
      setEditable(true);
    }
  };

  const updateUserRequest = async () => {
    await updateUser(user.id, userInfo)
      .then((res) => {
        dispatch(setUser(res));
      })
      .finally(() => {
        setShowDialog(false);
        setEditable(false)
      });
  };

  return (
    <div>
      <FbFormDialog
        title="Edit User Information"
        show={showDialog}
        onClose={() => setShowDialog(false)}
        actions={
          editable
            ? [
                { key: "cancel", label: "Cancel", color: "inherit" },
                { key: "save", label: "Save", color: "success" },
              ]
            : [{ key: "edit", label: "Edit", color: "primary" }]
        }
        handleActionButton={handleActionButton}
      >
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            fullWidth
            disabled={!editable}
          />
          <TextField
            label="Email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            fullWidth
            disabled={!editable}
          />
          <Box sx={{ px: "1rem", display: "flex" }}>
            <Box sx={{ flex: "3" }}>
              <Typography>Gender</Typography>
              <RadioGroup
                row
                name="gender"
                value={userInfo.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value={Gender.Male}
                  control={<Radio />}
                  label="Male"
                  disabled={!editable}
                />
                <FormControlLabel
                  value={Gender.Female}
                  control={<Radio />}
                  label="Female"
                  disabled={!editable}
                />
                <FormControlLabel
                  value={Gender.Other}
                  control={<Radio />}
                  label="Other"
                  disabled={!editable}
                />
              </RadioGroup>
            </Box>
            <Box sx={{ flex: "2" }}>
              <FbDatetimePicker
                label="Dob"
                value={userInfo.dob}
                onChange={handleDateChange}
                disabled={!editable}
              />
            </Box>
          </Box>

          <TextField
            label="WorkAt"
            name="workAt"
            value={userInfo.workAt}
            onChange={handleInputChange}
            fullWidth
            disabled={!editable}
          />
          <TextField
            label="Location"
            name="location"
            value={userInfo.location}
            onChange={handleInputChange}
            fullWidth
            disabled={!editable}
          />
          <TextField
            label="University"
            name="university"
            value={userInfo.university}
            onChange={handleInputChange}
            fullWidth
            disabled={!editable}
          />
        </Box>
      </FbFormDialog>
    </div>
  );
};

export default FbUserInformationForm;

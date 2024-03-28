import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CustomDropdown = (props) => {
  const { label, items, handleChange, name } = props;

  return (
    <FormControl fullWidth style={DropdownStyle.select}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select required name={name} onChange={handleChange}>
        {items.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const DropdownStyle = {
  select: {
    marginBottom: 10,
    marginTop: 10
  },
};

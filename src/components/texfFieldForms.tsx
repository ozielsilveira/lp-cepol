import { styled, TextField, TextFieldProps, useTheme } from "@mui/material";

export const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    height: '43px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&.Mui-focused fieldset': {
        border: `1px solid ${theme.palette.secondary.main}`,
      },
    },
    '& .MuiFormControl-root.MuiTextField-root': {
      '&:hover': {
        borderColor: theme.palette.secondary.main,
      },
    },
    '& fieldset': {
      top: '0',
      '& legend': {
        display: 'none',
      },
    },
    '& .MuiInputBase-input': {
      padding: '10px 16px',
      color: theme.palette.text.primary,
    },
  }));
  
  export const TextFieldForms = ({ ...propsTextFieldForms }) => {
    const theme = useTheme();
    return (
      <CustomTextField
        {...propsTextFieldForms}
        sx={{ ...propsTextFieldForms?.sx, color: theme.palette.text.primary }}
        inputProps={{ ...propsTextFieldForms?.inputProps, style: { ...propsTextFieldForms?.style, borderRadius: '8px', color: theme.palette.text.primary } }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        SelectProps={{
          ...propsTextFieldForms.SelectProps,
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 'auto',
              },
            },
          },
        }}
      >
        {...propsTextFieldForms.children}
      </CustomTextField>
    );
  };
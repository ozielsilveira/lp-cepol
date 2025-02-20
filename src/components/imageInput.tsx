

// import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
// // import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
// import { Box, Button, CircularProgress, useTheme } from "@mui/material";
// import { uploadFile } from "../redux/slices/fileUploadSlice";
// import React, { useEffect, useState } from "react";
// import { NoImage } from "../components/noImage";
// import styled from "@emotion/styled";
// import { useAppDispatch } from "../redux/store";

// export const ImageInput = (
//     { 
//         imageUrl, 
//         uploadLoading, 
//         // handleImage 
//     }) => {
//   const theme = useTheme();
//   const dispatch = useAppDispatch();
//   const [hasImage, setHasImage] = useState<boolean>(false);

//   // Sincroniza o estado local com o prop imageUrl
//   useEffect(() => {
//     const isValidImage = imageUrl !== null && imageUrl !== undefined && imageUrl !== "";
//     setHasImage(isValidImage);
//   }, [imageUrl]);

// //   const cleanImage = () => {
// //     handleImage("imageUrl", ''); // Chama a função passada pelo pai para limpar a URL
// //   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       dispatch(uploadFile(e.target.files[0]));
//     }
//   };

//   return (
//     <Box sx={{ width: "300px", height: "auto", margin: "0 auto" }}>
//       <Box position="relative" width="100%" height="180px">
//         {hasImage ? (
//           <>
//             <Box component="a" width="100%">
//               <BoxImg src={imageUrl} alt="imagem-implemento" />
//             </Box>
//             {/* <Box position="absolute" top={5} right={5}>
//               <Button
//                 variant="contained"
//                 color="error"
//                 sx={{
//                   minWidth: "32px",
//                   width: "32px",
//                   height: "32px",
//                   borderRadius: "50%",
//                   padding: 0,
//                 }}
//                 onClick={cleanImage}
//               >
//                 <ClearOutlinedIcon />
//               </Button>
//             </Box> */}
//           </>
//         ) : (
//           <Box
//             sx={{
//               border: `1px dashed gray`,
//               borderRadius: "8px",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {uploadLoading ? (
//               <CircularProgress size={24} />
//             ) : (
//               <NoImage />
//             )}
//           </Box>
//         )}
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 5,
//             right: 5,
//           }}
//         >
//           <Button
//             component="label"
//             variant="contained"
//             sx={{
//               width: "46px",
//               height: "46px",
//               borderRadius: "50%",
//               minWidth: 0,
//               padding: 0,
//               boxShadow:
//                 "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
//             }}
//             disabled={uploadLoading}
//           >
//             {uploadLoading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               <AddAPhotoOutlinedIcon sx={{ color: theme.palette.text.primary }} />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleFileChange}
//             />
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export const BoxImg = styled("img")(() => ({
//   bordeRadius: "15px 15px 0 0",
//   width: "100%",
//   height: "180px",
//   borderRadius: "8px",
//   padding: "5px",
//   border: `1px solid`,
//   margin: "15px 0px",
// }));
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { uploadFile } from "../redux/slices/fileUploadSlice";
import React, { useEffect, useState } from "react";
import { NoImage } from "../components/noImage";
import styled from "@emotion/styled";
import { useAppDispatch } from "../redux/store";

interface ImageInputProps {
  imageUrl: string | null;
  uploadLoading: boolean;
  imageType: "imageOne" | "imageTwo";
}

export const ImageInput = ({ imageUrl, uploadLoading, imageType }: ImageInputProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [hasImage, setHasImage] = useState<boolean>(false);

  useEffect(() => {
    const isValidImage = imageUrl !== null && imageUrl !== undefined && imageUrl !== "";
    setHasImage(isValidImage);
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(uploadFile({ file: e.target.files[0], imageType }));
    }
  };

  return (
    <Box sx={{ width: "300px", height: "auto", margin: "0 auto" }}>
      <Box position="relative" width="100%" height="180px">
        {hasImage ? (
          <Box component="a" width="100%">
            <BoxImg src={imageUrl ?? ''} alt="imagem-implemento" />
          </Box>
        ) : (
          <Box
            sx={{
              border: `1px dashed gray`,
              borderRadius: "8px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {uploadLoading ? <CircularProgress size={24} /> : <NoImage />}
          </Box>
        )}
        <Box sx={{ position: "absolute", bottom: 5, right: 5 }}>
          <Button
            component="label"
            variant="contained"
            sx={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              minWidth: 0,
              padding: 0,
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
            }}
            disabled={uploadLoading}
          >
            {uploadLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <AddAPhotoOutlinedIcon sx={{ color: theme.palette.text.primary }} />
            )}
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const BoxImg = styled("img")(() => ({
  borderRadius: "8px",
  width: "100%",
  height: "180px",
  padding: "5px",
  border: `1px solid`,
}));
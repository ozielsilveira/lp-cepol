// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import { IconButton } from "@mui/material";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import Slide from "@mui/material/Slide";
// import Stack from "@mui/material/Stack";
// import { CardCarousel } from "./cardCarrousel";

// interface Article {
//   id: number;
//   title: string;
//   abstract: string;
//   professional: string;
// }

// interface CarouselProps {
//   items: Article[]; // Lista de objetos para renderizar nos cards
// }

// export const Carousel: React.FC<CarouselProps> = ({ items }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [slideDirection, setSlideDirection] = useState<"right" | "left">(
//     "left"
//   );

//   const cardsPerPage = 3;

//   const handleNextPage = () => {
//     setSlideDirection("left");
//     setCurrentPage((prevPage) => prevPage + 1);
//   };

//   const handlePrevPage = () => {
//     setSlideDirection("right");
//     setCurrentPage((prevPage) => prevPage - 1);
//   };

//   const containerWidth = cardsPerPage * 250;

//   const pageCount = Math.ceil(items.length / cardsPerPage);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "400px",
//         width: "100%",
//         marginTop: "40px",
//       }}
//     >
//       <IconButton
//         onClick={handlePrevPage}
//         sx={{ margin: 5 }}
//         disabled={currentPage === 0}
//       >
//         <NavigateBeforeIcon />
//       </IconButton>
//       <Box sx={{ width: `${containerWidth}px`, height: "100%" }}>
//         <Slide direction={slideDirection} in mountOnEnter unmountOnExit>
//           <Stack
//             spacing={2}
//             direction="row"
//             alignContent="center"
//             justifyContent="center"
//             sx={{ width: "100%", height: "100%" }}
//           >
//             {items
//               .slice(
//                 currentPage * cardsPerPage,
//                 (currentPage + 1) * cardsPerPage
//               )
//               .map((item) => (
//                 <CardCarousel key={item.id} article={item} />
//               ))}
//           </Stack>
//         </Slide>
//       </Box>
//       <IconButton
//         onClick={handleNextPage}
//         sx={{ margin: 5 }}
//         disabled={currentPage >= pageCount - 1}
//       >
//         <NavigateNextIcon />
//       </IconButton>
//     </Box>
//   );
// };

//teste

import { useTheme } from "@emotion/react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IconButton, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import { CardCarousel } from "./cardCarrousel";

interface Article {
  id: number;
  title: string;
  abstract: string;
  professional: string;
}

interface CarouselProps {
  items: Article[]; // Lista de objetos para renderizar nos cards
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">(
    "left"
  );

  const cardsPerPage = 3;
  const containerWidth = cardsPerPage * 300; // Ajuste do tamanho do container
  const pageCount = Math.ceil(items.length / cardsPerPage);

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "350px",
            width: "100%",
            marginTop: "40px",
          }}
        >
          {/* Botão Anterior */}
          <IconButton
            onClick={handlePrevPage}
            sx={{ margin: 5, color: "primary.main" }}
            disabled={currentPage === 0}

          >
            <NavigateBeforeIcon />
          </IconButton>

          {/* Container dos Cards com animação */}
          <Box
            sx={{
              width: `${containerWidth}px`,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <TransitionGroup style={{ display: "flex", mt: 2 }}>
              <Slide
                key={currentPage}
                direction={slideDirection}
                in
                mountOnEnter
                unmountOnExit
                timeout={500}
              >
                <Stack
                  spacing={2}
                  direction="row"
                  alignContent="center"
                  justifyContent="center"
                  sx={{ width: "100%", height: "100%", mt: 2, ml: 2, mr: 2 }}
                >
                  {items
                    .slice(
                      currentPage * cardsPerPage,
                      (currentPage + 1) * cardsPerPage
                    )
                    .map((item) => (
                      <CardCarousel key={item.id} article={item} />
                    ))}
                </Stack>
              </Slide>
            </TransitionGroup>
          </Box>

          {/* Botão Próximo */}
          <IconButton
            onClick={handleNextPage}
            sx={{ margin: 5, color: "primary.main" }}
            disabled={currentPage >= pageCount - 1}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
        {/* Indicadores circulares */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                margin: "0 5px",
                backgroundColor: currentPage === index ? "#1460be" : "#ccc",
                transition: "background-color 0.3s",
              }}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

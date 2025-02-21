import { useTheme } from "@emotion/react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IconButton, Theme, ThemeProvider, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import React, { useState, useMemo } from "react";
import { CardCarousel } from "./cardCarrousel";
import { Article } from "../redux/slices/articlesSlice";

interface CarouselProps {
  items: Article[]; // Lista de objetos para renderizar nos cards
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">(
    "left"
  );
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const cardsPerPage = isXs == true ? 1 : 3;
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

  // Memoizar os items da página atual para evitar re-renderizações desnecessárias
  const currentItems = useMemo(() => {
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    return items.slice(start, end);
  }, [currentPage, items]);

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center",  width: { xs: "100vw !important", md: "80%" }, }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: "350px",
            width:"100%",
            marginTop: "40px",
          }}
        >
          <IconButton
            onClick={handlePrevPage}
            sx={{ margin: {md:5, xs:1}, color: "primary.main" }}
            disabled={currentPage === 0}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <Box
            sx={{
              width: `${containerWidth}px`,
              height: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
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
                sx={{ width: "100%", height: "100%", position: "absolute" }}
              >
                {currentItems.map((item) => (
                  <CardCarousel key={item.id} article={item} />
                ))}
              </Stack>
            </Slide>
          </Box>
          <IconButton
            onClick={handleNextPage}
            sx={{ margin: {md:5, xs:1}, color: "primary.main" }}
            disabled={currentPage >= pageCount - 1}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>

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

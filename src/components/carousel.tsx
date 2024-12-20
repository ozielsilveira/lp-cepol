import React, { useState } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
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

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const containerWidth = cardsPerPage * 250;

  const pageCount = Math.ceil(items.length / cardsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "400px",
        width: "100%",
        marginTop: "40px",
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        sx={{ margin: 5 }}
        disabled={currentPage === 0}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <Box sx={{ width: `${containerWidth}px`, height: "100%" }}>
        <Slide direction={slideDirection} in>
          <Stack
            spacing={2}
            direction="row"
            alignContent="center"
            justifyContent="center"
            sx={{ width: "100%", height: "100%" }}
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
      </Box>
      <IconButton
        onClick={handleNextPage}
        sx={{ margin: 5 }}
        disabled={currentPage >= pageCount - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

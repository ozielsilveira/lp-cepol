
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mainImg from "../../../public/images/cepolSVG.svg";
import secondImg from "../../../public/images/unesc_logo_plus.svg";

import { Carousel } from "../../components/carousel.tsx";
import { fetchArticles } from "../../redux/slices/articlesSlice.ts";
import { fetchResearch } from "../../redux/slices/researchSlice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
interface ISearchResult {
  id: string;
  title: string;
  description?: string;
  type: "articles" | "research"; // Adiciona o tipo do item
}
export function Home() {
  const dispatch = useAppDispatch();
  const articlesList = useAppSelector((state) => state.articles.list);
  const researchList = useAppSelector((state) => state.research.list);
  const loadingResearchs = useAppSelector((state) => state.research.loading);
  const loadingArticles = useAppSelector((state) => state.articles.loading);

  const navigate = useNavigate();

  // Estado para o termo de busca e resultados filtrados
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<ISearchResult[]>([]);
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  // Fetch dos dados
  useEffect(() => {
    if (researchList.length === 0) {
      dispatch(fetchResearch());
    }
  }, [dispatch, researchList.length]);

  useEffect(() => {
    if (articlesList.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articlesList.length]);

  // Função de filtragem
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      return;
    }

    const filteredArticles = articlesList
      .filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((article) => ({
        id: article.id,
        title: article.title,
        description: article.description,
        type: "articles" as const, // Define o tipo como "article"
      }));

    const filteredResearch = researchList
      .filter(
        (research) =>
          research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          research.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((research) => ({
        id: research.id,
        title: research.title,
        description: research.description,
        type: "research" as const, // Define o tipo como "research"
      }));

    setFilteredResults([...filteredArticles, ...filteredResearch]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flex: 1 }}>
        <Container sx={{ width: "100%" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              mb: 6,
              mt: 4,
              padding: "4rem 2rem",
              textAlign: "center",
              overflow: "hidden",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Logo CEPOL */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: { xs: "200px", md: "250px" },
                order: { xs: 1, md: 1 },
              }}
            >
              {!isXs && (
              <Box
                component={"img"}
                src={mainImg}
                sx={{
                  width: { xs: "200px", md: "250px" },
                  height: { xs: "160px", md: "200px" },
                  objectFit: "contain",
                }}
            />)}
            </Box>

            {/* Conteúdo central */}
            <Box 
              sx={{ 
                flex: 1, 
                zIndex: 1, 
                mx: { xs: 2, md: 4 },
                order: { xs: 3, md: 2 },
                maxWidth: { xs: "100%", md: "500px" },
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                Polymer Science and Engineering
              </Typography>
              <Typography 
                variant="body1" 
                color="textSecondary" 
                paragraph
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  mb: 4,
                  lineHeight: 1.5,
                }}
              >
                Explore the latest research and innovations from our laboratory.
                Stay updated with the most recent discoveries.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="Search research..."
                  fullWidth
                  sx={{ borderRadius: "15px" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  variant="contained"
                  sx={{ width: { xs: "25px", md: "140px" } }}
                  startIcon={
                    <SearchIcon
                      sx={{
                        ml: { xs: "0px", md: "4px" },
                        mr: { xs: "0px", md: "8px" },
                      }}
                    />
                  }
                  onClick={handleSearch}
                >
                  {isXs ? "" : "Search"}
                </Button>
              </Box>
            </Box>

            {/* Logo UNESC */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: { xs: "200px", md: "250px" },
                order: { xs: 2, md: 3 },
              }}
            >
              {!isXs && (
              <Box
                component={"img"}
                src={secondImg}
                sx={{
                  width: { xs: "200px", md: "250px" },
                  height: { xs: "160px", md: "200px" },
                  objectFit: "contain",
                }}
              />
              )}
            </Box>
          </Box>

          {/* Lista de resultados da busca */}
          {filteredResults.length > 0 && (
            <Box sx={{ mb: 4 }}>
              {/* Título movido para fora da Box com scroll */}
              <Typography variant="h5" gutterBottom>
                Search Results
              </Typography>
              <Box
                sx={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  scrollbarWidth: "none" /* Firefox */,
                  "&::-webkit-scrollbar": {
                    display: "none",
                  } /* Chrome, Safari */,
                }}
              >
                <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
                  {filteredResults.map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        cursor: "pointer",
                        borderBottom: 1,
                        borderColor: "divider",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.01)",
                          bgcolor: "grey.100",
                        },
                      }}
                      onClick={
                        () => navigate(`/${item.type}/${item.id}`) // Usa o type para determinar a rota
                      }
                    >
                      <ListItemText
                        primary={item.title}
                        secondary={item.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}

          <Box
            display={"flex"}
            sx={{
              alignItems: "center",
              flexDirection: "column",
              mt: 6,
            }}
          >
            <Typography
              sx={{ mb: 4, mt: 2, fontSize: { md: "h5", xs: "1.5rem" } }}
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Featured Articles
            </Typography>
            {loadingArticles ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Carousel items={articlesList} />
            )}
          </Box>

          <Box
            display={"flex"}
            sx={{ alignItems: "center", flexDirection: "column", mt: 6, mb: 6 }}
          >
            <Typography
              // variant={"h4"}

              fontWeight="bold"
              gutterBottom
              sx={{ mt: 6, mb: 4, fontSize: { md: "h5", xs: "1.5rem" } }}
            >
              Featured Research
            </Typography>
            {loadingResearchs ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                }}
              >
                {researchList.slice(0, 2).map((research) => (
                  <Card
                    onClick={() => navigate(`/research/${research.id}`)}
                    key={research.id}
                    sx={{
                      width: { md: "450px", xs: "310px" },
                      height: "250px",
                      
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontSize: { xs: "14px", md: "18px" } }}
                      >
                        {research.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                      >
                        {research.description}
                      </Typography>
                      <Box
                        sx={{
                          marginTop: "5rem",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography variant="caption">
                          Partners: {research.professional?.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
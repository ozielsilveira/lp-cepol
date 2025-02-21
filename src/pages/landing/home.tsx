
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { Carousel } from "../../components/carousel.tsx";
import mainImg from "../../../public/images/cepolSVG.svg";
import { Article, fetchArticles } from "../../redux/slices/articlesSlice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { useEffect, useState } from "react";
import { fetchResearch, Research } from "../../redux/slices/researchSlice.ts";
import { useNavigate } from "react-router-dom";

type SearchResult = Article | Research;

export function Home() {
  const dispatch = useAppDispatch();
  const articlesList = useAppSelector((state) => state.articles.list);
  const researchList = useAppSelector((state) => state.research.list);
  const loadingResearchs = useAppSelector((state) => state.research.loading);
  const loadingArticles = useAppSelector((state) => state.articles.loading);

  const navigate = useNavigate();

  // Estado para o termo de busca e resultados filtrados
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
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

    const filteredArticles = articlesList.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredResearch = researchList.filter(
      (research) =>
        research.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        research.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
              gap: 4,
              alignItems: "center",
              justifyContent: "center",
              mb: 6,
              mt: 4,
              padding: "4rem 2rem",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <Box sx={{ flex: 1, zIndex: 1 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom sx={{fontSize: {md:"h4", xs:"2.8rem"}}}>
                Discover the Advances of Science
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
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
                  sx={{ width: {xs: "25px", md:"140px"} }}
                  startIcon={<SearchIcon sx={{ml:{xs:"0px", md:"4px"}, mr:{xs:"0px", md:"8px"}}}/>}
                  onClick={handleSearch}
                >
                  {isXs ? "" : "Search"}
                  
                </Button>
              </Box>
            </Box>
            {!isXs && (
            <Box component={"img"} src={mainImg} sx={{width:{xs: "300px", md: "300px"}, height:{xs: "200px", md:"300px"}}} />
          )}
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
                      onClick={() =>
                        navigate(
                          `/${item.description ? "articles" : "research"}/${
                            item.id
                          }`
                        )
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
              sx={{ mb: 4, mt: 2 , fontSize: {md:"h5", xs:"1.5rem"}}}
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
              sx={{ mt: 6, mb: 4, fontSize: {md:"h5", xs:"1.5rem"} }}
            >
              Featured Research
            </Typography>
            {loadingResearchs ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: {xs:"column", md: "row"}, gap: 3 }}>
                {researchList.slice(0, 2).map((research) => (
                  <Card
                    onClick={() => navigate(`/research/${research.id}`)}
                    key={research.id}
                    sx={{
                      width: {md: "450px", xs: "310px"},
                      height: "250px",
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                       
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{fontSize: {xs: "14px", md: "18px"}}}>
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
                          marginTop: "7rem",
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

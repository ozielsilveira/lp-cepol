import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Carousel } from "../../components/carousel.tsx";
// import PolimerImg from "../../../public/images/poliBack.jpg";
import mainImg from "../../../public/images/cepolSVG.svg";
import { fetchArticles } from "../../redux/slices/articlesSlice.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchResearch } from "../../redux/slices/researchSlice.ts";

// Dados fictícios
// interface Article {
//   id: number;
//   title: string;
//   abstract: string;
//   professional: string;
// }



export function Home() {
  // const groupedArticles = useMemo(() => {
  //   return articles.reduce((acc, article, index) => {
  //     const groupIndex = Math.floor(index / 3);
  //     if (!acc[groupIndex]) acc[groupIndex] = [];
  //     acc[groupIndex].push(article);
  //     return acc;
  //   }, [] as Article[][]);
  // }, []);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const articlesList = useAppSelector((state) => state.articles.list);
  const researchList = useAppSelector((state) => state.research.list);

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component="main" sx={{ flex: 1 }}>
        <Container
          sx={{
            width: "100%",
          }}
        >
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
              <Typography variant="h3" fontWeight="bold" gutterBottom>
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
                />
                <Button variant="contained" startIcon={<SearchIcon />}>
                  Search
                </Button>
              </Box>
            </Box>
            <Box component={"img"} src={mainImg} width={300} height={300} />
          </Box>
          <Box
            display={"flex"}
            sx={{
              alignItems: "center",
              flexDirection: "column",
              mt: 6,
            }}
          >
            {/* Articles */}
            <Typography
              sx={{ mb: 4, mt: 2 }}
              variant="h4"
              fontWeight="bold"
              gutterBottom
            >
              Featured Articles
            </Typography>
            <Carousel items={articlesList} />
          </Box>
          <Box
            display={"flex"}
            sx={{ alignItems: "center", flexDirection: "column", mt: 6, mb: 6 }}
          >
            {/* Research */}
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ mt: 6, mb: 4 }}
            >
              Featured Research
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
              {/* {researchList.map((research) => (
                <Card
                  key={research.id}
                  sx={{ width: "450px", height: "250px" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {research.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
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
                      <Typography variant="caption">
                        Period: {research.period}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))} */}
              {researchList.slice(0, 2).map((research) => (
                <Card
                  key={research.id}
                  sx={{ width: "450px", height: "250px" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {research.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
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
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

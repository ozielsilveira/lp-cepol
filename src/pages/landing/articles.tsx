import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../redux/slices/articlesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
// import { BookOpen } from "@mui/icons-material";

// interface Article {
//   id: number;
//   title: string;
//   abstract: string;
//   author: string;
//   publishedDate: string;
// }

export const Articles: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const articlesList = useAppSelector((state) => state.articles.list);
  const loading = useAppSelector((state) => state.articles.loading);
  useEffect(() => {
    if (articlesList.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articlesList.length]);
  return (
    <Container>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ mb: 4, mt: 2 }}
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Published Articles
          </Typography>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our latest research articles and stay updated with
            innovative scientific insights.
          </p>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4} mb={2}>
              {" "}
              {/* Similar ao gap-8 */}
              {articlesList.map((article) => (
                <Grid item xs={12} md={6} key={article.id}>
                  {" "}
                  {/* xs=12 ocupa toda a linha em telas pequenas, md=6 divide em 2 colunas em telas médias */}
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: 2,
                      "&:hover": { boxShadow: 6, cursor: "pointer" },
                      transition: "all 0.3s",
                    }}
                    onClick={() => navigate(`/articles/${article.id}`)}
                  >
                    <CardContent>
                      <MenuBookIcon
                        sx={{ fontSize: 40, color: "blue", marginBottom: 2 }}
                      />
                      <h3
                        className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "#1f2937",
                        }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                        {article.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">
                        <strong>Author:</strong> {article.author} {" "}
                        <strong>Published:</strong> {article.published} {" "}
                        {/* {new Date(article.publishedDate).toLocaleDateString()} */}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </section>
    </Container>
  );
};

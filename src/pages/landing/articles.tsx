import {
  ArrowDownward,
  ArrowUpward,
  CalendarToday,
  Person,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../../redux/slices/articlesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

type SortOrder = "newest" | "oldest";

export const Articles: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const articlesList = useAppSelector((state) => state.articles.list);
  const loading = useAppSelector((state) => state.articles.loading);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  useEffect(() => {
    if (articlesList.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articlesList.length]);

  const sortedArticles = useMemo(() => {
    if (!Array.isArray(articlesList)) return [];
    return [...articlesList].sort((a, b) => {
      const dateA = a.published ? new Date(a.published).getTime() : 0;
      const dateB = b.published ? new Date(b.published).getTime() : 0;
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [articlesList, sortOrder]);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.6rem", md: "2rem" },
          }}
        >
          Published Articles
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 520, mx: "auto", lineHeight: 1.7 }}
        >
          Explore our latest research articles and stay updated with innovative
          scientific insights.
        </Typography>
      </Box>

      {/* Sort controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {sortedArticles.length} article(s)
        </Typography>
        <ToggleButtonGroup
          value={sortOrder}
          exclusive
          onChange={(_, val) => val && setSortOrder(val)}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              textTransform: "none",
              fontSize: "0.78rem",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px !important",
              border: `1px solid ${theme.palette.divider} !important`,
              fontWeight: 500,
              "&.Mui-selected": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
                borderColor: `${alpha(theme.palette.primary.main, 0.3)} !important`,
              },
            },
            gap: 0.5,
          }}
        >
          <ToggleButton value="newest">
            <ArrowDownward sx={{ fontSize: 15, mr: 0.5 }} />
            Newest
          </ToggleButton>
          <ToggleButton value="oldest">
            <ArrowUpward sx={{ fontSize: 15, mr: 0.5 }} />
            Oldest
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Content */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <CircularProgress />
        </Box>
      ) : sortedArticles.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            No articles found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {sortedArticles.map((article) => (
            <Grid item xs={12} key={article.id}>
              <Card
                sx={{
                  borderRadius: "12px",
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 2px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                    transform: "translateY(-1px)",
                    "& .article-title": {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
                onClick={() => navigate(`/articles/${article.id}`)}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 4 }, "&:last-child": { pb: { xs: 2.5, md: 4 } } }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1.5, sm: 3 },
                      alignItems: { sm: "flex-start" },
                    }}
                  >
                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        className="article-title"
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          lineHeight: 1.4,
                          mb: 0.5,
                          transition: "color 0.2s ease",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {article.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                          mb: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {article.description}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        {article.author && (
                          <Chip
                            icon={<Person sx={{ fontSize: 14 }} />}
                            label={article.author}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: "6px",
                              fontSize: "0.73rem",
                              height: 24,
                              "& .MuiChip-icon": { ml: "4px" },
                            }}
                          />
                        )}
                        {article.published && (
                          <Chip
                            icon={<CalendarToday sx={{ fontSize: 12 }} />}
                            label={article.published}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: "6px",
                              fontSize: "0.73rem",
                              height: 24,
                              "& .MuiChip-icon": { ml: "4px" },
                            }}
                          />
                        )}
                      </Stack>
                    </Box>

                    {/* Image thumbnail (if available) */}
                    {article.images?.[0]?.url && (
                      <Box
                        sx={{
                          width: { xs: "100%", sm: 120 },
                          height: { xs: 140, sm: 90 },
                          minWidth: { sm: 120 },
                          borderRadius: "8px",
                          overflow: "hidden",
                          order: { xs: -1, sm: 0 },
                        }}
                      >
                        <Box
                          component="img"
                          src={article.images[0].url}
                          alt={article.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

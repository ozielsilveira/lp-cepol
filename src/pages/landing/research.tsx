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
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchResearch } from "../../redux/slices/researchSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

type SortOrder = "newest" | "oldest";

export const Research: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const researchList = useAppSelector((state) => state.research.list);
  const loading = useAppSelector((state) => state.research.loading);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  useEffect(() => {
    if (researchList.length === 0) {
      dispatch(fetchResearch());
    }
  }, [dispatch, researchList.length]);

  const sortedResearch = useMemo(() => {
    if (!Array.isArray(researchList)) return [];
    return [...researchList].sort((a, b) => {
      const numA = parseFloat(a.description);
      const numB = parseFloat(b.description);
      const hasNumA = !isNaN(numA);
      const hasNumB = !isNaN(numB);

      // Both have numeric descriptions → sort by value
      if (hasNumA && hasNumB) {
        return sortOrder === "newest" ? numB - numA : numA - numB;
      }
      // Only one has numeric → numeric goes first
      if (hasNumA) return -1;
      if (hasNumB) return 1;
      // Neither has numeric → alphabetical
      return (a.title || "").localeCompare(b.title || "");
    });
  }, [researchList, sortOrder]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
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
          Ongoing Research
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 520, mx: "auto", lineHeight: 1.7 }}
        >
          Explore our ongoing research projects and discover the innovative
          science driving our work.
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
          {sortedResearch.length} research(es)
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
      ) : sortedResearch.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            No research found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {sortedResearch.map((research) => {
            const hasImage = !!research.images?.[0]?.url;
            const descIsYear = !isNaN(parseFloat(research.description));

            return (
              <Grid item xs={12} sm={6} md={4} key={research.id}>
                <Card
                  sx={{
                    borderRadius: "14px",
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: "none",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.12)}`,
                      transform: "translateY(-3px)",
                      "& .research-title": {
                        color: theme.palette.primary.main,
                      },
                      "& .research-img": {
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                  onClick={() => navigate(`/research/${research.id}`)}
                >
                  {/* Image */}
                  {hasImage ? (
                    <Box
                      sx={{
                        height: 180,
                        overflow: "hidden",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box
                        className="research-img"
                        component="img"
                        src={research.images![0].url}
                        alt={research.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.35s ease",
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        height: 180,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: alpha(theme.palette.primary.main, 0.12),
                          letterSpacing: "-0.03em",
                          userSelect: "none",
                        }}
                      >
                        {research.title?.charAt(0)?.toUpperCase() || "R"}
                      </Typography>
                    </Box>
                  )}

                  {/* Content */}
                  <CardContent
                    sx={{
                      flex: 1,
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      "&:last-child": { pb: 2.5 },
                    }}
                  >
                    <Typography
                      className="research-title"
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.35,
                        mb: 1,
                        transition: "color 0.2s ease",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {research.title}
                    </Typography>

                    {/* Show description only if it's NOT a year/number */}
                    {!descIsYear && research.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                          mb: 1.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          flex: 1,
                        }}
                      >
                        {research.description}
                      </Typography>
                    )}

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                      sx={{ mt: "auto" }}
                    >
                      {research.professional?.name?.trim() && (
                        <Chip
                          icon={<Person sx={{ fontSize: 14 }} />}
                          label={research.professional.name}
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
                      {descIsYear && (
                        <Chip
                          icon={<CalendarToday sx={{ fontSize: 12 }} />}
                          label={research.description}
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
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

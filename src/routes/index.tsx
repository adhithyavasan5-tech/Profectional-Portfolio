import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "./portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adhithyavasan R — Digital Creator" },
      {
        name: "description",
        content:
          "The portfolio of Adhithyavasan R, a digital creator and creative technologist.",
      },
      { property: "og:title", content: "Adhithyavasan R — Digital Creator" },
      {
        property: "og:description",
        content:
          "Explore the portfolio of Adhithyavasan R, digital creator and creative technologist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PortfolioPage />;
}

export const WallpaperRoute = {
  name: "WallPaper",
  path: "/:id/*",
  link: "/:id"
}

export const AboutDashboardRoute = {
  name: "About me",
  path: "/about/*",
  link: "/:id/about",
}

export const AboutOverviewRoute = {
  name: "Overview",
  path: "/overview",
  link: "/:id/about/overview",
}

export const AboutPlaceRoute = {
  name: "My place",
  path: "/place",
  link: "/:id/about/place",
}

export const AboutCareerRoute = {
  name: "My career",
  path: "/career",
  link: "/:id/about/career",
}
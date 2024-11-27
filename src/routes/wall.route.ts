export const WallpaperRoute = {
  name: "WallPaper",
  path: "/:id/*",
  link: "/:id"
}

export const WallpaperAboutDashboardRoute = {
  name: "WallPaper",
  path: "/about/*",
  link: "/:id/about",
}

export const WallpaperAboutOverviewRoute = {
  name: "Overview",
  path: "/overview",
  link: "/:id/about/overview",
}

export const WallpaperAboutPlaceRoute = {
  name: "My place",
  path: "/place",
  link: "/:id/about/place",
}

export const WallpaperAboutCareerRoute = {
  name: "My career",
  path: "/career",
  link: "/:id/about/career",
}
import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/layouts/app-layout";

import { DashboardPage } from "@/pages/dashboard/dashboard-page";

import ShiftExchangePage from "@/pages/shift-exchange";

import Absence from "@/pages/absence/absence";

import ReplacementRequests from "@/pages/replacement-requests/replacement-requests";

import ExtravaktPage from "@/pages/extravakt/extravakt";

import OpprettSkiftPage, { BlaOverviewPage } from "@/opprett-skift/page";

import BlaSkiftplanPage from "@/shifts/bla-page";

import Tilsette from "@/pages/tilsette/tilsette";
import NyTilsett from "@/pages/tilsette/ny-tilsett";

export const router = createBrowserRouter([
  {
    path: "/",

    element: <AppLayout />,

    children: [
      /* ================================================
         DASHBOARD
      ================================================= */

      {
        index: true,
        element: <DashboardPage />,
      },

      /* ================================================
         SHIFT EXCHANGE
      ================================================= */

      {
        path: "/shift-exchange",
        element: <ShiftExchangePage />,
      },

      /* ================================================
         FRÅVÆR
      ================================================= */

      {
        path: "/fravaer/registrer",
        element: <Absence />,
      },

      /* ================================================
         REPLACEMENT REQUESTS
      ================================================= */

      {
        path: "/forespurnader/byte",
        element: <ReplacementRequests />,
      },

      /* ================================================
         EXTRAVAKT
      ================================================= */

      {
        path: "/extravakt",
        element: <ExtravaktPage />,
      },

      /* ================================================
         OPPRETT SKIFT
      ================================================= */

      {
        path: "/opprett-skift",
        element: <OpprettSkiftPage />,
      },

      /* ================================================
         OPPRETT SKIFT — BLÅ OVERVIEW
      ================================================= */

      {
        path: "/opprett-skift/bla/overview",
        element: <BlaOverviewPage />,
      },

      /* ================================================
         TILSETTE
      ================================================= */

      {
        path: "/tilsette",
        element: <Tilsette />,
      },

      {
        path: "/tilsette/ny",
        element: <NyTilsett />,
      },

      /* ================================================
         SHIFT PLAN
      ================================================= */

      {
        path: "/shifts",
        element: <BlaSkiftplanPage />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import SkillMatrixPage from "./pages/SkillMatrixPage";
import TaskManagerPage from "./pages/TaskManagerPage";
import TaktTimeAnalysisPage from "./pages/TaktTimeAnalysisPage";
import UtilizationMonitorPage from "./pages/UtilizationMonitorPage";
import BottleneckDetectorPage from "./pages/BottleneckDetectorPage";
import StationAssignmentPage from "./pages/StationAssignmentPage";
import PerformanceReportsPage from "./pages/PerformanceReportsPage";
import KitchenLayoutEditorPage from "./pages/KitchenLayoutEditorPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: DashboardPage },
        { path: "skill-matrix", Component: SkillMatrixPage },
        { path: "task-manager", Component: TaskManagerPage },
        { path: "takt-time", Component: TaktTimeAnalysisPage },
        { path: "utilization", Component: UtilizationMonitorPage },
        { path: "bottleneck", Component: BottleneckDetectorPage },
        { path: "station-assignment", Component: StationAssignmentPage },
        { path: "performance", Component: PerformanceReportsPage },
        { path: "kitchen-layout", Component: KitchenLayoutEditorPage },
      ],
    },
  ],
  {
    basename: "/BalansyaCapstone",
  }
);
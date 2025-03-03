import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout.js";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper.jsx";
import { GeneralSettingWrapper } from "../pages/settings/GeneralSettings.jsx";
import { Contracts } from "../pages/settings/Contracts.jsx";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils/index.js";
import { WithChildren } from "../../_metronic/helpers/index.js";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper.js";
import { Provinces } from "../pages/geo-locations/Provinces.jsx";
import { Companies } from "../pages/companies/index.jsx";
import { CompanyProfile } from "../pages/companies/profile/index.jsx";
import { Categories } from "../pages/categories/index.jsx";

const PrivateRoutes = () => {
  const UsersPage = lazy(() =>
    import("../modules/apps/user-management/UsersPage.js")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="builder" element={<BuilderPageWrapper />} />

        <Route path="/settings/">
          <Route path="general-settings" element={<GeneralSettingWrapper />} />
          <Route path="contracts" element={<Contracts />} />
        </Route>
        <Route path="/geo-locations/">
          <Route path="provinces" element={<Provinces />} />
          <Route path="contracts" element={<Contracts />} />
        </Route>
        <Route path="/companies/">
          <Route path="" element={<Companies />} />
          <Route path="profile/">
            <Route path=":companyId" element={<CompanyProfile />} />
          </Route>
        </Route>

        <Route path="/categories/">
          <Route path="" element={<Categories />} />
        </Route>

        {/* Lazy Modules */}
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView= ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      0: baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };

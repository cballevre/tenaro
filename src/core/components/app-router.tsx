import { AuthPage } from '@refinedev/antd';
import { Authenticated } from '@refinedev/core';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { Login } from '@/auth/pages/login';
import { SettingsPage } from '@/auth/pages/settings';
import { BoatLayout } from '@/assets/components/boat-layout';
import { AddBoat } from '@/assets/pages/add';
import { BoatDashboard } from '@/assets/pages/dashboard';
import { ListAsset } from '@/assets/pages/list';
import { AccessSettings } from '@/assets/pages/settings/access';
import { CommonSettings } from '@/assets/pages/settings/common';
import { AppLayout } from '@/core/components/app-layout';
import { AddEquipment } from '@/equipments/pages/add';
import { EditEquipment } from '@/equipments/pages/edit';
import { EquipmentList } from '@/equipments/pages/list';
import { ShowEquipment } from '@/equipments/pages/show';
import { AddIntervention } from '@/interventions/pages/add';
import { EditIntervention } from '@/interventions/pages/edit';
import { InterventionList } from '@/interventions/pages/list';
import { ShowIntervention } from '@/interventions/pages/show';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated key="authenticated-routes" redirectOnFail="/login">
            <AppLayout>
              <Outlet />
            </AppLayout>
          </Authenticated>
        }
      >
        <Route index element={<ListAsset />} />
        <Route path="/assets/add" element={<AddBoat />} />
        <Route path="/assets/:assetId" element={<BoatLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<BoatDashboard />} />
          <Route path="interventions">
            <Route index element={<InterventionList />} />
            <Route path="add" element={<AddIntervention />} />
            <Route path=":interventionId">
              <Route index element={<ShowIntervention />} />
              <Route path="edit" element={<EditIntervention />} />
            </Route>
          </Route>
          <Route path="equipments">
            <Route index element={<EquipmentList />} />
            <Route path="add" element={<AddEquipment />} />
            <Route path=":equipmentId">
              <Route index element={<ShowEquipment />} />
              <Route path="edit" element={<EditEquipment />} />
            </Route>
          </Route>
          <Route path="settings">
            <Route index element={<CommonSettings />} />
            <Route path="access" element={<AccessSettings />} />
          </Route>
        </Route>
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route
        element={
          <Authenticated key="auth-pages" fallback={<Outlet />}>
            <Navigate to="/" />
          </Authenticated>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route
          path="/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
        <Route
          path="/update-password"
          element={<AuthPage type="updatePassword" />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export { AppRouter };

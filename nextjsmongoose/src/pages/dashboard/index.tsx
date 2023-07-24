import { ACCESS_RULES } from "@/utils/roles";
import withRoleAccess from "@/utils/withRolesAccess";
import React from "react";


const DashboardPage: React.FC = () => {
  return <div>Dashboard Page</div>;
};

export default withRoleAccess(DashboardPage, ACCESS_RULES.dashboard);
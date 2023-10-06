import React from "react";

const WaterRegister = React.lazy(() =>
  import("./views/waterx/WaterRegister.js")
);
const WaterMeterData = React.lazy(() =>
  import("./views/waterx/WaterMeterData.js")
);
const WaterMap = React.lazy(() => import("./views/waterx/WaterMap.js"));
const WaterPumpData = React.lazy(() =>
  import("./views/waterx/WaterPumpData.js")
);
const WaterRegData17 = React.lazy(() =>
  import("./views/waterx/WaterRegData17.js")
);
const WaterRegData31 = React.lazy(() =>
  import("./views/waterx/WaterRegData31.js")
);
const WaterRegData32 = React.lazy(() =>
  import("./views/waterx/WaterRegData32.js")
);
const WaterRegDataReceipt = React.lazy(() =>
  import("./views/waterx/WaterRegDataReceipt.js")
);
const WaterReportUsage = React.lazy(() =>
  import("./views/waterx/WaterReportUsage.js")
);
const WaterReportTaxes = React.lazy(() =>
  import("./views/waterx/WaterReportTaxes.js")
);
const WaterReportAgent = React.lazy(() =>
  import("./views/waterx/WaterReportAgent.js")
);
const WaterSettingDocs = React.lazy(() =>
  import("./views/waterx/WaterSettingDocs.js")
);
const WaterSettingFee = React.lazy(() =>
  import("./views/waterx/WaterSettingFee.js")
);
const WaterStoredData = React.lazy(() =>
  import("./views/waterx/WaterStoredData.js")
);
const WaterPipeData = React.lazy(() =>
  import("./views/waterx/WaterPipeData.js")
);
const WaterMeterFt = React.lazy(() => import("./views/waterx/WaterMeterFt.js"));
const WaterUserRole = React.lazy(() =>
  import("./views/waterx/WaterUserRole.js")
);
const promotion = React.lazy(() => import("./views/waterx/promotion.js"));
// Base

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/water-register", name: "WaterReg", element: WaterRegister },
  { path: "/water-map", name: "WaterMap", element: WaterMap },
  { path: "/water-meter", name: "WaterMeterData", element: WaterMeterData },
  { path: "/water-pump", name: "WaterPumpData", element: WaterPumpData },
  {
    path: "/water-reg-data-17",
    name: "WaterRegData17",
    element: WaterRegData17,
  },
  {
    path: "/water-reg-data-31",
    name: "WaterRegData31",
    element: WaterRegData31,
  },
  {
    path: "/water-reg-data-32",
    name: "WaterRegData32",
    element: WaterRegData32,
  },
  {
    path: "/water-reg-data-receipt",
    name: "WaterRegDatareceipt",
    element: WaterRegDataReceipt,
  },
  {
    path: "/water-report-usage",
    name: "WaterReportUsage",
    element: WaterReportUsage,
  },
  {
    path: "/water-report-taxes",
    name: "WaterReportTaxes",
    element: WaterReportTaxes,
  },
  {
    path: "/water-report-agent",
    name: "WaterReportAgent",
    element: WaterReportAgent,
  },
  {
    path: "/water-setting-docs",
    name: "WaterSettingDocs",
    element: WaterSettingDocs,
  },
  {
    path: "/water-setting-fee",
    name: "WaterSettingFee",
    element: WaterSettingFee,
  },
  { path: "/water-stored", name: "WaterStoredData", element: WaterStoredData },
  { path: "/water-pipe", name: "WaterPipeData", element: WaterPipeData },
  { path: "/water-meter-ft", name: "WaterMeterFt", element: WaterMeterFt },
  { path: "/water-user-role", name: "WaterUserRole", element: WaterUserRole },
  { path: "/promotion", name: "promotion", element: promotion },
];

export default routes;

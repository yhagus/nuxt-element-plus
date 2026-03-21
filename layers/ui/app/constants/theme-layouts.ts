export interface ThemeLayoutCatalogItem {
  key: string;
  slug: string;
  name: string;
  useCase: string;
  inspiration: string;
  tone: 'dark' | 'light' | 'mixed';
  status: 'scaffold';
  colorTokens: {
    background: string;
    surface: string;
    border: string;
    accent: string;
    text: string;
    muted: string;
  };
}

export const themeLayoutsCatalog: ThemeLayoutCatalogItem[] = [
  {
    key: 'mobilityDispatch1',
    slug: 'mobility-dispatch-1',
    name: 'Mobility Dispatch',
    useCase: 'Dispatch armada dan monitoring operasional',
    inspiration: 'Uber/Grab',
    tone: 'dark',
    status: 'scaffold',
    colorTokens: {
      background: 'radial-gradient(circle at top left, rgba(118, 255, 145, 0.14), transparent 30%), linear-gradient(180deg, #061411 0%, #0a1c18 55%, #081512 100%)',
      surface: 'rgba(13, 38, 32, 0.74)',
      border: 'rgba(132, 255, 177, 0.26)',
      accent: '#5cf29d',
      text: '#e9fff2',
      muted: '#a8d6bc',
    },
  },
  {
    key: 'mobilityHub1',
    slug: 'mobility-hub-1',
    name: 'Mobility Hub',
    useCase: 'Kontrol lintas domain mobilitas',
    inspiration: 'Uber/Grab',
    tone: 'dark',
    status: 'scaffold',
    colorTokens: {
      background: 'radial-gradient(circle at top right, rgba(33, 229, 132, 0.18), transparent 28%), linear-gradient(180deg, #0a1110 0%, #0f1b17 60%, #101915 100%)',
      surface: 'rgba(17, 31, 26, 0.78)',
      border: 'rgba(121, 237, 173, 0.24)',
      accent: '#39d487',
      text: '#ebfff5',
      muted: '#acd6c4',
    },
  },
  {
    key: 'cloudConsole1',
    slug: 'cloud-console-1',
    name: 'Cloud Console',
    useCase: 'Manajemen resource cloud harian',
    inspiration: 'Google Cloud Console',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'linear-gradient(180deg, #f6f8fb 0%, #eef3f9 100%)',
      surface: '#ffffff',
      border: '#d8e3f3',
      accent: '#2b73d9',
      text: '#17304d',
      muted: '#5e7390',
    },
  },
  {
    key: 'cloudConsole2',
    slug: 'cloud-console-2',
    name: 'Cloud Console Pro',
    useCase: 'Tim platform dan SRE enterprise',
    inspiration: 'Google Cloud Console',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'linear-gradient(180deg, #edf1f7 0%, #e5ebf4 100%)',
      surface: '#fbfdff',
      border: '#cfdae9',
      accent: '#356ec7',
      text: '#112840',
      muted: '#5f738a',
    },
  },
  {
    key: 'oceanControl1',
    slug: 'ocean-control-1',
    name: 'Ocean Control',
    useCase: 'Operasi infrastruktur ala cloud provider',
    inspiration: 'DigitalOcean',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'radial-gradient(circle at top right, rgba(44, 125, 255, 0.14), transparent 28%), linear-gradient(180deg, #ecf3ff 0%, #e6f0ff 100%)',
      surface: '#ffffff',
      border: '#cfe0ff',
      accent: '#2f78ff',
      text: '#112f56',
      muted: '#5d7697',
    },
  },
  {
    key: 'devopsObservability1',
    slug: 'devops-observability-1',
    name: 'DevOps Observability',
    useCase: 'Monitoring observability dan incident response',
    inspiration: 'Datadog/New Relic',
    tone: 'dark',
    status: 'scaffold',
    colorTokens: {
      background: 'linear-gradient(rgba(124, 93, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 93, 255, 0.08) 1px, transparent 1px), linear-gradient(180deg, #09091b 0%, #101027 100%)',
      surface: 'rgba(20, 20, 42, 0.8)',
      border: 'rgba(161, 146, 255, 0.28)',
      accent: '#8c7bff',
      text: '#f4f2ff',
      muted: '#b5afe0',
    },
  },
  {
    key: 'securityCenter1',
    slug: 'security-center-1',
    name: 'Security Center',
    useCase: 'SOC dashboard dan policy monitoring',
    inspiration: 'Cloudflare Security',
    tone: 'dark',
    status: 'scaffold',
    colorTokens: {
      background: 'radial-gradient(circle at top left, rgba(255, 126, 74, 0.16), transparent 32%), linear-gradient(180deg, #0e1727 0%, #121d30 100%)',
      surface: 'rgba(22, 34, 52, 0.84)',
      border: 'rgba(255, 155, 109, 0.3)',
      accent: '#ff9b63',
      text: '#eff6ff',
      muted: '#b9c7da',
    },
  },
  {
    key: 'billingAnalytics1',
    slug: 'billing-analytics-1',
    name: 'Billing Analytics',
    useCase: 'Finance ops dan subscription monitoring',
    inspiration: 'Stripe',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'linear-gradient(180deg, #faf8ff 0%, #f4f1ff 100%)',
      surface: '#ffffff',
      border: '#e3dcf7',
      accent: '#6f57d8',
      text: '#2b1f49',
      muted: '#756798',
    },
  },
  {
    key: 'workspaceMinimal1',
    slug: 'workspace-minimal-1',
    name: 'Workspace Minimal',
    useCase: 'Backoffice ringan dan workflow internal',
    inspiration: 'Linear/Vercel',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'linear-gradient(180deg, #f7f7f7 0%, #f1f1f1 100%)',
      surface: '#ffffff',
      border: '#d8d8d8',
      accent: '#2f2f2f',
      text: '#171717',
      muted: '#636363',
    },
  },
  {
    key: 'supportDesk1',
    slug: 'support-desk-1',
    name: 'Support Desk',
    useCase: 'Operasi customer support harian',
    inspiration: 'Zendesk/Intercom',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'linear-gradient(180deg, #fff8f1 0%, #fff3e8 100%)',
      surface: '#ffffff',
      border: '#f2dcc2',
      accent: '#dc7a2d',
      text: '#4a2c0f',
      muted: '#8c6a4a',
    },
  },
  {
    key: 'executiveBrief1',
    slug: 'executive-brief-1',
    name: 'Executive Brief',
    useCase: 'Review KPI manajemen',
    inspiration: 'BI executive dashboard',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'radial-gradient(circle at top, rgba(35, 120, 108, 0.12), transparent 30%), linear-gradient(180deg, #f4f8f7 0%, #eef4f2 100%)',
      surface: '#ffffff',
      border: '#d3e5e0',
      accent: '#2d8a79',
      text: '#183f39',
      muted: '#5f7d78',
    },
  },
  {
    key: 'dataWorkbench1',
    slug: 'data-workbench-1',
    name: 'Data Workbench',
    useCase: 'Analisis data dan drilldown operasional',
    inspiration: 'Mixpanel/Amplitude',
    tone: 'light',
    status: 'scaffold',
    colorTokens: {
      background: 'linear-gradient(180deg, #f2f8f9 0%, #ebf4f5 100%)',
      surface: '#ffffff',
      border: '#cfe3e6',
      accent: '#2e91a0',
      text: '#134248',
      muted: '#5b7f84',
    },
  }
];

export const rolesConfig = {
  researcher: {
    id: "researcher",
    label: "Researcher",
    path: "/dashboard/researcher",
    welcome: "Welcome, Researcher",
    subtitle: "Explore satellite data and turn observations into scientific research insights.",
    description: "For academic and scientific research",
    iconName: "FlaskConical",
    primaryMetric: "24 Spectral Bands Active",
    defaultTool: "multispectral",
    focusAreas: [
      { id: "multispectral", label: "Multispectral Analysis" },
      { id: "change-detection", label: "Change Detection" },
      { id: "spectral-index", label: "Spectral Index Calculator" },
      { id: "dataset-comparison", label: "Dataset Comparison" }
    ],
    datasets: [
      { id: "sentinel-2", name: "Sentinel-2 L2A", resolution: "10m", bands: "13 Bands", revisit: "5 Days" },
      { id: "landsat-9", name: "Landsat 9 OLI-2", resolution: "30m", bands: "11 Bands", revisit: "8 Days" },
      { id: "modis", name: "MODIS Surface Reflectance", resolution: "250m", bands: "36 Bands", revisit: "Daily" }
    ],
    analytics: {
      multispectral: [
        { name: "NDVI Index Vegetation Trend", change: "+14.2%", status: "Optimal" },
        { name: "Thermal Anomaly Monitoring", change: "-2.1%", status: "Stable" },
        { name: "Coastal Erosion Rate", change: "+0.8mm/yr", status: "Monitored" }
      ],
      "change-detection": [
        { name: "Deforestation Surface Area", change: "1,248 km²", status: "Detected" },
        { name: "Confidence Assessment", change: "94.2%", status: "High" },
        { name: "Temporal Span Variance", change: "24 Months", status: "Verified" }
      ],
      "spectral-index": [
        { name: "Vegetation Health (NDVI)", change: "0.72", status: "Dense Canopy" },
        { name: "Water Content (NDWI)", change: "0.45", status: "Abundant" },
        { name: "Built-up Index (NDBI)", change: "-0.18", status: "Non-Urban" }
      ],
      "dataset-comparison": [
        { name: "Band Alignment Score", change: "99.4%", status: "Calibrated" },
        { name: "Spatial Variance Ratio", change: "3:1 Ratio", status: "Mapped" },
        { name: "Cross-Sensor Correlation", change: "0.98 R²", status: "Strong" }
      ]
    }
  },
  student: {
    id: "student",
    label: "Student",
    path: "/dashboard/student",
    welcome: "Welcome, Student",
    subtitle: "Learn remote sensing by exploring the Earth with AI-guided explanations.",
    description: "For learning and exploration",
    iconName: "GraduationCap",
    primaryMetric: "Level 2 Earth Scholar",
    defaultTool: "guided-explorer",
    focusAreas: [
      { id: "guided-explorer", label: "Guided Earth Explorer" },
      { id: "interactive-tutorials", label: "Interactive Satellite Tutorials" },
      { id: "ai-sandbox", label: "AI Query Sandbox" },
      { id: "imagery-layers", label: "Basic Imagery Layers" }
    ],
    datasets: [
      { id: "openearth-10m", name: "OpenEarth True-Color 10m", resolution: "10m", bands: "RGB", revisit: "7 Days" },
      { id: "global-elevation", name: "Global Elevation Model (SRTM)", resolution: "30m", bands: "DEM", revisit: "Static" },
      { id: "night-lights", name: "Night Lights Explorer (VIIRS)", resolution: "500m", bands: "DNB", revisit: "Monthly" }
    ],
    analytics: {
      "guided-explorer": [
        { name: "Learning Modules", change: "4 of 6 Completed", status: "In Progress" },
        { name: "Orbital Mechanics Score", change: "98%", status: "Mastered" },
        { name: "Exploration Hours", change: "14.5 hrs", status: "Active" }
      ],
      "interactive-tutorials": [
        { name: "Tutorial Step", change: "Step 3 of 5", status: "Active" },
        { name: "Quiz Score", change: "100%", status: "Passed" },
        { name: "Certificate Progress", change: "75%", status: "On Track" }
      ],
      "ai-sandbox": [
        { name: "Prompts Formulated", change: "18 Prompts", status: "Executed" },
        { name: "AI Feedback Score", change: "A+", status: "Excellent" },
        { name: "Syntax Mastery", change: "Geospatial V2", status: "Learned" }
      ],
      "imagery-layers": [
        { name: "Selected Layer", change: "True Color RGB", status: "Loaded" },
        { name: "Atmospheric Correction", change: "Standard BOA", status: "Applied" },
        { name: "Visual Clarity", change: "Cloud-free < 2%", status: "Optimal" }
      ]
    }
  },
  gisAnalyst: {
    id: "gis-analyst",
    label: "GIS Analyst",
    path: "/dashboard/gis-analyst",
    welcome: "Welcome, GIS Analyst",
    subtitle: "Turn satellite imagery into actionable geospatial vector layers & intelligence.",
    description: "For professional geospatial analysis",
    iconName: "Map",
    primaryMetric: "Spatial Resolution 0.5m",
    defaultTool: "vector-layers",
    focusAreas: [
      { id: "vector-layers", label: "Spatial Vector Layers" },
      { id: "lulc-classifier", label: "Land-Use / Land-Cover Classifier" },
      { id: "raster-blend", label: "Raster Layer Blend" },
      { id: "export-gis", label: "Export GeoTIFF / GeoJSON" }
    ],
    datasets: [
      { id: "highres-ortho", name: "High-Res Optical Ortho 0.5m", resolution: "0.5m", bands: "RGB+NIR", revisit: "Daily" },
      { id: "sar-radar", name: "SAR Sentinel-1 Radar (C-Band)", resolution: "10m", bands: "VV+VH", revisit: "6 Days" },
      { id: "cadastral-vector", name: "Vector Parcel Boundary Layer", resolution: "Vector", bands: "Polygons", revisit: "Static" }
    ],
    analytics: {
      "vector-layers": [
        { name: "Active Layer Features", change: "14,280 Polygons", status: "Loaded" },
        { name: "Coordinate System", change: "EPSG:4326 (WGS84)", status: "Projected" },
        { name: "Attribute Table Rows", change: "14.2k Entries", status: "Indexed" }
      ],
      "lulc-classifier": [
        { name: "Urban Canopy Coverage", change: "34.8%", status: "Classified" },
        { name: "Agricultural Zone LULC", change: "99.1% Accuracy", status: "Validated" },
        { name: "Water Body Extinction", change: "-0.4%", status: "Mapped" }
      ],
      "raster-blend": [
        { name: "Blend Mode", change: "Multispectral Multiply", status: "Active" },
        { name: "Opacity Level", change: "85%", status: "Adjusted" },
        { name: "Hillshade Relief", change: "3D Sun Altitude 45°", status: "Rendered" }
      ],
      "export-gis": [
        { name: "Export Queue", change: "GeoTIFF + GeoJSON", status: "Ready" },
        { name: "Compressed File Size", change: "42.8 MB", status: "Optimized" },
        { name: "Projection Metadata", change: "UTM Zone 43N", status: "Included" }
      ]
    }
  },
  organization: {
    id: "organization",
    label: "Organization",
    path: "/dashboard/organization",
    welcome: "Welcome to your Organization Workspace",
    subtitle: "Monitor enterprise multi-project assets and transform satellite data into executive decisions.",
    description: "For government, industry or enterprise",
    iconName: "Building2",
    primaryMetric: "12 Enterprise Satellites Live",
    defaultTool: "multi-project",
    focusAreas: [
      { id: "multi-project", label: "Multi-Project Monitoring" },
      { id: "team-access", label: "Team Access Control" },
      { id: "compliance-reports", label: "Compliance & ESG Reports" },
      { id: "constellation-feeds", label: "High-Frequency Constellation" }
    ],
    datasets: [
      { id: "planetscope", name: "Daily PlanetScope Constellation", resolution: "3m", bands: "8-Band RGB+NIR", revisit: "Daily" },
      { id: "infrastructure-monitor", name: "Infrastructure Change Monitor", resolution: "1m", bands: "Change Mask", revisit: "12 Hours" },
      { id: "enterprise-api", name: "Enterprise AI API Feeds", resolution: "Real-time", bands: "JSON Metrics", revisit: "Live Stream" }
    ],
    analytics: {
      "multi-project": [
        { name: "Monitored Assets", change: "142 Sites", status: "Secured" },
        { name: "Risk Detection Index", change: "Low Risk (0.02)", status: "Monitored" },
        { name: "Constellation Coverage", change: "100% Global", status: "Active" }
      ],
      "team-access": [
        { name: "Active Organization Users", change: "28 Members", status: "Authorized" },
        { name: "Workspace Role Distribution", change: "6 Admins, 22 Analysts", status: "Managed" },
        { name: "Audit Log Compliance", change: "SOC2 Type II", status: "Verified" }
      ],
      "compliance-reports": [
        { name: "ESG Carbon Sink Rating", change: "AA+ Rating", status: "Certified" },
        { name: "Deforestation Compliance", change: "Zero Violation", status: "Compliant" },
        { name: "Automated Monthly Audit", change: "Generated Today", status: "Published" }
      ],
      "constellation-feeds": [
        { name: "Alert Detection Speed", change: "< 15 mins", status: "Real-time" },
        { name: "Satellite Pass Frequency", change: "24 Passes / Day", status: "High Frequency" },
        { name: "Bandwidth Throughput", change: "1.2 GB/sec", status: "Streaming" }
      ]
    }
  }
};

export const getRoleById = (id) => {
  return Object.values(rolesConfig).find((r) => r.id === id) || rolesConfig.researcher;
};

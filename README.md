# EV Population Analytics Dashboard

A comprehensive analytics dashboard for visualizing Electric Vehicle (EV) population data with interactive charts, filtering capabilities, and detailed insights.

## 🚀 Live Dashboard

**[View Live Dashboard](https://evpopulation.netlify.app/)**

## 📊 Features

- **Interactive Analytics**: Real-time filtering and data exploration
- **Multiple Visualizations**: Bar charts, line charts, pie charts, and data tables
- **Key Metrics**: Total vehicles, manufacturers, average range, BEV vs PHEV distribution
- **Geographic Insights**: County and city-level EV distribution analysis
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Large Dataset Support**: Efficiently handles 50k+ records with CSV parsing

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with React Chart.js 2
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Charts/         # Chart components (Bar, Line, Pie)
│   ├── Header.tsx      # Dashboard header
│   ├── MetricCard.tsx  # Key metrics display
│   ├── DataTable.tsx   # Interactive data table
│   └── FilterControls.tsx # Data filtering interface
├── hooks/              # Custom React hooks
├── utils/              # Utility functions (CSV parser)
└── App.tsx            # Main application component
```

## 🔧 Setup Instructions

### Using Your CSV File (Recommended for 50k+ records)

1. **Place your CSV file** in the `public` folder as `ev-data.csv`
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development server**:
   ```bash
   npm run dev
   ```

#### CSV format expected by the parser

The parser reads by column position (header row is ignored for mapping). Ensure columns are in this order:

1) id, 2) vin, 3) county, 4) city, 5) state, 6) postalCode, 7) modelYear,
8) make, 9) model, 10) evType (BEV or PHEV), 11) electricRange, 12) baseMSRP,
13) legislativeDistrict, 14) dolVehicleId, 15) vehicleLocation, 16) electricUtility,
17) censusTract

Notes:
- Quoted fields with commas are supported.
- After deployment, ensure the file is available at the site root path `/ev-data.csv`.


## 📈 Key Insights Displayed

- **Total EV Population**: Complete count of registered electric vehicles
- **Manufacturer Analysis**: Top EV brands and market share
- **Adoption Trends**: Year-over-year EV registration growth
- **Vehicle Types**: BEV (Battery Electric) vs PHEV (Plug-in Hybrid) distribution
- **Geographic Distribution**: EV concentration by county and city
- **Range Analysis**: Average electric range and trends over time

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with intuitive navigation
- **Interactive Charts**: Hover effects, tooltips, and responsive design
- **Color-coded Data**: Consistent color scheme for easy data interpretation
- **Mobile Responsive**: Optimized layouts for all screen sizes
- **Performance Optimized**: Efficient data handling for large datasets

## 🚀 Deployment

The dashboard is deployed and publicly accessible at: **[https://evpopulation.netlify.app/]**

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Data Source

Electric Vehicle Population Dataset - Contains information about electric vehicles registered including:
- Vehicle specifications (make, model, year, range)
- Geographic data (city, county, state)
- Vehicle type (BEV/PHEV)
- Utility provider information

## 🤝 Assessment Submission

This dashboard was created for the MapUp Analytics Dashboard Assessment, demonstrating:
- **Analytical Depth**: Comprehensive EV market analysis
- **Dashboard Design**: Professional, user-friendly interface
- **Technical Implementation**: Scalable architecture for large datasets
- **Deployment**: Production-ready application

---

**Repository Access**: This repository includes collaborator access for MapUp evaluators as requested.

**Last Updated**: 27/08/2025

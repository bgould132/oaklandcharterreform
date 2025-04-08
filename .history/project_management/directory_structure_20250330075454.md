# Project Directory Structure

## Core Components

### Business Emissions
```
useeio_business_data/
├── scripts/                             # Business data processing scripts
│   ├── clean_business_employment.py     # QCEW data processing
│   ├── prepare_business_emissions.py    # USEEIO data processing
│   └── allocate_business_emissions_to_counties.py  # County-level allocation
├── business_emissions/                  # Output emissions data
│   └── by_county/                       # County-level emissions data
│       ├── business_emissions_by_county_stateior.csv
│       └── business_emissions_by_county_naics2.csv
├── biz_employment_data/                 # Business employment data
│   ├── processed/                       # Processed employment data
│   ├── naics2/                          # NAICS 2-digit level data
│   ├── stateior/                        # State IO data
│   └── raw/                             # Raw employment data sources
└── ACES data/                           # ACES business data
```

### Government Emissions
```
useeio_gov_data/
├── scripts/                             # Government data processing scripts
│   ├── clean_gov_employment.py          # CEW data processing
│   ├── prepare_gov_emissions.py         # USEEIO data processing
│   └── allocate_gov_emissions_to_counties.py  # County-level allocation
├── government_emissions/                # Output emissions data
│   └── by_county/                       # County-level emissions data
│       └── government_emissions_by_county.csv
├── government_employment/               # Government employment data
│   └── raw/                             # Raw employment data
├── defense_employment/                  # Defense employment data
│   └── raw/                             # Raw defense employment data
├── government_finance/                  # Government finance data
└── visualizations/                      # Visualization outputs
```

### International Emissions
```
useeio_intl_data/
├── scripts/                             # International data processing scripts
└── data/                                # International emissions data
```

### Household CBEI
```
household_cbei/
├── scripts/                             # CBEI processing scripts
│   ├── cbei.py                          # Main CBEI calculation script
│   ├── calcSyntheticCensusData.py       # Calculate synthetic census values
│   ├── extrapolateData.py               # Extrapolate ACS data
│   └── getCensusData_w_Errors.py        # Census API data collection
├── data/                                # CBEI data
│   ├── raw/                             # Raw data inputs
│   ├── geodata/                         # Geographic data
│   │   ├── maps/                        # Map data
│   │   └── utilities/                   # Utility service territories
│   └── uploads/                         # Uploaded data
├── coefficients/                        # Model coefficients
│   ├── USEEIO/                          # USEEIO model coefficients
│   │   ├── IO Tables/                   # Input-output tables
│   │   └── combined_USEEIO.csv          # Combined USEEIO data
│   └── custom_energy_EFs.csv            # Custom energy emission factors
├── references/                          # Reference materials
│   ├── block_lookups/                   # Block-level geographic lookups
│   ├── Raw CEX PUMD/                    # Consumer Expenditure Survey data
│   └── National Utility Data/           # Utility service territory data
├── bgdata/                              # Background data
│   └── fueleconomy/                     # Fuel economy data
└── data_old/                            # Legacy data (archived)
```

### Emission Factor Calculations
```
emission_factor_calcs/
├── useeio_naics/                        # USEEIO NAICS emission factor processing
│   ├── data/                            # Raw and processed USEEIO data
│   │   ├── raw/                         # Raw USEEIO Excel files (v1.1.1, v1.2, v1.3)
│   │   ├── processed/                   # Processed emission factors
│   │   │   ├── emission_factors/        # Extracted yearly industry EFs
│   │   │   ├── co2e_emission_factors/   # CO2e-converted emission factors
│   │   │   └── naics_emission_factors/  # Final NAICS EFs (2007-2023)
│   │   └── references/                  # Reference data (GWP values, price indices)
│   ├── scripts/                         # NAICS EF processing scripts
│   │   ├── 1_extract_emission_factors.py    # Extract raw EFs from Excel
│   │   ├── 2_calculate_co2e_emission_factors.py  # Convert GHGs to CO2e
│   │   └── 3_extrapolate_naics_emissions.py  # Create complete time series
│   ├── utils/                           # Utility functions
│   │   └── bea_conversion_utils.py      # BEA price index conversion utilities
│   └── naics_emission_factors_README.md # NAICS EF documentation
├── pce_bridge/                          # PCE bridge processing
│   ├── data/                            # PCE bridge data
│   │   ├── raw/                         # Raw PCE bridge tables
│   │   │   ├── PCEBridge_2017_DET.xlsx  # Detailed PCE bridge (2007, 2012, 2017)
│   │   │   ├── PCEBridge_1997-2023_SUM.xlsx  # Summary PCE data
│   │   │   └── IOUse_After_Redefinitions_PRO_2017_Detail.xlsx  # IO tables
│   │   ├── processed/                   # Processed PCE data
│   │   │   ├── transport_mode_shares.csv  # Transport mode shares
│   │   │   ├── pce_bridge_details.csv   # PCE with transport breakdowns
│   │   │   └── pce_bridge_complete.csv  # Complete PCE bridge (2007-2023)
│   │   └── sample/                      # Sample data for validation
│   ├── references/                      # Reference data
│   │   ├── NIPA Crosswalk.csv           # NIPA detailed to summary crosswalk
│   │   └── pce_scaling_factors.csv      # Scaling factors for non-benchmark years
│   ├── scripts/                         # PCE processing scripts
│   │   ├── 1_calculate_transport_shares.py  # Calculate transport mode shares
│   │   ├── 2_generate_pce_transport_details.py  # Apply shares to PCE
│   │   ├── 3_generate_scaling_factors.py  # Generate scaling factors
│   │   └── 4_scale_pce_with_summary.py  # Create complete PCE dataset
│   └── pce_bridge_README.md             # PCE bridge documentation
└── ecodatalab_efs/                      # EcoDataLab emission factors
    ├── data/                            # EcoDataLab EF data
    │   ├── sample/                      # Sample data
    │   │   └── PCEBridge_2012_Consumption_Crosswalk.csv  # Consumption crosswalk
    │   └── processed/                   # Processed emission factors
    │       ├── pce_bridge_with_subcategories.csv  # PCE with subcategories
    │       ├── pce_naics_emissions.csv   # PCE with emissions
    │       ├── consumption_emission_factors.csv  # Final emission factors
    │       └── consumption_emission_factors_detailed.csv  # Detailed EFs
    ├── scripts/                         # EF processing scripts
    │   ├── 1_add_consumption_subcategories.py  # Add consumption subcategories
    │   ├── 2_calculate_pce_naics_emissions.py  # Calculate emissions
    │   └── 3_generate_consumption_emission_factors.py  # Generate EFs
    └── ecodatalab_efs_README.md         # EcoDataLab EF documentation
```

### Model Generator
```
model_generator/
├── CoolClimate work/                    # CoolClimate model integration
└── data/                                # Model generator data
```

### Impact Factors
```
useeio_impact_factors/                   # USEEIO impact factors
```

### References
```
references/
├── USEEIO/                              # USEEIO reference data
│   └── output/                          # USEEIO output files
└── createUSEEIOEFs.py                   # USEEIO emission factor creation
```

### Scripts and SQL
```
scripts/
├── SQL/                                 # SQL scripts
│   └── createUSSEIOTables.sql           # Database schema for USEEIO
├── analyze-files.sh                     # Script for analyzing files
└── update_directory.sh                  # Directory structure update utility
```

### Project Management
```
project_management/
├── project_overview.md                  # Project documentation
├── task_list.md                         # Task tracking
├── meeting_notes.md                     # Meeting summaries
├── directory_structure.md               # This file
├── international_emissions.md           # International emissions documentation
├── biz_emissions_reallocation.md        # Business emissions reallocation
├── aces_business_emissions_allocation_prd.md  # ACES allocation PRD
└── depr_used_other_emissions_allocation_prd.md  # Deprecated emissions PRD
```

## Data Processing Workflow

### Census and ACS Data
1. `getCensusData_w_Errors.py` - Fetches ACS data from Census API
2. `extrapolateData.py` - Extrapolates ACS5 data forward and integrates ACS1 data
3. `calcSyntheticCensusData.py` - Calculates synthetic data values

### CBEI Calculation
1. `cbei.py` - Main CBEI calculation script
2. `buildDashboardData.py` - Creates unified output files
3. `uploadUSEEIOdata.py` - Uploads processed data to database

### Emissions Allocation
1. Clean employment data (business and government)
2. Prepare emissions data from USEEIO
3. Allocate emissions to counties based on employment shares

## Key Features

### Business Emissions Processing
- County-level allocation based on employment shares
- Handles both stateior and NAICS-2 aggregations
- ACES business data integration
- Proper GEOID/GEOIDYEAR generation for all rows
- Robust data validation and quality checks

### Government Emissions Processing
- County-level allocation using employment data
- Handles defense, nondefense, and state/local categories
- Special case handling for independent cities
- Comprehensive data validation

### International Emissions
- Processing of international emissions data
- Integration with domestic emissions model

### Household CBEI
- Census and ACS data processing
- Energy consumption modeling
- Vehicle miles traveled (VMT) calculations
- Consumption-based emissions calculations
- Geographic data integration

### Data Quality
- Input validation checks
- Processing step validation
- Output data quality verification
- Geographic identifier validation

## File Naming Conventions

### Data Files
- Raw data: Original source files in raw_data/ or data/raw/
- Processed data: Clean, standardized files in respective directories
- Output files: Final results in by_county/ directories

### Scripts
- clean_*.py: Data cleaning and standardization
- prepare_*.py: Data preparation and transformation
- allocate_*.py: Final processing and allocation
- build*.py: Output file creation
- get*.py: Data collection scripts

### Documentation
- All documentation in .md format
- Stored in project_management/ directory
- Clear, descriptive filenames

## Development and Utility Scripts
- analyze-files.sh: Tool for analyzing specific parts of the codebase
- update_directory.sh: Updates the directory structure documentation
- uploadUSEEIOdata.py: Uploads processed data to database
```

Generated on: Fri Jan  3 00:27:58 PST 2025

Note: 
- Only showing relevant files (*.py, *.sh, *.md, *.csv, *.json, *.yaml, *.yml)
- Hidden files and directories are excluded
- Directories are marked with trailing slashes (**)
- data folder not shown

# Project Overview: EcoDataLab's Consumption-Based Emissions Inventory Model

## Background

EcoDataLab is a consulting firm that works with cities, counties, and state governments to help them understand their community's consumption-based emissions across household, government, and business sectors. A consumption-based emissions inventory (CBEI) accounts for all greenhouse gas emissions associated with goods and services consumed within a geographic area, regardless of where those emissions physically occur.

## Project Purpose

This codebase generates the EcoDataLab Consumption-Based Emissions Inventory for U.S. locations at various geographic levels (cities, states, counties, tracts, and block groups). It processes raw data from multiple federal sources, applies sophisticated modeling techniques, and produces standardized emissions outputs that can be visualized in the EcoDataLab CBEI Dashboard.

## Technical Approach

### Data Sources and Methodology

1. **Household Emissions**: Uses a custom EcoDataLab Consumption Model built on regression analysis of:
   - Bureau of Labor Statistics (BLS) Consumer Expenditures Survey (CEX)
   - Energy Information Agency (EIA) Residential Energy Consumption Survey (RECS)
   - Department of Transportation (DOT) National Household Transportation Survey (NHTS)
   - American Community Survey (ACS) data from the U.S. Census Bureau

2. **Government Emissions**: Uses US Environmentally Extended Input-Output Model (USEEIO) State Model data combined with:
   - Government employment data from the Census of Employment and Wages (CEW)
   - Defense employment data
   - Government financial data

3. **Business Emissions**: Uses USEEIO State Model data combined with:
   - County Business Patterns (CBP) data
   - Quarterly Census of Employment and Wages (QCEW) data
   - Annual Capital Expenditures Survey (ACES) data

### Core Components

#### 1. Household CBEI (`household_cbei/`)
Estimates household consumption, energy use, and transportation activities along with associated emissions.

- **Key Scripts**:
  - `getCensusData_w_Errors.py`: Collects ACS data using Census API
  - `extrapolateData.py`: Projects ACS5 data forward with ACS1 integration
  - `calcSyntheticCensusData.py`: Calculates derived metrics (e.g., HDD/CDD)
  - `cbei.py`: Main household emissions calculation script

- **Technical Notes**:
  - Uses regression models to estimate consumption based on demographic factors
  - Handles missing data through imputation and extrapolation
  - Applies custom emission factors for different consumption categories

#### 2. Government Emissions (`useeio_gov_data/`)
Calculates emissions from government consumption and fixed investments.

- **Key Scripts**:
  - `clean_gov_employment.py`: Processes CEW data
  - `prepare_gov_emissions.py`: Processes USEEIO data
  - `allocate_gov_emissions_to_counties.py`: Allocates emissions to counties

- **Technical Notes**:
  - Uses employment shares to allocate emissions to geographic areas
  - Handles different government categories (federal defense, federal nondefense, state/local)
  - Special handling for geographic edge cases (Virginia independent cities, etc.)

#### 3. Business Emissions (`useeio_business_data/`)
Calculates emissions from business fixed investments and inventory changes.

- **Key Scripts**:
  - `clean_business_employment.py`: Processes QCEW data
  - `prepare_business_emissions.py`: Processes USEEIO data
  - `allocate_business_emissions_to_counties.py`: Allocates emissions to counties

- **Technical Notes**:
  - Processes both stateior and NAICS-2 level aggregations
  - Handles ACES data for industry-specific capital expenditure patterns
  - Implements methodology for handling non-disclosed data

### Supplemental Components

#### 1. International Emissions (`useeio_intl_data/`)
Estimates emissions from international imports.

#### 2. Impact Factors (`useeio_impact_factors/`)
Will contain code for estimating non-GHG impacts of consumption (health, land use, etc.).

#### 3. Emission Factor Calculations (`emission_factor_calcs/`)
Combines BEA PCE data with USEEIO Supply Chain Emission Factors to generate emission factors for household consumption categories.

#### 4. Model Generator (`model_generator/`)
Will contain code for generating and updating household consumption/activity models.

## Data Processing Workflow

### 1. Data Collection and Preparation
- Census and ACS data collected via API or manual download
- Employment data prepared and standardized
- USEEIO model data processed for each component

### 2. Core Processing
- Household consumption and activities modeled
- Government emissions calculated and allocated
- Business emissions calculated and allocated

### 3. Integration and Output
- Results combined across components
- Standardized output files generated
- Data uploaded to visualization platform

## Guidance for AI Agents

When writing or modifying scripts for this project, follow these guidelines:

### General Coding Standards

1. **File Organization**:
   - Maintain the established directory structure
   - Place raw data inputs in appropriate `raw/` directories
   - Store processed outputs in designated output directories

2. **Code Structure**:
   - Use modular functions with clear documentation
   - Implement consistent error handling and logging
   - Add validation checks throughout the processing pipeline

3. **Naming Conventions**:
   - Scripts: `verb_noun.py` (e.g., `clean_gov_employment.py`)
   - Data files: Descriptive with geography level and year (e.g., `government_emissions_by_county_2022.csv`)
   - Functions: Use descriptive verb_noun format (e.g., `calculate_emission_factors()`)

### Component-Specific Guidelines

#### Household CBEI Scripts

- Handle missing values explicitly; don't allow silent NaN propagation
- Implement geographic identifier validation
- Use standardized column names for demographic variables
- Document regression model assumptions and limitations
- Always validate output data structure against expected schema

#### Government & Business Emissions Scripts

- Properly handle GEOID and GEOIDYEAR generation
- Process geographic edge cases (independent cities, etc.)
- Document allocation methodologies clearly
- Implement robust handling of non-disclosed data
- Apply standard data quality checks on inputs and outputs

### Data Processing Best Practices

1. **Data Validation**:
   - Validate all input data before processing
   - Check for expected columns and data types
   - Validate geographic identifiers against reference lists
   - Implement totals checks to ensure data integrity

2. **Performance Optimization**:
   - Use vectorized operations where possible
   - Consider chunking for large datasets
   - Implement appropriate caching strategies
   - Add progress tracking for long-running operations

3. **Geographic Processing**:
   - Use standardized GEOID formats consistently
   - Handle geographic relationship mappings carefully
   - Validate geographic hierarchy relationships
   - Document any geographic-specific exceptions

4. **Documentation**:
   - Add detailed docstrings to all functions
   - Document data sources and limitations
   - Explain methodology choices and assumptions
   - Include validation steps and expected outputs

### Technical Implementation Details

1. **Excel File Processing**:
   - Use `python_calamine` for Excel file handling
   - Use `workbook = CalamineWorkbook.from_path(input_file)`
   - Use `raw_data = workbook.get_sheet_by_name("sheet_name").to_python()`

2. **Geographic Data**:
   - Use geopandas for spatial operations
   - Store coordinate reference system (CRS) information
   - Document any geographic simplifications or approximations

3. **Output Generation**:
   - Use standardized column naming
   - Include metadata rows where appropriate
   - Follow consistent file format conventions

4. **Database Integration**:
   - Follow SQL schema defined in createUSSEIOTables.sql
   - Use parameterized queries for database operations
   - Implement transaction handling for database updates

## Current Priorities

Based on the task list and meeting notes, current development priorities include:

1. **High Priority**:
   - Improving business emissions allocation methodology
   - Implementing automated testing
   - Enhancing documentation
   - Adding cross-validation between components

2. **Medium Priority**:
   - Restructuring CBEI model for parallel processing
   - Creating integration points between components
   - Implementing caching for intermediate results

3. **Low Priority**:
   - Improving future projections capabilities
   - Adding detailed validation checks
   - Implementing API integrations

## Project Roadmap

Future enhancements planned for this project include:

1. Developing the useeio impact factors calculations
2. Building a robust model generator
3. Developing a new useeio direct emissions calculator
4. Potentially analyzing more details about business purchases and activity
5. Implementing advanced data visualization capabilities

## Getting Started for New Contributors

1. Familiarize yourself with the directory structure and component relationships
2. Review the README.md files in each component directory
3. Understand the data flow from collection to final output
4. Check the task_list.md for current priorities
5. Follow the established coding conventions and best practices

For questions or clarification, refer to meeting_notes.md and other documentation in the project_management directory.
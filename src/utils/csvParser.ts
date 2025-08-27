export interface EVRecord {
  id: string;
  vin: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: number;
  make: string;
  model: string;
  evType: 'BEV' | 'PHEV';
  electricRange: number;
  baseMSRP: number;
  legislativeDistrict: string;
  dolVehicleId: string;
  vehicleLocation: string;
  electricUtility: string;
  censusTract: string;
}

export const parseCSVData = (csvText: string): EVRecord[] => {
  const lines = csvText.split('\n');
  const rawHeaders = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  // Normalize headers to be resilient to naming differences
  const normalizedHeaders = rawHeaders.map(h =>
    h
      .toLowerCase()
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );

  const findIndex = (candidates: string[]): number => {
    for (const candidate of candidates) {
      const idx = normalizedHeaders.indexOf(candidate);
      if (idx !== -1) return idx;
    }
    return -1;
  };

  // Common header variants from WA EV dataset and our internal schema
  const idxId = findIndex(['id']);
  const idxVin = findIndex(['vin', 'vin 1-10']);
  const idxCounty = findIndex(['county']);
  const idxCity = findIndex(['city']);
  const idxState = findIndex(['state']);
  const idxPostal = findIndex(['postalcode', 'postal code', 'zip']);
  const idxModelYear = findIndex(['modelyear', 'model year', 'year']);
  const idxMake = findIndex(['make']);
  const idxModel = findIndex(['model']);
  const idxEvType = findIndex(['evtype', 'electric vehicle type']);
  const idxRange = findIndex(['electricrange', 'electric range', 'range']);
  const idxMsrp = findIndex(['basemsrp', 'base msrp', 'msrp']);
  const idxLegislative = findIndex(['legislativedistrict', 'legislative district']);
  const idxDolId = findIndex(['dolvehicleid', 'dol vehicle id']);
  const idxVehicleLocation = findIndex(['vehiclelocation', 'vehicle location']);
  const idxUtility = findIndex(['electricutility', 'electric utility']);
  const idxCensus = findIndex(['censustract', '2020 census tract']);

  const records: EVRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV parsing with potential commas in quoted fields
    const values = parseCSVLine(line);

    // Skip if we clearly have fewer values than headers present
    if (values.length < rawHeaders.length) continue;

    try {
      const vinValue = idxVin !== -1 ? values[idxVin] : '';
      const evTypeRaw = idxEvType !== -1 ? values[idxEvType] : '';
      const evTypeNormalized = evTypeRaw && evTypeRaw.toUpperCase().includes('PHEV') ? 'PHEV' : 'BEV';

      const record: EVRecord = {
        id: idxId !== -1 ? (values[idxId] || `record_${i}`) : (vinValue || `record_${i}`),
        vin: vinValue,
        county: idxCounty !== -1 ? values[idxCounty] : '',
        city: idxCity !== -1 ? values[idxCity] : '',
        state: idxState !== -1 ? values[idxState] : '',
        postalCode: idxPostal !== -1 ? values[idxPostal] : '',
        modelYear: idxModelYear !== -1 ? (parseInt(values[idxModelYear]) || 0) : 0,
        make: idxMake !== -1 ? values[idxMake] : '',
        model: idxModel !== -1 ? values[idxModel] : '',
        evType: evTypeNormalized as 'BEV' | 'PHEV',
        electricRange: idxRange !== -1 ? (parseInt(values[idxRange]) || 0) : 0,
        baseMSRP: idxMsrp !== -1 ? (parseFloat(values[idxMsrp]) || 0) : 0,
        legislativeDistrict: idxLegislative !== -1 ? values[idxLegislative] : '',
        dolVehicleId: idxDolId !== -1 ? values[idxDolId] : '',
        vehicleLocation: idxVehicleLocation !== -1 ? values[idxVehicleLocation] : '',
        electricUtility: idxUtility !== -1 ? values[idxUtility] : '',
        censusTract: idxCensus !== -1 ? values[idxCensus] : ''
      };

      records.push(record);
    } catch (error) {
      console.warn(`Error parsing line ${i}:`, error);
    }
  }

  return records;
};

// Helper function to parse CSV line with quoted fields
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
};

export const getAnalytics = (data: EVRecord[]) => {
  const totalVehicles = data.length;
  
  const makeDistribution = data.reduce((acc, record) => {
    acc[record.make] = (acc[record.make] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const yearDistribution = data.reduce((acc, record) => {
    acc[record.modelYear] = (acc[record.modelYear] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const evTypeDistribution = data.reduce((acc, record) => {
    acc[record.evType] = (acc[record.evType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const countyDistribution = data.reduce((acc, record) => {
    acc[record.county] = (acc[record.county] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const averageRange = totalVehicles > 0 
    ? data.reduce((sum, record) => sum + record.electricRange, 0) / totalVehicles
    : 0;
  
  const topMakes = Object.entries(makeDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  const topCounties = Object.entries(countyDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
  
  return {
    totalVehicles,
    makeDistribution,
    yearDistribution,
    evTypeDistribution,
    countyDistribution,
    averageRange: Math.round(averageRange),
    topMakes,
    topCounties,
    uniqueMakes: Object.keys(makeDistribution).length,
    bevCount: evTypeDistribution['BEV'] || 0,
    phevCount: evTypeDistribution['PHEV'] || 0,
    bevPercentage: totalVehicles > 0 ? Math.round((evTypeDistribution['BEV'] || 0) / totalVehicles * 100) : 0,
    phevPercentage: totalVehicles > 0 ? Math.round((evTypeDistribution['PHEV'] || 0) / totalVehicles * 100) : 0
  };
};
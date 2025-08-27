// Sample EV Population Data - In production, this would come from your CSV file
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

// Sample data representing typical EV population patterns
export const evData: EVRecord[] = [
  // Tesla Model 3 entries
  { id: '1', vin: 'VIN001', county: 'King', city: 'Seattle', state: 'WA', postalCode: '98101', modelYear: 2023, make: 'TESLA', model: 'MODEL 3', evType: 'BEV', electricRange: 358, baseMSRP: 46990, legislativeDistrict: '43', dolVehicleId: 'DOL001', vehicleLocation: 'POINT (-122.33 47.61)', electricUtility: 'CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA)', censusTract: '53033005200' },
  { id: '2', vin: 'VIN002', county: 'King', city: 'Bellevue', state: 'WA', postalCode: '98004', modelYear: 2022, make: 'TESLA', model: 'MODEL 3', evType: 'BEV', electricRange: 358, baseMSRP: 43990, legislativeDistrict: '41', dolVehicleId: 'DOL002', vehicleLocation: 'POINT (-122.20 47.61)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033022603' },
  { id: '3', vin: 'VIN003', county: 'Snohomish', city: 'Bothell', state: 'WA', postalCode: '98011', modelYear: 2023, make: 'TESLA', model: 'MODEL 3', evType: 'BEV', electricRange: 358, baseMSRP: 46990, legislativeDistrict: '1', dolVehicleId: 'DOL003', vehicleLocation: 'POINT (-122.21 47.76)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53061051912' },
  
  // Tesla Model Y entries
  { id: '4', vin: 'VIN004', county: 'King', city: 'Seattle', state: 'WA', postalCode: '98115', modelYear: 2023, make: 'TESLA', model: 'MODEL Y', evType: 'BEV', electricRange: 330, baseMSRP: 52990, legislativeDistrict: '46', dolVehicleId: 'DOL004', vehicleLocation: 'POINT (-122.31 47.68)', electricUtility: 'CITY OF SEATTLE - (WA)', censusTract: '53033001800' },
  { id: '5', vin: 'VIN005', county: 'Pierce', city: 'Tacoma', state: 'WA', postalCode: '98402', modelYear: 2022, make: 'TESLA', model: 'MODEL Y', evType: 'BEV', electricRange: 330, baseMSRP: 49990, legislativeDistrict: '27', dolVehicleId: 'DOL005', vehicleLocation: 'POINT (-122.46 47.26)', electricUtility: 'CITY OF TACOMA - (WA)', censusTract: '53053007700' },
  
  // Nissan Leaf entries
  { id: '6', vin: 'VIN006', county: 'King', city: 'Redmond', state: 'WA', postalCode: '98052', modelYear: 2021, make: 'NISSAN', model: 'LEAF', evType: 'BEV', electricRange: 226, baseMSRP: 31600, legislativeDistrict: '48', dolVehicleId: 'DOL006', vehicleLocation: 'POINT (-122.12 47.67)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033022701' },
  { id: '7', vin: 'VIN007', county: 'Snohomish', city: 'Lynnwood', state: 'WA', postalCode: '98037', modelYear: 2020, make: 'NISSAN', model: 'LEAF', evType: 'BEV', electricRange: 226, baseMSRP: 29990, legislativeDistrict: '32', dolVehicleId: 'DOL007', vehicleLocation: 'POINT (-122.31 47.82)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53061052100' },
  { id: '8', vin: 'VIN008', county: 'King', city: 'Kirkland', state: 'WA', postalCode: '98033', modelYear: 2021, make: 'NISSAN', model: 'LEAF', evType: 'BEV', electricRange: 226, baseMSRP: 31600, legislativeDistrict: '45', dolVehicleId: 'DOL008', vehicleLocation: 'POINT (-122.20 47.68)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033022604' },
  
  // Chevrolet Bolt entries
  { id: '9', vin: 'VIN009', county: 'King', city: 'Renton', state: 'WA', postalCode: '98055', modelYear: 2022, make: 'CHEVROLET', model: 'BOLT EV', evType: 'BEV', electricRange: 259, baseMSRP: 25600, legislativeDistrict: '11', dolVehicleId: 'DOL009', vehicleLocation: 'POINT (-122.21 47.48)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033029300' },
  { id: '10', vin: 'VIN010', county: 'Pierce', city: 'Federal Way', state: 'WA', postalCode: '98003', modelYear: 2021, make: 'CHEVROLET', model: 'BOLT EV', evType: 'BEV', electricRange: 259, baseMSRP: 31000, legislativeDistrict: '30', dolVehicleId: 'DOL010', vehicleLocation: 'POINT (-122.31 47.32)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53053029201' },
  
  // Toyota Prius Prime (PHEV) entries
  { id: '11', vin: 'VIN011', county: 'King', city: 'Seattle', state: 'WA', postalCode: '98103', modelYear: 2023, make: 'TOYOTA', model: 'PRIUS PRIME', evType: 'PHEV', electricRange: 44, baseMSRP: 32350, legislativeDistrict: '46', dolVehicleId: 'DOL011', vehicleLocation: 'POINT (-122.34 47.67)', electricUtility: 'CITY OF SEATTLE - (WA)', censusTract: '53033001300' },
  { id: '12', vin: 'VIN012', county: 'Snohomish', city: 'Edmonds', state: 'WA', postalCode: '98020', modelYear: 2022, make: 'TOYOTA', model: 'PRIUS PRIME', evType: 'PHEV', electricRange: 44, baseMSRP: 29185, legislativeDistrict: '32', dolVehicleId: 'DOL012', vehicleLocation: 'POINT (-122.38 47.81)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53061051800' },
  
  // BMW i3 entries
  { id: '13', vin: 'VIN013', county: 'King', city: 'Mercer Island', state: 'WA', postalCode: '98040', modelYear: 2021, make: 'BMW', model: 'I3', evType: 'BEV', electricRange: 153, baseMSRP: 44450, legislativeDistrict: '41', dolVehicleId: 'DOL013', vehicleLocation: 'POINT (-122.23 47.57)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033024400' },
  { id: '14', vin: 'VIN014', county: 'King', city: 'Sammamish', state: 'WA', postalCode: '98074', modelYear: 2020, make: 'BMW', model: 'I3', evType: 'BEV', electricRange: 153, baseMSRP: 42400, legislativeDistrict: '5', dolVehicleId: 'DOL014', vehicleLocation: 'POINT (-122.09 47.62)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033022900' },
  
  // Audi e-tron entries
  { id: '15', vin: 'VIN015', county: 'King', city: 'Medina', state: 'WA', postalCode: '98039', modelYear: 2022, make: 'AUDI', model: 'E-TRON', evType: 'BEV', electricRange: 222, baseMSRP: 65900, legislativeDistrict: '41', dolVehicleId: 'DOL015', vehicleLocation: 'POINT (-122.24 47.62)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033024401' },
  { id: '16', vin: 'VIN016', county: 'Pierce', city: 'Gig Harbor', state: 'WA', postalCode: '98335', modelYear: 2023, make: 'AUDI', model: 'E-TRON', evType: 'BEV', electricRange: 222, baseMSRP: 67400, legislativeDistrict: '26', dolVehicleId: 'DOL016', vehicleLocation: 'POINT (-122.58 47.33)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53053092200' },
  
  // Ford Mustang Mach-E entries
  { id: '17', vin: 'VIN017', county: 'Snohomish', city: 'Mill Creek', state: 'WA', postalCode: '98012', modelYear: 2023, make: 'FORD', model: 'MUSTANG MACH-E', evType: 'BEV', electricRange: 312, baseMSRP: 45995, legislativeDistrict: '1', dolVehicleId: 'DOL017', vehicleLocation: 'POINT (-122.24 47.86)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53061052000' },
  { id: '18', vin: 'VIN018', county: 'King', city: 'Issaquah', state: 'WA', postalCode: '98027', modelYear: 2022, make: 'FORD', model: 'MUSTANG MACH-E', evType: 'BEV', electricRange: 312, baseMSRP: 43895, legislativeDistrict: '5', dolVehicleId: 'DOL018', vehicleLocation: 'POINT (-122.03 47.53)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033029700' },
  
  // Hyundai Ioniq entries
  { id: '19', vin: 'VIN019', county: 'King', city: 'Burien', state: 'WA', postalCode: '98166', modelYear: 2023, make: 'HYUNDAI', model: 'IONIQ 5', evType: 'BEV', electricRange: 303, baseMSRP: 41245, legislativeDistrict: '34', dolVehicleId: 'DOL019', vehicleLocation: 'POINT (-122.35 47.47)', electricUtility: 'CITY OF SEATTLE - (WA)', censusTract: '53033030800' },
  { id: '20', vin: 'VIN020', county: 'Pierce', city: 'Lakewood', state: 'WA', postalCode: '98499', modelYear: 2022, make: 'HYUNDAI', model: 'IONIQ 5', evType: 'BEV', electricRange: 303, baseMSRP: 39700, legislativeDistrict: '29', dolVehicleId: 'DOL020', vehicleLocation: 'POINT (-122.52 47.17)', electricUtility: 'CITY OF TACOMA - (WA)', censusTract: '53053061100' },
  
  // Additional entries for better data variety
  { id: '21', vin: 'VIN021', county: 'King', city: 'Seattle', state: 'WA', postalCode: '98112', modelYear: 2019, make: 'TESLA', model: 'MODEL S', evType: 'BEV', electricRange: 405, baseMSRP: 79990, legislativeDistrict: '43', dolVehicleId: 'DOL021', vehicleLocation: 'POINT (-122.30 47.63)', electricUtility: 'CITY OF SEATTLE - (WA)', censusTract: '53033006200' },
  { id: '22', vin: 'VIN022', county: 'King', city: 'Woodinville', state: 'WA', postalCode: '98072', modelYear: 2020, make: 'TESLA', model: 'MODEL X', evType: 'BEV', electricRange: 351, baseMSRP: 89990, legislativeDistrict: '1', dolVehicleId: 'DOL022', vehicleLocation: 'POINT (-122.16 47.76)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033022800' },
  { id: '23', vin: 'VIN023', county: 'Snohomish', city: 'Everett', state: 'WA', postalCode: '98201', modelYear: 2021, make: 'VOLKSWAGEN', model: 'ID.4', evType: 'BEV', electricRange: 260, baseMSRP: 39995, legislativeDistrict: '38', dolVehicleId: 'DOL023', vehicleLocation: 'POINT (-122.20 47.98)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53061041800' },
  { id: '24', vin: 'VIN024', county: 'Pierce', city: 'Puyallup', state: 'WA', postalCode: '98371', modelYear: 2022, make: 'KIA', model: 'EV6', evType: 'BEV', electricRange: 310, baseMSRP: 40900, legislativeDistrict: '25', dolVehicleId: 'DOL024', vehicleLocation: 'POINT (-122.29 47.19)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53053071000' },
  { id: '25', vin: 'VIN025', county: 'King', city: 'Tukwila', state: 'WA', postalCode: '98188', modelYear: 2023, make: 'RIVIAN', model: 'R1T', evType: 'BEV', electricRange: 314, baseMSRP: 67500, legislativeDistrict: '33', dolVehicleId: 'DOL025', vehicleLocation: 'POINT (-122.26 47.47)', electricUtility: 'PUGET SOUND ENERGY INC', censusTract: '53033029400' }
];

// Analytics functions
export const getAnalytics = () => {
  const totalVehicles = evData.length;
  
  const makeDistribution = evData.reduce((acc, record) => {
    acc[record.make] = (acc[record.make] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const yearDistribution = evData.reduce((acc, record) => {
    acc[record.modelYear] = (acc[record.modelYear] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const evTypeDistribution = evData.reduce((acc, record) => {
    acc[record.evType] = (acc[record.evType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const countyDistribution = evData.reduce((acc, record) => {
    acc[record.county] = (acc[record.county] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const averageRange = evData.reduce((sum, record) => sum + record.electricRange, 0) / totalVehicles;
  
  const topMakes = Object.entries(makeDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
    
  const topCounties = Object.entries(countyDistribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  
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
    bevPercentage: Math.round((evTypeDistribution['BEV'] || 0) / totalVehicles * 100),
    phevPercentage: Math.round((evTypeDistribution['PHEV'] || 0) / totalVehicles * 100)
  };
};
// Helper utilities for Desired Location System & Geolocation

// Known coordinates for job locations in JobFinder
export const JOB_COORDINATES = {
  'job-01': { lat: 13.7466, lng: 100.5393, area: 'Bangkok (CentralWorld / Siam)' },
  'job-02': { lat: 13.7259, lng: 100.5804, area: 'Bangkok (T-One, Thong Lo)' },
  'job-03': { lat: 13.7563, lng: 100.5018, area: 'Worldwide Remote', isRemote: true },
  'job-04': { lat: 13.7370, lng: 100.5604, area: 'Bangkok (BTS Asok)' },
  'job-05': { lat: 13.7280, lng: 100.5340, area: 'Bangkok (Silom)' },
  'job-06': { lat: 13.7570, lng: 100.5694, area: 'Bangkok (MRT Rama 9)' },
  'job-07': { lat: 13.7563, lng: 100.5018, area: 'Worldwide Remote / Bangkok Hub', isRemote: true },
  'job-08': { lat: 13.7198, lng: 100.5298, area: 'Bangkok (AIA Sathorn Tower)' },
  'job-09': { lat: 13.9110, lng: 100.5500, area: 'Nonthaburi (KBTG Campus)' },
  'job-10': { lat: 13.7485, lng: 100.5640, area: 'Bangkok (Singha Complex, Asoke)' },
  'job-11': { lat: 13.7770, lng: 100.5730, area: 'Bangkok (Huai Khwang)' },
  'job-12': { lat: 13.7440, lng: 100.5435, area: 'Bangkok (Central Chidlom)' },
  'job-13': { lat: 35.6265, lng: 139.6267, area: 'Tokyo, Japan (Crimson House)' },
  'job-14': { lat: 1.2987, lng: 103.7876, area: 'Singapore / Remote Thailand', isRemote: true },
  'job-15': { lat: 18.7961, lng: 98.9687, area: 'Chiang Mai / Remote', isRemote: true },
  'job-16': { lat: 13.8285, lng: 100.5645, area: 'Bangkok (SCB Park, Ratchayothin)' },
  'job-17': { lat: 18.7961, lng: 98.9687, area: 'Chiang Mai / 100% Remote TH', isRemote: true },
  'job-18': { lat: 13.3611, lng: 100.9847, area: 'Chonburi / EEC Industrial Zone' },
  'job-19': { lat: 37.7749, lng: -122.4194, area: 'Worldwide Remote', isRemote: true },
  'job-20': { lat: 13.7259, lng: 100.5804, area: 'Bangkok (Thong Lo)' },
  'job-21': { lat: 13.6850, lng: 100.6110, area: 'Bangkok (True Digital Park, Punnawithi)' },
  'job-22': { lat: 7.8804, lng: 98.3923, area: 'Remote Thailand (Phuket / BKK)', isRemote: true },
  'job-23': { lat: 13.7435, lng: 100.5470, area: 'Bangkok (Ploenchit)' },
  'job-24': { lat: 13.7563, lng: 100.5018, area: 'Bangkok / Remote', isRemote: true },
  'job-25': { lat: 13.7563, lng: 100.5018, area: 'Worldwide Remote (TH/SG Base)', isRemote: true },
  'job-26': { lat: 13.7450, lng: 100.5410, area: 'Bangkok (Gaysorn Tower, Chidlom)' },
  'job-27': { lat: 13.7563, lng: 100.5018, area: 'Bangkok / Hybrid' },
  'job-28': { lat: 13.7225, lng: 100.5280, area: 'Bangkok (Sathorn Square)' },
  'job-29': { lat: 13.7797, lng: 100.5447, area: 'Bangkok (BTS Ari)' },
  'job-30': { lat: 13.7563, lng: 100.5018, area: 'Worldwide 100% Remote', isRemote: true },
  'job-31': { lat: 13.7214, lng: 100.5298, area: 'Bangkok (Sathorn)' },
  'job-32': { lat: 13.7505, lng: 100.5590, area: 'Bangkok (Thanapoom Tower, Petchburi)' },
  'job-33': { lat: 13.7370, lng: 100.5604, area: 'Bangkok (Asoke)' },
  'job-34': { lat: 1.2987, lng: 103.7876, area: 'Singapore (Fusionopolis HQ)' },
  'job-35': { lat: 18.7961, lng: 98.9687, area: 'Remote Thailand', isRemote: true },
  'job-36': { lat: 13.7214, lng: 100.5298, area: 'Bangkok (Sathorn / Hybrid 50%)' }
};

// Popular preset locations for quick 1-click changing
export const PRESET_LOCATIONS = [
  {
    id: 'bangkok',
    name: 'Bangkok, Thailand',
    shortName: 'Bangkok',
    subtitle: 'Central Business District, Sukhumvit & Tech Corridor',
    country: 'Thailand',
    coords: { lat: 13.7563, lng: 100.5018 },
    flag: '🇹🇭',
    badge: 'Popular Hub'
  },
  {
    id: 'chiangmai',
    name: 'Chiang Mai, Thailand',
    shortName: 'Chiang Mai',
    subtitle: 'Nimman Tech Nomad Hub & Northern Tech Scene',
    country: 'Thailand',
    coords: { lat: 18.7883, lng: 98.9853 },
    flag: '🇹🇭',
    badge: 'Nomad Haven'
  },
  {
    id: 'phuket',
    name: 'Phuket, Thailand',
    shortName: 'Phuket',
    subtitle: 'Phuket Town, Patong & Southern Tech Ecosystem',
    country: 'Thailand',
    coords: { lat: 7.8804, lng: 98.3923 },
    flag: '🇹🇭',
    badge: 'Island Hub'
  },
  {
    id: 'chonburi',
    name: 'Chonburi / EEC, Thailand',
    shortName: 'Chonburi/EEC',
    subtitle: 'Eastern Economic Corridor, Pattaya & Rayong',
    country: 'Thailand',
    coords: { lat: 13.3611, lng: 100.9847 },
    flag: '🇹🇭',
    badge: 'Industrial Corridor'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    shortName: 'Singapore',
    subtitle: 'APAC Tech Headquarters & FinTech Hub',
    country: 'Singapore',
    coords: { lat: 1.3521, lng: 103.8198 },
    flag: '🇸🇬',
    badge: 'APAC HQ'
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    shortName: 'Tokyo',
    subtitle: 'Shibuya, Roppongi & Global Tech Engineering',
    country: 'Japan',
    coords: { lat: 35.6762, lng: 139.6503 },
    flag: '🇯🇵',
    badge: 'East Asia'
  },
  {
    id: 'siliconvalley',
    name: 'San Francisco, CA, USA',
    shortName: 'Silicon Valley',
    subtitle: 'Bay Area / US HQ Global Remote Salaries',
    country: 'United States',
    coords: { lat: 37.7749, lng: -122.4194 },
    flag: '🇺🇸',
    badge: 'USD High-Tier'
  },
  {
    id: 'worldwide-remote',
    name: 'Worldwide Remote',
    shortName: 'Global Remote',
    subtitle: 'Work from Anywhere in the World (No office commute)',
    country: 'Worldwide',
    coords: { lat: 13.7563, lng: 100.5018 },
    flag: '🌐',
    badge: '100% Anywhere',
    isWorldwide: true
  }
];

// Extended list of common cities for autocomplete search
export const SEARCHABLE_CITIES = [
  ...PRESET_LOCATIONS,
  {
    id: 'nonthaburi',
    name: 'Nonthaburi, Thailand',
    shortName: 'Nonthaburi',
    subtitle: 'Muang Thong Thani / KBTG Innovation Campus',
    country: 'Thailand',
    coords: { lat: 13.8591, lng: 100.5217 },
    flag: '🇹🇭'
  },
  {
    id: 'pattaya',
    name: 'Pattaya, Thailand',
    shortName: 'Pattaya',
    subtitle: 'Chonburi Coast & Digital Nomad Community',
    country: 'Thailand',
    coords: { lat: 12.9276, lng: 100.8771 },
    flag: '🇹🇭'
  },
  {
    id: 'khonkaen',
    name: 'Khon Kaen, Thailand',
    shortName: 'Khon Kaen',
    subtitle: 'Isan Region Tech & Innovation Center',
    country: 'Thailand',
    coords: { lat: 16.4419, lng: 102.8359 },
    flag: '🇹🇭'
  },
  {
    id: 'kualalumpur',
    name: 'Kuala Lumpur, Malaysia',
    shortName: 'Kuala Lumpur',
    subtitle: 'Bangsar South & Cyberjaya Tech Hub',
    country: 'Malaysia',
    coords: { lat: 3.1390, lng: 101.6869 },
    flag: '🇲🇾'
  },
  {
    id: 'london',
    name: 'London, United Kingdom',
    shortName: 'London',
    subtitle: 'Silicon Roundabout & European Tech Capital',
    country: 'United Kingdom',
    coords: { lat: 51.5074, lng: -0.1278 },
    flag: '🇬🇧'
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    shortName: 'Sydney',
    subtitle: 'Surry Hills Tech Quarter & APAC Engineering',
    country: 'Australia',
    coords: { lat: -33.8688, lng: 151.2093 },
    flag: '🇦🇺'
  },
  {
    id: 'berlin',
    name: 'Berlin, Germany',
    shortName: 'Berlin',
    subtitle: 'Mitte & Kreuzberg European Startup Ecosystem',
    country: 'Germany',
    coords: { lat: 52.5200, lng: 13.4050 },
    flag: '🇩🇪'
  }
];

// Distance / Radius Tolerance Options (in kilometers)
export const RADIUS_OPTIONS = [
  { value: 15, label: 'Within 15 km', desc: 'Walking / Short Transit (CBD)' },
  { value: 35, label: 'Within 35 km', desc: 'Metropolitan Commute (Default)' },
  { value: 75, label: 'Within 75 km', desc: 'Greater Urban & Suburbs' },
  { value: 300, label: 'Within 300 km', desc: 'Regional / Neighboring Cities' },
  { value: 'all', label: 'Anywhere (Global)', desc: 'No distance restrictions' }
];

export const DEFAULT_DESIRED_LOCATION = {
  id: 'bangkok',
  name: 'Bangkok, Thailand',
  shortName: 'Bangkok',
  type: 'preset', // 'preset' | 'current' | 'custom'
  coords: { lat: 13.7563, lng: 100.5018 },
  radiusKm: 35,
  filterOnlyWithinRadius: false,
  includeRemote: true,
  isWorldwide: false
};

// Haversine formula to calculate distance in km between two lat/lng points
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    return null;
  }
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // 1 decimal place (e.g. 4.2 km)
}

// Resolve coordinates for any job
export function getJobCoordinates(job) {
  if (JOB_COORDINATES[job.id]) {
    return JOB_COORDINATES[job.id];
  }
  // Fallbacks by region
  switch (job.region) {
    case 'thai-bkk':
      return { lat: 13.7563, lng: 100.5018, area: 'Bangkok' };
    case 'thai-cnx':
      return { lat: 18.7883, lng: 98.9853, area: 'Chiang Mai' };
    case 'thai-phuket':
      return { lat: 7.8804, lng: 98.3923, area: 'Phuket' };
    case 'thai-eec':
      return { lat: 13.3611, lng: 100.9847, area: 'Chonburi / EEC' };
    case 'foreign-sg':
      return { lat: 1.3521, lng: 103.8198, area: 'Singapore' };
    case 'foreign-jp':
      return { lat: 35.6762, lng: 139.6503, area: 'Tokyo, Japan' };
    case 'foreign-remote':
    case 'thai-remote':
      return { lat: 13.7563, lng: 100.5018, area: 'Remote', isRemote: true };
    default:
      return { lat: 13.7563, lng: 100.5018, area: job.location };
  }
}

// Compute comprehensive location info and match status for a job given desiredLocation
export function getJobLocationInfo(job, desiredLocation = DEFAULT_DESIRED_LOCATION) {
  const jobCoords = getJobCoordinates(job);
  const isWorldwideDesired = desiredLocation.isWorldwide || desiredLocation.id === 'worldwide-remote';
  const isJobRemote = job.workMode === 'remote' || jobCoords.isRemote || job.region === 'foreign-remote' || job.region === 'thai-remote';

  // 1. Worldwide remote mode or 100% remote job
  if (isJobRemote) {
    return {
      isRemote: true,
      distanceKm: 0,
      distanceFormatted: '100% Remote',
      commuteText: 'Work from your location • 0 min commute',
      statusCategory: 'remote',
      badgeLabel: '🌐 Remote Eligible',
      badgeClass: 'badge-loc-remote',
      isWithinRadius: true,
      matchSummary: `Fully remote role. Eligible to work from ${desiredLocation.shortName || desiredLocation.name}.`
    };
  }

  if (isWorldwideDesired) {
    return {
      isRemote: false,
      distanceKm: null,
      distanceFormatted: jobCoords.area || job.location.split('(')[0].trim(),
      commuteText: 'Worldwide search active',
      statusCategory: 'worldwide',
      badgeLabel: 'Office / Hybrid',
      badgeClass: 'badge-loc-standard',
      isWithinRadius: true,
      matchSummary: `Located in ${job.location.split('(')[0].trim()}.`
    };
  }

  // 2. Physical / Hybrid job with distance calculation
  const distance = calculateDistanceKm(
    desiredLocation.coords.lat,
    desiredLocation.coords.lng,
    jobCoords.lat,
    jobCoords.lng
  );

  const radiusLimit = desiredLocation.radiusKm === 'all' ? Infinity : Number(desiredLocation.radiusKm);
  const isWithinRadius = distance !== null && distance <= radiusLimit;

  // Commute estimate based on distance
  let commuteText = '';
  let statusCategory = 'nearby';
  let badgeLabel = '';
  let badgeClass = 'badge-loc-close';

  if (distance <= 8) {
    commuteText = `~15-20 min via BTS/MRT (${distance} km)`;
    statusCategory = 'close';
    badgeLabel = `📍 ${distance} km • Very Close`;
    badgeClass = 'badge-loc-close';
  } else if (distance <= 25) {
    commuteText = `~30-45 min metro commute (${distance} km)`;
    statusCategory = 'nearby';
    badgeLabel = `📍 ${distance} km • Metro Area`;
    badgeClass = 'badge-loc-nearby';
  } else if (distance <= 60) {
    commuteText = `~50-75 min commute (${distance} km)`;
    statusCategory = 'greater';
    badgeLabel = `📍 ${distance} km • Greater Metro`;
    badgeClass = 'badge-loc-greater';
  } else if (distance <= 200) {
    commuteText = `Regional drive / commute (~${Math.round(distance)} km)`;
    statusCategory = 'regional';
    badgeLabel = `🚗 ${Math.round(distance)} km • Regional`;
    badgeClass = 'badge-loc-regional';
  } else {
    commuteText = `Relocation or flight required (~${Math.round(distance)} km)`;
    statusCategory = 'distant';
    badgeLabel = `✈️ ${Math.round(distance)} km • Relocation`;
    badgeClass = 'badge-loc-distant';
  }

  return {
    isRemote: false,
    distanceKm: distance,
    distanceFormatted: distance !== null ? `${distance} km` : 'N/A',
    commuteText,
    statusCategory,
    badgeLabel,
    badgeClass,
    isWithinRadius,
    matchSummary: isWithinRadius 
      ? `Within your ${desiredLocation.radiusKm} km desired radius from ${desiredLocation.shortName}.` 
      : `Outside your ${desiredLocation.radiusKm} km radius (${distance} km away).`
  };
}

// Asynchronously detect current GPS location and map to the closest known city / hub
export function detectCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Find nearest known preset hub
        let closestPreset = PRESET_LOCATIONS[0];
        let minDistance = Infinity;

        PRESET_LOCATIONS.filter(p => !p.isWorldwide).forEach(preset => {
          const dist = calculateDistanceKm(latitude, longitude, preset.coords.lat, preset.coords.lng);
          if (dist !== null && dist < minDistance) {
            minDistance = dist;
            closestPreset = preset;
          }
        });

        // If user is within 50km of a known hub, label as that city with GPS indicator
        let locationName = '';
        let shortName = '';

        if (minDistance <= 50) {
          locationName = `${closestPreset.name} (Current GPS)`;
          shortName = closestPreset.shortName;
        } else {
          locationName = `Current Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`;
          shortName = 'Current GPS';
        }

        resolve({
          id: 'current-gps',
          name: locationName,
          shortName,
          type: 'current',
          coords: { lat: latitude, lng: longitude },
          radiusKm: 35,
          filterOnlyWithinRadius: false,
          includeRemote: true,
          accuracyMeters: Math.round(accuracy),
          closestPreset: closestPreset.name,
          distanceToHubKm: minDistance
        });
      },
      (err) => {
        let errorMsg = 'Failed to retrieve location.';
        if (err.code === 1) {
          errorMsg = 'Location permission was denied. You can select your desired city manually.';
        } else if (err.code === 2) {
          errorMsg = 'Position unavailable. Please select your desired city from the list.';
        } else if (err.code === 3) {
          errorMsg = 'Location request timed out. Please select your city manually.';
        }
        reject(new Error(errorMsg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}

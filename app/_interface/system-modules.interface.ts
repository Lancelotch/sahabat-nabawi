export interface Package {
  display_name: string;
  path: string;
}

export interface PackageTravel {
  hajj: Package;
  umra: Package;
  "umrah-la": Package;
  custom: Package;
}

export interface Services {
  visa: Package;
  hotel: Package;
  catering: Package;
}

export interface SystemModules {
  package_travel: PackageTravel;
  services: Services;
}

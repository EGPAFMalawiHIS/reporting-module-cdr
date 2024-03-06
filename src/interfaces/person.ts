export interface Person {
  person_id:           number;
  gender:              string;
  birthdate:           Date;
  birthdate_estimated: number;
  dead:                number;
  death_date:          null;
  cause_of_death:      null;
  creator:             number;
  date_created:        Date;
  changed_by:          null;
  date_changed:        null;
  voided:              number;
  voided_by:           null;
  date_voided:         null;
  void_reason:         null;
  uuid:                string;
  names:               Name[];
  addresses:           Address[];
  person_attributes:   PersonAttribute[];
}

export interface Name {
  person_name_id:     number;
  preferred:          number;
  person_id:          number;
  prefix:             null;
  given_name:         string;
  middle_name:        null;
  family_name_prefix: null;
  family_name:        string;
  family_name2:       null;
  family_name_suffix: null;
  degree:             null;
  creator:            number;
  date_created:       Date;
  voided:             number;
  voided_by:          null;
  date_voided:        null;
  void_reason:        null;
  changed_by:         null;
  date_changed:       null;
  uuid:               string;
}

export interface Address {
  person_address_id: number;
  person_id:         number;
  preferred:         number;
  address1:          null;
  address2:          string;
  city_village:      string;
  state_province:    string;
  postal_code:       null;
  country:           null;
  latitude:          null;
  longitude:         null;
  creator:           number;
  date_created:      Date;
  voided:            number;
  voided_by:         null;
  date_voided:       null;
  void_reason:       null;
  county_district:   string;
  neighborhood_cell: string;
  region:            null;
  subregion:         null;
  township_division: string;
  uuid:              string;
}

export interface PersonAttribute {
  person_attribute_id?: number;
  person_id: number;
  value: string;
  person_attribute_type_id: number;
  creator?: number;
  date_created?: Date;
  changed_by?: null;
  date_changed?: null;
  voided?: number;
  voided_by?: null;
  date_voided?: null;
  void_reason?: null;
  uuid?: string;
  type?: PersonAttributeType;
}

export interface PersonAttributeType {
  person_attribute_type_id: number;
  name:                     string;
  description:              string;
  format:                   string;
  foreign_key:              null;
  searchable:               number;
  creator:                  number;
  date_created:             Date;
  changed_by:               number;
  date_changed:             Date;
  retired:                  number;
  retired_by:               null;
  date_retired:             null;
  retire_reason:            null;
  edit_privilege:           null;
  uuid:                     string;
  sort_weight:              number;
}
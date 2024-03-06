import { Person } from ".";

export interface User {
  deactivated_on: null;
  user_id:        number;
  creator:        number;
  person_id:      number;
  changed_by:     number;
  date_changed:   Date;
  system_id:      string;
  username:       string;
  date_created:   Date;
  retired:        number;
  retired_by:     null;
  date_retired:   null;
  retire_reason:  string;
  uuid:           string;
  roles:          Role[];
  programs:       any[];
  person:         Person;
}

export interface Role {
  role:        string;
  description: string;
  uuid:        string;
}
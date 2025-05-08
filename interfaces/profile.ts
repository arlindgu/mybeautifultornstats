export interface Profile {
  id: number
  rank: string
  level: number
  honor: number
  gender: string
  property: string
  signup: string
  awards: number
  friends: number
  enemies: number
  forum_posts: number
  karma: number
  age: number
  role: string
  donator: number
  player_id: number
  name: string
  property_id: number
  revivable: number
  profile_image: string
  life: Life
  status: Status
  job: Job
  faction: Faction
  married: Married
  basicicons: {}
  states: States
  last_action: LastAction
  competition: Competition
}

export interface Life {
  current: number
  maximum: number
  increment: number
  interval: number
  ticktime: number
  fulltime: number
}

export interface Status {
  description: string
  details: string
  state: string
  color: string
  until: number
}

export interface Job {
  job: string
  position: string
  company_id: number
  company_name: string
  company_type: number
}

export interface Faction {
  position: string
  faction_id: number
  days_in_faction: number
  faction_name: string
  faction_tag: string
  faction_tag_image: string
}

export interface Married {
  spouse_id: number
  spouse_name: string
  duration: number
}
export interface States {
  hospital_timestamp: number
  jail_timestamp: number
}

export interface LastAction {
  status: string
  timestamp: number
  relative: string
}

export interface Competition {
  name: string
  status: string
  current_hp: number
  max_hp: number
}

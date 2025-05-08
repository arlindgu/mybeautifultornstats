import Dexie, { type EntityTable } from 'dexie';
import type { Profile } from '@/interfaces/profile';
import type { Logs } from '@/interfaces/log';
import { BattleStats } from '@/interfaces/battlestats';

const db = new Dexie('MBTS') as Dexie & {
  profile: EntityTable<Profile, 'id'>; // primary key
  logs: EntityTable<Logs, 'id'>; // primary key
  battlestats: EntityTable<BattleStats, 'id'>; // primary key
};

db.version(2).stores({
  profile: '++id, player_id, name, level, rank, job.job, faction.faction_name',
  logs: 'id, log, timestamp',
  battlestats: '++id'
  // du kannst hier zusätzliche Indizes angeben, z. B. level oder name
});

export { db };

import Dexie, { type EntityTable } from 'dexie';
import type { Profile } from '@/interfaces/profile';
import type { Log } from '@/interfaces/log';
import { BattleStats } from '@/interfaces/battlestats';

const db = new Dexie('MBTS') as Dexie & {
  profile: EntityTable<Profile, 'player_id'>; // primary key
  log: EntityTable<Log, 'logid'>; // primary key
  battlestats: EntityTable<BattleStats, 'battlestats_id'>; // primary key
};

db.version(4).stores({
  profile: 'player_id, name, level, rank, job.job, faction.faction_name',
  log: 'log, timestamp',
  battlestats: '++batlestats_id',

  // du kannst hier zusätzliche Indizes angeben, z. B. level oder name
});

export { db };

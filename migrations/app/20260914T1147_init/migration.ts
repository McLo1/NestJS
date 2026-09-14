#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a2e64a60ceeac5211311b634d9be15161bc38f922fb1676547cd29941b53e7ed/contract';
import endContract from '../../snapshots/a2e64a60ceeac5211311b634d9be15161bc38f922fb1676547cd29941b53e7ed/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'usuario',
        columns: [
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nome', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('usuario_role_check_8a8183be', "\"role\" IN ('ADMIN', 'MEMBRO')"),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'usuario',
        constraint: 'usuario_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

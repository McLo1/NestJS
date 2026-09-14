#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3a3d6e94e40b84942c370274971e1431a3f10da8f24a1992c22b50f11af9f2ca/contract';
import endContract from '../../snapshots/3a3d6e94e40b84942c370274971e1431a3f10da8f24a1992c22b50f11af9f2ca/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a2e64a60ceeac5211311b634d9be15161bc38f922fb1676547cd29941b53e7ed/contract';
import startContract from '../../snapshots/a2e64a60ceeac5211311b634d9be15161bc38f922fb1676547cd29941b53e7ed/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'usuario',
        column: col('senhaHash', 'text', {
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),

      this.setNotNull({
        schema: 'public',
        table: 'usuario',
        column: 'senhaHash',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);

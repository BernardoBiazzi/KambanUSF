import { EventEmitter, Injectable, Output } from '@angular/core';

export interface Table {
  name: string,
  id: number
}

@Injectable({ providedIn: 'root' })
export class TableService {

  @Output() tableChanges: EventEmitter<Table[]> = new EventEmitter();

  constructor() {
    if (this.requestTables().length == 0) {
      this.updateTables([{ name: 'Tabela 1', id: 1 }]);
    }
  }

  updateTables(tables: Table[]) {
    localStorage.setItem(`Tables`, JSON.stringify(tables));
    this.tableChanges.emit(tables);
  }

  requestTables(): Table[] {
    const tablesStringify = localStorage.getItem(`Tables`) || '{}';
    const tables: Table[] = JSON.parse(tablesStringify);
    if (tables.length > 0) return tables;
    else return [];
  }

  getTableById(tableId: number): Table | undefined {
    return this.requestTables().find((table) => table.id === tableId);
  }

  addNewTable(title: string): number {
    const tables = this.requestTables();
    const newTable = { name: title, id: this.getNewTableId() } as Table;
    tables.push(newTable);
    this.updateTables(tables);
    return newTable.id;
  }

  updateTable(tableToUpdate: Table): void {
    let tables: Table[] = this.requestTables();
    let tableIndex: number = 0;

    let newTables = tables.filter((table: Table, index: number) => {
      if (table.id == tableToUpdate.id) tableIndex = index;
      return table.id != tableToUpdate.id
    });

    if (tableIndex > 0) newTables.splice(tableIndex, 0, tableToUpdate);
    else newTables.unshift(tableToUpdate);
    this.updateTables(newTables);
  }

  deleteTable(tableToDelete: Table) {
    let tables: Table[] = this.requestTables();
    const newTables = tables.filter((table: Table) => table.id != tableToDelete.id);
    this.updateTables(newTables);
  }

  private handleError(error: any) {
    alert('Falha ao adicionar Task');
    console.error(error);
    this.tableChanges.emit();
  }

  private getNewTableId(): number {
    let tables: Table[] = this.requestTables();
    if (!tables) return 0;

    let max = 0;
    tables.forEach((table: Table) => {
      if (table.id > max) max = table.id;
    });

    return (max+1);
  }

}

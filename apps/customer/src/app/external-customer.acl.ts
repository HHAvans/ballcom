// ACL: zet het externe CSV-formaat om naar ons eigen klantmodel,
// zodat het externe formaat niet in de rest van de service terechtkomt.

export interface ExternalCustomerRow {
  companyName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export interface MappedCustomer {
  name: string;
  address: string;
  externalRef: string;
}

export class ExternalCustomerAcl {
  // CSV: Company Name, First Name, Last Name, Phone Number, Address.
  // Adres kan een komma bevatten, dus alles na kolom 4 weer samenvoegen.
  parseCsv(csv: string): ExternalCustomerRow[] {
    const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const strip = (s: string) => s.trim().replace(/^"|"$/g, '');
    const rows: ExternalCustomerRow[] = [];

    for (const line of lines) {
      if (line.startsWith('Company Name')) continue; // headerregel overslaan
      const parts = line.split(',');
      if (parts.length < 5) continue;
      rows.push({
        companyName: strip(parts[0]),
        firstName: strip(parts[1]),
        lastName: strip(parts[2]),
        phoneNumber: strip(parts[3]),
        address: strip(parts.slice(4).join(',')),
      });
    }
    return rows;
  }

  toCustomerProfile(row: ExternalCustomerRow): MappedCustomer {
    const name = `${row.firstName} ${row.lastName}`.trim();
    // sleutel om dubbele import te voorkomen; val terug op naam+adres als er geen nummer is
    const externalRef = row.phoneNumber || `${name}-${row.address}`;
    return { name, address: row.address, externalRef };
  }
}

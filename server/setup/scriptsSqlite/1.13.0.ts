import { APP_PATH } from "@server/lib/consts";
import Database from "better-sqlite3";
import path from "path";

const version = "1.13.0";

export default async function migration() {
    console.log(`Running setup script ${version}...`);

    const location = path.join(APP_PATH, "db", "db.sqlite");
    const db = new Database(location);

    db.transaction(() => {
        db.prepare(`ALTER TABLE 'resources' ADD 'mTlsEnabled' integer DEFAULT false NOT NULL;`).run(); // mark exit nodes as online
    })();

    console.log(`${version} migration complete`);
}

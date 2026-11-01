/**
 * The figures of the documentation. Each entry is used by `<Figure name="…" />`.
 *
 * Until a figure is drawn, the page shows a placeholder with the brief and a rough sketch. To finish one: put the
 * image in `public/figures/` and set `src` (and `alt`); the placeholder then turns into the picture with `caption`.
 */
export interface FigureEntry {
  /** The caption under the finished figure. */
  caption: string;
  /** What the figure has to show and how it should look. */
  brief: string;
  /** A rough text sketch of the layout. */
  sketch: string;
  /** The finished image, as a path under `public/` (for example `/figures/where-encryption-happens.svg`). */
  src?: string;
  /** The description of the finished image for readers who cannot see it. */
  alt?: string;
  /** The widest the finished image is shown (a CSS length); the full column when not set. */
  width?: string;
  /** A thin frame and rounded corners, for screenshots whose edges would melt into the page. */
  frame?: boolean;
}

export const FIGURES: Record<string, FigureEntry> = {
  "where-encryption-happens": {
    caption: "Encryption happens on your device. The server and the storage only ever see encrypted bytes.",
    brief:
      "Two zones side by side, split by a vertical line. Left: 'Your device', with a lock, the password, the keys and an encrypt/decrypt box, in the yellow accent. Right: 'Owload's servers, or yours', with the API, the database and the storage, all marked 'encrypted bytes only'. One arrow crosses the line both ways, labelled 'encrypted bytes'. A crossed-out arrow labelled 'password and keys: never sent' stops at the line.",
    sketch: `  YOUR DEVICE                  │   SERVER AND STORAGE
  password → keys              │
  encrypt / decrypt  ──────────┼──►  API ─► database, storage
                     ◄─────────┼───  (encrypted bytes only)
  password, keys  ───── ✕ ─────┤   never sent`,
    src: "/figures/where-encryption-happens.webp",
    alt: "Two zones separated by the network. On your device, in the browser, the password becomes a key that is never stored, and the key encrypts a file such as Contract.pdf into encrypted bytes. Only the encrypted bytes cross the network to Owload's servers, or yours, where the API, the database and the storage hold encrypted bytes only. The password and the key are never sent.",
  },

  "anatomy-of-a-drive": {
    caption: "A drive: its own password, its own storage, its own people.",
    brief:
      "One drive drawn as a card with five parts around the file grid: Password (a lock, 'never stored anywhere'), Storage (main + up to two copies), People (roles: reader, writer, admin, owner), Files and folders (the grid, with a small lock on each name), History (the log of changes). Mark which parts are encrypted (files, names, history) and which the server can see (title, people, storage).",
    sketch: `  ┌─ Drive "Family photos" ───────────────────────┐
  │ Password  🔒 not stored     People   reader … owner │
  │ Storage   main + 2 copies   Title    visible       │
  │ ┌─────────────────────────────────────────────┐   │
  │ │ files · folders · history   (all encrypted) │   │
  │ └─────────────────────────────────────────────┘   │
  └───────────────────────────────────────────────────┘`,
    src: "/figures/anatomy-of-a-drive.webp",
    alt: "A drive called Family photos, drawn as a card. Its title is visible to the server. The password is never stored anywhere, not even encrypted: only you know it. Storage, a main one and up to two copies, and People, each with a role of reader, writer, admin or owner, are visible to the server. Files and folders, with their contents and names, and History, the log of changes, are encrypted on your device, so the server sees only bytes.",
  },

  "upload-two-steps": {
    caption: "An upload has two steps: the file is encrypted on your device, and only encrypted blocks leave it.",
    brief:
      "A horizontal flow: File → '1 Encrypt (on your device)' → '2 Upload (1 MiB blocks, several at a time)' → Storage. Under it, a mock of the transfers panel with two progress bars, one per step. A small side branch from the file: 'preview picture made at the same time (never fails the upload)'.",
    sketch: `  file ─► [1 Encrypt] ─► [2 Upload  ▪▪▪▪ 1 MiB blocks] ─► storage
              │
              └─ preview picture (optional)
  transfers panel:  Encrypt ████████  Upload ████░░░░`,
    src: "/figures/upload-two-steps.webp",
    alt: "On your device, beach.jpg, 5 MiB and plain, goes through step 1, Encrypt, done on the device before anything leaves it, and step 2, Upload, in blocks of 1 MiB, several at a time: two sent, two in flight, one waiting. A preview picture is made at the same time; it is optional, and if it fails the upload goes on. Only encrypted blocks cross the line to Storage. Below, the Transfers panel shows Encrypt done and Upload at 2 of 5 blocks.",
  },

  "three-kinds-of-access": {
    caption: "Private, shared and public: who can open a drive. In every kind, the password is still needed to read it.",
    brief:
      "Three cards in a row: Private (one person icon), Shared (several person icons with role badges), Public (a link icon and an open-door icon, 'read only, no account'). Each card shows 'who can open' on top and an identical key badge at the bottom: 'the drive's password is needed in every case'.",
    sketch: `   Private          Shared              Public
   only you         you + invited       anyone with the link
                    people, with roles  (read only, no account)
   ───────── the drive's password is needed in all three ─────────`,
    src: "/figures/three-kinds-of-access.webp",
    alt: "Three cards side by side, each saying who can open a drive. Private: only you. Shared: you and the people you invite, each with a role of owner, admin, writer or reader. Public: anyone with the link, read only, with no account needed. Each card ends in the same badge, Password needed: the drive's password is needed in all three.",
  },

  "roles": {
    caption: "Each role can do everything the one before it can.",
    brief:
      "Four steps of a staircase, left to right: Reader, Writer, Admin, Owner. Each step adds one line of capability (view and download / add, change, delete / manage people and access / delete the drive). Add a note on the Admin step: 'only the owner makes admins'.",
    sketch: `                                    ┌──────────┐
                         ┌──────────┐ │  Owner   │ delete the drive
              ┌────────┐ │  Admin   │ └──────────┘
   ┌────────┐ │ Writer │ │ people,  │
   │ Reader │ │ add,   │ │ access   │
   │ view   │ │ change │
   └────────┘ └────────┘`,
    src: "/figures/roles.webp",
    alt: "Four steps rising from fewer rights to more. Reader can view and download. Writer adds adding, changing and deleting files. Admin adds managing people and access, and a note says that only the owner makes admins. Owner adds deleting the drive.",
  },

  "public-link-and-password": {
    caption: "A public link opens the page, the password opens the files. Neither works alone.",
    brief:
      "Left to right: the owner copies the link; the visitor opens it with no account; a page asks for the password, which is typed and used only in the visitor's browser; files appear, decrypted locally. Two callouts: 'The link does not contain the password: send it separately' and 'The password without the link opens nothing'.",
    sketch: `  owner: copy link ─► visitor opens link ─► page asks for password
                                              │ (stays in the browser)
                                              ▼
                                       files, decrypted locally
  link alone: nothing readable       password alone: nowhere to go`,
    src: "/figures/public-link-and-password.webp",
    alt: "Four steps. The owner copies the link and sends the password separately. In the visitor's browser, the visitor opens the link with no account and no sign-in; the page asks for the password, which is typed and used only in that browser and never sent to the server; the files appear, decrypted there. Two notes below: the link alone gives nothing readable, because it does not contain the password, and the password without the link opens nothing.",
  },

  "copies-of-a-drive": {
    caption: "Every write goes to every storage of the drive. Reads come from the main one.",
    brief:
      "A drive on the left, three storage tiles on the right: Main (Owload's or your S3), Copy 1 and Copy 2 (your own S3 at other providers). Three parallel arrows labelled 'every write', a single arrow back from Main labelled 'reads'. A dashed arrow into a new tile: 'add a copy later: existing data is copied over in the background'. A warning mark on a storage that is down: 'writes stop, copies never drift apart'.",
    sketch: `            ┌──► Main storage (Owload or your S3)   ◄── reads
  drive ────┼──► Copy 1 (your S3, provider A)
  writes    └──► Copy 2 (your S3, provider B)
            ┄┄► a copy added later: filled in the background`,
    src: "/figures/copies-of-a-drive.webp",
    alt: "A drive called Work drive, holding encrypted blocks, on the left. Every write goes from it to three storages: the main storage, Owload's or your S3, and Copy 1 and Copy 2, your S3 at providers A and B. Reads come back from the main storage only. Copy 2 is marked as down, and a note says that writes stop until it is back, so the copies never drift apart. A dashed line leads to a new copy, added later, whose existing data is copied over in the background.",
  },

  "restore-from-bucket": {
    caption: "A drive can be rebuilt from the bucket alone. Its password is still needed to open it.",
    brief:
      "A bucket tile listing its folders (data/, ops/, drives/…/meta.json), an arrow 'Restore' into a drive card in 'My drives', with a lock 'still encrypted: the password opens it'. Next to it, a crossed drive card: 'damaged (something is missing): not restored, so nothing is silently patched'.",
    sketch: `  your bucket                         My drives
  ├ data/…  encrypted blocks  ──Restore──►  [ Drive ]  🔒 password needed
  ├ ops/…   copy of the log
  └ drives/…/meta.json          damaged? ──► not restored`,
    src: "/figures/restore-from-bucket.webp",
    alt: "On the left, your bucket, my-owload, with three folders: data, holding encrypted blocks; ops, holding a copy of the change log; and drives, holding a meta.json file for each drive. An arrow labelled Restore leads to My drives, where Work drive appears, closed and restored from my-owload. It is still encrypted, and the drive's password opens it with the Open drive button. A dashed red arrow labelled damaged? leads to a crossed-out drive: something in the bucket is missing, so the drive is left out instead of being silently patched.",
  },

  "password-to-keys": {
    caption: "From a password to the keys. Everything in this chain stays on your device.",
    brief:
      "A left-to-right chain: Password + salt → PBKDF2-SHA-512, 1,000,000 iterations ('slow on purpose') → Master key → HKDF-SHA-256 → three kinds of key ('one key, one purpose'): Log key → AES-256-GCM, each entry with its own random nonce; File key, one for each file, made with a random value for that upload → AES-256-CTR, the counter running from the start of the file; Cache keys, for the browser's local caches. A dashed bracket around the whole chain: 'never leaves your device'.",
    sketch: `  password + salt ─► PBKDF2-SHA-512 ─► master key ─► HKDF-SHA-256 ─┬─► log key ─────► AES-256-GCM
                     1,000,000 iterations                           ├─► file key ────► AES-256-CTR
                                                                    │   (one per file, random value per upload)
                                                                    └─► cache keys
  ╰──────────────── all of this stays on your device ─────────────────╯`,
  },

  "hash-chain": {
    caption: "A changed entry of the log does not open, and each entry carries the fingerprint of the one before it, so one taken out breaks the chain.",
    brief:
      "A row of four log entries (op 1 … op 4), each box with a small seal ('authenticated') and 'hash of the previous one', with an arrow to its left neighbour. Op 2 altered (red): its seal is broken, 'does not open'. Op 2 taken out (a second row): op 3 no longer follows op 1, 'broken chain'. Both lead to 'the drive shows a warning and takes no changes'. Below, a file with its checksum (a chain of SHA-256 over its blocks) stored in the log, and 'checked after every full download'.",
    sketch: `  [op 1] ◄─ [op 2 + hash(1)] ◄─ [op 3 + hash(2)] ◄─ [op 4 + hash(3)]
                  ▲ altered: does not open
  [op 1]  ✕ op 2 taken out  [op 3 + hash(2)]   the chain breaks
                  ──► a warning, no changes until you accept it
  file ── checksum in the log ── compared after a full download`,
  },

  "components": {
    caption: "The parts of Owload and what each of them knows.",
    brief:
      "Boxes and arrows. Client (browser or desktop app) in yellow on top, with 'holds the keys'. Below it the API. Under the API two stores side by side: PostgreSQL ('access lists, the encrypted log') and S3 storage ('encrypted blocks, a copy of the log'). Keycloak to the side: 'sign-in only', with an arrow of tokens to the client and 'checks tokens' from the API. Every box except the client gets a small 'no keys' tag. Replaces the text picture at the top of the page if the style fits.",
    sketch: `            Keycloak  (sign-in, tokens, no keys)
              ▲  tokens ▼
  Client ───────────────► API ───┬──► PostgreSQL  (access, encrypted log)
  holds the keys   encrypted     └──► S3 storage  (encrypted blocks, log copy)
                   bytes only`,
  },

  "open-and-upload-sequence": {
    caption: "What happens on opening a drive and on uploading a file.",
    brief:
      "Two sequence diagrams side by side (stacked on a phone), with three lanes each: Client, API, Storage. Opening: get the drive and the log; you type the password; keys derived and the log decrypted locally; ask for a range of blocks; blocks come back and are decrypted and checked. Uploading: reserve room; append START_UPLOAD with the file's random salt to the log; encrypt and send blocks (several at once); the API writes each to every storage; append FINISH_UPLOAD with the checksum; close the session. Use the same colours as the figure above: yellow for steps that happen on the device.",
    sketch: `  OPEN                              UPLOAD
  Client      API     Storage       Client      API      Storage
   ─ get drive + log ─►              ─ reserve room ─►
   type password                     ─ START_UPLOAD (salt) ─►
   derive keys, decrypt log          ─ encrypted blocks ─► write to every storage
   ─ range of blocks ─►              ─ FINISH_UPLOAD (checksum) ─►
                                     ─ close session ────►
   decrypt, check ◄──────`,
  },

  "trust-boundaries": {
    caption: "Who could attack Owload, and what each of them would get.",
    brief:
      "A map in rings, with the encrypted data in the middle. Around it, one tile per attacker from the threat model (network eavesdropper, database thief, operator, storage provider, another user, former member, someone at your device, supply chain). From each tile an arrow to a small label of what they get ('encrypted bytes', 'titles and who is on a drive', 'what the browser holds while a drive is open'). Colour tiles by how much remains open after the defences: green nothing, yellow something (see the table below), so the page's honesty is visible at a glance.",
    sketch: `  eavesdropper ─► encrypted bytes
  stolen database ─► titles, access lists, encrypted log
  operator ─► same, live  (+ could deliver altered code)
  storage provider ─► encrypted bytes (can delete them)
  someone at your device ─► what the open drive holds`,
  },

  "self-hosted-topology": {
    caption: "What a self-hosted Owload consists of, and which parts you provide.",
    brief: "A diagram.",
    sketch: "",
    src: "/figures/self-hosted-topology.webp",
    alt: "A diagram of a self-hosted Owload. You reach it from a browser at https://your.domain. On your server, a reverse proxy that you provide, for HTTPS, passes requests to two Owload Docker images: the client, nginx serving the app, and the API, the server side of Owload. A worker, the same image as the API, runs background jobs. The API and the worker connect to PostgreSQL, the database, to Keycloak for sign-in, and to the S3 bucket with the encrypted files. Keycloak and the S3 bucket are outside your server.",
  },
  "storage-targets-three": {
    caption: "One drive in three unrelated storages: AWS S3 as the main one, Hetzner and Owload's storage as copies.",
    brief:
      "A screenshot of the drive's settings, the Storage targets section, with all three storages connected: AWS S3 (MASTER), Hetzner Object Storage (SLAVE), Owload's storage (SLAVE). Use real buckets made for this example. Crop to the section. No keys visible.",
    sketch: `  Storage targets
  ┌ MASTER  AWS S3 · us-east-1         ✓ Connected ┐
  ┌ SLAVE   Hetzner · Germany          ✓ Connected ┐
  ┌ SLAVE   Owload's storage           ✓ Connected ┐`,
    src: "/figures/storage-targets-three.webp",
    alt: "The Storage targets section of a drive, with one main storage and two copies. AWS S3, in us-east-1, bucket owload-example-main, is labelled MASTER. Hetzner Object Storage, in Germany, fsn1, bucket owload-example-copy, and Owload's storage, managed by Owload, are each labelled SLAVE. All three show Connected, and each has a menu.",
  },
  "storage-target-down": {
    caption: "The main storage cannot be reached. The others still hold the whole drive.",
    brief:
      "The same section with AWS S3 failing: revoke the example key or block the bucket, then take the screenshot. AWS S3 (MASTER) shows a red connection error; the two others show Connected, with Make master active on them. Optionally add the error shown when saving a file.",
    sketch: `  Storage targets
  ┌ MASTER  AWS S3 · us-east-1   ✗ Connection failed ┐
  ┌ SLAVE   Hetzner · Germany          ✓ Connected ┐  [ Make master ]
  ┌ SLAVE   Owload's storage           ✓ Connected ┐  [ Make master ]`,
    src: "/figures/storage-target-down.webp",
    alt: "The Storage targets section with one of three storages unreachable. AWS S3, labelled MASTER, is marked in red: The storage could not be reached. Hetzner Object Storage and Owload's storage, each labelled SLAVE, show Connected, with a Make master button. Below, under Uploads, beach.jpg is marked Failed, with the reason: The main storage is not reachable or not responding. Nothing was saved.",
  },
  "storage-target-replaced": {
    caption: "After the replacement: Hetzner is the main storage, and a new copy is being made at Backblaze.",
    brief:
      "The same section after the steps of the guide: Hetzner (MASTER), Owload's storage (SLAVE), Backblaze B2 (SLAVE) with the label 'backfill in progress' and a count. AWS S3 is gone from the list.",
    sketch: `  Storage targets
  ┌ MASTER  Hetzner · Germany          ✓ Connected ┐
  ┌ SLAVE   Owload's storage           ✓ Connected ┐
  ┌ SLAVE   Backblaze B2   backfill in progress (312/840) ┐`,
    src: "/figures/storage-target-replaced.webp",
    alt: "The Storage targets section after the replacement, with one main storage and two copies. Hetzner Object Storage, in Germany, fsn1, is now labelled MASTER and shows Connected. Owload's storage, labelled SLAVE, shows Connected. Backblaze B2, in eu-central-003, bucket owload-example-new, labelled SLAVE, shows backfill in progress, 312 of 840, with a progress bar. AWS S3 is no longer listed.",
  },
  "new-drive-form": {
    caption: "The New drive page: a name and a password, who can open the drive, and the storage.",
    brief: "A screenshot of the app.",
    sketch: "",
    src: "/figures/app-new-drive.webp",
    frame: true,
    alt: "The New drive page with three numbered sections. General info has fields for the drive name, description, password and repeat password. Access has a Visibility choice of Private, Shared or Public, with Private selected. Storage shows the Custom option with fields for the endpoint URL, region, bucket, access key and secret key, a Use SSL checkbox and a Test connection button, and below it an Add slave storage button. Cancel and Create drive buttons are at the bottom right.",
  },

  "add-files": {
    caption: "Files being added: each one shows two steps, Encrypt and Upload.",
    brief:
      "A real screenshot of a drive with a few files in the grid and the transfers panel open, showing one file per state: encrypting, uploading and done. Mark the two steps of one file with yellow badges 1 Encrypt and 2 Upload.",
    sketch: `  files grid                      transfers
  [pic] [pic] [doc]               photo.jpg   Encrypt ✓  Upload ███░░
                                  report.xlsx Encrypt ██░░░`,
    src: "/figures/add-files.webp",
    frame: true,
    alt: "A drive open in the grid view, with the transfers panel over it, titled Uploading 9 files, Encrypted on this device, then uploaded. One file is at 95% of Encrypt and 39% of Upload, with a button to cancel it; four others are marked Uploaded, with a check on both steps. The panel has Add files and Clear finished. The toolbar at the bottom shows 9 files at 74%.",
  },

  "connect-own-s3-form": {
    caption: "The Custom storage form: the address, region and name of your bucket, and a key made for it.",
    brief:
      "A real screenshot of the storage section of the New drive page with Custom selected: Endpoint URL, Region, Bucket, Access key, Secret key (dots) and the Test connection button with a green 'connected' result. Number the fields with yellow badges in the order of the guide. Use a fake bucket name, never real keys.",
    sketch: `  Storage   Preset (Custom)
  Endpoint URL  [ https://s3.amazonaws.com ]
  Region [ us-east-1 ]   Bucket [ my-owload ]
  Access key [ ........ ]  Secret key [ •••••• ]
  [ Test connection ]  ✓ connected`,
    src: "/figures/connect-own-s3-form.webp",
    alt: "The Storage section of the New drive page, marked MASTER, with Custom chosen instead of Preset. Six numbered badges show the order: 1 Endpoint URL, set to https://s3.amazonaws.com; 2 Region, us-east-1; 3 Bucket, my-owload; 4 Access key, an example value; 5 Secret key, hidden behind dots; and 6 the Test connection button, with the result Connected beside it. A Use SSL checkbox is ticked.",
  },
  "app-files": {
    caption: "A drive in the grid, with the menu of a file and the toolbar for the selected items.",
    brief: "A screenshot of the app.",
    sketch: "",
    src: "/figures/app-files.webp",
    frame: true,
    alt: "A drive open in the grid view: two folders and 17 files, among them photos and PDFs, each with a lock beside its name. One file is selected, with its menu open (Download, Rename, Copy, Cut, Delete, Properties). A toolbar at the bottom has Copy, Cut, Paste, Create folder and Upload. The side panel lists All Files, Recent, Media, Recycle Bin and Settings, with the storage used against 3 GB.",
  },

  "app-my-drives": {
    caption: "My drives: each card shows the kind of the drive, your role, its size, who has access and who read it last.",
    brief: "A screenshot of the app.",
    sketch: "",
    src: "/figures/app-my-drives.webp",
    frame: true,
    alt: "The My drives page with three drives. One is open, shows Private and Owner, 212 MB of 272 MB, and has the buttons Browse files and Close. Two are closed, are Shared and owned by the user, and have an Open drive button. Each card shows who has access and when the user read the drive. A bar above filters by All, Private, Shared, Public and Shared with me, and there is a Close all drives button.",
  },

  "app-video": {
    caption: "The video player buffers ahead: you choose how far, from 30 seconds to the whole video.",
    brief: "A screenshot of the app.",
    sketch: "",
    src: "/figures/app-video.webp",
    frame: true,
    alt: "A video of a waterfall playing in a window over the drive. A message says it is buffering and that pressing play starts it now. Under the picture are the play button, the time, volume, speed, and the choice of how far to buffer ahead: 30 seconds, 1, 2, 5 or 10 minutes, or all.",
  },

  "app-spreadsheet": {
    caption: "A spreadsheet opened for editing. The editor says what saving would drop from the file.",
    brief: "A screenshot of the app.",
    sketch: "",
    src: "/figures/app-spreadsheet.webp",
    frame: true,
    alt: "A spreadsheet editor filling the window, with a green title bar showing the file name and a Save button, a toolbar for font, alignment, number format, rows and columns, and the sheet below. A yellow notice under the toolbar says that saving this file here will drop frozen panes.",
  },

  "app-drive-settings": {
    caption: "Drive settings: who can open the drive, and the people on it with their roles.",
    brief: "A screenshot of the app.",
    sketch: "",
    src: "/figures/app-drive-settings.webp",
    frame: true,
    alt: "The Drive settings page, Access section. Visibility has three choices: Private, only you can open the drive; Shared, you and the people you add, which is selected; and Public, anyone with the link and the people you add. Below, People with access has an email field, a role choice set to Reader and an Add button, and the owner is listed. A note says the drive is encrypted with its own password, which Owload never sees, and that people you add have to be told it by you, outside Owload. A Storage limit section follows.",
  },
};

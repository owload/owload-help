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
  },

  "upload-two-steps": {
    caption: "An upload has two steps, and both are on your device's side of the line until the data is encrypted.",
    brief:
      "A horizontal flow: File → '1 Encrypt (on your device)' → '2 Upload (1 MiB blocks, several at a time)' → Storage. Under it, a mock of the transfers panel with two progress bars, one per step. A small side branch from the file: 'preview picture made at the same time (never fails the upload)'.",
    sketch: `  file ─► [1 Encrypt] ─► [2 Upload  ▪▪▪▪ 1 MiB blocks] ─► storage
              │
              └─ preview picture (optional)
  transfers panel:  Encrypt ████████  Upload ████░░░░`,
  },

  "three-kinds-of-access": {
    caption: "Private, shared and public: who can open a drive. In every kind, the password is still needed to read it.",
    brief:
      "Three cards in a row: Private (one person icon), Shared (several person icons with role badges), Public (a link icon and an open-door icon, 'read only, no account'). Each card shows 'who can open' on top and an identical key badge at the bottom: 'the drive's password is needed in every case'.",
    sketch: `   Private          Shared              Public
   only you         you + invited       anyone with the link
                    people, with roles  (read only, no account)
   ───────── the drive's password is needed in all three ─────────`,
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
  },

  "copies-of-a-drive": {
    caption: "Every write goes to every storage of the drive. Reads come from the main one.",
    brief:
      "A drive on the left, three storage tiles on the right: Main (Owload's or your S3), Copy 1 and Copy 2 (your own S3 at other providers). Three parallel arrows labelled 'every write', a single arrow back from Main labelled 'reads'. A dashed arrow into a new tile: 'add a copy later: existing data is copied over in the background'. A warning mark on a storage that is down: 'writes stop, copies never drift apart'.",
    sketch: `            ┌──► Main storage (Owload or your S3)   ◄── reads
  drive ────┼──► Copy 1 (your S3, provider A)
  writes    └──► Copy 2 (your S3, provider B)
            ┄┄► a copy added later: filled in the background`,
  },

  "restore-from-bucket": {
    caption: "A drive can be rebuilt from the bucket alone. Its password is still needed to open it.",
    brief:
      "A bucket tile listing its folders (data/, ops/, drives/…/meta.json), an arrow 'Restore' into a drive card in 'My drives', with a lock 'still encrypted: the password opens it'. Next to it, a crossed drive card: 'damaged (something is missing): not restored, so nothing is silently patched'.",
    sketch: `  your bucket                         My drives
  ├ data/…  encrypted blocks  ──Restore──►  [ Drive ]  🔒 password needed
  ├ ops/…   copy of the log
  └ drives/…/meta.json          damaged? ──► not restored`,
  },

  "password-to-keys": {
    caption: "From a password to the keys. Everything in this chain stays on your device.",
    brief:
      "A left-to-right chain: Password + salt → PBKDF2-SHA-512, 100,000 rounds ('slow on purpose') → Master key → HKDF-SHA-256 → three keys: Log key, Data key, Cache keys ('one key, one purpose') → AES-256-CTR, with the counter described as 'position in the drive + a random value per drive'. A dashed bracket around the whole chain: 'never leaves your device'.",
    sketch: `  password + salt ─► PBKDF2-SHA-512 ─► master key ─► HKDF-SHA-256 ─┬─► log key
                     100,000 rounds                                 ├─► data key ─► AES-256-CTR
                                                                    └─► cache keys
  ╰──────────────── all of this stays on your device ─────────────────╯`,
  },

  "hash-chain": {
    caption: "Each entry of the log carries the fingerprint of the one before it, so a change in the middle breaks everything after it.",
    brief:
      "A row of four log entries (op 1 … op 4), each box showing 'hash of the previous one' with an arrow to its left neighbour. Change op 2 (red) and show op 3 and op 4 turning red as the check fails. Below, a file with its SHA-256 stored in the log, and 'checked after every full download' (and a muted note: 'video played in pieces is not checked').",
    sketch: `  [op 1] ◄─ [op 2 + hash(1)] ◄─ [op 3 + hash(2)] ◄─ [op 4 + hash(3)]
                  ▲ altered  →  op 3 and op 4 fail the check
  file ── SHA-256 in the log ── compared after a full download`,
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
      "Two sequence diagrams side by side (stacked on a phone), with three lanes each: Client, API, Storage. Opening: get the drive and the log; you type the password; keys derived and the log decrypted locally; ask for a range of blocks; blocks come back and are decrypted and checked. Uploading: encrypt and reserve room; send encrypted blocks (several at once); the API writes each to every storage; append the encrypted 'file uploaded' operation to the log; close the session. Use the same colours as the figure above: yellow for steps that happen on the device.",
    sketch: `  OPEN                              UPLOAD
  Client      API     Storage       Client      API      Storage
   ─ get drive + log ─►              ─ reserve room ─►
   type password                     ─ blocks ─────────► write to every storage
   derive keys, decrypt log          ─ append operation ─►
   ─ range of blocks ─►              ─ close session ────►
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
  },
  "storage-target-down": {
    caption: "The main storage cannot be reached. The others still hold the whole drive.",
    brief:
      "The same section with AWS S3 failing: revoke the example key or block the bucket, then take the screenshot. AWS S3 (MASTER) shows a red connection error; the two others show Connected, with Make master active on them. Optionally add the error shown when saving a file.",
    sketch: `  Storage targets
  ┌ MASTER  AWS S3 · us-east-1   ✗ Connection failed ┐
  ┌ SLAVE   Hetzner · Germany          ✓ Connected ┐  [ Make master ]
  ┌ SLAVE   Owload's storage           ✓ Connected ┐  [ Make master ]`,
  },
  "storage-target-replaced": {
    caption: "After the replacement: Hetzner is the main storage, and a new copy is being made at Backblaze.",
    brief:
      "The same section after the steps of the guide: Hetzner (MASTER), Owload's storage (SLAVE), Backblaze B2 (SLAVE) with the label 'backfill in progress' and a count. AWS S3 is gone from the list.",
    sketch: `  Storage targets
  ┌ MASTER  Hetzner · Germany          ✓ Connected ┐
  ┌ SLAVE   Owload's storage           ✓ Connected ┐
  ┌ SLAVE   Backblaze B2   backfill in progress (312/840) ┐`,
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
  },
  "app-files": {
    caption: "A drive in the grid, with the menu of a file and the toolbar for the selected items.",
    brief: "A screenshot of the app.",
    sketch: "",
    src: "/figures/app-files.webp",
    frame: true,
    alt: "A drive called Racoon creek open in the grid view: a folder and four pictures, one of them selected with its menu open (Open, Open in new tab, Download, Rename, Copy, Cut, Delete, Properties). A toolbar at the bottom has Copy, Cut, Paste, Create folder and Upload. The side panel lists All Files, Recent, Media, Recycle Bin and Settings, with the storage used against 3 GB.",
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

// ============================================================================
// COURSE 1: WELCOME TO COCOBASE (🌱 12 steps)
// ============================================================================

export const Course1_Fundamentals = {
  id: "cocobase-fundamentals",
  title: "🌱 Welcome to Cocobase",
  description:
    "What is Backend‑as‑a‑Service? Set up, create your first document, and list data.",
  icon: "🌱",
  color: "#39d353",
  difficulty: "beginner",
  duration: 35,
  steps: [
    {
      id: 1,
      type: "lesson",
      icon: "🥥",
      title: "What is a Backend‑as‑a‑Service?",
      content:
        "<p>Imagine you're building a treehouse. You don't want to cut down the tree, dig the foundation, or install plumbing – you just want to build the cool rooms and slides. That's what Cocobase does for your app.</p><p>Cocobase is a <strong>Backend‑as‑a‑Service (BaaS)</strong>. It gives you:</p><ul><li>🌐 A ready‑to‑use database (NoSQL)</li><li>🔐 User authentication (sign up, log in, social login)</li><li>⚡ Real‑time updates (live chats, notifications)</li><li>☁️ Cloud Functions (serverless code)</li><li>📁 File storage (avatars, images)</li></ul><p>You write only frontend code. Cocobase handles the backend – no servers, no DevOps, no stress.</p>",
      xp: 0,
    },
    {
      id: 2,
      type: "quiz",
      question: "What does BaaS stand for?",
      options: [
        "Build‑and‑apply Service",
        "Backend‑as‑a‑Service",
        "Browser Application Suite",
        "Base API Standard",
      ],
      correct: 1,
      explanation:
        "BaaS = Backend‑as‑a‑Service. It's a cloud service that provides backend functionality (database, auth, etc.) without you writing server code.",
      xp: 10,
    },
    {
      id: 3,
      type: "code_lesson",
      title: "Installing the SDK",
      content:
        "Open your terminal and run this command to add Cocobase to your project.",
      codeSnippet: "npm install cocobase",
      xp: 0,
    },
    {
      id: 4,
      type: "code_lesson",
      title: "Initialising the Client",
      content:
        "First, import Cocobase. Then create a new instance with your API key and project ID (you get these from your Cocobase dashboard after signing up).",
      codeSnippet:
        'import { Cocobase } from "cocobase";\n\nconst db = new Cocobase({\n  apiKey: "your_api_key_here",\n  projectId: "your_project_id_here"   // optional but recommended\n});',
      xp: 0,
    },
    {
      id: 5,
      type: "fill_code",
      question: "Fill in the blank to initialise Cocobase correctly.",
      codeTemplate: [
        "import { Cocobase } from 'cocobase';",
        "",
        "const db = new Cocobase({",
        "  ______: 'your_api_key'",
        "});",
      ],
      blanks: [3],
      blankAnswers: ["apiKey"],
      wordBank: ["apiKey", "API_KEY", "secret", "token", "projectId"],
      explanation:
        "The initialisation object requires an `apiKey` property. `projectId` is optional but good practice.",
      xp: 15,
    },
    {
      id: 6,
      type: "lesson",
      title: "Collections & Documents",
      content:
        "<p>Cocobase is a NoSQL database. Data is organised into <strong>collections</strong> (like folders) and each record is a <strong>document</strong> (a JSON object).</p><p>You don't need to create collections beforehand – the first time you insert a document, Cocobase automatically creates the collection for you. 🎉</p>",
      xp: 0,
    },
    {
      id: 7,
      type: "code_lesson",
      title: "Create Your First Document",
      content:
        "Use `createDocument(collectionName, dataObject)` to add a new document.",
      codeSnippet:
        '// Add a new user to the \'users\' collection\nconst newUser = await db.createDocument("users", {\n  name: "Luna",\n  email: "luna@example.com",\n  points: 100\n});\n\nconsole.log("New document ID:", newUser.id);',
      xp: 0,
    },
    {
      id: 8,
      type: "quiz",
      question: "Which method creates a new document?",
      options: [
        "insertDocument()",
        "addDocument()",
        "createDocument()",
        "newDocument()",
      ],
      correct: 2,
      explanation: "`createDocument(collection, data)` is the correct method.",
      xp: 10,
    },
    {
      id: 9,
      type: "code_lesson",
      title: "List All Documents",
      content:
        "Retrieve all documents from a collection with `listDocuments()`.",
      codeSnippet:
        '// Get all users\nconst allUsers = await db.listDocuments("users");\nconsole.log(`We have ${allUsers.length} users.`);\n\n// You can also add a limit\nconst firstTen = await db.listDocuments("users", { limit: 10 });',
      xp: 0,
    },
    {
      id: 10,
      type: "true_false",
      question: "You must define a collection schema before inserting data.",
      correct: false,
      explanation:
        "False! Cocobase is schemaless – collections are created automatically when you first insert.",
      xp: 10,
    },
    {
      id: 11,
      type: "short_answer",
      question:
        "What method is used to retrieve all documents from a collection?",
      placeholder: "type your answer, e.g., countDocuments",
      correct: "listDocuments",
      caseSensitive: true,
      hint: "db.______('users')",
      explanation:
        "`listDocuments(collection, filters?)` returns an array of documents.",
      xp: 15,
    },
    {
      id: 12,
      type: "reorder",
      question: "Arrange the steps to create and then list documents.",
      items: [
        {
          id: "a",
          text: "Call db.createDocument('posts', { title: 'Hello' })",
        },
        { id: "b", text: "Import Cocobase and initialise with apiKey" },
        { id: "c", text: "Call db.listDocuments('posts') to see the result" },
        { id: "d", text: "Await operations" },
      ],
      correct: ["b", "a", "d", "c"],
      explanation: "First initialise, then create, then await, then list.",
      xp: 15,
    },
  ],
};

// ============================================================================
// COURSE 2: READING & QUERYING DATA (🔍 14 steps)
// ============================================================================
export const Course2_Queries = {
  id: "cocobase-queries",
  title: "🔍 Reading & Querying Data",
  description:
    "Filter, sort, paginate, and use comparison operators to find exactly what you need.",
  icon: "🔍",
  color: "#58a6ff",
  difficulty: "intermediate",
  duration: 45,
  steps: [
    {
      id: 1,
      type: "lesson",
      title: "More Than Just `listDocuments`",
      content:
        '<p>The simple `listDocuments()` call returns everything. But real apps need filters: "show me only active users", "products cheaper than $50", "posts published after last week".</p><p>Cocobase uses a powerful query system. For simple equality, just pass the field and value. For comparisons or string matching, use special suffixes like `_gt` (greater than), `_lt` (less than), or `_contains`.</p>',
      xp: 0,
    },
    {
      id: 2,
      type: "code_lesson",
      title: "Basic Equality Filter",
      content:
        "To filter by exact value, pass an object with the field and value inside a `filters` property.",
      codeSnippet:
        '// Get only published posts\nconst published = await db.listDocuments("posts", {\n  filters: {\n    status: "published"\n  }\n});\n\n// Get users with role \'admin\'\nconst admins = await db.auth.listUsers({\n  filters: {\n    role: "admin"\n  }\n});',
      xp: 0,
    },
    {
      id: 3,
      type: "quiz",
      question:
        "What does `{ filters: { status: 'published' } }` do in `listDocuments`?",
      options: [
        "Returns all documents and adds a status field",
        "Returns only documents where status equals 'published'",
        "Updates the status of all documents",
        "Deletes documents without a status",
      ],
      correct: 1,
      explanation:
        "It filters the results to only those matching the exact field value.",
      xp: 10,
    },
    {
      id: 4,
      type: "code_lesson",
      title: "Comparison Operators (`_gt`, `_gte`, `_lt`, `_lte`)",
      content:
        "Use operator suffixes like `_gt`, `_gte`, `_lt`, `_lte` on the field name to compare numbers or dates.",
      codeSnippet:
        '// Products with price greater than 100\nconst expensive = await db.listDocuments("products", {\n  filters: {\n    price_gt: 100\n  }\n});\n\n// Users registered after Jan 1, 2025\nconst newUsers = await db.listDocuments("users", {\n  filters: {\n    created_at_gt: "2025-01-01T00:00:00Z"\n  }\n});\n\n// Items with stock less than or equal to 5\nconst lowStock = await db.listDocuments("inventory", {\n  filters: {\n    stock_lte: 5\n  }\n});',
      xp: 0,
    },
    {
      id: 5,
      type: "fill_code",
      question: "Fill the blank to find users with age greater than 18.",
      codeTemplate: [
        "const adults = await db.listDocuments('users', {",
        "  filters: { age______: 18 }",
        "});",
      ],
      blanks: [1],
      blankAnswers: ["_gt"],
      wordBank: ["_gt", "_lt", "_gte", "_lte", "contains"],
      explanation:
        "`_gt` means 'greater than'. Use `_gte` for greater than or equal. The underscore is part of the operator.",
      xp: 15,
    },
    {
      id: 6,
      type: "code_lesson",
      title: "String Matching: `_contains`",
      content:
        "Find documents where a string field contains a substring. Use the `_contains` suffix on the field name.",
      codeSnippet:
        '// Find users with \'gmail\' in their email\nconst gmailUsers = await db.listDocuments("users", {\n  filters: {\n    email_contains: "gmail.com"\n  }\n});\n\n// Find posts with \'cocobase\' in the title\nconst cocoPosts = await db.listDocuments("posts", {\n  filters: {\n    title_contains: "cocobase"\n  }\n});',
      xp: 0,
    },
    {
      id: 7,
      type: "code_lesson",
      title: "Array Operators: `_in`",
      content:
        "Check if a field's value is inside a list. Use the `_in` suffix on the field name.",
      codeSnippet:
        '// Users with roles \'admin\' or \'moderator\'\nconst privileged = await db.listDocuments("users", {\n  filters: {\n    role_in: ["admin", "moderator"]\n  }\n});\n\n// Products with specific IDs\nconst selected = await db.listDocuments("products", {\n  filters: {\n    id_in: ["prod_1", "prod_2", "prod_3"]\n  }\n});',
      xp: 0,
    },
    {
      id: 8,
      type: "match",
      question: "Match each operator suffix to its meaning.",
      pairs: [
        { term: "_gt", def: "Greater than" },
        { term: "_gte", def: "Greater than or equal" },
        { term: "_lt", def: "Less than" },
        { term: "_contains", def: "Substring match" },
        { term: "_in", def: "Value in an array" },
      ],
      explanation:
        "These suffixes let you build powerful queries. Remember the underscore!",
      xp: 15,
    },
    {
      id: 9,
      type: "code_lesson",
      title: "Sorting Results",
      content: "Use the `sort` property to order documents.",
      codeSnippet:
        '// Newest first (descending)\nconst recentPosts = await db.listDocuments("posts", {\n  sort:"created_at", order: "desc" \n});\n\n// Cheapest first\nconst cheapest = await db.listDocuments("products", {\n  sort: "price", order: "asc" \n});',
      xp: 0,
    },
    {
      id: 10,
      type: "code_lesson",
      title: "Pagination with `limit` and `offset`",
      content: "Break large result sets into pages.",
      codeSnippet:
        '// First page: 10 items\nconst page1 = await db.listDocuments("posts", {\n  limit: 10,\n  offset: 0\n});\n\n// Second page: next 10 items (skip first 10)\nconst page2 = await db.listDocuments("posts", {\n  limit: 10,\n  offset: 10\n});',
      xp: 0,
    },
    {
      id: 11,
      type: "short_answer",
      question:
        "Which property do you use to skip a certain number of documents?",
      placeholder: "parameter name ... eg skip",
      correct: "offset",
      caseSensitive: true,
      hint: "{ limit: 10, ______: 10 }",
      explanation: "`offset` tells how many documents to skip from the start.",
      xp: 15,
    },
    {
      id: 12,
      type: "code_lesson",
      title: "Combining Filters (AND)",
      content:
        "Add multiple fields to the `filters` object – they are combined with logical AND. You can mix simple equality and operator suffixes.",
      codeSnippet:
        '// Products with price > 100 AND category = \'electronics\'\nconst electronics = await db.listDocuments("products", {\n  filters: {\n    price_gt: 100,\n    category: "electronics"\n  }\n});',
      xp: 0,
    },
    {
      id: 13,
      type: "true_false",
      question:
        "The proper filter for 'greater than or equal to 18' is `age_gt: 18`.",
      correct: false,
      explanation:
        "Almost, but not quite! You need `_gte` for 'greater than or equal to', so it's `age_gte: 18`.",
      xp: 10,
    },
  ],
};
// ============================================================================
// COURSE 3: AUTHENTICATION (🔐 13 steps)
// ============================================================================
export const Course3_Auth = {
  id: "cocobase-auth",
  title: "🔐 User Authentication",
  description:
    "Register, login, logout, social login, user profiles, and role checks.",
  icon: "🔐",
  color: "#e3b341",
  difficulty: "intermediate",
  duration: 65,
  steps: [
    // ─── INTRO ───────────────────────────────────────────────────────────────
    {
      id: 1,
      type: "lesson",
      title: "Why Authentication Matters",
      content:
        "<p>Almost every app needs users – signing up, logging in, remembering who's who. Cocobase gives you a complete auth system out of the box.</p><p>You get:</p><ul><li>Email/password registration & login</li><li>Social login with Google and GitHub</li><li>Token management (stored automatically by the SDK)</li><li>User profiles with custom data</li><li>Role checks (admin, moderator, etc.)</li><li>2FA, email verification & password reset</li></ul>",
      xp: 0,
    },

    // ─── INIT AUTH ───────────────────────────────────────────────────────────
    {
      id: 2,
      type: "code_lesson",
      title: "Initialise Auth on App Load",
      content:
        "Call `db.auth.initAuth()` when your app starts. It restores the session from localStorage and triggers auth state callbacks.",
      codeSnippet:
        'const db = new Cocobase({ apiKey: "YOUR_API_KEY" });\n\n// Restore session on page load\nawait db.auth.initAuth();\n\nif (db.auth.isAuthenticated()) {\n  const user = db.auth.getUser();\n  console.log("Welcome back,", user.email);\n} else {\n  console.log("No active session – please log in.");\n}',
      xp: 0,
    },
    {
      id: 3,
      type: "quiz",
      question:
        "What is the purpose of `db.auth.initAuth()` when called on app load?",
      options: [
        "It registers a new user automatically",
        "It restores an existing session from localStorage and fires auth callbacks",
        "It fetches users from the database",
        "It resets the authentication token",
      ],
      correct: 1,
      explanation:
        "`initAuth()` reads the saved token and user from localStorage and restores the session, so users stay logged in across page refreshes.",
      xp: 10,
    },

    // ─── REGISTER ────────────────────────────────────────────────────────────
    {
      id: 4,
      type: "code_lesson",
      title: "Register a New User",
      content:
        "`db.auth.register()` creates an account and logs the user in. It returns a `LoginResult` containing the `user` (and a `requires_2fa` flag if 2FA is active). The SDK stores the token automatically.",
      codeSnippet:
        'const result = await db.auth.register({\n  email: "alex@example.com",\n  password: "SecurePass123!",\n  data: {\n    fullName: "Alex Johnson",\n    plan: "free"\n  }\n});\n\nif (result.requires_2fa) {\n  // Prompt user for their 2FA code\n} else {\n  console.log("Welcome,", result.user.email);\n  // Token is already stored by the SDK – no manual work needed\n}',
      xp: 0,
    },
    {
      id: 5,
      type: "quiz",
      question: "What does `db.auth.register()` return?",
      options: [
        "Only the user object",
        "A `{ user, session }` pair with a token you must store manually",
        "A `LoginResult` with `user` and a `requires_2fa` flag",
        "Nothing – it just sends a welcome email",
      ],
      correct: 2,
      explanation:
        "`register()` returns a `LoginResult` object. If 2FA is not required, `result.user` holds the new user. The SDK stores the token automatically.",
      xp: 10,
    },
    {
      id: 6,
      type: "true_false",
      question:
        "After `db.auth.register()` you need to manually save the token to localStorage.",
      correct: false,
      explanation:
        "The Cocobase JS SDK automatically calls `setToken()` internally, which persists the token in localStorage under `cocobase-token`. You don't need to do it yourself.",
      xp: 10,
    },

    // ─── REGISTER WITH FILES ─────────────────────────────────────────────────
    {
      id: 7,
      type: "code_lesson",
      title: "Register with File Uploads",
      content:
        "Need to upload an avatar at sign-up? Use `registerWithFiles()` instead. Pass `files` as an object where each key is the field name.",
      codeSnippet:
        'const avatarFile = document.querySelector(\'input[type="file"]\').files[0];\n\nconst result = await db.auth.registerWithFiles({\n  email: "alex@example.com",\n  password: "SecurePass123!",\n  data: { fullName: "Alex Johnson" },\n  files: {\n    avatar: avatarFile\n  }\n});\n\nconsole.log("Registered:", result.user.email);',
      xp: 0,
    },

    // ─── LOGIN ───────────────────────────────────────────────────────────────
    {
      id: 8,
      type: "code_lesson",
      title: "Login",
      content:
        "Sign in an existing user. Like `register()`, it returns a `LoginResult`. If 2FA is enabled the result will have `requires_2fa: true` instead of a user.",
      codeSnippet:
        'const result = await db.auth.login({\n  email: "alex@example.com",\n  password: "SecurePass123!"\n});\n\nif (result.requires_2fa) {\n  // Show a code input and call verify2FALogin() next\n  console.log("Enter your 2FA code");\n} else {\n  console.log("Logged in as:", result.user.email);\n  // Token stored automatically – no localStorage call needed\n}',
      xp: 0,
    },
    {
      id: 9,
      type: "true_false",
      question:
        "After calling `db.auth.login()`, you must manually call `localStorage.setItem()` to save the token.",
      correct: false,
      explanation:
        "The SDK stores the token automatically. Calling `localStorage.setItem()` yourself is unnecessary and was behaviour from an older version of the docs.",
      xp: 10,
    },

    // ─── GET CURRENT USER ────────────────────────────────────────────────────
    {
      id: 10,
      type: "code_lesson",
      title: "Get Current User",
      content:
        "There are two ways to access the current user:\n- `db.auth.getUser()` — synchronous, returns cached user from memory (or `undefined`).\n- `db.auth.getCurrentUser()` — async, fetches fresh data from the server. Throws if not authenticated.",
      codeSnippet:
        '// Fast – uses in-memory cache\nconst cached = db.auth.getUser();\nconsole.log("Cached user:", cached?.email);\n\n// Always fresh – hits the server\nif (db.auth.isAuthenticated()) {\n  const user = await db.auth.getCurrentUser();\n  console.log("Fresh user:", user.email);\n  console.log("Custom data:", user.data);\n}',
      xp: 0,
    },
    {
      id: 11,
      type: "short_answer",
      question:
        "Which method should you call BEFORE `getCurrentUser()` to avoid an error when no session exists?",
      placeholder: "e.g., isAuthenticated",
      correct: "isAuthenticated",
      caseSensitive: true,
      hint: "db.auth.________()",
      explanation:
        "`getCurrentUser()` throws if the user is not authenticated. Always check `db.auth.isAuthenticated()` first, or use `initAuth()` on load.",
      xp: 15,
    },
    {
      id: 12,
      type: "quiz",
      question: "What does `db.auth.getUser()` return if no one is logged in?",
      options: [
        "It throws an Error",
        "An empty user object `{}`",
        "`undefined`",
        "`null`",
      ],
      correct: 2,
      explanation:
        "`getUser()` returns `this.user` which is `undefined` when no session is active. Use `isAuthenticated()` to check first.",
      xp: 10,
    },

    // ─── UPDATE USER ─────────────────────────────────────────────────────────
    {
      id: 13,
      type: "code_lesson",
      title: "Update User Profile",
      content:
        "Change a user's data, email or password after login. For file uploads (new avatar, cover photo), use `updateUserWithFiles()` instead.",
      codeSnippet:
        '// Update custom data fields\nconst updated = await db.auth.updateUser({\n  data: {\n    fullName: "Alex M. Johnson",\n    plan: "premium"\n  }\n});\nconsole.log("New name:", updated.data.fullName);\n\n// Update email\nawait db.auth.updateUser({ email: "new@example.com" });\n\n// Update password\nawait db.auth.updateUser({ password: "NewSecurePass456!" });\n\n// Update avatar with file\nawait db.auth.updateUserWithFiles({\n  data: { bio: "Full-stack dev" },\n  files: { avatar: newAvatarFile }\n});',
      xp: 0,
    },

    // ─── LOGOUT ──────────────────────────────────────────────────────────────
    {
      id: 14,
      type: "code_lesson",
      title: "Logout",
      content:
        "`logout()` is **synchronous** – no `await` needed. The SDK clears both the in-memory token and the localStorage entries automatically.",
      codeSnippet:
        '// No await needed – logout is synchronous\ndb.auth.logout();\nconsole.log("User logged out");\n// localStorage "cocobase-token" and "cocobase-user" are cleared by the SDK',
      xp: 0,
    },
    {
      id: 15,
      type: "true_false",
      question:
        "`db.auth.logout()` is an async method and must be called with `await`.",
      correct: false,
      explanation:
        "`logout()` is synchronous. It clears the token and user from memory and removes both `cocobase-token` and `cocobase-user` from localStorage immediately.",
      xp: 10,
    },

    // ─── AUTH EVENTS / CALLBACKS ─────────────────────────────────────────────
    {
      id: 16,
      type: "code_lesson",
      title: "Auth Event Callbacks",
      content:
        "Use `db.auth.onAuthEvent()` to react to auth changes in a framework-agnostic way. This is perfect for keeping UI state in sync.",
      codeSnippet:
        'db.auth.onAuthEvent({\n  onLogin: (user, token) => {\n    console.log("Logged in:", user.email);\n    // e.g. setUser(user) in React\n  },\n  onLogout: () => {\n    console.log("User logged out");\n    // e.g. setUser(null) in React\n  },\n  onRegister: (user, token) => {\n    console.log("New user registered:", user.email);\n  },\n  onUserUpdate: (user) => {\n    console.log("Profile updated:", user.data);\n  },\n  onTokenChange: (token) => {\n    console.log("Token changed:", token);\n  }\n});',
      xp: 0,
    },
    {
      id: 17,
      type: "quiz",
      question:
        "Which callback fires when the user profile is updated via `updateUser()`?",
      options: ["onLogin", "onRegister", "onUserUpdate", "onTokenChange"],
      correct: 2,
      explanation:
        "`onUserUpdate(user)` is triggered every time `updateUser()` or `updateUserWithFiles()` completes successfully.",
      xp: 10,
    },

    // ─── SOCIAL LOGIN ─────────────────────────────────────────────────────────
    {
      id: 18,
      type: "code_lesson",
      title: "Social Login – Google",
      content:
        "`loginWithGoogle()` takes an `idToken` (the credential from the Google Identity Services SDK). Pass `platform` to tell Cocobase where the request comes from.",
      codeSnippet:
        '// 1. Initialise Google Identity Services\ngoogle.accounts.id.initialize({\n  client_id: "YOUR_GOOGLE_CLIENT_ID",\n  callback: async (response) => {\n    // response.credential is the Google ID token\n    const user = await db.auth.loginWithGoogle({\n      idToken: response.credential,\n      platform: "web"\n    });\n    console.log("Signed in with Google:", user.email);\n  }\n});\n\ngoogle.accounts.id.prompt(); // Show the One Tap UI',
      xp: 0,
    },
    {
      id: 19,
      type: "code_lesson",
      title: "Social Login – GitHub",
      content:
        "`loginWithGithub()` exchanges a GitHub OAuth `code` for a session. You redirect the user to GitHub first, then handle the callback URL.",
      codeSnippet:
        '// Step 1 – redirect to GitHub OAuth\nconst CLIENT_ID = "YOUR_GITHUB_CLIENT_ID";\nconst REDIRECT = "https://yourapp.com/auth/github/callback";\nwindow.location.href =\n  `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}`;\n\n// Step 2 – on the callback page, grab the code\nconst code = new URLSearchParams(window.location.search).get("code");\n\nif (code) {\n  const user = await db.auth.loginWithGithub({\n    code,\n    redirectUri: REDIRECT,\n    platform: "web"\n  });\n  console.log("Signed in with GitHub:", user.email);\n}',
      xp: 0,
    },
    {
      id: 20,
      type: "quiz",
      question:
        "What does `db.auth.loginWithGoogle()` require as its main parameter?",
      options: [
        "A redirect URL string",
        "An `idToken` obtained from Google Identity Services",
        "The user's Google email address",
        "An OAuth client secret",
      ],
      correct: 1,
      explanation:
        "`loginWithGoogle({ idToken, platform })` needs the Google ID token (the `credential` field from the Google callback). The SDK sends it to Cocobase for verification.",
      xp: 10,
    },
    {
      id: 21,
      type: "match",
      question: "Match each social login step to its description.",
      pairs: [
        { term: "loginWithGoogle({ idToken })", def: "Verify Google ID token" },
        {
          term: "loginWithGithub({ code, redirectUri })",
          def: "Exchange GitHub OAuth code",
        },
        { term: "platform: 'web'", def: "Identify request origin" },
        { term: "user.email (returned)", def: "Access signed-in user's email" },
      ],
      explanation:
        "Both social methods return an `AppUser` and store the token automatically – no extra steps needed.",
      xp: 15,
    },

    // ─── ROLE CHECKS ─────────────────────────────────────────────────────────
    {
      id: 22,
      type: "code_lesson",
      title: "Check User Roles",
      content:
        "`hasRole()` is **synchronous** – no `await`. It checks the in-memory user object. Throws if no user is logged in.",
      codeSnippet:
        '// hasRole is synchronous – no await\nconst isAdmin = db.auth.hasRole("admin");\nif (isAdmin) {\n  console.log("Show admin panel");\n} else {\n  console.log("Regular user view");\n}\n\n// Always check authentication first\nif (db.auth.isAuthenticated() && db.auth.hasRole("moderator")) {\n  console.log("Show moderation tools");\n}',
      xp: 0,
    },
    {
      id: 23,
      type: "true_false",
      question: "`db.auth.hasRole()` is an async method that must be awaited.",
      correct: false,
      explanation:
        "`hasRole()` is synchronous. It reads `this.user.roles` directly from memory. No network call is made.",
      xp: 10,
    },

    // ─── 2FA ─────────────────────────────────────────────────────────────────
    {
      id: 24,
      type: "code_lesson",
      title: "Two-Factor Authentication (2FA)",
      content:
        "2FA adds an extra security layer. Enable it for a user with `enable2FA()`, and handle the `requires_2fa` flag in the login flow.",
      codeSnippet:
        '// Enable 2FA for the current user\nawait db.auth.enable2FA();\n\n// Send a 2FA code to an email\nawait db.auth.send2FACode("alex@example.com");\n\n// Login flow with 2FA\nconst result = await db.auth.login({ email: "alex@example.com", password: "..." });\nif (result.requires_2fa) {\n  const code = prompt("Enter your 2FA code:");\n  const user = await db.auth.verify2FALogin({\n    email: "alex@example.com",\n    code\n  });\n  console.log("Fully authenticated:", user.email);\n}\n\n// Disable 2FA\nawait db.auth.disable2FA();',
      xp: 0,
    },
    {
      id: 25,
      type: "quiz",
      question:
        "After `login()` returns `{ requires_2fa: true }`, which method do you call next?",
      options: [
        "db.auth.enable2FA()",
        "db.auth.verify2FALogin({ email, code })",
        "db.auth.send2FACode(email)",
        "db.auth.initAuth()",
      ],
      correct: 1,
      explanation:
        "Once you have the user's code, call `verify2FALogin({ email, code })`. It completes authentication and stores the token automatically.",
      xp: 15,
    },

    // ─── EMAIL VERIFICATION ───────────────────────────────────────────────────
    {
      id: 26,
      type: "code_lesson",
      title: "Email Verification",
      content:
        "Ask Cocobase to send a verification email, then verify the token the user receives.",
      codeSnippet:
        '// Send verification email\nawait db.auth.requestEmailVerification();\nconsole.log("Verification email sent!");\n\n// Verify using the token from the email link\nconst token = new URLSearchParams(window.location.search).get("token");\nif (token) {\n  await db.auth.verifyEmail(token);\n  console.log("Email verified!");\n}',
      xp: 0,
    },

    // ─── PASSWORD RESET ───────────────────────────────────────────────────────
    {
      id: 27,
      type: "code_lesson",
      title: "Password Reset",
      content:
        "Let users reset a forgotten password in two steps: request an email, then reset with the token from the email link.",
      codeSnippet:
        '// Step 1 – request a reset email\nawait db.auth.requestPasswordReset("alex@example.com");\nconsole.log("Reset email sent!");\n\n// Step 2 – user clicks link in email, you grab the token\nconst resetToken = new URLSearchParams(window.location.search).get("token");\nif (resetToken) {\n  // Update password using the token\n  await db.auth.updateUser({ password: "NewSecurePass456!" });\n  console.log("Password updated – please log in.");\n}',
      xp: 0,
    },

    // ─── USER MANAGEMENT ─────────────────────────────────────────────────────
    {
      id: 28,
      type: "code_lesson",
      title: "List Users & Get User by ID",
      content:
        "Admins can fetch all users with `listUsers()` (supports filters and pagination) or look up a single user with `getUserById()`.",
      codeSnippet:
        '// List active users (paginated)\nconst result = await db.auth.listUsers({\n  filters: { status: "active" },\n  limit: 20\n});\nconsole.log("Users:", result.data);\n\n// Get a specific user by ID\nconst user = await db.auth.getUserById("user-abc-123");\nconsole.log("Found:", user.email);',
      xp: 0,
    },

    // ─── FINAL MATCH ─────────────────────────────────────────────────────────
    {
      id: 29,
      type: "match",
      question: "Match each auth method to its purpose.",
      pairs: [
        { term: "initAuth()", def: "Restore session on app load" },
        { term: "register()", def: "Create new user & auto-login" },
        { term: "login()", def: "Sign in with email & password" },
        { term: "logout()", def: "End session (synchronous)" },
        { term: "hasRole()", def: "Check role (synchronous)" },
        { term: "verify2FALogin()", def: "Complete 2FA login flow" },
        { term: "requestEmailVerification()", def: "Send verification email" },
      ],
      explanation:
        "These cover the full authentication lifecycle in Cocobase – from session restore to 2FA to email verification.",
      xp: 20,
    },

    // ─── REORDER CHALLENGE ────────────────────────────────────────────────────
    {
      id: 30,
      type: "reorder",
      question:
        "Arrange these lines to correctly handle a login that may require 2FA:",
      items: [
        {
          id: "a",
          text: "const user = await db.auth.verify2FALogin({ email, code })",
        },
        {
          id: "b",
          text: "const result = await db.auth.login({ email, password })",
        },
        { id: "c", text: "if (result.requires_2fa) {" },
        { id: "d", text: "await db.auth.initAuth()" },
      ],
      correct: ["d", "b", "c", "a"],
      explanation:
        "initAuth → login → check requires_2fa → verify2FALogin. Always restore the session first, then attempt login.",
      xp: 20,
    },
  ],
};

// ============================================================================
// COURSE 4: REAL‑TIME FEATURES (⚡ 12 steps)
// ============================================================================
export const Course4_Realtime = {
  id: "cocobase-realtime",
  title: "⚡ Real‑time Features",
  description:
    "Live data syncing, chat rooms, broadcasts, and even multiplayer games.",
  icon: "⚡",
  color: "#39d353",
  difficulty: "advanced",
  duration: 55,
  steps: [
    {
      id: 1,
      type: "lesson",
      title: "What is Real‑time?",
      content:
        "<p>Normal apps refresh data only when you ask. Real‑time apps update instantly when something changes – like a chat message appearing, a live scoreboard, or a friend typing.</p><p>Cocobase provides four real‑time clients under `db.realtime`:</p><ul><li><strong>collection</strong> – watch a collection for create/update/delete events</li><li><strong>room</strong> – chat rooms with messages and typing indicators</li><li><strong>broadcast</strong> – send one‑to‑many notifications</li><li><strong>game</strong> – multiplayer WebSocket game client</li></ul>",
      xp: 0,
    },
    {
      id: 2,
      type: "code_lesson",
      title: "Watching a Collection",
      content: "Use `db.realtime.collection()` to listen for changes.",
      codeSnippet:
        'const watcher = db.realtime.collection("messages");\n\nwatcher.on("create", (doc) => {\n  console.log("New message:", doc);\n});\n\nwatcher.on("update", (doc) => {\n  console.log("Message updated:", doc);\n});\n\nwatcher.on("delete", (id) => {\n  console.log("Message deleted:", id);\n});\n\n// Start listening\nwatcher.subscribe();',
      xp: 0,
    },
    {
      id: 3,
      type: "quiz",
      question: "Which event is triggered when a new document is inserted?",
      options: ["insert", "create", "add", "new"],
      correct: 1,
      explanation: "The `'create'` event fires on document creation.",
      xp: 10,
    },
    {
      id: 4,
      type: "code_lesson",
      title: "Room Chat",
      content: "Create a named room where users can exchange messages.",
      codeSnippet:
        'const chatRoom = db.realtime.room("general");\n\n// Join the room\nawait chatRoom.join();\n\n// Listen for messages\nchatRoom.on("message", (msg) => {\n  console.log(`${msg.user}: ${msg.text}`);\n});\n\n// Send a message\nawait chatRoom.send("Hello everyone!");\n\n// Leave when done\nawait chatRoom.leave();',
      xp: 0,
    },
    {
      id: 5,
      type: "true_false",
      question: "A room chat can have typing indicators.",
      correct: true,
      explanation:
        "Yes – rooms support events like `typing`, `stopTyping`, etc.",
      xp: 10,
    },
    {
      id: 6,
      type: "code_lesson",
      title: "Project Broadcasts",
      content: "Send a message to every connected user in the project.",
      codeSnippet:
        'const broadcaster = db.realtime.broadcast();\n\n// Listen for broadcasts\nbroadcaster.on("announcement", (payload) => {\n  showNotification(payload.text);\n});\n\n// Send a broadcast (e.g., admin panel)\nawait broadcaster.send("announcement", {\n  text: "Server maintenance in 5 minutes"\n});',
      xp: 0,
    },
    {
      id: 7,
      type: "short_answer",
      question:
        "Which real‑time client would you use for a global announcement?",
      placeholder: "e.g., broadcast",
      correct: "broadcast",
      caseSensitive: true,
      hint: "db.realtime.______()",
      explanation: "`broadcast()` sends messages to all users in the project.",
      xp: 15,
    },
    {
      id: 8,
      type: "code_lesson",
      title: "Multiplayer Game Client",
      content: "Build a WebSocket game with rooms, player states, and moves.",
      codeSnippet:
        'const game = db.realtime.game("pong_room");\n\ngame.on("playerJoined", (player) => {\n  console.log(`${player.name} joined`);\n});\n\ngame.on("move", (data) => {\n  updateGameState(data);\n});\n\n// Join as a player\nawait game.join({ name: "Alice", score: 0 });\n\n// Send a move\nawait game.send("move", { dx: 10, dy: 5 });',
      xp: 0,
    },
    {
      id: 9,
      type: "match",
      question: "Match each real‑time client to its primary use.",
      pairs: [
        { term: "collection", def: "Watch for database changes" },
        { term: "room", def: "Chat with messages" },
        { term: "broadcast", def: "Send one‑to‑many alerts" },
        { term: "game", def: "Multiplayer WebSocket game" },
      ],
      explanation: "Choose the right tool for the job.",
      xp: 15,
    },
    {
      id: 10,
      type: "code_lesson",
      title: "Stopping Real‑time Listeners",
      content: "Always unsubscribe to avoid memory leaks.",
      codeSnippet:
        "// For collection watcher\nwatcher.unsubscribe();\n\n// For room\nawait chatRoom.leave();\n\n// For broadcast\nbroadcaster.off(); // remove all listeners\n\n// For game\nawait game.leave();",
      xp: 0,
    },
    {
      id: 11,
      type: "fill_code",
      question: "Fill the blank to create a collection watcher.",
      codeTemplate: [
        "const watcher = db.realtime.",
        "('posts');",
        "watcher.on('create', (doc) => console.log(doc));",
        "watcher.______(); // start listening",
      ],
      blanks: [0, 3],
      blankAnswers: ["collection", "subscribe"],
      wordBank: ["collection", "watch", "subscribe", "listen", "start"],
      explanation: "First call `collection()`, then `subscribe()` to start.",
      xp: 15,
    },
    {
      id: 12,
      type: "reorder",
      question: "Order the steps to set up a live chat room.",
      items: [
        { id: "a", text: "Call chatRoom.send('Hi')" },
        {
          id: "b",
          text: "Create room: const chatRoom = db.realtime.room('lobby')",
        },
        { id: "c", text: "Add listener: chatRoom.on('message', callback)" },
        { id: "d", text: "Join room: await chatRoom.join()" },
      ],
      correct: ["b", "c", "d", "a"],
      explanation: "Create → add listener → join → send messages.",
      xp: 15,
    },
  ],
};

// ============================================================================
// COURSE 5: CLOUD FUNCTIONS (☁️ 10 steps)
// ============================================================================
export const Course5_Functions = {
  id: "cocobase-functions",
  title: "☁️ Cloud Functions",
  description:
    "Write serverless Python functions that run on Cocobase – secrets, APIs, email, and heavy logic.",
  icon: "☁️",
  color: "#58a6ff",
  difficulty: "advanced",
  duration: 55,
  steps: [
    // ─── INTRO ────────────────────────────────────────────────────────────────
    {
      id: 1,
      type: "lesson",
      title: "Why Cloud Functions?",
      content:
        "<p>Some things you cannot (or should not) do on the client:</p><ul><li>Use secret API keys (e.g., payment providers, email services)</li><li>Perform heavy calculations or data processing</li><li>Combine data from multiple collections in one request</li><li>Send emails via CocoMailer</li><li>Build mini APIs that return HTML or JSON</li></ul><p>Cocobase Cloud Functions run in a <strong>sandboxed Python 3.10 environment</strong> on Cocobase servers. You write a <code>main()</code> function – Cocobase handles the rest.</p>",
      xp: 0,
    },
    {
      id: 2,
      type: "quiz",
      question: "What language do Cocobase Cloud Functions use?",
      options: ["JavaScript / TypeScript", "Go", "Python 3.10", "Ruby"],
      correct: 2,
      explanation:
        "Cocobase Cloud Functions run exclusively in a sandboxed Python 3.10 environment. There is no JavaScript/TypeScript runtime for server functions.",
      xp: 10,
    },

    // ─── FUNCTION STRUCTURE ───────────────────────────────────────────────────
    {
      id: 3,
      type: "code_lesson",
      title: "The `main()` Function",
      content:
        "Every cloud function must define a `main()` function. Cocobase automatically injects four globals — `db`, `req`, `render`, and `env` — so you never need to import or receive them as parameters.",
      codeSnippet:
        '# Your entire function lives inside main()\ndef main():\n    name = req.get("name", "World")\n    return {"message": f"Hello, {name}!"}\n\n# No imports needed for db, req, render, env\n# No parameters – they are injected automatically',
      xp: 0,
    },
    {
      id: 4,
      type: "quiz",
      question: "How does a cloud function receive the `db` and `req` objects?",
      options: [
        "They are passed as parameters: `def main(db, req):`",
        "You import them: `from cocobase import db, req`",
        "They are injected automatically as globals — no imports or parameters needed",
        "You create them yourself at the top of the file",
      ],
      correct: 2,
      explanation:
        "`db`, `req`, `render`, and `env` are pre-injected globals. Your function signature is simply `def main():` — no parameters.",
      xp: 10,
    },
    {
      id: 5,
      type: "true_false",
      question:
        "You can write `def main(req, res, { db, auth }):` to receive Cocobase globals in a cloud function.",
      correct: false,
      explanation:
        "That signature is from a different platform. In Cocobase, the signature is just `def main():`. The globals `db`, `req`, `render`, and `env` are injected automatically — no parameters.",
      xp: 10,
    },

    // ─── INJECTED GLOBALS ─────────────────────────────────────────────────────
    {
      id: 6,
      type: "lesson",
      title: "The Four Injected Globals",
      content:
        "<p>Cocobase injects four globals into every function — no imports needed:</p><ul><li><strong>db</strong> — query and mutate your collections and users</li><li><strong>req</strong> (or <strong>request</strong>) — read incoming data, check auth, send email</li><li><strong>render</strong> — return HTML responses with optional Jinja2 templating</li><li><strong>env</strong> — access project metadata (project ID, runtime, static URL)</li></ul><p>Plus a full set of standard library modules are pre-imported: <code>json</code>, <code>datetime</code>, <code>re</code>, <code>uuid</code>, <code>secrets</code>, <code>hashlib</code>, <code>math</code>, and more.</p>",
      xp: 0,
    },
    {
      id: 7,
      type: "match",
      question: "Match each global to its purpose.",
      pairs: [
        { term: "db", def: "Query and mutate collections & users" },
        { term: "req", def: "Read input, check auth, send email" },
        { term: "render", def: "Return HTML responses" },
        { term: "env", def: "Access project metadata" },
      ],
      explanation:
        "These four globals cover everything a cloud function needs — database access, request handling, HTML rendering, and environment info.",
      xp: 15,
    },

    // ─── REQ OBJECT ───────────────────────────────────────────────────────────
    {
      id: 8,
      type: "code_lesson",
      title: "Reading Input with `req`",
      content:
        "`req.get(key, default)` reads a value from the POST body or GET query params automatically. Use `req.json()` to get the entire payload as a dict.",
      codeSnippet:
        'def main():\n    # Works for both GET params and POST body\n    name = req.get("name", "Guest")\n    age  = req.get("age", 0)\n\n    # Get everything at once\n    payload = req.json()\n\n    # HTTP method and headers\n    method  = req.method        # "GET" or "POST"\n    headers = req.headers       # dict\n\n    return {"name": name, "age": age, "method": method}',
      xp: 0,
    },
    {
      id: 9,
      type: "code_lesson",
      title: "Auth Inside Functions — `req.user`",
      content:
        "`req.user` is the authenticated user who called the function (or `None` for anonymous requests). Use it to gate access.",
      codeSnippet:
        'def main():\n    user = req.user\n\n    if not user:\n        return {"error": "Authentication required"}, 401\n\n    # Access user properties\n    user_id = user.id\n    email   = user.email\n    roles   = user.roles\n    data    = user.data     # your custom fields\n\n    # Role check\n    if "admin" not in roles:\n        return {"error": "Forbidden"}, 403\n\n    return {"message": f"Hello admin {email}"}',
      xp: 0,
    },
    {
      id: 10,
      type: "short_answer",
      question:
        "What property of the `req` object gives you the authenticated user (or None)?",
      placeholder: "e.g., req.______",
      correct: "user",
      caseSensitive: true,
      hint: "req.____",
      explanation:
        "`req.user` returns the `AppUser` object for authenticated requests, or `None` for anonymous requests.",
      xp: 15,
    },

    // ─── RETURNING RESPONSES ──────────────────────────────────────────────────
    {
      id: 11,
      type: "code_lesson",
      title: "Returning Responses",
      content:
        "Return a dict for JSON. Return a `(dict, status_code)` tuple for custom HTTP status codes. Return `render.render_html(...)` for HTML.",
      codeSnippet:
        '# JSON response (status 200 by default)\ndef main():\n    return {"success": True, "data": {"id": "123"}}\n\n# JSON with custom status code\ndef main():\n    return {"error": "Not found"}, 404\n\n# Plain HTML\ndef main():\n    return render.render_html("<h1>Hello World!</h1>")\n\n# HTML with Jinja2 template variables\ndef main():\n    posts = db.query("posts", status="published", limit=10)\n    html = """\n    <html><body>\n      {% for post in posts %}\n        <h2>{{ post.title }}</h2>\n      {% endfor %}\n    </body></html>\n    """\n    return render.render_html(html, {"posts": posts["data"]})',
      xp: 0,
    },
    {
      id: 12,
      type: "quiz",
      question:
        "How do you return an HTTP 403 Forbidden response from a cloud function?",
      options: [
        "res.status(403).json({ error: 'Forbidden' })",
        'return {"error": "Forbidden"}, 403',
        "raise Exception('Forbidden', 403)",
        "return render.error(403)",
      ],
      correct: 1,
      explanation:
        'Return a tuple of `(dict, status_code)`. For example, `return {"error": "Forbidden"}, 403` sends a JSON error with HTTP status 403.',
      xp: 10,
    },

    // ─── DB API ───────────────────────────────────────────────────────────────
    {
      id: 13,
      type: "code_lesson",
      title: "Querying Collections with `db.query()`",
      content:
        '`db.query()` returns `{ "data": [...], "total": N, "has_more": bool }`. Use keyword args for filters. Always set a `limit` to avoid slow unbounded queries.',
      codeSnippet:
        'def main():\n    # Basic query with filters\n    posts = db.query("posts",\n        status="published",\n        populate=["author", "category"],\n        sort="created_at",\n        order="desc",\n        limit=20,\n        offset=0\n    )\n\n    return {\n        "posts":    posts["data"],\n        "total":    posts["total"],\n        "has_more": posts["has_more"]\n    }',
      xp: 0,
    },
    {
      id: 14,
      type: "code_lesson",
      title: "Getting a Single Document with `db.find_one()`",
      content:
        "`db.find_one()` returns the matching document or `None`. Always check for `None` before accessing fields.",
      codeSnippet:
        'def main():\n    post_id = req.get("post_id")\n\n    post = db.find_one("posts",\n        id=post_id,\n        populate=["author", "category"]\n    )\n\n    if not post:\n        return {"error": "Post not found"}, 404\n\n    return {"post": post}',
      xp: 0,
    },
    {
      id: 15,
      type: "quiz",
      question:
        "What does `db.find_one()` return when no document matches the filters?",
      options: [
        "An empty list `[]`",
        "An empty dict `{}`",
        "`None`",
        "It raises an Exception",
      ],
      correct: 2,
      explanation:
        "`find_one()` returns `None` when nothing matches. Always guard with `if not post: return {...}, 404` before accessing the result.",
      xp: 10,
    },
    {
      id: 16,
      type: "code_lesson",
      title: "Querying Users with `db.query_users()` and `db.find_user()`",
      content:
        "These work exactly like `db.query()` / `db.find_one()` but target the auth user collection.",
      codeSnippet:
        'def main():\n    # List premium users\n    users = db.query_users(\n        role="premium",\n        age_gte="18",\n        email_endswith="@gmail.com",\n        sort="created_at",\n        order="desc",\n        limit=50\n    )\n\n    # Find one user by ID\n    user = db.find_user(id="user-abc")\n\n    # Find one user by email\n    user = db.find_user(email="john@example.com")\n    if not user:\n        return {"error": "User not found"}, 404\n\n    return {"user": user, "total": users["total"]}',
      xp: 0,
    },

    // ─── FILTER OPERATORS ─────────────────────────────────────────────────────
    {
      id: 17,
      type: "code_lesson",
      title: "Filter Operators",
      content:
        "Add a suffix to any field name to apply comparison operators. Numeric values must be passed as **strings** inside cloud functions.",
      codeSnippet:
        'def main():\n    products = db.query("products",\n        # Comparison (pass numbers as strings!)\n        price_gte="50",\n        price_lte="500",\n        stock_gt="0",\n\n        # String operators\n        name_contains="shirt",      # case-insensitive\n        email_endswith="@gmail.com",\n        title_startswith="How",\n\n        # Not equal\n        status_ne="discontinued",\n\n        # IN / NOT IN (comma-separated)\n        category_in="shirts,hoodies,jackets",\n        tag_notin="sale,clearance",\n\n        # Null checks (pass as strings)\n        deleted_at_isnull="true"\n    )\n    return {"products": products["data"]}',
      xp: 0,
    },
    {
      id: 18,
      type: "true_false",
      question:
        "In Cocobase cloud functions, numeric filter values can be passed as integers: `views_gt=100`.",
      correct: false,
      explanation:
        'Numeric comparison values must be passed as strings: `views_gt="100"` not `views_gt=100`. This is a key gotcha in the cloud function environment.',
      xp: 10,
    },
    {
      id: 19,
      type: "fill_code",
      question:
        "Fill the blanks to query posts where views >= 100 and status is NOT 'draft'.",
      codeTemplate: [
        'posts = db.query("posts",\n    views_',
        '="100",\n    status_',
        '="draft"\n)',
      ],
      blanks: [0, 1],
      blankAnswers: ["gte", "ne"],
      wordBank: ["gte", "ne", "gt", "eq", "lte", "in"],
      explanation:
        "`_gte` means >= (greater than or equal), `_ne` means != (not equal). Remember to pass the numeric value as a string.",
      xp: 15,
    },

    // ─── BOOLEAN LOGIC ────────────────────────────────────────────────────────
    {
      id: 20,
      type: "code_lesson",
      title: "OR Queries and Named OR Groups",
      content:
        "Prefix filter keys with `[or]` for a simple OR. Use `[or:groupname]` to create named groups — conditions within a group are OR'd, groups are AND'd together.",
      codeSnippet:
        'def main():\n    keyword = req.get("q", "")\n\n    # Simple OR: status = published OR featured\n    posts = db.query("posts", **{\n        "[or]status":   "published",\n        "[or]status_2": "featured"\n    })\n\n    # Named groups: (cat=tech OR cat=programming) AND (status=published OR featured)\n    posts = db.query("posts", **{\n        "[or:cats]category":    "tech",\n        "[or:cats]category_2":  "programming",\n        "[or:status]status":    "published",\n        "[or:status]status_2":  "featured"\n    })\n\n    # Search across multiple fields\n    posts = db.query("posts", **{\n        "[or:search]title_contains":   keyword,\n        "[or:search]content_contains": keyword,\n        "status": "published"\n    }, limit=20)\n\n    return {"posts": posts["data"]}',
      xp: 0,
    },

    // ─── EMAIL ────────────────────────────────────────────────────────────────
    {
      id: 21,
      type: "code_lesson",
      title: "Sending Email with `req.send_mail()`",
      content:
        "Send email via CocoMailer directly from any cloud function using `req.send_mail()`. No external API keys needed.",
      codeSnippet:
        'def main():\n    email = req.get("email")\n    name  = req.get("name", "there")\n\n    # Simple HTML email\n    req.send_mail(\n        to=email,\n        subject="Welcome to our app!",\n        body=f"<h1>Hello {name}!</h1><p>Thanks for joining.</p>"\n    )\n\n    # With a template (and template variables)\n    req.send_mail(\n        to=["admin@example.com", "team@example.com"],  # list of recipients\n        subject="New signup alert",\n        template_id="new-user-alert",\n        context={"username": name, "email": email}\n    )\n\n    return {"sent": True}',
      xp: 0,
    },
    {
      id: 22,
      type: "quiz",
      question:
        "Which method sends email from inside a Cocobase cloud function?",
      options: [
        "db.sendEmail(to, subject, body)",
        "env.mail(to, subject)",
        "req.send_mail(to, subject, body)",
        "render.send_mail(to, subject)",
      ],
      correct: 2,
      explanation:
        "`req.send_mail()` is the CocoMailer integration built into the `req` object. No third-party API keys or imports needed.",
      xp: 10,
    },

    // ─── OTP PATTERN ─────────────────────────────────────────────────────────
    {
      id: 23,
      type: "code_lesson",
      title: "Common Pattern: OTP Generation",
      content:
        "The `secrets` module is pre-imported — use it to generate cryptographically secure OTPs.",
      codeSnippet:
        'def main():\n    email = req.get("email")\n\n    # Generate a 6-digit OTP using the pre-imported secrets module\n    otp = "".join([str(secrets.randbelow(10)) for _ in range(6)])\n\n    # Email it\n    req.send_mail(\n        to=email,\n        subject="Your verification code",\n        body=f"Your OTP is: <strong>{otp}</strong>. Expires in 10 minutes."\n    )\n\n    # Optionally store it\n    db.query("otp_codes")  # ... save logic\n\n    return {"otp_sent": True}',
      xp: 0,
    },

    // ─── PAGINATION ───────────────────────────────────────────────────────────
    {
      id: 24,
      type: "code_lesson",
      title: "Common Pattern: Pagination",
      content:
        "Build paginated endpoints by reading `page` and `per_page` from the request and computing the offset.",
      codeSnippet:
        'def main():\n    page     = int(req.get("page", 1))\n    per_page = int(req.get("per_page", 20))\n    offset   = (page - 1) * per_page\n\n    result = db.query("posts",\n        status="published",\n        sort="created_at",\n        order="desc",\n        limit=per_page,\n        offset=offset\n    )\n\n    return {\n        "data":     result["data"],\n        "page":     page,\n        "total":    result["total"],\n        "has_more": result["has_more"]\n    }',
      xp: 0,
    },

    // ─── CLI ─────────────────────────────────────────────────────────────────
    {
      id: 25,
      type: "code_lesson",
      title: "The Cocobase CLI",
      content:
        "Use the `cocobase` CLI to test functions locally before deploying, then deploy with a single command.",
      codeSnippet:
        '# Test locally (no deploy needed)\ncocobase test functions/hello.py\n\n# Test with parameters\ncocobase test functions/hello.py --params \'{"name": "Alice"}\'\n\n# Deploy a single function\ncocobase deploy functions/hello.py\n\n# Deploy all functions at once\ncocobase deploy --all\n\n# List deployed functions\ncocobase list\n\n# View live logs\ncocobase logs --function hello --limit 50',
      xp: 0,
    },
    {
      id: 26,
      type: "quiz",
      question:
        "Which CLI command deploys ALL functions in your project at once?",
      options: [
        "cocobase deploy functions/",
        "cocobase publish --all",
        "cocobase deploy --all",
        "cocobase push --functions",
      ],
      correct: 2,
      explanation:
        "`cocobase deploy --all` deploys every function in the project. Use `cocobase deploy functions/name.py` to deploy a single function.",
      xp: 10,
    },

    // ─── CALLING FUNCTIONS ────────────────────────────────────────────────────
    {
      id: 27,
      type: "code_lesson",
      title: "Calling Your Function",
      content:
        "Functions are plain HTTP endpoints. Call them with `fetch()` from JavaScript, `curl`, or the Python SDK — there is no `db.functions.execute()` method.",
      codeSnippet:
        '// JavaScript (GET)\nconst res = await fetch(\n  "https://api.cocobase.buzz/projects/YOUR_PROJECT_ID/execute/hello?name=Alice"\n);\nconst data = await res.json();\nconsole.log(data.message);\n\n// JavaScript (POST)\nconst res = await fetch(\n  "https://api.cocobase.buzz/projects/YOUR_PROJECT_ID/execute/sendWelcome",\n  {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ email: "alex@example.com", name: "Alex" })\n  }\n);\n\n// curl (GET)\n// curl "https://api.cocobase.buzz/projects/YOUR_PROJECT_ID/execute/hello?name=Alice"',
      xp: 0,
    },
    {
      id: 28,
      type: "true_false",
      question:
        "You call a Cocobase cloud function from JavaScript using `db.functions.execute('name', payload)`.",
      correct: false,
      explanation:
        "There is no `db.functions.execute()` method. Cloud functions are plain HTTP endpoints. Call them with `fetch()`, `curl`, or the Python SDK using the URL `https://api.cocobase.buzz/projects/YOUR_PROJECT_ID/execute/functionName`.",
      xp: 10,
    },

    // ─── ERROR HANDLING ───────────────────────────────────────────────────────
    {
      id: 29,
      type: "code_lesson",
      title: "Error Handling",
      content:
        "Wrap your logic in try/except. Return a `(dict, status_code)` tuple for known errors; let the catch-all return a 500.",
      codeSnippet:
        'def main():\n    try:\n        post_id = req.get("post_id")\n        if not post_id:\n            return {"error": "post_id is required"}, 400\n\n        post = db.find_one("posts", id=post_id)\n        if not post:\n            return {"error": "Post not found"}, 404\n\n        return {"post": post}\n\n    except ValueError as e:\n        return {"error": str(e)}, 400\n    except Exception as e:\n        print(f"Unexpected error: {str(e)}")\n        return {"error": "Internal server error"}, 500',
      xp: 0,
    },

    // ─── FINAL CHALLENGES ─────────────────────────────────────────────────────
    {
      id: 30,
      type: "reorder",
      question: "Arrange these steps for the correct cloud function workflow:",
      items: [
        { id: "a", text: "Call the function via fetch() from your frontend" },
        { id: "b", text: "Write `def main():` with your logic in a .py file" },
        { id: "c", text: "Run `cocobase test` to verify it locally" },
        { id: "d", text: "Run `cocobase deploy` to publish it" },
      ],
      correct: ["b", "c", "d", "a"],
      explanation:
        "Write → test locally → deploy → integrate in your app. Always test before deploying.",
      xp: 15,
    },
    {
      id: 31,
      type: "match",
      question:
        "Match each concept to the correct Cocobase cloud function implementation.",
      pairs: [
        { term: "Read a query param", def: 'req.get("key", default)' },
        { term: "Check who's logged in", def: "req.user" },
        {
          term: "Query a collection",
          def: 'db.query("collection", **filters)',
        },
        { term: "Send an email", def: "req.send_mail(to, subject, body)" },
        {
          term: "Return a 404 error",
          def: 'return {"error": "Not found"}, 404',
        },
        { term: "Render HTML", def: "render.render_html(html, context)" },
      ],
      explanation:
        "These six patterns cover the core building blocks of any Cocobase cloud function.",
      xp: 20,
    },
  ],
};

// ============================================================================
// COURSE 6: FILES & BATCH OPERATIONS (📁 11 steps)
// ============================================================================
export const Course6_FilesBatch = {
  id: "cocobase-files-batch",
  title: "📁 Files & Batch Operations",
  description:
    "Upload images, create multiple documents at once, and update in bulk.",
  icon: "📁",
  color: "#e3b341",
  difficulty: "advanced",
  duration: 40,
  steps: [
    // ─── INTRO ────────────────────────────────────────────────────────────────
    {
      id: 1,
      type: "lesson",
      title: "Beyond Simple Documents",
      content:
        "<p>Real apps need file uploads (avatars, PDFs, photos) and efficient bulk operations. Cocobase gives you:</p><ul><li><strong>File uploads</strong> – standalone uploads via the <code>uploadFile()</code> named export, or attached directly to document create/update calls</li><li><strong>Batch create/update/delete</strong> – do many operations in one network call using <code>createDocuments()</code>, <code>updateDocuments()</code>, and <code>deleteDocuments()</code></li></ul>",
      xp: 0,
    },

    // ─── STANDALONE FILE UPLOAD ───────────────────────────────────────────────
    {
      id: 2,
      type: "code_lesson",
      title: "Uploading a File (Standalone)",
      content:
        "`uploadFile` is a **named export** from the `cocobase` package — not a method on `db`. Call it with `uploadFile(db, file)` to store a file independently of any collection.",
      codeSnippet:
        'import { Cocobase, uploadFile } from "cocobase";\n\nconst db = new Cocobase({ apiKey: "YOUR_API_KEY" });\n\nconst fileInput = document.querySelector(\'input[type="file"]\');\nconst file = fileInput.files[0];\n\n// uploadFile takes the db instance and the file\nconst result = await uploadFile(db, file);\nconsole.log("File URL:", result.url);\n\n// You can then store the URL anywhere you like\nawait db.updateDocument("users", "user-123", {\n  avatarUrl: result.url\n});',
      xp: 0,
    },
    {
      id: 3,
      type: "quiz",
      question:
        "How do you import the standalone file upload function in Cocobase JS?",
      options: [
        "import { db.files.uploadFile } from 'cocobase'",
        "import { uploadFile } from 'cocobase'  — then call uploadFile(db, file)",
        "import CocobaseStorage from 'cocobase/storage'",
        "const { uploadFile } = db.files",
      ],
      correct: 1,
      explanation:
        "`uploadFile` is a named export from the `cocobase` package. You call it as `uploadFile(db, file)`, passing the `db` instance as the first argument.",
      xp: 10,
    },
    {
      id: 4,
      type: "true_false",
      question:
        "You can upload a file using `db.files.uploadFile(file)` on the Cocobase client instance.",
      correct: false,
      explanation:
        "`db.files.uploadFile()` doesn't exist. `uploadFile` is a standalone named export: `import { uploadFile } from 'cocobase'` then `uploadFile(db, file)`.",
      xp: 10,
    },

    // ─── FILE + DOCUMENT TOGETHER ─────────────────────────────────────────────
    {
      id: 5,
      type: "code_lesson",
      title: "Create a Document with Files Attached",
      content:
        "`createDocumentWithFiles` is also a **named export**. It uploads the files and creates the document in one call, returning the full document with file URLs embedded.",
      codeSnippet:
        'import { Cocobase, createDocumentWithFiles } from "cocobase";\n\nconst db = new Cocobase({ apiKey: "YOUR_API_KEY" });\n\nconst avatarFile = document.querySelector(\'#avatar\').files[0];\n\nconst newUser = await createDocumentWithFiles(\n  db,                          // 1. db instance\n  "users",                     // 2. collection name\n  { name: "Bob", email: "bob@example.com" },  // 3. document data\n  { avatar: avatarFile }       // 4. files object (field name → File)\n);\n\nconsole.log("Created user:", newUser.name);\nconsole.log("Avatar URL:", newUser.avatar);',
      xp: 0,
    },
    {
      id: 6,
      type: "quiz",
      question: "What does `createDocumentWithFiles()` return?",
      options: [
        "Only the uploaded file URL",
        "The created document with file URLs already embedded",
        "Nothing – you must fetch the document separately",
        "A promise that resolves to the file ID",
      ],
      correct: 1,
      explanation:
        "It returns the full created document object. File fields are replaced with their accessible URLs, so you don't need an extra fetch.",
      xp: 10,
    },
    {
      id: 7,
      type: "match",
      question: "Match each file function to how it is used.",
      pairs: [
        {
          term: "uploadFile(db, file)",
          def: "Upload a file with no collection attached",
        },
        {
          term: "createDocumentWithFiles(db, col, data, files)",
          def: "Create a doc and upload files in one call",
        },
        {
          term: "result.url",
          def: "Access the stored file's URL from the result",
        },
        {
          term: "import { uploadFile } from 'cocobase'",
          def: "How to bring the function into scope",
        },
      ],
      explanation:
        "Both file functions are named exports — they receive the `db` instance as their first argument rather than being methods on it.",
      xp: 15,
    },

    // ─── BATCH CREATE ─────────────────────────────────────────────────────────
    {
      id: 8,
      type: "code_lesson",
      title: "Batch Create Multiple Documents",
      content:
        "Insert several documents at once with `db.createDocuments()` — a method directly on `db`, no `.batch` namespace.",
      codeSnippet:
        'const newProducts = await db.createDocuments("products", [\n  { name: "Laptop",   price: 999 },\n  { name: "Mouse",    price: 29  },\n  { name: "Keyboard", price: 79  }\n]);\n\nconsole.log(`Created ${newProducts.length} products`);',
      xp: 0,
    },
    {
      id: 9,
      type: "true_false",
      question:
        "Batch create in Cocobase is called as `db.batch.createDocuments(collection, docs)`.",
      correct: false,
      explanation:
        "There is no `.batch` namespace. The correct call is `db.createDocuments(collection, arrayOfDocs)` — directly on `db`.",
      xp: 10,
    },

    // ─── BATCH UPDATE ─────────────────────────────────────────────────────────
    {
      id: 10,
      type: "code_lesson",
      title: "Batch Update Documents",
      content:
        "`db.updateDocuments()` takes a collection name and an **object** where each key is a document ID mapping to its new data — not an array.",
      codeSnippet:
        'await db.updateDocuments("products", {\n  "prod_1": { price: 899 },\n  "prod_2": { inStock: false },\n  "prod_3": { price: 49, inStock: true }\n});\n\n// Keys are document IDs, values are the partial updates to apply',
      xp: 0,
    },
    {
      id: 11,
      type: "quiz",
      question:
        "What shape does `db.updateDocuments()` expect as its second argument?",
      options: [
        "An array of `{ id, data }` objects: `[{ id: 'x', data: {...} }]`",
        "An object mapping document IDs to their updates: `{ 'id-1': {...}, 'id-2': {...} }`",
        "A flat array of new data objects in order",
        "A comma-separated string of IDs",
      ],
      correct: 1,
      explanation:
        "`updateDocuments(collection, updates)` takes an object where each key is a document ID and each value is the partial update to apply to that document.",
      xp: 10,
    },

    // ─── BATCH DELETE ─────────────────────────────────────────────────────────
    {
      id: 12,
      type: "code_lesson",
      title: "Batch Delete Documents",
      content:
        "`db.deleteDocuments()` takes a collection name and an **array of ID strings** — not objects.",
      codeSnippet:
        '// Pass a plain array of ID strings\nawait db.deleteDocuments("products", [\n  "prod_1",\n  "prod_2",\n  "prod_3"\n]);\n\nconsole.log("3 products deleted");',
      xp: 0,
    },
    {
      id: 13,
      type: "fill_code",
      question: "Fill the blank to batch delete two products.",
      codeTemplate: ["await db.", '("products", ["prod_1", "prod_2"]);'],
      blanks: [0],
      blankAnswers: ["deleteDocuments"],
      wordBank: [
        "deleteDocuments",
        "batch.delete",
        "removeDocuments",
        "batchDelete",
      ],
      explanation:
        "`db.deleteDocuments(collection, arrayOfIds)` deletes multiple documents in one call. The second argument is a plain array of ID strings.",
      xp: 15,
    },

    // ─── WHY BATCH ────────────────────────────────────────────────────────────
    {
      id: 14,
      type: "true_false",
      question:
        "Batch operations reduce the number of network requests to the server.",
      correct: true,
      explanation:
        "Exactly — instead of N individual calls, one batch request handles everything. This is faster and puts less load on the server.",
      xp: 10,
    },

    // ─── FULL SUMMARY ─────────────────────────────────────────────────────────
    {
      id: 15,
      type: "match",
      question: "Match each operation to its correct Cocobase call.",
      pairs: [
        { term: "Upload a file standalone", def: "uploadFile(db, file)" },
        {
          term: "Create a doc + upload files",
          def: "createDocumentWithFiles(db, col, data, files)",
        },
        {
          term: "Insert many documents",
          def: "db.createDocuments(col, [...])",
        },
        {
          term: "Update many documents",
          def: "db.updateDocuments(col, { id: data })",
        },
        {
          term: "Delete many documents",
          def: "db.deleteDocuments(col, ['id1', 'id2'])",
        },
      ],
      explanation:
        "File helpers are named exports that take `db` as first arg. Batch CRUD methods live directly on `db` — there is no `.batch` namespace.",
      xp: 20,
    },

    // ─── REORDER CHALLENGE ────────────────────────────────────────────────────
    {
      id: 16,
      type: "reorder",
      question:
        "Arrange these lines to correctly upload a file and attach its URL to a document:",
      items: [
        {
          id: "a",
          text: "await db.updateDocument('users', userId, { avatarUrl: result.url })",
        },
        { id: "b", text: "import { Cocobase, uploadFile } from 'cocobase'" },
        { id: "c", text: "const result = await uploadFile(db, file)" },
        { id: "d", text: "const db = new Cocobase({ apiKey: 'YOUR_KEY' })" },
      ],
      correct: ["b", "d", "c", "a"],
      explanation:
        "Import → initialise db → upload the file → store the returned URL in the document.",
      xp: 15,
    },
  ],
};
// ============================================================================
// COURSE 7: ADVANCED QUERY BUILDING (🔧 10 steps)
// ============================================================================
export const Course7_AdvancedQueries = {
  id: "cocobase-advanced-queries",
  title: "🔧 Advanced Queries",
  description:
    "Master complex filters, OR logic, field selection, sorting, and pagination in the JS SDK.",
  icon: "🔧",
  color: "#58a6ff",
  difficulty: "advanced",
  duration: 45,
  steps: [
    // ─── INTRO ────────────────────────────────────────────────────────────────
    {
      id: 1,
      type: "lesson",
      title: "Beyond Simple Filters",
      content:
        "<p>The JS SDK's <code>listDocuments()</code> accepts a rich options object that covers everything you need for advanced queries — no separate query builder class exists.</p><p>You can combine:</p><ul><li><strong>Operator suffixes</strong> — <code>price_gte</code>, <code>title_contains</code>, <code>status_in</code>, etc.</li><li><strong>OR logic</strong> — <code>[or]</code> prefix and named <code>[or:group]</code> groups</li><li><strong>Field selection</strong> — <code>select</code> to fetch only the fields you need</li><li><strong>Sorting & pagination</strong> — <code>orderBy</code>, <code>order</code>, <code>limit</code>, <code>offset</code></li><li><strong>Population</strong> — <code>populate</code> to expand related documents</li></ul>",
      xp: 0,
    },

    // ─── OPERATOR SUFFIXES ────────────────────────────────────────────────────
    {
      id: 2,
      type: "code_lesson",
      title: "Comparison Operator Suffixes",
      content:
        "Append a suffix to any field name inside `filters` to apply a comparison. No special syntax — just a key name convention.",
      codeSnippet:
        'const results = await db.listDocuments("products", {\n  filters: {\n    price_gte: 100,       // price >= 100\n    price_lte: 500,       // price <= 500\n    stock_gt: 0,          // stock > 0\n    rating_gte: 4,        // rating >= 4\n    category_ne: "discontinued"  // category != "discontinued"\n  }\n});\n\n// All suffixes:\n// _gt  _gte  _lt  _lte  (greater/less than)\n// _ne             (not equal)\n// _eq             (explicit equal, same as no suffix)',
      xp: 0,
    },
    {
      id: 3,
      type: "quiz",
      question:
        "Which filter key returns documents where `price` is less than or equal to 200?",
      options: [
        "price_lt: 200",
        "price_lte: 200",
        "price_max: 200",
        "price_le: 200",
      ],
      correct: 1,
      explanation:
        "`_lte` means less-than-or-equal. `_lt` is strictly less-than (so price 200 would be excluded). The correct suffix is `_lte`.",
      xp: 10,
    },

    // ─── STRING OPERATORS ─────────────────────────────────────────────────────
    {
      id: 4,
      type: "code_lesson",
      title: "String Operator Suffixes",
      content:
        "Search within text fields using `_contains`, `_startswith`, and `_endswith`. All are case-insensitive.",
      codeSnippet:
        'const results = await db.listDocuments("articles", {\n  filters: {\n    title_contains: "javascript",    // title includes "javascript"\n    author_startswith: "Alex",       // author starts with "Alex"\n    email_endswith: "@gmail.com"     // email ends with "@gmail.com"\n  }\n});',
      xp: 0,
    },
    {
      id: 5,
      type: "fill_code",
      question:
        "Fill the blank to find posts whose title contains the word 'cocobase'.",
      codeTemplate: [
        'const posts = await db.listDocuments("posts", {\n  filters: {\n    title_',
        ': "cocobase"\n  }\n});',
      ],
      blanks: [0],
      blankAnswers: ["contains"],
      wordBank: ["contains", "includes", "like", "search"],
      explanation:
        "`_contains` does a case-insensitive substring search on a string field.",
      xp: 15,
    },

    // ─── IN / NOTIN ───────────────────────────────────────────────────────────
    {
      id: 6,
      type: "code_lesson",
      title: "Array / IN Operators",
      content:
        "Use `_in` to match any value in a comma-separated list, and `_notin` to exclude values. Great for multi-status filters.",
      codeSnippet:
        'const results = await db.listDocuments("posts", {\n  filters: {\n    // Match documents where status is one of these values\n    status_in: "published,featured,trending",\n\n    // Exclude documents in these categories\n    category_notin: "spam,nsfw",\n\n    // Filter on array fields\n    tags_array_contains: "featured"\n  }\n});',
      xp: 0,
    },
    {
      id: 7,
      type: "quiz",
      question:
        "Which filter key finds documents where `role` is either 'admin' OR 'moderator'?",
      options: [
        'role_or: "admin,moderator"',
        'role_in: "admin,moderator"',
        'role: ["admin", "moderator"]',
        'role_any: "admin|moderator"',
      ],
      correct: 1,
      explanation:
        '`_in` matches any value in a comma-separated string. `role_in: "admin,moderator"` returns documents where role is admin or moderator.',
      xp: 10,
    },

    // ─── NULL CHECK ───────────────────────────────────────────────────────────
    {
      id: 8,
      type: "code_lesson",
      title: "Null Checks",
      content:
        'Use `_isnull` to find documents where a field is null or not null — pass the value as a string `"true"` or `"false"`.',
      codeSnippet:
        'const results = await db.listDocuments("users", {\n  filters: {\n    deleted_at_isnull: "true",   // deleted_at IS NULL (not deleted)\n    avatar_isnull: "false"       // avatar IS NOT NULL (has avatar)\n  }\n});',
      xp: 0,
    },

    // ─── SIMPLE OR ────────────────────────────────────────────────────────────
    {
      id: 9,
      type: "code_lesson",
      title: "OR Conditions with the `[or]` Prefix",
      content:
        "Prefix any filter key with `[or]` to make it an OR condition. When multiple values target the same field, append `_2`, `_3` etc. to keep keys unique.",
      codeSnippet:
        '// Find users who are either admin OR have premium plan\nconst users = await db.listDocuments("users", {\n  filters: {\n    "[or]role": "admin",\n    "[or]plan": "premium"\n  }\n});\n\n// OR on the same field — use _2 suffix to avoid key collision\nconst posts = await db.listDocuments("posts", {\n  filters: {\n    "[or]status":   "published",\n    "[or]status_2": "featured"\n  }\n});',
      xp: 0,
    },
    {
      id: 10,
      type: "true_false",
      question:
        "When using `[or]` on the same field twice, you must use `_2` to make the second key unique.",
      correct: true,
      explanation:
        'JavaScript objects cannot have duplicate keys. Use `"[or]status"` and `"[or]status_2"` to target the same field twice in an OR condition.',
      xp: 10,
    },

    // ─── NAMED OR GROUPS ──────────────────────────────────────────────────────
    {
      id: 11,
      type: "code_lesson",
      title: "Named OR Groups — `[or:groupName]`",
      content:
        "Named groups let you create independent OR blocks that are AND-ed together. Conditions within the same group name are OR-ed; different group names are AND-ed.",
      codeSnippet:
        '// (category=tech OR category=programming) AND (status=published OR status=featured)\nconst posts = await db.listDocuments("posts", {\n  filters: {\n    "[or:cats]category":    "tech",\n    "[or:cats]category_2":  "programming",\n    "[or:status]status":    "published",\n    "[or:status]status_2":  "featured"\n  }\n});\n\n// Search: title OR content contains the keyword (and must be published)\nconst keyword = "cocobase";\nconst search = await db.listDocuments("posts", {\n  filters: {\n    "[or:search]title_contains":   keyword,\n    "[or:search]content_contains": keyword,\n    status: "published"   // AND condition outside any OR group\n  }\n});',
      xp: 0,
    },
    {
      id: 12,
      type: "quiz",
      question:
        "With named OR groups, what happens to conditions that share the SAME group name?",
      options: [
        "They are AND-ed together",
        "They are OR-ed together",
        "The second one overwrites the first",
        "They are ignored",
      ],
      correct: 1,
      explanation:
        "Conditions sharing the same `[or:groupName]` are OR-ed. Different group names are AND-ed. This lets you express (A or B) AND (C or D) cleanly.",
      xp: 10,
    },

    // ─── SELECT ───────────────────────────────────────────────────────────────
    {
      id: 13,
      type: "code_lesson",
      title: "Field Selection with `select`",
      content:
        "Pass a `select` array to fetch only the fields you need — reduces payload size significantly on large collections.",
      codeSnippet:
        'const posts = await db.listDocuments("posts", {\n  filters:  { status: "published" },\n  select:   ["id", "title", "author_id", "created_at"],\n  orderBy:  "created_at",\n  order:    "desc",\n  limit:    20\n});\n\n// Each document in posts.data only contains the 4 selected fields',
      xp: 0,
    },
    {
      id: 14,
      type: "short_answer",
      question:
        "What option do you pass to `listDocuments()` to restrict which fields are returned?",
      placeholder: "e.g., select",
      correct: "select",
      caseSensitive: true,
      hint: "Pass an array of field names under this key",
      explanation:
        "`select: ['field1', 'field2']` limits the fields returned in each document, reducing data transfer.",
      xp: 15,
    },

    // ─── SORT & PAGINATE ──────────────────────────────────────────────────────
    {
      id: 15,
      type: "code_lesson",
      title: "Sorting & Pagination",
      content:
        "Use `orderBy` + `order` for sorting and `limit` + `offset` for pagination. The response always includes `total` and `has_more`.",
      codeSnippet:
        'const PAGE = 2;\nconst PER_PAGE = 10;\n\nconst results = await db.listDocuments("products", {\n  filters:  { inStock: true },\n  orderBy:  "price",\n  order:    "asc",          // "asc" or "desc"\n  limit:    PER_PAGE,\n  offset:   (PAGE - 1) * PER_PAGE  // page 2 → skip first 10\n});\n\nconsole.log(results.data);      // array of documents\nconsole.log(results.total);     // total count matching filters\nconsole.log(results.has_more);  // true if more pages exist',
      xp: 0,
    },

    // ─── POPULATE ─────────────────────────────────────────────────────────────
    {
      id: 16,
      type: "code_lesson",
      title: "Populating Related Documents",
      content:
        "Pass a `populate` array to expand relationship fields. Store the related document's ID as `fieldName_id` and Cocobase will join the data automatically.",
      codeSnippet:
        'const posts = await db.listDocuments("posts", {\n  filters:  { status: "published" },\n  populate: ["author", "category"],  // expands author_id → author object\n  orderBy:  "created_at",\n  order:    "desc",\n  limit:    10\n});\n\n// post.author is now the full user object, not just an ID\nconst first = posts.data[0];\nconsole.log(first.author.email);\nconsole.log(first.category.name);',
      xp: 0,
    },

    // ─── COMBINED REAL-WORLD QUERY ────────────────────────────────────────────
    {
      id: 17,
      type: "code_lesson",
      title: "Putting It All Together",
      content:
        "A real product-search query combining filters, OR groups, population, selection, sorting, and pagination.",
      codeSnippet:
        'const keyword = "laptop";\n\nconst results = await db.listDocuments("products", {\n  filters: {\n    // Must be in stock and not discontinued\n    inStock: true,\n    status_ne: "discontinued",\n\n    // Price range\n    price_gte: 200,\n    price_lte: 2000,\n\n    // Search title OR description for the keyword\n    "[or:search]title_contains":       keyword,\n    "[or:search]description_contains": keyword,\n\n    // Category must be one of these\n    category_in: "laptops,notebooks,ultrabooks"\n  },\n  populate: ["brand", "category"],\n  select:   ["id", "title", "price", "rating", "brand", "category"],\n  orderBy:  "rating",\n  order:    "desc",\n  limit:    24,\n  offset:   0\n});',
      xp: 0,
    },

    // ─── FINAL CHALLENGES ─────────────────────────────────────────────────────
    {
      id: 18,
      type: "match",
      question: "Match each filter key to what it does.",
      pairs: [
        { term: "price_gte: 100", def: "price >= 100" },
        {
          term: "title_contains: 'js'",
          def: "Title includes 'js' (case-insensitive)",
        },
        { term: "status_in: 'a,b,c'", def: "Status is one of a, b, or c" },
        { term: "[or]role: 'admin'", def: "OR condition on role field" },
        { term: "deleted_at_isnull: 'true'", def: "deleted_at field is null" },
      ],
      explanation:
        "All advanced filtering in the JS SDK uses these key-suffix conventions inside the `filters` object — no special query builder class needed.",
      xp: 15,
    },
    {
      id: 19,
      type: "reorder",
      question:
        "Arrange these options to build a paginated, sorted search with an OR filter:",
      items: [
        { id: "a", text: "limit: 20, offset: 0" },
        {
          id: "b",
          text: 'filters: { "[or:s]title_contains": kw, "[or:s]body_contains": kw }',
        },
        { id: "c", text: 'orderBy: "created_at", order: "desc"' },
        { id: "d", text: 'await db.listDocuments("posts", {' },
      ],
      correct: ["d", "b", "c", "a"],
      explanation:
        "Open the call → define filters → sort → paginate. All inside the same options object.",
      xp: 20,
    },
  ],
};

// ============================================================================
// COURSE 8: BUILD A COMPLETE APP (🚀 12 steps)
// ============================================================================
export const Course8_FinalProject = {
  id: "cocobase-final-project",
  title: "🚀 Build a Complete App",
  description:
    "Combine everything: auth, real‑time, files, and cloud functions in a mini social platform.",
  icon: "🚀",
  color: "#39d353",
  difficulty: "advanced",
  duration: 60,
  steps: [
    // ─── INTRO ────────────────────────────────────────────────────────────────
    {
      id: 1,
      type: "lesson",
      title: "Project: Social Feed",
      content:
        "<p>We'll build a tiny social network where users can:</p><ul><li>Sign up / log in (with avatar upload)</li><li>Post text messages to a public feed</li><li>See new posts appear in real‑time</li><li>Like posts (update likes count)</li><li>Admins can delete any post via a Python cloud function</li></ul><p>This project uses almost everything we've learned — and uses the correct API for each piece.</p>",
      xp: 0,
    },

    // ─── AUTH SETUP ───────────────────────────────────────────────────────────
    {
      id: 2,
      type: "code_lesson",
      title: "Setup & Restoring Sessions",
      content:
        "Initialise the client and call `initAuth()` on load so returning users stay logged in. Register auth callbacks so your UI reacts to state changes.",
      codeSnippet:
        'import { Cocobase, uploadFile } from "cocobase";\n\nconst db = new Cocobase({ apiKey: process.env.COCOBASE_KEY });\n\n// Restore session on every page load\nawait db.auth.initAuth();\n\n// React to auth events across the app\ndb.auth.onAuthEvent({\n  onLogin:  (user) => renderApp(user),\n  onLogout: ()     => renderLoginScreen()\n});',
      xp: 0,
    },
    {
      id: 3,
      type: "code_lesson",
      title: "Register with Avatar Upload",
      content:
        "Register returns a `LoginResult` with `user` (no session object). Use the `uploadFile` named export for the avatar — then `updateUser()` to attach the URL. The SDK stores the token automatically.",
      codeSnippet:
        "async function register(email, password, name, avatarFile) {\n  // register() returns LoginResult: { user, requires_2fa }\n  const result = await db.auth.register({\n    email,\n    password,\n    data: { name }\n  });\n\n  if (result.requires_2fa) {\n    // prompt user for 2FA code then call verify2FALogin()\n    return;\n  }\n\n  // Upload avatar as a standalone file (named export, takes db as 1st arg)\n  if (avatarFile) {\n    const uploaded = await uploadFile(db, avatarFile);\n    await db.auth.updateUser({ data: { avatarUrl: uploaded.url } });\n  }\n\n  // Token is stored automatically — no localStorage call needed\n  return result.user;\n}",
      xp: 0,
    },
    {
      id: 4,
      type: "quiz",
      question:
        "After `db.auth.register()` succeeds, where is the token stored?",
      options: [
        "You must call `localStorage.setItem('token', session.token)` yourself",
        "The SDK stores it automatically under 'cocobase-token'",
        "It is only kept in memory and lost on refresh",
        "You must call `db.auth.setToken()` manually",
      ],
      correct: 1,
      explanation:
        "The SDK automatically persists the token to localStorage under `cocobase-token` via its internal `setToken()`. No manual localStorage calls needed.",
      xp: 10,
    },
    {
      id: 5,
      type: "code_lesson",
      title: "Login & Logout",
      content:
        "`login()` returns a `LoginResult`. `logout()` is synchronous — no `await`. Both token storage and cleanup are handled by the SDK.",
      codeSnippet:
        'async function login(email, password) {\n  const result = await db.auth.login({ email, password });\n\n  if (result.requires_2fa) {\n    const code = prompt("Enter your 2FA code:");\n    await db.auth.verify2FALogin({ email, code });\n  }\n  // Token stored automatically\n}\n\nfunction logout() {\n  // Synchronous — no await\n  // SDK clears localStorage entries automatically\n  db.auth.logout();\n}',
      xp: 0,
    },
    {
      id: 6,
      type: "true_false",
      question:
        "`db.auth.logout()` must be called with `await` and you must manually call `localStorage.removeItem()` afterwards.",
      correct: false,
      explanation:
        "`logout()` is synchronous — no `await`. The SDK removes both `cocobase-token` and `cocobase-user` from localStorage automatically.",
      xp: 10,
    },

    // ─── CREATING POSTS ───────────────────────────────────────────────────────
    {
      id: 7,
      type: "code_lesson",
      title: "Posting a Message",
      content:
        "Use `db.auth.getUser()` (synchronous, cached) to get the current user, then create the document.",
      codeSnippet:
        'async function createPost(text) {\n  // getUser() is synchronous — no await needed\n  const user = db.auth.getUser();\n  if (!user) throw new Error("Not logged in");\n\n  const post = await db.createDocument("posts", {\n    text,\n    author_id:   user.id,\n    author_name: user.data.name,\n    author_avatar: user.data.avatarUrl,\n    likes:       0,\n    created_at:  new Date().toISOString()\n  });\n\n  return post;\n}',
      xp: 0,
    },
    {
      id: 8,
      type: "quiz",
      question:
        "Which method gets the cached in-memory user without hitting the server?",
      options: [
        "await db.auth.getCurrentUser()",
        "db.auth.getUser()",
        "await db.auth.fetchUser()",
        "db.auth.user",
      ],
      correct: 1,
      explanation:
        "`db.auth.getUser()` is synchronous and returns the cached user from memory. `getCurrentUser()` is async and always fetches fresh data from the server.",
      xp: 10,
    },

    // ─── REAL-TIME FEED ───────────────────────────────────────────────────────
    {
      id: 9,
      type: "code_lesson",
      title: "Real‑time Feed with `db.watchCollection()`",
      content:
        "`db.watchCollection(collection, handler, options)` returns a connection object. Call `connection.close()` when the component unmounts to avoid memory leaks.",
      codeSnippet:
        'function subscribeToFeed(onNewPost, onUpdate, onDelete) {\n  const connection = db.watchCollection(\n    "posts",\n    (event) => {\n      switch (event.type) {\n        case "create": onNewPost(event.data);       break;\n        case "update": onUpdate(event.data);        break;\n        case "delete": onDelete(event.data.id);     break;\n      }\n    },\n    {\n      onConnected:    () => console.log("Feed connected"),\n      onDisconnected: () => console.log("Feed disconnected"),\n      onError:        (err) => console.error("Feed error:", err)\n    }\n  );\n\n  // Return cleanup function (e.g. for React useEffect)\n  return () => connection.close();\n}\n\n// React usage:\nuseEffect(() => {\n  const cleanup = subscribeToFeed(addPost, updatePost, removePost);\n  return cleanup;  // runs on unmount\n}, []);',
      xp: 0,
    },
    {
      id: 10,
      type: "true_false",
      question:
        "The correct way to subscribe to real-time collection changes in the JS SDK is `db.realtime.collection('posts').on('create', handler).subscribe()`.",
      correct: false,
      explanation:
        "That API doesn't exist. The correct call is `db.watchCollection('posts', handler, options)` which returns a connection. Clean up by calling `connection.close()`.",
      xp: 10,
    },
    {
      id: 11,
      type: "quiz",
      question:
        "What should you do with the object returned by `db.watchCollection()`?",
      options: [
        "Ignore it — the connection manages itself",
        "Call `.close()` on it when you no longer need updates, to avoid memory leaks",
        "Call `.unsubscribe()` on it",
        "Store it in localStorage for later",
      ],
      correct: 1,
      explanation:
        "Always call `connection.close()` when the component unmounts or the subscription is no longer needed. This closes the WebSocket and prevents memory leaks.",
      xp: 10,
    },

    // ─── LIKING POSTS ─────────────────────────────────────────────────────────
    {
      id: 12,
      type: "code_lesson",
      title: "Liking a Post",
      content:
        "Update the likes count with `db.updateDocument()`. For a bulk like (multiple posts at once), use `db.updateDocuments()` with an object keyed by document ID.",
      codeSnippet:
        '// Like a single post\nasync function likePost(postId, currentLikes) {\n  await db.updateDocument("posts", postId, {\n    likes: currentLikes + 1\n  });\n}\n\n// Batch update multiple documents at once\n// updateDocuments takes an OBJECT, not an array\nasync function archivePosts(postIds) {\n  const updates = {};\n  postIds.forEach(id => { updates[id] = { archived: true }; });\n  await db.updateDocuments("posts", updates);\n}',
      xp: 0,
    },
    {
      id: 13,
      type: "quiz",
      question:
        "What shape does `db.updateDocuments()` expect as its second argument?",
      options: [
        'An array: `[{ id: "x", data: {...} }]`',
        'An object: `{ "doc-id-1": { field: val }, "doc-id-2": { field: val } }`',
        "A flat array of new values in order",
        "A comma-separated string of IDs",
      ],
      correct: 1,
      explanation:
        "`updateDocuments(collection, updates)` takes an object where keys are document IDs and values are the partial updates — not an array of `{ id, data }` pairs.",
      xp: 10,
    },

    // ─── CLOUD FUNCTION (ADMIN DELETE) ────────────────────────────────────────
    {
      id: 14,
      type: "code_lesson",
      title: "Cloud Function: Admin Delete (Python)",
      content:
        "Cloud functions are Python `def main():` functions — not JavaScript. Globals `db` and `req` are injected automatically. Return a tuple for custom status codes.",
      codeSnippet:
        '# functions/delete_post.py\ndef main():\n    user = req.user\n\n    # req.user is None if the caller isn\'t authenticated\n    if not user:\n        return {"error": "Authentication required"}, 401\n\n    if "admin" not in user.roles:\n        return {"error": "Admin only"}, 403\n\n    post_id = req.get("post_id")\n    if not post_id:\n        return {"error": "post_id is required"}, 400\n\n    post = db.find_one("posts", id=post_id)\n    if not post:\n        return {"error": "Post not found"}, 404\n\n    # delete via updating a soft-delete flag, or hard-delete:\n    db.find_one("posts", id=post_id)  # confirm it exists\n    return {"deleted": post_id}',
      xp: 0,
    },
    {
      id: 15,
      type: "true_false",
      question:
        "Cloud functions are written as `export default async (req, res, { db, auth }) => {}` in JavaScript.",
      correct: false,
      explanation:
        "Cloud functions are Python only. The correct form is `def main():` with `db`, `req`, `render`, and `env` injected as globals — no parameters, no exports.",
      xp: 10,
    },

    // ─── CALLING THE FUNCTION ─────────────────────────────────────────────────
    {
      id: 16,
      type: "code_lesson",
      title: "Calling the Cloud Function from the Client",
      content:
        "Cloud functions are plain HTTP endpoints — call them with `fetch()`. There is no `db.functions.execute()` method.",
      codeSnippet:
        'async function adminDeletePost(postId) {\n  const token = db.auth.getToken(); // get current JWT\n\n  const res = await fetch(\n    `https://api.cocobase.buzz/projects/${PROJECT_ID}/execute/delete_post`,\n    {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json",\n        "Authorization": `Bearer ${token}`  // pass token for req.user\n      },\n      body: JSON.stringify({ post_id: postId })\n    }\n  );\n\n  const data = await res.json();\n  if (data.deleted) console.log("Post deleted:", data.deleted);\n}',
      xp: 0,
    },
    {
      id: 17,
      type: "true_false",
      question:
        "You call a Cocobase cloud function from the client using `db.functions.execute('name', payload)`.",
      correct: false,
      explanation:
        "There is no `db.functions.execute()`. Cloud functions are plain HTTP endpoints. Call them with `fetch()` at `https://api.cocobase.buzz/projects/{PROJECT_ID}/execute/{functionName}`.",
      xp: 10,
    },

    // ─── FINAL CHALLENGE ──────────────────────────────────────────────────────
    {
      id: 18,
      type: "quiz",
      question:
        "Why use a Python cloud function for admin deletion instead of calling `db.deleteDocument()` from the client?",
      options: [
        "Client-side deleteDocument() doesn't exist",
        "It runs faster on the server",
        "Admin role checks must happen server-side — a client could bypass them otherwise",
        "Cloud functions are free but client calls cost money",
      ],
      correct: 2,
      explanation:
        "Security checks that rely on user roles must live on the server. A malicious client can send any request it wants — only server-side validation with `req.user` is trustworthy.",
      xp: 10,
    },
    {
      id: 19,
      type: "match",
      question:
        "Match each feature of the social app to its correct Cocobase implementation.",
      pairs: [
        {
          term: "Register + avatar upload",
          def: "register() then uploadFile(db, file)",
        },
        { term: "Restore session on reload", def: "db.auth.initAuth()" },
        {
          term: "Real-time new posts",
          def: "db.watchCollection('posts', handler)",
        },
        { term: "Logout (no await)", def: "db.auth.logout()" },
        {
          term: "Admin delete (server-side)",
          def: "Python def main(): with req.user check",
        },
        {
          term: "Call cloud function",
          def: "fetch(projectUrl/execute/funcName)",
        },
      ],
      explanation:
        "Every feature maps to a specific, accurate Cocobase API — no invented methods.",
      xp: 20,
    },
    {
      id: 20,
      type: "reorder",
      question:
        "Arrange the steps for the complete social feed flow from app load to seeing a new post in real-time.",
      items: [
        {
          id: "a",
          text: "Real-time 'create' event fires → UI shows new post instantly",
        },
        {
          id: "b",
          text: "await db.auth.initAuth() — restore any saved session",
        },
        {
          id: "c",
          text: "User submits post → db.createDocument('posts', data)",
        },
        {
          id: "d",
          text: "db.watchCollection('posts', handler) — subscribe to feed",
        },
      ],
      correct: ["b", "d", "c", "a"],
      explanation:
        "initAuth → subscribe to realtime → create post → event fires and UI updates. Always restore the session before doing anything else.",
      xp: 15,
    },
  ],
};

// ============================================================================
// EXTRA COURSE 2: DATABASE DEEP DIVE (full course, 12 steps)
// ============================================================================
export const DatabaseDeepDive = {
  id: "cocobase-database-deep",
  title: "🗄️ Database Deep Dive",
  description:
    "Data modeling, relationships, and advanced CRUD patterns in Cocobase.",
  icon: "🗄️",
  color: "#58a6ff",
  difficulty: "intermediate",
  duration: 50,
  steps: [
    // ─── DATA MODELING ────────────────────────────────────────────────────────
    {
      id: 1,
      type: "lesson",
      title: "Data Modeling in Cocobase",
      content:
        "<p>Cocobase stores data as flexible JSON documents inside collections — no rigid schema required. When designing your data model, you choose between two strategies:</p><ul><li><strong>Embedding</strong> — store related data directly inside a document (great for one-to-few relationships that are always read together)</li><li><strong>Referencing</strong> — store the related document's ID (e.g., <code>author_id</code>) and use <code>populate</code> to expand it at query time (better for large or shared data)</li></ul><p>Cocobase auto-tracks <code>createdBy</code> for document ownership, and every document gets <code>id</code>, <code>collection</code>, <code>createdAt</code>, and <code>updatedAt</code> automatically.</p>",
      xp: 0,
    },
    {
      id: 2,
      type: "quiz",
      question:
        "When is embedding (storing data inside a document) the better choice?",
      options: [
        "One-to-few relationships always read together (e.g., a post's tags)",
        "One-to-many with hundreds of items (e.g., all comments site-wide)",
        "Shared data used by many collections (e.g., a user profile)",
        "Large binary files",
      ],
      correct: 0,
      explanation:
        "Embed when the sub-data is small, only makes sense in context of the parent, and is always read together. For large arrays or shared entities, use ID references + populate instead.",
      xp: 10,
    },

    // ─── CRUD ─────────────────────────────────────────────────────────────────
    {
      id: 3,
      type: "code_lesson",
      title: "Creating & Reading Documents",
      content:
        "`createDocument()` adds a single document. `getDocument()` fetches one by ID. `listDocuments()` fetches many, with optional filters, sorting, and pagination.",
      codeSnippet:
        '// Create\nconst post = await db.createDocument("posts", {\n  title: "Hello World",\n  status: "draft",\n  author_id: user.id\n});\nconsole.log("Created:", post.id);\n\n// Read one by ID\nconst fetched = await db.getDocument("posts", post.id);\n\n// Read many with filters\nconst published = await db.listDocuments("posts", {\n  filters:  { status: "published" },\n  orderBy:  "createdAt",\n  order:    "desc",\n  limit:    10\n});\nconsole.log(published.data);     // array of documents\nconsole.log(published.total);    // total matching count\nconsole.log(published.has_more); // pagination flag',
      xp: 0,
    },
    {
      id: 4,
      type: "code_lesson",
      title: "Updating Documents",
      content:
        "`updateDocument()` does a **partial** update — only the fields you pass are changed, everything else stays. `updateDocuments()` updates many at once using an object keyed by document ID.",
      codeSnippet:
        '// Partial update — only title changes, other fields untouched\nawait db.updateDocument("posts", "post_id_123", {\n  title: "Updated Title"\n});\n\n// Batch update — pass an object: { docId: partialData }\nawait db.updateDocuments("posts", {\n  "post_id_1": { likes: 42 },\n  "post_id_2": { status: "archived" }\n});',
      xp: 0,
    },
    {
      id: 5,
      type: "fill_code",
      question: "Fill the blank to update the 'likes' count of a post.",
      codeTemplate: ["await db.", "('posts', 'post_1', { likes: 42 });"],
      blanks: [0],
      blankAnswers: ["updateDocument"],
      wordBank: [
        "updateDocument",
        "replaceDocument",
        "modifyDocument",
        "patchDocument",
      ],
      explanation:
        "`updateDocument(collection, id, data)` performs a partial update — it merges with existing fields rather than replacing the whole document.",
      xp: 15,
    },
    {
      id: 6,
      type: "code_lesson",
      title: "Deleting Documents",
      content:
        "Hard-delete a single document with `deleteDocument()`, or multiple at once with `deleteDocuments()` passing an array of ID strings. For important data, prefer soft-delete.",
      codeSnippet:
        '// Hard delete — single\nawait db.deleteDocument("posts", "post_id_123");\n\n// Hard delete — batch (array of ID strings)\nawait db.deleteDocuments("posts", ["post_1", "post_2", "post_3"]);\n\n// Soft delete — safer, data is recoverable\nawait db.updateDocument("posts", "post_id_123", {\n  deleted: true,\n  deletedAt: new Date().toISOString()\n});\n\n// Query only non-deleted\nconst live = await db.listDocuments("posts", {\n  filters: { deleted: false }\n});',
      xp: 0,
    },
    {
      id: 7,
      type: "true_false",
      question:
        "Deleting a document automatically removes all references to it in other collections.",
      correct: false,
      explanation:
        "Cocobase does not cascade deletes. If you store `author_id` in posts, deleting the user leaves those `author_id` values dangling. You must clean up references yourself.",
      xp: 10,
    },
    {
      id: 8,
      type: "short_answer",
      question: "What method fetches a single document by its ID?",
      placeholder: "e.g., getDocument",
      correct: "getDocument",
      caseSensitive: true,
      hint: "db.______('posts', 'post_id')",
      explanation:
        "`getDocument(collection, id)` returns the matching document or throws if not found.",
      xp: 15,
    },

    // ─── FILTERS ──────────────────────────────────────────────────────────────
    {
      id: 9,
      type: "code_lesson",
      title: "Advanced Filters & Operator Suffixes",
      content:
        "Add suffixes to field names in the `filters` object to apply comparisons and string searches — no special query builder needed.",
      codeSnippet:
        'const results = await db.listDocuments("products", {\n  filters: {\n    price_gte: 100,              // price >= 100\n    price_lte: 500,              // price <= 500\n    stock_gt: 0,                 // stock > 0\n    status_ne: "discontinued",   // status != "discontinued"\n    title_contains: "laptop",    // case-insensitive substring\n    category_in: "laptops,ultrabooks",  // one of these values\n    deleted_at_isnull: "true"    // field is null\n  },\n  orderBy: "price",\n  order:   "asc",\n  limit:   20\n});',
      xp: 0,
    },
    {
      id: 10,
      type: "quiz",
      question:
        "Which filter key returns posts where `status` is either 'published' or 'featured'?",
      options: [
        'status_or: "published,featured"',
        'status_in: "published,featured"',
        'status: ["published", "featured"]',
        '"[and]status": "published,featured"',
      ],
      correct: 1,
      explanation:
        '`_in` matches any value in a comma-separated string. `status_in: "published,featured"` returns documents where status is published OR featured.',
      xp: 10,
    },

    // ─── COUNTING ─────────────────────────────────────────────────────────────
    {
      id: 11,
      type: "code_lesson",
      title: "Counting Documents",
      content:
        "Every `listDocuments()` response includes a `total` field — the count of all documents matching your filters (regardless of `limit`). Use `limit: 1` when you only need the count and don't want to transfer data.",
      codeSnippet:
        '// Get just the count — set limit to 1 to minimise data transfer\nconst result = await db.listDocuments("users", {\n  filters: { status: "active" },\n  limit: 1\n});\n\nconst activeCount = result.total;\nconsole.log(`Active users: ${activeCount}`);\n\n// Or use has_more + total for pagination metadata\nconst page = await db.listDocuments("posts", {\n  filters: { status: "published" },\n  limit: 10,\n  offset: 0\n});\nconsole.log(`Page 1 of ${Math.ceil(page.total / 10)}`);',
      xp: 0,
    },
    {
      id: 12,
      type: "quiz",
      question:
        "Where does Cocobase return the total document count matching your filters?",
      options: [
        "A separate `db.countDocuments()` method call",
        "In `result.count` on every response",
        "In `result.total` on every `listDocuments()` response",
        "You must call `result.data.length`",
      ],
      correct: 2,
      explanation:
        "`listDocuments()` always returns `{ data, total, has_more }`. The `total` field is the full count matching your filters, not just the current page. There is no separate `countDocuments()` method.",
      xp: 10,
    },

    // ─── AGGREGATION VIA CLOUD FUNCTION ───────────────────────────────────────
    {
      id: 13,
      type: "code_lesson",
      title: "Aggregations via Cloud Functions",
      content:
        "Cocobase JS SDK doesn't have a built-in `aggregateDocuments()` method. For server-side aggregations (sum, average, group-by), write a Python cloud function using `db.query()` and compute the result there.",
      codeSnippet:
        '# Cloud function: get total revenue and average order value\ndef main():\n    orders = db.query("orders",\n        status="completed",\n        limit=1000  # page through for large datasets\n    )\n\n    amounts = [o["data"]["amount"] for o in orders["data"]]\n\n    total   = sum(amounts)\n    average = total / len(amounts) if amounts else 0\n    highest = max(amounts) if amounts else 0\n\n    return {\n        "total_revenue": total,\n        "average_order":  round(average, 2),\n        "highest_order":  highest,\n        "order_count":    orders["total"]\n    }',
      xp: 0,
    },
    {
      id: 14,
      type: "true_false",
      question:
        "The Cocobase JS SDK has a built-in `db.aggregateDocuments()` method for computing sums and averages.",
      correct: false,
      explanation:
        "No such method exists in the JS SDK. For aggregations, write a Python cloud function that queries the data and computes the result server-side, then call it via `fetch()`.",
      xp: 10,
    },

    // ─── RELATIONSHIPS & POPULATE ─────────────────────────────────────────────
    {
      id: 15,
      type: "code_lesson",
      title: "Relationships with `populate`",
      content:
        "Store a related document's ID as `fieldName_id`, then pass `populate: ['fieldName']` to expand it automatically at query time.",
      codeSnippet:
        '// Store a relationship\nawait db.createDocument("posts", {\n  title: "My Post",\n  author_id:   "user-abc",    // → db will expand this via populate\n  category_id: "cat-xyz"\n});\n\n// Fetch with related data expanded\nconst posts = await db.listDocuments("posts", {\n  filters:  { status: "published" },\n  populate: ["author", "category"],  // author_id → full author object\n  limit:    10\n});\n\nconst post = posts.data[0];\nconsole.log(post.author.email);    // full user object\nconsole.log(post.category.name);   // full category object',
      xp: 0,
    },

    // ─── SOFT DELETE BEST PRACTICE ────────────────────────────────────────────
    {
      id: 16,
      type: "code_lesson",
      title: "Soft Delete Pattern",
      content:
        "Prefer soft-delete over `deleteDocument()` for important data. Mark records as deleted and filter them out — the data remains recoverable.",
      codeSnippet:
        '// Mark as deleted instead of hard-deleting\nawait db.updateDocument("posts", postId, {\n  deleted:   true,\n  deletedAt: new Date().toISOString()\n});\n\n// Always filter out soft-deleted records\nconst activePosts = await db.listDocuments("posts", {\n  filters: { deleted: false }\n});\n\n// Admin view: recover a soft-deleted document\nawait db.updateDocument("posts", postId, {\n  deleted:   false,\n  deletedAt: null\n});',
      xp: 0,
    },

    // ─── FINAL CHALLENGE ──────────────────────────────────────────────────────
    {
      id: 17,
      type: "match",
      question:
        "Match each data operation to the correct Cocobase JS SDK call.",
      pairs: [
        { term: "Fetch one document by ID", def: "db.getDocument(col, id)" },
        {
          term: "Partial update one document",
          def: "db.updateDocument(col, id, data)",
        },
        {
          term: "Delete several documents",
          def: "db.deleteDocuments(col, ['id1','id2'])",
        },
        {
          term: "Get total matching count",
          def: "result.total from listDocuments()",
        },
        {
          term: "Expand a related document",
          def: "populate: ['fieldName'] in listDocuments()",
        },
        {
          term: "Server-side aggregation",
          def: "Python cloud function with db.query()",
        },
      ],
      explanation:
        "These cover the full CRUD lifecycle plus the two most common patterns — population and aggregation.",
      xp: 20,
    },
    {
      id: 18,
      type: "reorder",
      question:
        "Arrange these steps to update a document and then verify the change by fetching it.",
      items: [
        { id: "a", text: "const updated = await db.getDocument('posts', id)" },
        {
          id: "b",
          text: "await db.updateDocument('posts', id, { title: 'New Title' })",
        },
        { id: "c", text: "console.log(updated.title) // 'New Title'" },
      ],
      correct: ["b", "a", "c"],
      explanation:
        "Update first → then fetch fresh data from the server → then log to verify. Both calls are awaited in sequence.",
      xp: 15,
    },
  ],
};

export const ErrorHandling = {
  id: "cocobase-error-handling",
  title: "🛡️ Error Handling & Best Practices",
  description:
    "Write robust code with try/catch, retries, and secure patterns.",
  icon: "🛡️",
  color: "#f85149",
  difficulty: "intermediate",
  duration: 35,
  steps: [
    // ─── INTRO ────────────────────────────────────────────────────────────────
    {
      id: 1,
      type: "lesson",
      title: "Why Error Handling Matters",
      content:
        "<p>Network requests can fail — no internet, rate limits, permission errors, expired tokens. Your app must handle these gracefully to avoid crashes and give users useful feedback.</p><p>Cocobase errors include a <code>statusCode</code> and a <code>message</code>. The most common ones you'll encounter:</p><ul><li><strong>401</strong> — invalid or missing API key / token</li><li><strong>403</strong> — authenticated but lacks permission</li><li><strong>404</strong> — document or collection not found</li><li><strong>429</strong> — rate limit exceeded, retry after a delay</li><li><strong>500</strong> — server error, retry or report</li></ul>",
      xp: 0,
    },

    // ─── BASIC TRY/CATCH ──────────────────────────────────────────────────────
    {
      id: 2,
      type: "code_lesson",
      title: "Basic Try/Catch",
      content:
        "Wrap every Cocobase call in a try/catch. The caught error has a `statusCode` property (not `.status`) you can check to decide what to do.",
      codeSnippet:
        'try {\n  const result = await db.createDocument("posts", data);\n  console.log("Success:", result);\n} catch (err) {\n  // err.statusCode — the HTTP status code\n  // err.message    — human-readable description\n  console.error("Failed:", err.message);\n  showNotification("Could not save post. Please try again.");\n}',
      xp: 0,
    },
    {
      id: 3,
      type: "quiz",
      question:
        "What property on a Cocobase error object gives you the HTTP status code?",
      options: ["err.status", "err.code", "err.statusCode", "err.httpStatus"],
      correct: 2,
      explanation:
        "Cocobase errors expose `err.statusCode` (e.g., 401, 403, 404, 429). Using `err.status` won't work — that property doesn't exist on Cocobase errors.",
      xp: 10,
    },

    // ─── STATUS-CODE BRANCHING ────────────────────────────────────────────────
    {
      id: 4,
      type: "code_lesson",
      title: "Branching on Status Codes",
      content:
        "Check `err.statusCode` to handle different failure modes differently — show a login prompt on 401, a permission message on 403, a not-found state on 404.",
      codeSnippet:
        'try {\n  await db.updateDocument("profile", userId, data);\n} catch (err) {\n  switch (err.statusCode) {\n    case 401:\n      redirectToLogin();          // token expired or missing\n      break;\n    case 403:\n      showError("You don\'t have permission to do that.");\n      break;\n    case 404:\n      showError("This record no longer exists.");\n      break;\n    case 429:\n      showError("Too many requests — please wait a moment.");\n      scheduleRetry();            // retry after a delay\n      break;\n    default:\n      showError("Something went wrong. Please try again.");\n  }\n}',
      xp: 0,
    },
    {
      id: 5,
      type: "fill_code",
      question:
        "Fill the blank to redirect to login when a 401 error is received.",
      codeTemplate: [
        "try {\n  await db.updateDocument('profile', userId, data);\n} catch (err) {\n  if (err.",
        " === 401) {\n    redirectToLogin();\n  }\n}",
      ],
      blanks: [0],
      blankAnswers: ["statusCode"],
      wordBank: ["statusCode", "status", "code", "errorCode"],
      explanation:
        "Cocobase errors expose `err.statusCode`, not `err.status`. Always use `statusCode` when branching on HTTP error codes.",
      xp: 15,
    },

    // ─── RATE LIMIT & RETRY ───────────────────────────────────────────────────
    {
      id: 6,
      type: "quiz",
      question:
        "What should you do when you receive a 429 (Too Many Requests) error?",
      options: [
        "Log the user out immediately",
        "Retry after a delay — ideally with exponential backoff",
        "Ignore it and keep sending requests",
        "Delete and re-create the collection",
      ],
      correct: 1,
      explanation:
        "429 means you've hit the rate limit. Wait before retrying — exponential backoff (doubling the delay each time) avoids hammering the server.",
      xp: 10,
    },
    {
      id: 7,
      type: "code_lesson",
      title: "Retry with Exponential Backoff",
      content:
        "Automatically retry failed requests with increasing delays. Useful for 429 and transient 500 errors.",
      codeSnippet:
        'async function withRetry(fn, retries = 3) {\n  for (let attempt = 0; attempt < retries; attempt++) {\n    try {\n      return await fn();\n    } catch (err) {\n      const isLast    = attempt === retries - 1;\n      const retryable = [429, 500, 503].includes(err.statusCode);\n\n      if (isLast || !retryable) throw err;\n\n      const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s\n      console.log(`Retry ${attempt + 1} in ${delay}ms`);\n      await new Promise(r => setTimeout(r, delay));\n    }\n  }\n}\n\n// Usage\nconst posts = await withRetry(() => db.listDocuments("posts"));',
      xp: 0,
    },
    {
      id: 8,
      type: "short_answer",
      question:
        "What HTTP status code indicates the rate limit has been exceeded?",
      placeholder: "e.g., 429",
      correct: "429",
      caseSensitive: false,
      hint: "4xx client error for rate limiting",
      explanation:
        "429 Too Many Requests means you've sent too many API calls in a short window. Implement retries with exponential backoff.",
      xp: 15,
    },

    // ─── OFFLINE DETECTION ────────────────────────────────────────────────────
    {
      id: 9,
      type: "code_lesson",
      title: "Network Offline Detection",
      content:
        "Check `navigator.onLine` before making requests so you can show a helpful message instead of a confusing error.",
      codeSnippet:
        'async function safeCreatePost(data) {\n  if (!navigator.onLine) {\n    showNotification("No internet connection. Changes will sync when you\'re back online.");\n    return;\n  }\n\n  try {\n    return await db.createDocument("posts", data);\n  } catch (err) {\n    console.error("Request failed:", err.statusCode, err.message);\n    showNotification("Could not save. Please try again.");\n  }\n}',
      xp: 0,
    },

    // ─── SECURITY ─────────────────────────────────────────────────────────────
    {
      id: 10,
      type: "true_false",
      question:
        "It is safe to hardcode your Cocobase API key directly in a frontend JavaScript file.",
      correct: false,
      explanation:
        "Never expose API keys in client-side code — anyone can inspect the source and steal them. Store them in environment variables and use them server-side, or rely on Cocobase's RBAC to limit what the key can do.",
      xp: 10,
    },
    {
      id: 11,
      type: "code_lesson",
      title: "Using Environment Variables (Vite / React)",
      content:
        "Store your API key in a `.env` file and access it via `import.meta.env`. Never commit `.env` to version control — add it to `.gitignore`.",
      codeSnippet:
        '# .env (never commit this file)\nVITE_COCOBASE_KEY=your_api_key_here\n\n# .gitignore\n.env\n.env.local\n\n// In your JS code\nimport { Cocobase } from "cocobase";\n\nconst db = new Cocobase({\n  apiKey: import.meta.env.VITE_COCOBASE_KEY\n});\n\n// For Node / Next.js back-end:\n// const db = new Cocobase({ apiKey: process.env.COCOBASE_KEY });',
      xp: 0,
    },

    // ─── BEST PRACTICES SUMMARY ───────────────────────────────────────────────
    {
      id: 12,
      type: "lesson",
      title: "Security & Performance Best Practices",
      content:
        "<p><strong>Security</strong></p><ul><li>Never hardcode API keys in client-side code — use environment variables</li><li>Use Cocobase RBAC (Roles & Permissions) to enforce least-privilege access</li><li>Validate all inputs in cloud functions before writing to the database</li><li>Always use HTTPS — <code>https://api.cocobase.buzz</code></li></ul><p><strong>Performance</strong></p><ul><li>Always paginate — never fetch unbounded collections</li><li>Use <code>select</code> in cloud functions to return only needed fields</li><li>Use <code>filters</code> server-side — never fetch all then filter in JS</li><li>Use <code>createDocuments()</code> (batch) instead of many individual <code>createDocument()</code> calls</li><li>Close real-time connections when components unmount</li></ul>",
      xp: 0,
    },
    {
      id: 13,
      type: "match",
      question: "Match each error status code to its meaning.",
      pairs: [
        { term: "401", def: "Invalid or missing token — redirect to login" },
        { term: "403", def: "Authenticated but lacks permission" },
        { term: "404", def: "Document or resource not found" },
        { term: "429", def: "Rate limit exceeded — retry with backoff" },
        { term: "500", def: "Server error — retry or report to support" },
      ],
      explanation:
        "Knowing these status codes lets you write precise error handling that gives users the right feedback instead of a generic 'something went wrong'.",
      xp: 15,
    },
    {
      id: 14,
      type: "reorder",
      question: "Arrange the steps for a robust API call.",
      items: [
        {
          id: "a",
          text: "Check err.statusCode and handle 401/403/429 separately",
        },
        {
          id: "b",
          text: "Check navigator.onLine before attempting the request",
        },
        {
          id: "c",
          text: "Show a user-friendly message or retry if appropriate",
        },
        { id: "d", text: "Wrap the Cocobase call in try/catch" },
      ],
      correct: ["b", "d", "a", "c"],
      explanation:
        "Check connectivity first → attempt the call → branch on status code → give the user meaningful feedback or retry automatically.",
      xp: 15,
    },
  ],
};
// ============================================================================
// EXTRA COURSE 4: BUILDING WITH REACT (full course, 12 steps)
// ============================================================================
export const ReactIntegration = {
  id: "cocobase-react",
  title: "⚛️ Building with React",
  description:
    "Use Cocobase in React apps – hooks, context, real‑time updates.",
  icon: "⚛️",
  color: "#61dafb",
  difficulty: "intermediate",
  duration: 45,
  steps: [
    {
      id: 1,
      type: "lesson",
      title: "React + Cocobase",
      content:
        "<p>Integrate Cocobase into any React app. You'll learn to use hooks like useState and useEffect to fetch and display data.</p>",
      xp: 0,
    },
    {
      id: 2,
      type: "code_lesson",
      title: "useEffect for Initial Fetch",
      content: "Load data when the component mounts.",
      codeSnippet:
        "import { useEffect, useState } from 'react';\nimport { Cocobase } from 'cocobase';\n\nconst db = new Cocobase({ apiKey: 'YOUR_KEY' });\n\nexport default function PostList() {\n  const [posts, setPosts] = useState([]);\n\n  useEffect(() => {\n    async function load() {\n      const data = await db.listDocuments('posts');\n      setPosts(data);\n    }\n    load();\n  }, []);\n\n  return (\n    <ul>\n      {posts.map(post => <li key={post.id}>{post.title}</li>)}\n    </ul>\n  );\n}",
      xp: 0,
    },
    {
      id: 3,
      type: "quiz",
      question:
        "Which React hook is best for fetching data when a component first renders?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1,
      explanation:
        "useEffect with an empty dependency array runs once after mount – perfect for initial data fetch.",
      xp: 10,
    },
    {
      id: 4,
      type: "code_lesson",
      title: "Real‑time Updates with useSync",
      content:
        "Create a custom hook that subscribes to a collection and re‑renders on changes.",
      codeSnippet:
        "function useRealtimeCollection(collectionName) {\n  const [data, setData] = useState([]);\n\n  useEffect(() => {\n    // Initial fetch\n    db.listDocuments(collectionName).then(setData);\n\n    // Real‑time watcher\n    const watcher = db.realtime.collection(collectionName);\n    watcher.on('create', (doc) => setData(prev => [...prev, doc]));\n    watcher.on('update', (doc) => setData(prev => prev.map(p => p.id === doc.id ? doc : p)));\n    watcher.on('delete', (id) => setData(prev => prev.filter(p => p.id !== id)));\n    watcher.subscribe();\n\n    return () => watcher.unsubscribe();\n  }, [collectionName]);\n\n  return data;\n}",
      xp: 0,
    },
    {
      id: 5,
      type: "fill_code",
      question: "Fill the blank to create a context for the Cocobase client.",
      codeTemplate: [
        "import { createContext, useContext } from 'react';\nconst CocobaseContext = ______(null);\n\nexport function useCocobase() {\n  return useContext(CocobaseContext);\n}",
      ],
      blanks: [1],
      blankAnswers: ["createContext"],
      wordBank: ["createContext", "makeContext", "newContext", "Context"],
      explanation: "`createContext` creates a React context object.",
      xp: 15,
    },
    {
      id: 6,
      type: "code_lesson",
      title: "Authentication with React",
      content: "Provide auth state to the whole app.",
      codeSnippet:
        "function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n\n  useEffect(() => {\n    db.auth.getCurrentUser().then(setUser);\n  }, []);\n\n  const login = async (email, password) => {\n    const { session } = await db.auth.login({ email, password });\n    localStorage.setItem('token', session.token);\n    setUser(await db.auth.getCurrentUser());\n  };\n\n  const logout = async () => {\n    await db.auth.logout();\n    localStorage.removeItem('token');\n    setUser(null);\n  };\n\n  return (\n    <AuthContext.Provider value={{ user, login, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}",
      xp: 0,
    },
    {
      id: 7,
      type: "true_false",
      question:
        "You can use React Server Components with Cocobase to fetch data on the server.",
      correct: true,
      explanation:
        "Yes – Cocobase works in Node.js environments. You can fetch data in RSCs and pass it to client components.",
      xp: 10,
    },
    {
      id: 8,
      type: "code_lesson",
      title: "Optimistic Updates",
      content:
        "Update UI instantly before server responds, then rollback on error.",
      codeSnippet:
        "async function likePost(postId, currentLikes) {\n  // Optimistic update\n  setPosts(prev => prev.map(p => \n    p.id === postId ? { ...p, likes: p.likes + 1 } : p\n  ));\n\n  try {\n    await db.updateDocument('posts', postId, { likes: currentLikes + 1 });\n  } catch (err) {\n    // Rollback on error\n    setPosts(prev => prev.map(p => \n      p.id === postId ? { ...p, likes: p.likes - 1 } : p\n    ));\n    showError('Failed to like');\n  }\n}",
      xp: 0,
    },
    {
      id: 9,
      type: "short_answer",
      question:
        "What hook would you use to share the Cocobase client across many components without prop drilling?",
      placeholder: "e.g., useContext",
      correct: "useContext",
      caseSensitive: true,
      hint: "Combine with createContext to provide the client",
      explanation:
        "Create a context for the db instance and use `useContext` to consume it anywhere.",
      xp: 15,
    },
    {
      id: 10,
      type: "code_lesson",
      title: "Form Submission with Loading State",
      content:
        "Handle form submission with loading indicator and error feedback.",
      codeSnippet:
        "function CreatePostForm() {\n  const [title, setTitle] = useState('');\n  const [loading, setLoading] = useState(false);\n\n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    setLoading(true);\n    try {\n      await db.createDocument('posts', { title });\n      setTitle('');\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={title} onChange={e => setTitle(e.target.value)} disabled={loading} />\n      <button type=\"submit\" disabled={loading}>{loading ? 'Saving...' : 'Create Post'}</button>\n    </form>\n  );\n}",
      xp: 0,
    },
    {
      id: 11,
      type: "quiz",
      question: "What is the purpose of the `finally` block in the try/catch?",
      options: [
        "To run code only on error",
        "To run code regardless of success or error",
        "To return a value",
        "To break the loop",
      ],
      correct: 1,
      explanation:
        "`finally` always executes after try/catch, perfect for resetting loading states.",
      xp: 10,
    },
    {
      id: 12,
      type: "reorder",
      question:
        "Order the steps to build a React component that lists posts and adds a new post.",
      items: [
        { id: "a", text: "Call db.listDocuments('posts') in useEffect" },
        { id: "b", text: "Define a state variable posts with useState" },
        { id: "c", text: "Render the posts list" },
        {
          id: "d",
          text: "Create a form that calls db.createDocument and refreshes the list",
        },
      ],
      correct: ["b", "a", "c", "d"],
      explanation:
        "First define state, then fetch on mount, render, then provide a form to add new items.",
      xp: 15,
    },
  ],
};

// ============================================================================
// EXTRA COURSE 5: SECURITY BASICS (lesson‑only, no quizzes)
// ============================================================================
export const SecurityBasics = {
  id: "cocobase-security-basics",
  title: "🔒 Security Basics",
  description:
    "Keep your data safe – Row Level Security, API key protection, and user permissions.",
  icon: "🔒",
  color: "#f85149",
  difficulty: "beginner",
  duration: 12,
  steps: [
    {
      id: 1,
      type: "lesson",
      title: "Never Expose API Keys",
      content:
        "<p>Your API key is like a password. Never hardcode it in client‑side JavaScript. Use environment variables and a backend proxy, or use Cocobase's built‑in security rules that allow you to call `createDocument` directly but restrict access via policies.</p>",
      xp: 0,
    },
    {
      id: 2,
      type: "lesson",
      title: "Row Level Security (RLS)",
      content:
        '<p>RLS lets you define who can read/write what. For example, only the author of a post can edit it. Rules are defined in the Cocobase dashboard and enforced server‑side – even if a client tries to cheat.</p><p>Example rule: <code>{ "effect": "allow", "action": ["update"], "condition": "request.userId == resource.authorId" }</code></p>',
      xp: 0,
    },
    {
      id: 3,
      type: "lesson",
      title: "User Roles",
      content:
        "<p>Assign roles like 'admin' or 'moderator' via the user's `data` field. Then check `db.auth.hasRole('admin')` on the client – but remember, critical checks must also be enforced server‑side using RLS.</p>",
      xp: 0,
    },
  ],
};

// ============================================================================
// EXTRA COURSE 6: DEPLOYMENT TIPS (lesson‑only)
// ============================================================================
export const DeploymentTips = {
  id: "cocobase-deployment",
  title: "🚀 Deployment Tips",
  description:
    "Go live with confidence – environment config, CORS, and monitoring.",
  icon: "🚀",
  color: "#e3b341",
  difficulty: "beginner",
  duration: 10,
  steps: [
    {
      id: 1,
      type: "lesson",
      title: "Environment Variables in Production",
      content:
        "<p>Use different API keys for development and production. Store the production key in your hosting platform's environment variables (e.g., Vercel, Netlify, Render). Never commit `.env` files to Git.</p>",
      xp: 0,
    },
    {
      id: 2,
      type: "lesson",
      title: "CORS Settings",
      content:
        "<p>If you call Cocobase directly from a browser, ensure your project's CORS settings include your frontend domain. In the Cocobase dashboard, add your production URL to the allowed origins list.</p>",
      xp: 0,
    },
    {
      id: 3,
      type: "lesson",
      title: "Monitoring & Logs",
      content:
        "<p>Cocobase dashboard provides logs for API calls, errors, and rate limits. Monitor them to catch issues early. Set up alerts for high error rates or quota usage.</p>",
      xp: 0,
    },
  ],
};

// ============================================================================
// EXTRA COURSE 7: REAL‑WORLD EXAMPLE – BLOG PLATFORM (full course, 14 steps)
// ============================================================================
export const BlogPlatformCourse = {
  id: "cocobase-blog-platform",
  title: "📝 Build a Blog Platform",
  description:
    "Step‑by‑step creation of a full blog with authors, comments, and likes.",
  icon: "📝",
  color: "#39d353",
  difficulty: "intermediate",
  duration: 60,
  steps: [
    {
      id: 1,
      type: "lesson",
      title: "Project Overview",
      content:
        "<p>We'll build a blog where authors can write posts, readers can comment, and anyone can like posts. Uses auth, database, real‑time comments, and cloud functions for email notifications.</p>",
      xp: 0,
    },
    {
      id: 2,
      type: "code_lesson",
      title: "Setting Up Collections",
      content:
        "We need three collections: `users` (handled by auth), `posts`, and `comments`.",
      codeSnippet:
        "// Example post document structure\n{\n  id: 'auto_generated',\n  title: 'My First Post',\n  content: '...',\n  authorId: 'user_id',\n  published: true,\n  likes: 0,\n  created_at: '2025-01-01T00:00:00Z'\n}\n\n// Example comment document\n{\n  id: 'auto',\n  postId: 'post_id',\n  authorId: 'user_id',\n  text: 'Great post!',\n  created_at: '...'\n}",
      xp: 0,
    },
    {
      id: 3,
      type: "code_lesson",
      title: "Creating a Post (Authenticated)",
      content: "Only logged‑in users can create a post.",
      codeSnippet:
        "async function createPost(title, content) {\n  const user = await db.auth.getCurrentUser();\n  if (!user) throw new Error('Login required');\n\n  const post = await db.createDocument('posts', {\n    title,\n    content,\n    authorId: user.id,\n    authorName: user.data.name,\n    published: false,\n    likes: 0,\n    created_at: new Date().toISOString()\n  });\n  return post;\n}",
      xp: 0,
    },
    {
      id: 4,
      type: "quiz",
      question:
        "Why store `authorName` directly in the post document instead of joining on each read?",
      options: [
        "It's faster and avoids an extra query",
        "Because SQL doesn't support joins",
        "To save storage space",
        "Because it's required by law",
      ],
      correct: 0,
      explanation:
        "Denormalization (storing the author's name) is common in NoSQL to reduce round trips. If the name changes, you need to update all posts, but it's acceptable for blogs.",
      xp: 10,
    },
    {
      id: 5,
      type: "code_lesson",
      title: "Listing Published Posts",
      content: "Show only published posts, newest first.",
      codeSnippet:
        "async function getPublishedPosts() {\n  const posts = await db.listDocuments('posts', {\n    published: true,\n    sort: { field: 'created_at', order: 'desc' }\n  });\n  return posts;\n}",
      xp: 0,
    },
    {
      id: 6,
      type: "code_lesson",
      title: "Adding Comments",
      content: "Simple function to add a comment to a post.",
      codeSnippet:
        "async function addComment(postId, text) {\n  const user = await db.auth.getCurrentUser();\n  if (!user) throw new Error('Login required');\n\n  const comment = await db.createDocument('comments', {\n    postId,\n    authorId: user.id,\n    authorName: user.data.name,\n    text,\n    created_at: new Date().toISOString()\n  });\n  return comment;\n}",
      xp: 0,
    },
    {
      id: 7,
      type: "code_lesson",
      title: "Real‑time Comments",
      content: "Subscribe to new comments on a specific post.",
      codeSnippet:
        "function subscribeToComments(postId, onNewComment) {\n  const watcher = db.realtime.collection('comments');\n  watcher.on('create', (comment) => {\n    if (comment.postId === postId) {\n      onNewComment(comment);\n    }\n  });\n  watcher.subscribe();\n  return () => watcher.unsubscribe();\n}",
      xp: 0,
    },
    {
      id: 8,
      type: "fill_code",
      question: "Fill the blank to increment the likes count of a post.",
      codeTemplate: [
        "async function likePost(postId) {\n  const post = await db.getDocument('posts', postId);\n  await db.",
        "('posts', postId, { likes: post.likes + 1 });\n}",
      ],
      blanks: [1],
      blankAnswers: ["updateDocument"],
      wordBank: ["updateDocument", "increment", "patch", "modify"],
      explanation: "Use `updateDocument` to change the likes field.",
      xp: 15,
    },
    {
      id: 9,
      type: "code_lesson",
      title: "Cloud Function: Email on New Comment",
      content: "Notify author when someone comments on their post.",
      codeSnippet:
        "// functions/notifyComment.js\nexport default async (req, res, { db }) => {\n  const { postId, commentAuthorName } = req.body;\n  const post = await db.getDocument('posts', postId);\n  const author = await db.auth.getUserById(post.authorId);\n  \n  await sendEmail({\n    to: author.email,\n    subject: 'New comment on your post',\n    body: `${commentAuthorName} commented: \"${req.body.text}\"`\n  });\n  res.json({ sent: true });\n}",
      xp: 0,
    },
    {
      id: 10,
      type: "true_false",
      question:
        "You can call a cloud function from the client using `db.functions.call('notifyComment', data)`.",
      correct: false,
      explanation:
        "The correct method is `db.functions.execute()`, not `call`.",
      xp: 10,
    },
    {
      id: 11,
      type: "code_lesson",
      title: "Admin Dashboard (Role Check)",
      content: "Show moderation panel only to admins.",
      codeSnippet:
        "async function isAdmin() {\n  return await db.auth.hasRole('admin');\n}\n\n// In a React component\nif (await isAdmin()) {\n  // Show delete button for any post\n}",
      xp: 0,
    },
    {
      id: 12,
      type: "short_answer",
      question: "What method would you use to fetch a single post by its ID?",
      placeholder: "e.g., getDocument",
      correct: "getDocument",
      caseSensitive: true,
      hint: "db.______('posts', id)",
      explanation: "`getDocument(collection, id)` returns the document.",
      xp: 15,
    },
    {
      id: 13,
      type: "code_lesson",
      title: "Search Posts by Title",
      content: "Use the `contains` operator for text search (case‑sensitive).",
      codeSnippet:
        "async function searchPosts(keyword) {\n  const posts = await db.listDocuments('posts', {\n    title: { contains: keyword },\n    published: true\n  });\n  return posts;\n}",
      xp: 0,
    },
    {
      id: 14,
      type: "reorder",
      question:
        "Order the steps to implement a full blog post page with real‑time comments.",
      items: [
        { id: "a", text: "Fetch the post data using getDocument" },
        { id: "b", text: "Subscribe to comments real‑time watcher" },
        { id: "c", text: "Display comments list" },
        { id: "d", text: "Render a form to add a new comment" },
      ],
      correct: ["a", "b", "c", "d"],
      explanation:
        "First get post, then set up real‑time, then show existing comments, then provide form.",
      xp: 15,
    },
  ],
};

// ============================================================================
// EXTRA COURSE 8: PERFORMANCE OPTIMIZATION (lesson‑only, 4 lessons)
// ============================================================================
export const PerformanceOptimization = {
  id: "cocobase-performance",
  title: "⚡ Performance Optimization",
  description:
    "Make your app faster with pagination, field selection, and caching.",
  icon: "⚡",
  color: "#58a6ff",
  difficulty: "intermediate",
  duration: 15,
  steps: [
    {
      id: 1,
      type: "lesson",
      title: "Use `limit` and `offset` for Pagination",
      content:
        "<p>Never load all documents at once, especially for large collections. Always use `limit` and `offset` to load only what the user sees.</p><pre><code>const page = await db.listDocuments('posts', { limit: 20, offset: 0 });</code></pre>",
      xp: 0,
    },
    {
      id: 2,
      type: "lesson",
      title: "Select Only Needed Fields",
      content:
        "<p>Use the query builder's `select()` to reduce payload size. For a post list, you might only need title and date, not the full content.</p><pre><code>const posts = await db.listDocuments('posts', {\n  queryBuilder: (qb) => qb.select(['title', 'created_at'])\n});</code></pre>",
      xp: 0,
    },
    {
      id: 3,
      type: "lesson",
      title: "Cache Frequently Used Data",
      content:
        "<p>Store data in localStorage or React Query to avoid refetching. For example, user profile can be cached for the duration of the session.</p><pre><code>const cached = localStorage.getItem('profile');\nif (cached) return JSON.parse(cached);\nconst profile = await db.getDocument('users', userId);\nlocalStorage.setItem('profile', JSON.stringify(profile));</code></pre>",
      xp: 0,
    },
    {
      id: 4,
      type: "lesson",
      title: "Batch Operations for Bulk Changes",
      content:
        "<p>Instead of 100 individual `updateDocument` calls, use `db.batch.updateDocuments` to send one request.</p><pre><code>await db.batch.updateDocuments('posts', updatesArray);</code></pre>",
      xp: 0,
    },
  ],
};

// ============================================================================
// FINAL EXPORT (array of all courses)
// ============================================================================
export const ALL_COURSES = [
  Course1_Fundamentals,
  Course2_Queries,
  Course3_Auth,
  Course4_Realtime,
  Course5_Functions,
  Course6_FilesBatch,
  Course7_AdvancedQueries,
  Course8_FinalProject,
  DatabaseDeepDive,
  ErrorHandling,
  // ReactIntegration,
  // SecurityBasics,
  // DeploymentTips,
  // BlogPlatformCourse,
  // PerformanceOptimization,
];
